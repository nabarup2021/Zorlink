package dev.zorlink

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "plugins.zorlink")
data class ZorlinkProperties(
    val webhookEnabled: Boolean = false,
    val webhookUrl: String = "",
    val webhookBotName: String = "Zorlink",
    val logTrackEvents: Boolean = true,
    val logSearchEvents: Boolean = false,
    val cdn: CdnProperties = CdnProperties(),
    val backend: BackendProperties = BackendProperties(),
    val youtube: SourceProperties = SourceProperties(),
    val youtubemusic: YoutubeMusicProperties = YoutubeMusicProperties(),
    val spotify: SpotifyProperties = SpotifyProperties(),
    val deezer: DeezerProperties = DeezerProperties(),
    val amazonmusic: AmazonMusicProperties = AmazonMusicProperties(),
    val jiosaavn: JioSaavnProperties = JioSaavnProperties(),
    val gaana: GaanaProperties = GaanaProperties(),
    val instagram: SourceProperties = SourceProperties(enabled = false),
    val pandora: PandoraProperties = PandoraProperties(),
    val soundcloud: SourceProperties = SourceProperties()
) {
    data class CdnProperties(
        val enabled: Boolean = false,
        val url: String = "",
        val timeoutMs: Long = 3000L
    )

    data class BackendProperties(
        val enabled: Boolean = false,
        val url: String = "",
        val apiKey: String = "",
        val timeoutMs: Long = 5000L
    )

    open class SourceProperties(
        val enabled: Boolean = true,
        val searchLimit: Int = 10,
        val providers: List<String> = listOf(
            "ytsearch:\"%ISRC%\"",
            "ytmsearch:%QUERY%",
            "ytsearch:%QUERY%"
        )
    )

    class YoutubeMusicProperties(
        enabled: Boolean = true,
        searchLimit: Int = 10,
        providers: List<String> = listOf("ytmsearch:\"%ISRC%\"", "ytmsearch:%QUERY%")
    ) : SourceProperties(enabled, searchLimit, providers)

    class SpotifyProperties(
        enabled: Boolean = true,
        searchLimit: Int = 10,
        providers: List<String> = listOf(
            "ytsearch:\"%ISRC%\"",
            "ytmsearch:%QUERY%",
            "ytsearch:%QUERY%"
        ),
        val clientId: String = "",
        val clientSecret: String = "",
        val countryCode: String = "IN",
        val recsApiUrl: String = ""
    ) : SourceProperties(enabled, searchLimit, providers)

    class DeezerProperties(
        enabled: Boolean = true,
        searchLimit: Int = 10,
        providers: List<String> = listOf("ytsearch:\"%ISRC%\"", "ytsearch:%QUERY%"),
        val arl: String = ""
    ) : SourceProperties(enabled, searchLimit, providers)

    class AmazonMusicProperties(
        enabled: Boolean = true,
        searchLimit: Int = 10,
        providers: List<String> = listOf("ytsearch:\"%ISRC%\"", "ytsearch:%QUERY%")
    ) : SourceProperties(enabled, searchLimit, providers)

    class JioSaavnProperties(
        enabled: Boolean = true,
        searchLimit: Int = 10,
        providers: List<String> = listOf("ytsearch:\"%ISRC%\"", "ytsearch:%QUERY%"),
        val quality: String = "320kbps"
    ) : SourceProperties(enabled, searchLimit, providers)

    class GaanaProperties(
        enabled: Boolean = true,
        searchLimit: Int = 10,
        providers: List<String> = listOf("ytsearch:%QUERY%")
    ) : SourceProperties(enabled, searchLimit, providers)

    class PandoraProperties(
        enabled: Boolean = true,
        searchLimit: Int = 6,
        providers: List<String> = listOf("ytsearch:\"%ISRC%\"", "ytsearch:%QUERY%"),
        val tokenApiUrl: String = "",
        val csrfToken: String = "",
        val preferTokenApi: Boolean = true
    ) : SourceProperties(enabled, searchLimit, providers)
}
