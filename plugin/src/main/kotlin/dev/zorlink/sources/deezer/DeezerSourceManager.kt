package dev.zorlink.sources.deezer

import com.sedmelluq.discord.lavaplayer.player.AudioPlayerManager
import com.sedmelluq.discord.lavaplayer.source.youtube.YoutubeAudioSourceManager
import com.sedmelluq.discord.lavaplayer.track.*
import dev.zorlink.ZorlinkInfo
import dev.zorlink.ZorlinkProperties
import dev.zorlink.sources.BaseSourceManager
import dev.zorlink.webhook.WebhookService

class DeezerSourceManager(
    props: ZorlinkProperties,
    private val api: DeezerApiClient,
    webhook: WebhookService
) : BaseSourceManager(props, webhook) {

    private lateinit var manager: AudioPlayerManager

    override fun getSourceName() = ZorlinkInfo.DEEZER_PREFIX

    override fun loadItem(m: AudioPlayerManager, ref: AudioReference): AudioItem? {
        manager = m
        val id = ref.identifier ?: return null
        return when {
            id.matches(ZorlinkInfo.DEEZER_PATTERN) -> loadByUrl(id)
            id.startsWith("dzsearch:") -> searchTracks(id.removePrefix("dzsearch:"))
            else -> null
        }
    }

    private fun loadByUrl(url: String): AudioItem? {
        val (type, id) = ZorlinkInfo.DEEZER_PATTERN.find(url)?.destructured ?: return null
        return when (type) {
            "track" -> api.getTrack(id)?.let { toYt(it) }
            "album" -> api.getAlbum(id)?.let { album ->
                val tracks = album.tracks?.data?.mapNotNull { toYt(it) } ?: return null
                BasicAudioPlaylist(album.title, tracks, null, false)
            }
            "playlist" -> api.getPlaylist(id)?.let { pl ->
                val tracks = pl.tracks?.data?.mapNotNull { toYt(it) } ?: return null
                BasicAudioPlaylist(pl.title, tracks, null, false)
            }
            "artist" -> {
                val tracks = api.getArtistTopTracks(id)?.data?.mapNotNull { toYt(it) } ?: return null
                BasicAudioPlaylist("Top Tracks", tracks, null, false)
            }
            else -> null
        }
    }

    private fun searchTracks(query: String): AudioPlaylist? {
        val tracks = api.search(query, props.deezer.searchLimit).mapNotNull { toYt(it) }
        if (tracks.isEmpty()) return null
        return BasicAudioPlaylist("Search: $query", tracks, null, true)
    }

    private fun toYt(track: DeezerTrack): AudioTrack? {
        val query = buildTrackQuery(track.artist.name, track.title)
        val ref = buildSearchQuery(track.isrc, query, props.deezer.providers)
        return try {
            val yt = manager.source(YoutubeAudioSourceManager::class.java) ?: return null
            when (val result = yt.loadItem(manager, AudioReference(ref, null))) {
                is AudioTrack -> result
                is AudioPlaylist -> result.tracks.firstOrNull()
                else -> null
            }
        } catch (e: Exception) {
            log.warn("[Deezer] Failed to resolve '${track.title}': ${e.message}")
            null
        }
    }
}
