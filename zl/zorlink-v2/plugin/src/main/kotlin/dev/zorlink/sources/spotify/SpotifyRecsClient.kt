package dev.zorlink.sources.spotify

import com.google.gson.Gson
import com.google.gson.JsonObject
import dev.zorlink.ZorlinkProperties
import okhttp3.OkHttpClient
import okhttp3.Request
import org.slf4j.LoggerFactory

class SpotifyRecsClient(
    private val props: ZorlinkProperties.SpotifyProperties,
    private val http: OkHttpClient,
    private val gson: Gson
) {
    private val log = LoggerFactory.getLogger(SpotifyRecsClient::class.java)

    fun getRecommendations(
        seedTrackIds: List<String>,
        seedGenres: List<String> = emptyList(),
        limit: Int = 10,
        market: String = props.countryCode,
        minEnergy: Float? = null,
        maxEnergy: Float? = null,
        minValence: Float? = null,
        maxValence: Float? = null,
        blacklistArtists: List<String> = emptyList()
    ): List<RecsTrack> {
        if (props.recsApiUrl.isBlank()) return emptyList()
        return try {
            val params = buildString {
                append("endpoint=recommendations")
                if (seedTrackIds.isNotEmpty()) append("&seed_tracks=${seedTrackIds.take(5).joinToString(",")}")
                if (seedGenres.isNotEmpty()) append("&seed_genres=${seedGenres.take(5).joinToString(",")}")
                append("&limit=$limit")
                append("&market=$market")
                if (minEnergy != null) append("&min_energy=$minEnergy")
                if (maxEnergy != null) append("&max_energy=$maxEnergy")
                if (minValence != null) append("&min_valence=$minValence")
                if (maxValence != null) append("&max_valence=$maxValence")
                if (blacklistArtists.isNotEmpty()) append("&blacklist_artists=${blacklistArtists.joinToString(",")}")
            }

            val req = Request.Builder()
                .url("${props.recsApiUrl}/api/recommendations?$params")
                .addHeader("User-Agent", "Zorlink/1.0")
                .get()
                .build()

            http.newCall(req).execute().use { resp ->
                if (!resp.isSuccessful) return emptyList()
                val body = resp.body?.string() ?: return emptyList()
                val obj = gson.fromJson(body, JsonObject::class.java)
                val tracks = obj.getAsJsonObject("data")?.getAsJsonArray("tracks") ?: return emptyList()

                tracks.mapNotNull { el ->
                    try {
                        val info = el.asJsonObject.getAsJsonObject("info") ?: return@mapNotNull null
                        RecsTrack(
                            identifier = info.get("identifier")?.asString ?: return@mapNotNull null,
                            title = info.get("title")?.asString ?: "Unknown",
                            author = info.get("author")?.asString ?: "Unknown Artist",
                            uri = info.get("uri")?.asString ?: "",
                            isrc = info.get("isrc")?.asString,
                            length = info.get("length")?.asLong ?: 0L,
                            artworkUrl = info.get("artworkUrl")?.asString
                        )
                    } catch (_: Exception) { null }
                }
            }
        } catch (e: Exception) {
            log.error("[SpotifyRecs] Failed: ${e.message}")
            emptyList()
        }
    }

    fun checkHealth(): Boolean {
        if (props.recsApiUrl.isBlank()) return false
        return try {
            val req = Request.Builder()
                .url("${props.recsApiUrl}/api/health")
                .get()
                .build()
            http.newCall(req).execute().use { it.isSuccessful }
        } catch (_: Exception) { false }
    }
}

data class RecsTrack(
    val identifier: String,
    val title: String,
    val author: String,
    val uri: String,
    val isrc: String?,
    val length: Long,
    val artworkUrl: String?
)
