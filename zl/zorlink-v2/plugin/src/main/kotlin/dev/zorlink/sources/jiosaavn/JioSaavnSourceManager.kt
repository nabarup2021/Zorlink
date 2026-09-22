package dev.zorlink.sources.jiosaavn

import com.sedmelluq.discord.lavaplayer.player.AudioPlayerManager
import com.sedmelluq.discord.lavaplayer.source.http.HttpAudioSourceManager
import com.sedmelluq.discord.lavaplayer.source.youtube.YoutubeAudioSourceManager
import com.sedmelluq.discord.lavaplayer.track.*
import dev.zorlink.ZorlinkInfo
import dev.zorlink.ZorlinkProperties
import dev.zorlink.sources.BaseSourceManager
import dev.zorlink.webhook.WebhookService

class JioSaavnSourceManager(
    props: ZorlinkProperties,
    private val api: JioSaavnApiClient,
    webhook: WebhookService
) : BaseSourceManager(props, webhook) {

    private lateinit var manager: AudioPlayerManager

    override fun getSourceName() = ZorlinkInfo.JIOSAAVN_PREFIX

    override fun loadItem(m: AudioPlayerManager, ref: AudioReference): AudioItem? {
        manager = m
        val id = ref.identifier ?: return null
        return when {
            id.matches(ZorlinkInfo.JIOSAAVN_PATTERN) -> loadByUrl(id)
            id.startsWith("jiosearch:") -> searchSongs(id.removePrefix("jiosearch:"))
            else -> null
        }
    }

    private fun loadByUrl(url: String): AudioItem? {
        val match = ZorlinkInfo.JIOSAAVN_PATTERN.find(url) ?: return null
        val (type, _) = match.destructured
        val jioId = url.substringAfterLast("/").substringAfterLast("-")
        return when (type) {
            "song" -> api.getSongById(jioId)?.let { resolve(it) }
            "album" -> {
                val songs = api.getAlbumSongs(jioId)
                val tracks = songs.mapNotNull { resolve(it) }
                if (tracks.isEmpty()) null
                else BasicAudioPlaylist(songs.firstOrNull()?.album ?: "Album", tracks, null, false)
            }
            "playlist" -> {
                val (name, songs) = api.getPlaylistSongs(jioId)
                val tracks = songs.mapNotNull { resolve(it) }
                if (tracks.isEmpty()) null else BasicAudioPlaylist(name, tracks, null, false)
            }
            else -> null
        }
    }

    private fun searchSongs(query: String): AudioPlaylist? {
        val tracks = api.searchSongs(query, props.jiosaavn.searchLimit).mapNotNull { resolve(it) }
        if (tracks.isEmpty()) return null
        return BasicAudioPlaylist("Search: $query", tracks, null, true)
    }

    private fun resolve(song: JioSaavnSong): AudioTrack? {
        if (!song.mediaUrl.isNullOrBlank()) {
            try {
                val httpManager = manager.source(HttpAudioSourceManager::class.java)
                val result = httpManager?.loadItem(manager, AudioReference(song.mediaUrl, song.title))
                if (result is AudioTrack) return result
            } catch (_: Exception) {}
        }
        return fallbackToYt(song)
    }

    private fun fallbackToYt(song: JioSaavnSong): AudioTrack? {
        val ref = buildSearchQuery(null, buildTrackQuery(song.artist, song.title), props.jiosaavn.providers)
        return try {
            val yt = manager.source(YoutubeAudioSourceManager::class.java) ?: return null
            when (val result = yt.loadItem(manager, AudioReference(ref, null))) {
                is AudioTrack -> result
                is AudioPlaylist -> result.tracks.firstOrNull()
                else -> null
            }
        } catch (e: Exception) {
            log.warn("[JioSaavn] YT fallback failed for '${song.title}': ${e.message}")
            null
        }
    }
}
