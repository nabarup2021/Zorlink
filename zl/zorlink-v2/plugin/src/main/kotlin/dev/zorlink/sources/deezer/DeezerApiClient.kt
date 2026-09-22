package dev.zorlink.sources.deezer

import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import dev.zorlink.ZorlinkProperties
import okhttp3.OkHttpClient
import okhttp3.Request
import org.slf4j.LoggerFactory

class DeezerApiClient(
    private val props: ZorlinkProperties.DeezerProperties,
    private val http: OkHttpClient,
    private val gson: Gson
) {
    private val log = LoggerFactory.getLogger(DeezerApiClient::class.java)

    fun getTrack(id: String): DeezerTrack? = get("https://api.deezer.com/track/$id")

    fun getAlbum(id: String): DeezerAlbum? = get("https://api.deezer.com/album/$id")

    fun getPlaylist(id: String): DeezerPlaylist? = get("https://api.deezer.com/playlist/$id")

    fun getArtistTopTracks(id: String, limit: Int = 25): DeezerArtistTracklist? =
        get("https://api.deezer.com/artist/$id/top?limit=$limit")

    fun search(query: String, limit: Int = 10): List<DeezerTrack> {
        val encoded = java.net.URLEncoder.encode(query, "UTF-8")
        val result: DeezerSearchResult? = get("https://api.deezer.com/search?q=$encoded&limit=$limit")
        return result?.data ?: emptyList()
    }

    private inline fun <reified T> get(url: String): T? = try {
        val req = Request.Builder().url(url).get().build()
        http.newCall(req).execute().use { resp ->
            if (!resp.isSuccessful) null else gson.fromJson(resp.body!!.string(), T::class.java)
        }
    } catch (e: Exception) {
        log.error("[Deezer] GET $url: ${e.message}")
        null
    }
}

data class DeezerTrack(
    val id: Long,
    val title: String,
    val duration: Long,
    @SerializedName("isrc") val isrc: String?,
    val artist: DeezerArtist,
    val album: DeezerAlbumSimple?
)

data class DeezerArtist(val id: Long, val name: String)

data class DeezerAlbumSimple(
    val id: Long,
    val title: String,
    @SerializedName("cover_xl") val coverXl: String?
)

data class DeezerAlbum(
    val id: Long,
    val title: String,
    val artist: DeezerArtist,
    val tracks: DeezerTracklist?
)

data class DeezerPlaylist(
    val id: Long,
    val title: String,
    val tracks: DeezerTracklist?
)

data class DeezerTracklist(val data: List<DeezerTrack>?)
data class DeezerArtistTracklist(val data: List<DeezerTrack>?)
data class DeezerSearchResult(val data: List<DeezerTrack>?, val total: Int?)
