package dev.zorlink.webhook

import com.google.gson.Gson
import dev.zorlink.ZorlinkProperties
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.slf4j.LoggerFactory

class WebhookService(
    private val props: ZorlinkProperties,
    private val http: OkHttpClient,
    private val gson: Gson
) {
    private val log = LoggerFactory.getLogger(WebhookService::class.java)

    fun sendEmbed(title: String, description: String, color: Int = 0x5865F2, fields: List<EmbedField> = emptyList()) {
        if (!props.webhookEnabled || props.webhookUrl.isBlank()) return
        fire {
            mapOf(
                "username" to props.webhookBotName,
                "embeds" to listOf(buildMap {
                    put("title", title)
                    put("description", description)
                    put("color", color)
                    put("timestamp", java.time.Instant.now().toString())
                    if (fields.isNotEmpty()) put("fields", fields.map {
                        mapOf("name" to it.name, "value" to it.value, "inline" to it.inline)
                    })
                    put("footer", mapOf("text" to "Zorlink v1.0.0"))
                })
            )
        }
    }

    fun sendTrackEvent(source: String, track: String, count: Int = 1) {
        if (!props.logTrackEvents) return
        sendEmbed(
            title = "${emoji(source)} Track Loaded",
            description = "**Source:** $source\n**Track:** `$track`${if (count > 1) "\n**Count:** $count tracks" else ""}",
            color = 0x3498DB
        )
    }

    fun sendSearchEvent(source: String, query: String, resultCount: Int) {
        if (!props.logSearchEvents) return
        sendEmbed(
            title = "${emoji(source)} Search",
            description = "**Source:** $source\n**Query:** `$query`\n**Results:** $resultCount",
            color = 0x9B59B6
        )
    }

    private fun fire(payload: () -> Map<String, Any>) {
        Thread {
            try {
                val body = gson.toJson(payload()).toRequestBody("application/json".toMediaType())
                val req = Request.Builder().url(props.webhookUrl).post(body).build()
                http.newCall(req).execute().use { resp ->
                    if (!resp.isSuccessful) log.warn("[Webhook] ${resp.code}")
                }
            } catch (e: Exception) {
                log.warn("[Webhook] ${e.message}")
            }
        }.also { it.isDaemon = true; it.name = "zorlink-webhook"; it.start() }
    }

    private fun emoji(source: String) = when (source.lowercase()) {
        "spotify" -> "🟢"
        "deezer" -> "🟣"
        "youtube", "youtubemusic" -> "🔴"
        "jiosaavn" -> "🔵"
        "gaana" -> "🟠"
        "amazon music" -> "🔷"
        "instagram" -> "🟤"
        "pandora" -> "🎵"
        "soundcloud" -> "🟡"
        else -> "🎶"
    }

    data class EmbedField(val name: String, val value: String, val inline: Boolean = false)
}
