package dev.zorlink.sources.pandora

import com.google.gson.Gson
import com.google.gson.JsonObject
import com.google.gson.annotations.SerializedName
import dev.zorlink.ZorlinkProperties
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.slf4j.LoggerFactory
import java.util.concurrent.atomic.AtomicReference
import java.util.concurrent.locks.ReentrantLock
import kotlin.concurrent.withLock

class PandoraApiClient(
    private val props: ZorlinkProperties.PandoraProperties,
    private val http: OkHttpClient,
    private val gson: Gson
) {
    private val log = LoggerFactory.getLogger(PandoraApiClient::class.java)
    private val tokenRef = AtomicReference<PandoraToken?>(null)
    private val lock = ReentrantLock()

    private fun token(): PandoraToken {
        tokenRef.get()?.takeIf { !it.expired() }?.let { return it }
        return lock.withLock {
            tokenRef.get()?.takeIf { !it.expired() }?.let { return it }
            val t = if (props.preferTokenApi && props.tokenApiUrl.isNotBlank()) fetchFromApi() else fetchNative()
            tokenRef.set(t)
            t
        }
    }

    private fun fetchFromApi(): PandoraToken {
        val req = Request.Builder()
            .url(props.tokenApiUrl)
            .addHeader("User-Agent", "Zorlink/1.0")
            .get()
            .build()
        return http.newCall(req).execute().use { resp ->
            check(resp.isSuccessful) { "Pandora token API error: ${resp.code}" }
            val obj = gson.fromJson(resp.body!!.string(), JsonObject::class.java)
            PandoraToken(
                authToken = obj.get("authToken")?.asString ?: error("Missing authToken"),
                userId = obj.get("userId")?.asString ?: "",
                partnerId = obj.get("partnerId")?.asString ?: ""
            )
        }
    }

    private fun fetchNative(): PandoraToken {
        val body = """{"username":"android","password":"AC7IBG09A3DTSYM4R41UJWL07VLN8JI7","deviceModel":"android-generic","version":"5","includeUrls":true}"""
        val req = Request.Builder()
            .url("https://tuner.pandora.com/services/json/?method=auth.partnerLogin")
            .post(body.toRequestBody("application/json".toMediaType()))
            .build()
        return http.newCall(req).execute().use { resp ->
            check(resp.isSuccessful) { "Pandora partner login failed: ${resp.code}" }
            val obj = gson.fromJson(resp.body!!.string(), JsonObject::class.java)
            val result = obj.getAsJsonObject("result")
            PandoraToken(
                authToken = result?.get("partnerAuthToken")?.asString ?: error("No partnerAuthToken"),
                userId = "",
                partnerId = result?.get("partnerId")?.asString ?: ""
            )
        }
    }

    fun search(query: String, limit: Int = 6): List<PandoraTrack> {
        return try {
            val encoded = java.net.URLEncoder.encode(query, "UTF-8")
            val req = Request.Builder()
                .url("https://www.pandora.com/api/v1/search/annotateObjects?query=$encoded&count=$limit")
                .addHeader("User-Agent", "Mozilla/5.0")
                .addHeader("X-CsrfToken", props.csrfToken)
                .get()
                .build()
            http.newCall(req).execute().use { resp ->
                if (!resp.isSuccessful) return emptyList()
                val obj = gson.fromJson(resp.body!!.string(), JsonObject::class.java)
                obj.getAsJsonObject("annotations")?.entrySet()
                    ?.mapNotNull { (_, v) ->
                        val t = v.asJsonObject
                        if (t.get("@type")?.asString == "TR") parseTrack(t) else null
                    }
                    ?.take(limit) ?: emptyList()
            }
        } catch (e: Exception) {
            log.error("[Pandora] Search failed: ${e.message}")
            emptyList()
        }
    }

    fun getStationTracks(stationToken: String): List<PandoraTrack> {
        return try {
            val req = Request.Builder()
                .url("https://www.pandora.com/api/v1/station/getStationFromToken?stationToken=$stationToken&count=${props.searchLimit}")
                .addHeader("User-Agent", "Mozilla/5.0")
                .get()
                .build()
            http.newCall(req).execute().use { resp ->
                if (!resp.isSuccessful) return emptyList()
                val obj = gson.fromJson(resp.body!!.string(), JsonObject::class.java)
                obj.getAsJsonArray("seeds")?.mapNotNull {
                    parseTrack(it.asJsonObject.getAsJsonObject("track") ?: return@mapNotNull null)
                } ?: emptyList()
            }
        } catch (e: Exception) {
            log.error("[Pandora] getStationTracks failed: ${e.message}")
            emptyList()
        }
    }

    private fun parseTrack(obj: JsonObject): PandoraTrack? = try {
        PandoraTrack(
            pandoraId = obj.get("pandoraId")?.asString ?: return null,
            name = obj.get("name")?.asString ?: return null,
            artistName = obj.get("artistName")?.asString ?: "Unknown Artist",
            albumName = obj.get("albumName")?.asString,
            duration = (obj.get("duration")?.asLong ?: 0L) * 1000L
        )
    } catch (_: Exception) { null }
}

data class PandoraToken(val authToken: String, val userId: String, val partnerId: String) {
    private val fetchedAt = System.currentTimeMillis()
    fun expired() = System.currentTimeMillis() > fetchedAt + 3_600_000L
}

data class PandoraTrack(
    val pandoraId: String,
    val name: String,
    val artistName: String,
    val albumName: String?,
    val duration: Long
)
