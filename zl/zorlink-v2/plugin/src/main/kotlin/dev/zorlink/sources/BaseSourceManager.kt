package dev.zorlink.sources

import com.sedmelluq.discord.lavaplayer.source.AudioSourceManager
import com.sedmelluq.discord.lavaplayer.track.AudioTrack
import com.sedmelluq.discord.lavaplayer.track.AudioTrackInfo
import dev.zorlink.ZorlinkProperties
import dev.zorlink.webhook.WebhookService
import org.slf4j.LoggerFactory
import java.io.DataInput
import java.io.DataOutput

abstract class BaseSourceManager(
    protected val props: ZorlinkProperties,
    protected val webhook: WebhookService
) : AudioSourceManager {

    protected val log = LoggerFactory.getLogger(this::class.java)

    protected fun buildSearchQuery(isrc: String?, query: String, providers: List<String>): String {
        val provider = if (!isrc.isNullOrBlank()) {
            providers.firstOrNull { it.contains("%ISRC%") }
                ?: providers.firstOrNull()
                ?: "ytsearch:$query"
        } else {
            providers.firstOrNull { !it.contains("%ISRC%") }
                ?: providers.firstOrNull()
                ?: "ytsearch:$query"
        }
        return provider.replace("%ISRC%", isrc ?: "").replace("%QUERY%", query)
    }

    protected fun buildTrackQuery(artist: String, title: String) = "$artist - $title"

    override fun isTrackEncodable(track: AudioTrack) = false

    override fun encodeTrack(track: AudioTrack, output: DataOutput) =
        throw UnsupportedOperationException("${sourceName} tracks use native YouTube encoding")

    override fun decodeTrack(trackInfo: AudioTrackInfo, input: DataInput): AudioTrack =
        throw UnsupportedOperationException("${sourceName} tracks use native YouTube decoding")

    override fun shutdown() {}
}
