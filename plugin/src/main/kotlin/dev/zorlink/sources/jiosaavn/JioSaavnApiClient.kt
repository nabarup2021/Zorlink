package dev.zorlink.sources.jiosaavn

import com.google.gson.Gson
import com.google.gson.JsonObject
import dev.zorlink.ZorlinkProperties
import okhttp3.OkHttpClient
import okhttp3.Request
import org.slf4j.LoggerFactory
import java.util.Base64
import javax.crypto.Cipher
import javax.crypto.SecretKeyFactory
import javax.crypto.spec.DESKeySpec

class JioSaavnApiClient(
    private val props: ZorlinkProperties.JioSaavnProperties,
    private val http: OkHttpClient,
    private val gson: Gson
) {
    private val log = LoggerFactory.getLogger(JioSaavnApiClient::class.java)
    private val BASE = "https://www.jiosaavn.com/api.php"

    fun searchSongs(query: String, limit: Int = 10): List<JioSaavnSong> {
        val encoded = java.net.URLEncoder.encode(query, "UTF-8")
        val url = "$BASE?p=1&q=$encoded&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=$limit&__call=search.getResults"
        return try {
            val obj = fetchJson(url) ?: return emptyList()
            parseSongMap(obj.getAsJsonObject("results"))
        } catch (e: Exception) {
            log.error("[JioSaavn] searchSongs: ${e.message}")
            emptyList()
        }
    }

    fun getSongById(songId: String): JioSaavnSong? {
        val url = "$BASE?__call=song.getDetails&cc=in&_marker=0&_format=json&pids=$songId"
        return try {
            val obj = fetchJson(url) ?: return null
            parseSong(obj.getAsJsonObject(songId) ?: return null)
        } catch (e: Exception) {
            log.error("[JioSaavn] getSongById: ${e.message}")
            null
        }
    }

    fun getAlbumSongs(albumId: String): List<JioSaavnSong> {
        val url = "$BASE?__call=content.getAlbumDetails&_format=json&cc=in&_marker=0&albumid=$albumId"
        return try {
            val obj = fetchJson(url) ?: return emptyList()
            obj.getAsJsonArray("list")?.mapNotNull { parseSong(it.asJsonObject) } ?: emptyList()
        } catch (e: Exception) {
            log.error("[JioSaavn] getAlbumSongs: ${e.message}")
            emptyList()
        }
    }

    fun getPlaylistSongs(playlistId: String): Pair<String, List<JioSaavnSong>> {
        val url = "$BASE?__call=playlist.getDetails&_format=json&cc=in&_marker=0&listid=$playlistId"
        return try {
            val obj = fetchJson(url) ?: return "Playlist" to emptyList()
            val name = obj.get("listname")?.asString ?: "Playlist"
            val songs = obj.getAsJsonArray("list")?.mapNotNull { parseSong(it.asJsonObject) } ?: emptyList()
            name to songs
        } catch (e: Exception) {
            log.error("[JioSaavn] getPlaylistSongs: ${e.message}")
            "Playlist" to emptyList()
        }
    }

    fun decryptUrl(encUrl: String): String? {
        return try {
            val key = "38346591".toByteArray()
            val cipher = Cipher.getInstance("DES/ECB/PKCS5Padding")
            cipher.init(Cipher.DECRYPT_MODE, SecretKeyFactory.getInstance("DES").generateSecret(DESKeySpec(key)))
            String(cipher.doFinal(Base64.getDecoder().decode(encUrl)))
                .replace("_96.mp4", "_${props.quality.replace("kbps", "")}.mp4")
                .replace("http://", "https://")
        } catch (e: Exception) {
            log.warn("[JioSaavn] URL decrypt failed: ${e.message}")
            null
        }
    }

    private fun fetchJson(url: String): JsonObject? = try {
        val req = Request.Builder()
            .url(url)
            .addHeader("User-Agent", "Mozilla/5.0")
            .addHeader("Accept", "application/json")
            .get()
            .build()
        http.newCall(req).execute().use { resp ->
            if (!resp.isSuccessful) null else gson.fromJson(resp.body!!.string(), JsonObject::class.java)
        }
    } catch (e: Exception) {
        log.error("[JioSaavn] HTTP: ${e.message}")
        null
    }

    private fun parseSongMap(obj: JsonObject?): List<JioSaavnSong> =
        obj?.entrySet()?.mapNotNull { parseSong(it.value.asJsonObject) } ?: emptyList()

    private fun parseSong(obj: JsonObject): JioSaavnSong? = try {
        val encUrl = obj.get("encrypted_media_url")?.asString ?: return null
        JioSaavnSong(
            id = obj.get("id")?.asString ?: return null,
            title = obj.get("song")?.asString ?: obj.get("title")?.asString ?: "Unknown",
            artist = obj.get("primary_artists")?.asString ?: obj.get("singers")?.asString ?: "Unknown Artist",
            album = obj.get("album")?.asString,
            image = obj.get("image")?.asString?.replace("150x150", "500x500"),
            duration = (obj.get("duration")?.asString?.toLongOrNull() ?: 0L) * 1000L,
            encryptedMediaUrl = encUrl,
            mediaUrl = decryptUrl(encUrl)
        )
    } catch (_: Exception) { null }
}

data class JioSaavnSong(
    val id: String,
    val title: String,
    val artist: String,
    val album: String?,
    val image: String?,
    val duration: Long,
    val encryptedMediaUrl: String,
    val mediaUrl: String?
)
