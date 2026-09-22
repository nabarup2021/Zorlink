package dev.zorlink

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import dev.zorlink.routing.BackendStage
import dev.zorlink.routing.CdnStage
import dev.zorlink.routing.ThreeStageRouter
import dev.zorlink.sources.amazonmusic.AmazonMusicSourceManager
import dev.zorlink.sources.deezer.DeezerApiClient
import dev.zorlink.sources.deezer.DeezerSourceManager
import dev.zorlink.sources.gaana.GaanaSourceManager
import dev.zorlink.sources.instagram.InstagramSourceManager
import dev.zorlink.sources.jiosaavn.JioSaavnApiClient
import dev.zorlink.sources.jiosaavn.JioSaavnSourceManager
import dev.zorlink.sources.pandora.PandoraApiClient
import dev.zorlink.sources.pandora.PandoraSourceManager
import dev.zorlink.sources.spotify.SpotifyApiClient
import dev.zorlink.sources.spotify.SpotifyRecsClient
import dev.zorlink.sources.spotify.SpotifySourceManager
import dev.zorlink.webhook.WebhookService
import okhttp3.OkHttpClient
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.util.concurrent.TimeUnit

@Configuration
@EnableConfigurationProperties(ZorlinkProperties::class)
class ZorlinkConfig {

    @Bean
    @ConditionalOnMissingBean
    fun zorlinkGson(): Gson = GsonBuilder().setLenient().create()

    @Bean
    @ConditionalOnMissingBean(name = ["zorlinkHttpClient"])
    fun zorlinkHttpClient(): OkHttpClient = OkHttpClient.Builder()
        .connectTimeout(10, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(10, TimeUnit.SECONDS)
        .followRedirects(true)
        .build()

    @Bean
    fun cdnStage(props: ZorlinkProperties, http: OkHttpClient, gson: Gson) =
        CdnStage(props.cdn, http, gson)

    @Bean
    fun backendStage(props: ZorlinkProperties, http: OkHttpClient, gson: Gson) =
        BackendStage(props.backend, http, gson)

    @Bean
    fun threeStageRouter(cdn: CdnStage, backend: BackendStage, props: ZorlinkProperties) =
        ThreeStageRouter(cdn, backend, props)

    @Bean
    fun webhookService(props: ZorlinkProperties, http: OkHttpClient, gson: Gson) =
        WebhookService(props, http, gson)

    @Bean
    fun spotifyApiClient(props: ZorlinkProperties, http: OkHttpClient, gson: Gson) =
        SpotifyApiClient(props.spotify, http, gson)

    @Bean
    fun spotifyRecsClient(props: ZorlinkProperties, http: OkHttpClient, gson: Gson) =
        SpotifyRecsClient(props.spotify, http, gson)

    @Bean
    fun deezerApiClient(props: ZorlinkProperties, http: OkHttpClient, gson: Gson) =
        DeezerApiClient(props.deezer, http, gson)

    @Bean
    fun jioSaavnApiClient(props: ZorlinkProperties, http: OkHttpClient, gson: Gson) =
        JioSaavnApiClient(props.jiosaavn, http, gson)

    @Bean
    fun pandoraApiClient(props: ZorlinkProperties, http: OkHttpClient, gson: Gson) =
        PandoraApiClient(props.pandora, http, gson)

    @Bean
    fun spotifySourceManager(
        props: ZorlinkProperties,
        api: SpotifyApiClient,
        recs: SpotifyRecsClient,
        webhook: WebhookService
    ) = SpotifySourceManager(props, api, recs, webhook)

    @Bean
    fun deezerSourceManager(props: ZorlinkProperties, api: DeezerApiClient, webhook: WebhookService) =
        DeezerSourceManager(props, api, webhook)

    @Bean
    fun amazonMusicSourceManager(props: ZorlinkProperties, http: OkHttpClient, gson: Gson, webhook: WebhookService) =
        AmazonMusicSourceManager(props, http, gson, webhook)

    @Bean
    fun jioSaavnSourceManager(props: ZorlinkProperties, api: JioSaavnApiClient, webhook: WebhookService) =
        JioSaavnSourceManager(props, api, webhook)

    @Bean
    fun gaanaSourceManager(props: ZorlinkProperties, http: OkHttpClient, gson: Gson, webhook: WebhookService) =
        GaanaSourceManager(props, http, gson, webhook)

    @Bean
    fun instagramSourceManager(props: ZorlinkProperties, http: OkHttpClient, gson: Gson, webhook: WebhookService) =
        InstagramSourceManager(props, http, gson, webhook)

    @Bean
    fun pandoraSourceManager(props: ZorlinkProperties, api: PandoraApiClient, webhook: WebhookService) =
        PandoraSourceManager(props, api, webhook)
}
