package dev.zorlink.routing

import com.google.gson.Gson
import dev.zorlink.ZorlinkProperties
import okhttp3.OkHttpClient
import okhttp3.Request
import org.slf4j.LoggerFactory
import java.util.concurrent.TimeUnit

class CdnStage(
    private val props: ZorlinkProperties.CdnProperties,
    private val http: OkHttpClient,
    private val gson: Gson
) {
    private val log = LoggerFactory.getLogger(CdnStage::class.java)

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
                .url("${props.url}/api/v1/metadata/$videoId")
                .get()
                .build()

            client.newCall(req).execute().use { resp ->
                when (resp.code) {
                    200 -> {
                        log.debug("[CDN] Hit: $videoId")
                        "${props.url}/api/v1/stream/$videoId"
                    }
                    404 -> {
                        log.debug("[CDN] Miss: $videoId")
                        null
                    }
                    else -> {
                        log.warn("[CDN] ${resp.code} for $videoId")
                        null
                    }
                }
            }
        } catch (e: Exception) {
            log.debug("[CDN] Unreachable: ${e.message}")
            null
        }
    }

    fun checkHealth(): Boolean {
        if (!props.enabled || props.url.isBlank()) return false
        return try {
            val req = Request.Builder()
                .url("${props.url}/api/v1/status")
                .get()
                .build()
            client.newCall(req).execute().use { it.isSuccessful }
        } catch (_: Exception) { false }
    }
}
