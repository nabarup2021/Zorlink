package dev.zorlink.sources.pandora

import com.sedmelluq.discord.lavaplayer.player.AudioPlayerManager
import com.sedmelluq.discord.lavaplayer.source.youtube.YoutubeAudioSourceManager
import com.sedmelluq.discord.lavaplayer.track.*
import dev.zorlink.ZorlinkInfo
import dev.zorlink.ZorlinkProperties
import dev.zorlink.sources.BaseSourceManager
import dev.zorlink.webhook.WebhookService

class PandoraSourceManager(
    props: ZorlinkProperties,
    private val api: PandoraApiClient,
    webhook: WebhookService
) : BaseSourceManager(props, webhook) {

    private lateinit var manager: AudioPlayerManager

    override fun getSourceName() = ZorlinkInfo.PANDORA_PREFIX

    override fun loadItem(m: AudioPlayerManager, ref: AudioReference): AudioItem? {
        manager = m
        val id = ref.identifier ?: return null
        return when {
            id.matches(ZorlinkInfo.PANDORA_PATTERN) -> loadByUrl(id)
            id.startsWith("pdsearch:") -> searchTracks(id.removePrefix("pdsearch:"))
            else -> null
        }
    }

    private fun loadByUrl(url: String): AudioItem? {
        val path = ZorlinkInfo.PANDORA_PATTERN.find(url)?.groupValues?.get(1) ?: return null
        return if (url.contains("/station/")) {
            val stationId = path.substringAfterLast("/")
            val tracks = api.getStationTracks(stationId).mapNotNull { toYt(it) }
            if (tracks.isEmpty()) null else BasicAudioPlaylist("Pandora Station", tracks, null, false)
        } else {
            val query = path.replace("/", " ").replace("-", " ").trim()
            searchTracks(query)
        }
    }

    private fun searchTracks(query: String): AudioPlaylist? {
        val tracks = api.search(query, props.pandora.searchLimit).mapNotNull { toYt(it) }
        if (tracks.isEmpty()) return null
        return BasicAudioPlaylist("Search: $query", tracks, null, true)
    }

    private fun toYt(track: PandoraTrack): AudioTrack? {
        val ref = buildSearchQuery(null, buildTrackQuery(track.artistName, track.name), props.pandora.providers)
        return try {
            val yt = manager.source(YoutubeAudioSourceManager::class.java) ?: return null
            when (val result = yt.loadItem(manager, AudioReference(ref, null))) {
                is AudioTrack -> result
                is AudioPlaylist -> result.tracks.firstOrNull()
                else -> null
            }
        } catch (e: Exception) {
            log.warn("[Pandora] Failed for '${track.name}': ${e.message}")
            null
        }
    }
}
