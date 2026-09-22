package dev.zorlink.routing

import com.google.gson.Gson
import dev.zorlink.ZorlinkInfo
import dev.zorlink.ZorlinkProperties
import okhttp3.OkHttpClient
import okhttp3.Request
import org.slf4j.LoggerFactory
import java.util.concurrent.TimeUnit

class BackendStage(
    private val props: ZorlinkProperties.BackendProperties,
    private val http: OkHttpClient,
    private val gson: Gson
) {
    private val log = LoggerFactory.getLogger(BackendStage::class.java)

    private val client by lazy {
        http.newBuilder()
            .connectTimeout(props.timeoutMs, TimeUnit.MILLISECONDS)
            .readTimeout(props.timeoutMs, TimeUnit.MILLISECONDS)
            .build()
    }

    fun resolve(videoId: String): String? {
        if (!props.enabled || props.url.isBlank()) return null
        return try {
            val req = Request.Builder()
                .url("${props.url}/resolve/$videoId")
                .addHeader("Authorization", "Bearer ${props.apiKey}")
                .addHeader("X-Zorlink-Version", ZorlinkInfo.VERSION)
                .get()
                .build()

            client.newCall(req).execute().use { resp ->
                if (!resp.isSuccessful) {
                    log.warn("[Backend] ${resp.code} for $videoId")
                    return null
                }
                val body = resp.body?.string() ?: return null
                val parsed = gson.fromJson(body, BackendResponse::class.java)
                if (parsed?.url?.isNotBlank() == true) {
                    log.debug("[Backend] Resolved: $videoId")
                    parsed.url
                } else null
            }
        } catch (e: Exception) {
            log.debug("[Backend] Unreachable: ${e.message}")
            null
        }
    }

    private data class BackendResponse(val url: String?, val contentType: String?, val expiresAt: Long?)
}
