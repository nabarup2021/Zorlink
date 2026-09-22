package dev.zorlink.sources.spotify

import com.sedmelluq.discord.lavaplayer.player.AudioPlayerManager
import com.sedmelluq.discord.lavaplayer.source.youtube.YoutubeAudioSourceManager
import com.sedmelluq.discord.lavaplayer.track.*
import dev.zorlink.ZorlinkInfo
import dev.zorlink.ZorlinkProperties
import dev.zorlink.sources.BaseSourceManager
import dev.zorlink.webhook.WebhookService

class SpotifySourceManager(
    props: ZorlinkProperties,
    private val api: SpotifyApiClient,
    private val recsClient: SpotifyRecsClient,
    webhook: WebhookService
) : BaseSourceManager(props, webhook) {

    private lateinit var manager: AudioPlayerManager

    override fun getSourceName() = ZorlinkInfo.SPOTIFY_PREFIX

    override fun loadItem(m: AudioPlayerManager, ref: AudioReference): AudioItem? {
        manager = m
        val id = ref.identifier ?: return null
        return when {
            id.matches(ZorlinkInfo.SPOTIFY_PATTERN) -> loadByUrl(id)
            id.startsWith("spsearch:") -> searchTracks(id.removePrefix("spsearch:"))
            id.startsWith("sprecsearch:") -> loadRecommendations(id.removePrefix("sprecsearch:"))
            else -> null
        }
    }

    private fun loadByUrl(url: String): AudioItem? {
        val (type, id) = ZorlinkInfo.SPOTIFY_PATTERN.find(url)?.destructured ?: return null
        return when (type) {
            "track" -> api.getTrack(id)?.let { toYt(it) }
            "album" -> api.getAlbum(id)?.let { album ->
                val tracks = album.tracks?.items?.mapNotNull { toYt(it) } ?: return null
                BasicAudioPlaylist(album.name, tracks, null, false)
            }
            "playlist" -> api.getPlaylist(id)?.let { pl ->
                val tracks = pl.tracks?.items?.mapNotNull { it.track?.let { t -> toYt(t) } } ?: return null
                BasicAudioPlaylist(pl.name, tracks, null, false)
            }
            "artist" -> {
                val tracks = api.getArtistTopTracks(id).mapNotNull { toYt(it) }
                if (tracks.isEmpty()) null else BasicAudioPlaylist("Top Tracks", tracks, null, false)
            }
            else -> null
        }
    }

    private fun searchTracks(query: String): AudioPlaylist? {
        val tracks = api.search(query, props.spotify.searchLimit).mapNotNull { toYt(it) }
        if (tracks.isEmpty()) return null
        if (props.logSearchEvents) webhook.sendSearchEvent("Spotify", query, tracks.size)
        return BasicAudioPlaylist("Search: $query", tracks, null, true)
    }

    private fun loadRecommendations(input: String): AudioPlaylist? {
        val seedIds = input.split(",").map { it.trim() }.filter { it.isNotBlank() }
        if (seedIds.isEmpty()) return null

        val recs = recsClient.getRecommendations(
            seedTrackIds = seedIds,
            limit = props.spotify.searchLimit,
            market = props.spotify.countryCode
        )

        if (recs.isEmpty()) return null

        val tracks = recs.mapNotNull { rec ->
            val ref = buildSearchQuery(rec.isrc, "${rec.author} - ${rec.title}", props.spotify.providers)
            resolveYt(ref)
        }

        if (tracks.isEmpty()) return null
        if (props.logSearchEvents) webhook.sendSearchEvent("Spotify Recs", input, tracks.size)
        return BasicAudioPlaylist("Recommended", tracks, null, false)
    }

    private fun toYt(track: SpotifyTrack): AudioTrack? {
        val query = buildTrackQuery(track.artistNames, track.name)
        val ref = buildSearchQuery(track.isrc, query, props.spotify.providers)
        return resolveYt(ref)
    }

    private fun resolveYt(ref: String): AudioTrack? {
        return try {
            val yt = manager.source(YoutubeAudioSourceManager::class.java) ?: return null
            when (val result = yt.loadItem(manager, AudioReference(ref, null))) {
                is AudioTrack -> result
                is AudioPlaylist -> result.tracks.firstOrNull()
                else -> null
            }
        } catch (e: Exception) {
            log.warn("[Spotify] Failed to resolve '$ref': ${e.message}")
            null
        }
    }
}
