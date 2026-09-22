package dev.zorlink.sources.spotify

import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import dev.zorlink.ZorlinkProperties
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.slf4j.LoggerFactory
import java.util.Base64
import java.util.concurrent.atomic.AtomicReference
import java.util.concurrent.locks.ReentrantLock
import kotlin.concurrent.withLock

class SpotifyApiClient(
    private val props: ZorlinkProperties.SpotifyProperties,
    private val http: OkHttpClient,
    private val gson: Gson
) {
    private val log = LoggerFactory.getLogger(SpotifyApiClient::class.java)
    private val tokenRef = AtomicReference<Token?>(null)
    private val lock = ReentrantLock()

    private fun token(): String {
        tokenRef.get()?.takeIf { !it.expired() }?.let { return it.value }
        return lock.withLock {
            tokenRef.get()?.takeIf { !it.expired() }?.let { return it.value }
            val creds = Base64.getEncoder().encodeToString("${props.clientId}:${props.clientSecret}".toByteArray())
            val req = Request.Builder()
                .url("https://accounts.spotify.com/api/token")
                .addHeader("Authorization", "Basic $creds")
                .post("grant_type=client_credentials".toRequestBody("application/x-www-form-urlencoded".toMediaType()))
                .build()
            http.newCall(req).execute().use { resp ->
                check(resp.isSuccessful) { "Spotify auth failed: ${resp.code}" }
                val raw = gson.fromJson(resp.body!!.string(), RawToken::class.java)
                val t = Token(raw.accessToken, System.currentTimeMillis() + (raw.expiresIn - 60) * 1000)
                tokenRef.set(t)
                t.value
            }
        }
    }

    private fun get(url: String): String? = try {
        val req = Request.Builder().url(url).addHeader("Authorization", "Bearer ${token()}").get().build()
        http.newCall(req).execute().use { if (it.isSuccessful) it.body?.string() else null }
    } catch (e: Exception) {
        log.error("[Spotify] GET $url: ${e.message}")
        null
    }

    fun getTrack(id: String): SpotifyTrack? =
        get("https://api.spotify.com/v1/tracks/$id?market=${props.countryCode}")
            ?.let { gson.fromJson(it, SpotifyTrack::class.java) }

    fun getAlbum(id: String): SpotifyAlbum? =
        get("https://api.spotify.com/v1/albums/$id?market=${props.countryCode}")
            ?.let { gson.fromJson(it, SpotifyAlbum::class.java) }

    fun getPlaylist(id: String): SpotifyPlaylist? =
        get("https://api.spotify.com/v1/playlists/$id?market=${props.countryCode}")
            ?.let { gson.fromJson(it, SpotifyPlaylist::class.java) }

    fun getArtistTopTracks(id: String): List<SpotifyTrack> {
        val body = get("https://api.spotify.com/v1/artists/$id/top-tracks?market=${props.countryCode}") ?: return emptyList()
        return gson.fromJson(body, ArtistTopTracks::class.java)?.tracks ?: emptyList()
    }

    fun search(query: String, limit: Int = 10): List<SpotifyTrack> {
        val encoded = java.net.URLEncoder.encode(query, "UTF-8")
        val body = get("https://api.spotify.com/v1/search?q=$encoded&type=track&limit=$limit&market=${props.countryCode}") ?: return emptyList()
        return gson.fromJson(body, SearchResult::class.java)?.tracks?.items ?: emptyList()
    }

    private data class Token(val value: String, val expiresAt: Long) {
        fun expired() = System.currentTimeMillis() >= expiresAt
    }

    private data class RawToken(
        @SerializedName("access_token") val accessToken: String,
        @SerializedName("expires_in") val expiresIn: Long
    )

    private data class ArtistTopTracks(val tracks: List<SpotifyTrack>?)
    private data class SearchResult(val tracks: TracksPage?)
    private data class TracksPage(val items: List<SpotifyTrack>?)
}
