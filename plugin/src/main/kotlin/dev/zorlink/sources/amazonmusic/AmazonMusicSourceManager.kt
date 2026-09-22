package dev.zorlink.sources.amazonmusic

import com.google.gson.Gson
import com.google.gson.JsonObject
import com.sedmelluq.discord.lavaplayer.player.AudioPlayerManager
import com.sedmelluq.discord.lavaplayer.source.youtube.YoutubeAudioSourceManager
import com.sedmelluq.discord.lavaplayer.track.*
import dev.zorlink.ZorlinkInfo
import dev.zorlink.ZorlinkProperties
import dev.zorlink.sources.BaseSourceManager
import dev.zorlink.webhook.WebhookService
import okhttp3.OkHttpClient
import okhttp3.Request

class AmazonMusicSourceManager(
    props: ZorlinkProperties,
    private val http: OkHttpClient,
    private val gson: Gson,
    webhook: WebhookService
) : BaseSourceManager(props, webhook) {

    private lateinit var manager: AudioPlayerManager

    private val jsonLdRegex = Regex(
        "<script type=\"application/ld\\+json\">(.*?)</script>",
        setOf(RegexOption.DOT_MATCHES_ALL, RegexOption.IGNORE_CASE)
    )

    override fun getSourceName() = ZorlinkInfo.AMAZON_PREFIX

    override fun loadItem(m: AudioPlayerManager, ref: AudioReference): AudioItem? {
        manager = m
        val id = ref.identifier ?: return null
        return when {
            id.matches(ZorlinkInfo.AMAZON_PATTERN) -> loadByUrl(id)
            id.startsWith("amsearch:") -> ytSearch("ytsearch:${id.removePrefix("amsearch:")}")
            else -> null
        }
    }

    private fun loadByUrl(url: String): AudioTrack? {
        val html = fetchPage(url) ?: return null
        val track = extractJsonLd(html)
        if (track != null) {
            val query = buildTrackQuery(track.artist, track.title)
            val ref = buildSearchQuery(track.isrc, query, props.amazonmusic.providers)
            return ytSearch(ref) as? AudioTrack
        }
        val rawTitle = Regex("<title>(.*?)</title>").find(html)?.groupValues?.get(1)
            ?.replace(" | Amazon Music", "")?.trim() ?: return null
        return ytSearch("ytsearch:$rawTitle") as? AudioTrack
    }

    private fun extractJsonLd(html: String): AmazonTrack? {
        val json = jsonLdRegex.find(html)?.groupValues?.get(1) ?: return null
        return try {
            val obj = gson.fromJson(json, JsonObject::class.java)
            if (obj.get("@type")?.asString != "MusicRecording") return null
            AmazonTrack(
                title = obj.get("name")?.asString ?: return null,
                artist = obj.getAsJsonObject("byArtist")?.get("name")?.asString ?: "Unknown Artist",
                isrc = obj.getAsJsonObject("identifier")?.get("value")?.asString
            )
        } catch (_: Exception) { null }
    }

    private fun ytSearch(ref: String): AudioItem? {
        return try {
            val yt = manager.source(YoutubeAudioSourceManager::class.java) ?: return null
            when (val result = yt.loadItem(manager, AudioReference(ref, null))) {
                is AudioTrack -> result
                is AudioPlaylist -> if (result.isSearchResult) result.tracks.firstOrNull() else result
                else -> null
            }
        } catch (e: Exception) {
            log.warn("[Amazon] YT search failed: ${e.message}")
            null
        }
    }

    private fun fetchPage(url: String): String? = try {
        val req = Request.Builder()
            .url(url)
            .addHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
            .addHeader("Accept-Language", "en-US,en;q=0.9")
            .get()
            .build()
        http.newCall(req).execute().use { resp -> if (resp.isSuccessful) resp.body?.string() else null }
    } catch (e: Exception) {
        log.error("[Amazon] Page fetch failed: ${e.message}")
        null
    }
}

private data class AmazonTrack(val title: String, val artist: String, val isrc: String?)
