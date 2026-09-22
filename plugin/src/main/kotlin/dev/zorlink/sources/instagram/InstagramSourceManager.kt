package dev.zorlink.sources.instagram

import com.google.gson.Gson
import com.google.gson.JsonObject
import com.sedmelluq.discord.lavaplayer.player.AudioPlayerManager
import com.sedmelluq.discord.lavaplayer.source.http.HttpAudioSourceManager
import com.sedmelluq.discord.lavaplayer.source.youtube.YoutubeAudioSourceManager
import com.sedmelluq.discord.lavaplayer.track.*
import dev.zorlink.ZorlinkInfo
import dev.zorlink.ZorlinkProperties
import dev.zorlink.sources.BaseSourceManager
import dev.zorlink.webhook.WebhookService
import okhttp3.OkHttpClient
import okhttp3.Request

class InstagramSourceManager(
    props: ZorlinkProperties,
    private val http: OkHttpClient,
    private val gson: Gson,
    webhook: WebhookService
) : BaseSourceManager(props, webhook) {

    private lateinit var manager: AudioPlayerManager
    private val videoUrlRegex = Regex("\"video_url\":\"(https://[^\"]+)\"", RegexOption.IGNORE_CASE)

    override fun getSourceName() = ZorlinkInfo.INSTAGRAM_PREFIX

    override fun loadItem(m: AudioPlayerManager, ref: AudioReference): AudioItem? {
        manager = m
        val id = ref.identifier ?: return null
        if (!id.matches(ZorlinkInfo.INSTAGRAM_PATTERN)) return null
        return loadByUrl(id)
    }

    private fun loadByUrl(url: String): AudioTrack? {
        val shortcode = ZorlinkInfo.INSTAGRAM_PATTERN.find(url)?.groupValues?.get(1) ?: return null
        val meta = fetchOEmbed(url)
        val title = meta?.get("title")?.asString ?: "Instagram Reel"
        val author = meta?.get("author_name")?.asString ?: "Instagram"

        val videoUrl = extractVideoUrl(shortcode)
        if (videoUrl != null) {
            try {
                val httpManager = manager.source(HttpAudioSourceManager::class.java)
                val result = httpManager?.loadItem(manager, AudioReference(videoUrl, title))
                if (result is AudioTrack) return result
            } catch (_: Exception) {}
        }

        return ytFallback(title, author)
    }

    private fun fetchOEmbed(url: String): JsonObject? = try {
        val encoded = java.net.URLEncoder.encode(url, "UTF-8")
        val req = Request.Builder()
            .url("https://api.instagram.com/oembed?url=$encoded")
            .addHeader("User-Agent", "Mozilla/5.0")
            .get()
            .build()
        http.newCall(req).execute().use { resp ->
            if (!resp.isSuccessful) null else gson.fromJson(resp.body!!.string(), JsonObject::class.java)
        }
    } catch (_: Exception) { null }

    private fun extractVideoUrl(shortcode: String): String? = try {
        val req = Request.Builder()
            .url("https://www.instagram.com/reel/$shortcode/embed/")
            .addHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
            .addHeader("Accept", "text/html")
            .get()
            .build()
        http.newCall(req).execute().use { resp ->
            if (!resp.isSuccessful) null
            else videoUrlRegex.find(resp.body?.string() ?: "")?.groupValues?.get(1)?.replace("\\u0026", "&")
        }
    } catch (_: Exception) { null }

    private fun ytFallback(title: String, author: String): AudioTrack? {
        val ref = "ytsearch:${author.take(40)} ${title.take(80)} instagram"
        return try {
            val yt = manager.source(YoutubeAudioSourceManager::class.java) ?: return null
            when (val result = yt.loadItem(manager, AudioReference(ref, null))) {
                is AudioTrack -> result
                is AudioPlaylist -> result.tracks.firstOrNull()
                else -> null
            }
        } catch (e: Exception) {
            log.warn("[Instagram] YT fallback failed: ${e.message}")
            null
        }
    }
}
