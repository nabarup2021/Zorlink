package dev.zorlink

import com.sedmelluq.discord.lavaplayer.player.AudioPlayerManager
import dev.arbjerg.lavalink.api.IPlugin
import dev.zorlink.routing.CdnStage
import dev.zorlink.sources.amazonmusic.AmazonMusicSourceManager
import dev.zorlink.sources.deezer.DeezerSourceManager
import dev.zorlink.sources.gaana.GaanaSourceManager
import dev.zorlink.sources.instagram.InstagramSourceManager
import dev.zorlink.sources.jiosaavn.JioSaavnSourceManager
import dev.zorlink.sources.pandora.PandoraSourceManager
import dev.zorlink.sources.spotify.SpotifyRecsClient
import dev.zorlink.sources.spotify.SpotifySourceManager
import dev.zorlink.webhook.WebhookService
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component

@Component
class ZorlinkPlugin(
    private val audioPlayerManager: AudioPlayerManager,
    private val properties: ZorlinkProperties,
    private val webhookService: WebhookService,
    private val cdnStage: CdnStage,
    private val spotifyRecsClient: SpotifyRecsClient,
    private val spotifySourceManager: SpotifySourceManager,
    private val deezerSourceManager: DeezerSourceManager,
    private val amazonMusicSourceManager: AmazonMusicSourceManager,
    private val jioSaavnSourceManager: JioSaavnSourceManager,
    private val gaanaSourceManager: GaanaSourceManager,
    private val instagramSourceManager: InstagramSourceManager,
    private val pandoraSourceManager: PandoraSourceManager
) : IPlugin {

    private val log = LoggerFactory.getLogger(ZorlinkPlugin::class.java)

    override fun onLoad() {
        log.info("╔═══════════════════════════════════════╗")
        log.info("║     Zorlink v${ZorlinkInfo.VERSION} by ZorveX Dev     ║")
        log.info("╚═══════════════════════════════════════╝")

        val registered = mutableListOf<String>()

        if (properties.spotify.enabled && properties.spotify.clientId.isNotBlank()) {
            audioPlayerManager.registerSourceManager(spotifySourceManager)
            registered += "Spotify"
        } else if (properties.spotify.enabled) {
            log.warn("[Zorlink] Spotify skipped — clientId/clientSecret missing")
        }

        if (properties.deezer.enabled) {
            audioPlayerManager.registerSourceManager(deezerSourceManager)
            registered += "Deezer"
        }

        if (properties.amazonmusic.enabled) {
            audioPlayerManager.registerSourceManager(amazonMusicSourceManager)
            registered += "Amazon Music"
        }

        if (properties.jiosaavn.enabled) {
            audioPlayerManager.registerSourceManager(jioSaavnSourceManager)
            registered += "JioSaavn"
        }

        if (properties.gaana.enabled) {
            audioPlayerManager.registerSourceManager(gaanaSourceManager)
            registered += "Gaana"
        }

        if (properties.instagram.enabled) {
            audioPlayerManager.registerSourceManager(instagramSourceManager)
            registered += "Instagram"
        }

        if (properties.pandora.enabled) {
            audioPlayerManager.registerSourceManager(pandoraSourceManager)
            registered += "Pandora"
        }

        val cdnOnline = if (properties.cdn.enabled) cdnStage.checkHealth() else false
        val recsOnline = properties.spotify.recsApiUrl.isNotBlank() && spotifyRecsClient.checkHealth()

        log.info("[Zorlink] CDN: ${statusLabel(cdnOnline, properties.cdn.enabled)}  " +
                "Backend: ${statusLabel(properties.backend.enabled, properties.backend.enabled)}  " +
                "Native: ON")
        log.info("[Zorlink] Spotify Recs API: ${statusLabel(recsOnline, properties.spotify.recsApiUrl.isNotBlank())}")
        log.info("[Zorlink] Sources: ${registered.joinToString(", ")}")

        if (properties.webhookEnabled && properties.webhookUrl.isNotBlank()) {
            webhookService.sendEmbed(
                title = "✅ Zorlink Online",
                description = "**Sources:** ${registered.joinToString(", ")}\n\n" +
                        "**CDN (YTCDN):** ${if (cdnOnline) "🟢 Online" else if (properties.cdn.enabled) "🔴 Offline" else "⚫ Disabled"}\n" +
                        "**Spotify Recs:** ${if (recsOnline) "🟢 Online" else if (properties.spotify.recsApiUrl.isNotBlank()) "🔴 Offline" else "⚫ Disabled"}\n" +
                        "**Backend:** ${if (properties.backend.enabled) "🟢 Enabled" else "⚫ Disabled"}",
                color = 0x57F287,
                fields = listOf(
                    WebhookService.EmbedField("3-Stage Routing", "Stage 1: CDN → Stage 2: Backend → Stage 3: Native", false)
                )
            )
        }
    }

    override fun onUnload() {
        log.info("[Zorlink] Unloaded.")
        if (properties.webhookEnabled && properties.webhookUrl.isNotBlank()) {
            webhookService.sendEmbed("🔴 Zorlink Offline", "Plugin unloaded.", 0xED4245)
        }
    }

    private fun statusLabel(online: Boolean, enabled: Boolean) = when {
        !enabled -> "OFF"
        online -> "ON"
        else -> "ERR"
    }
}
