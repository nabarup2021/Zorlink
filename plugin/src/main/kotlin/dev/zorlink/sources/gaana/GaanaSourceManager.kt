package dev.zorlink.sources.gaana

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

class GaanaSourceManager(
    props: ZorlinkProperties,
    private val http: OkHttpClient,
    private val gson: Gson,
    webhook: WebhookService
) : BaseSourceManager(props, webhook) {

    private lateinit var manager: AudioPlayerManager
    private val BASE = "https://gaana.com/apiv2"

    override fun getSourceName() = ZorlinkInfo.GAANA_PREFIX

    override fun loadItem(m: AudioPlayerManager, ref: AudioReference): AudioItem? {
        manager = m
        val id = ref.identifier ?: return null
        return when {
            id.matches(ZorlinkInfo.GAANA_PATTERN) -> loadByUrl(id)
            id.startsWith("gaanasearch:") -> searchTracks(id.removePrefix("gaanasearch:"))
            else -> null
        }
    }

    private fun loadByUrl(url: String): AudioItem? {
        val (type, slug) = ZorlinkInfo.GAANA_PATTERN.find(url)?.destructured ?: return null
        return when (type) {
            "song" -> {
                val obj = fetch("$BASE/song?seokey=$slug") ?: return null
                parseSongs(obj).firstOrNull()?.let { toYt(it) }
            }
            "album" -> {
                val obj = fetch("$BASE/album?seokey=$slug") ?: return null
                val name = obj.get("name")?.asString ?: slug
                val tracks = parseSongs(obj.getAsJsonObject("song") ?: return null).mapNotNull { toYt(it) }
                if (tracks.isEmpty()) null else BasicAudioPlaylist(name, tracks, null, false)
            }
            "playlist" -> {
                val obj = fetch("$BASE/playlist?seokey=$slug") ?: return null
                val name = obj.get("playlist_title")?.asString ?: slug
                val tracks = parseSongs(obj.getAsJsonObject("playlist_detail") ?: return null).mapNotNull { toYt(it) }
                if (tracks.isEmpty()) null else BasicAudioPlaylist(name, tracks, null, false)
            }
            else -> null
        }
    }

    private fun searchTracks(query: String): AudioPlaylist? {
        val encoded = java.net.URLEncoder.encode(query, "UTF-8")
        val obj = fetch("$BASE/search?stype=MSong&sfield=all&p=1&n=${props.gaana.searchLimit}&q=$encoded") ?: return null
        val tracks = parseSongs(obj.getAsJsonObject("song") ?: return null).mapNotNull { toYt(it) }
        if (tracks.isEmpty()) return null
        return BasicAudioPlaylist("Search: $query", tracks, null, true)
    }

    private fun parseSongs(obj: JsonObject): List<GaanaSong> {
        val count = obj.get("count")?.asInt ?: return emptyList()
        val elements = obj.getAsJsonArray("elements") ?: return emptyList()
        return (0 until minOf(count, elements.size())).mapNotNull { i ->
            try {
                val el = elements[i].asJsonObject
                GaanaSong(
                    title = el.get("title")?.asString ?: return@mapNotNull null,
                    artist = el.get("artist")?.asString ?: "Unknown Artist",
                    duration = (el.get("duration")?.asString?.toLongOrNull() ?: 0L) * 1000L
                )
            } catch (_: Exception) { null }
        }
    }

    private fun toYt(song: GaanaSong): AudioTrack? {
        val ref = buildSearchQuery(null, buildTrackQuery(song.artist, song.title), props.gaana.providers)
        return try {
            val yt = manager.source(YoutubeAudioSourceManager::class.java) ?: return null
            when (val result = yt.loadItem(manager, AudioReference(ref, null))) {
                is AudioTrack -> result
                is AudioPlaylist -> result.tracks.firstOrNull()
                else -> null
            }
        } catch (e: Exception) {
            log.warn("[Gaana] Failed for '${song.title}': ${e.message}")
            null
        }
    }

    private fun fetch(url: String): JsonObject? = try {
        val req = Request.Builder()
            .url(url)
            .addHeader("User-Agent", "Mozilla/5.0")
            .addHeader("Referer", "https://gaana.com")
            .get()
            .build()
        http.newCall(req).execute().use { resp ->
            if (!resp.isSuccessful) null else gson.fromJson(resp.body!!.string(), JsonObject::class.java)
        }
    } catch (e: Exception) {
        log.error("[Gaana] HTTP error: ${e.message}")
        null
    }
}

private data class GaanaSong(val title: String, val artist: String, val duration: Long)
