package dev.zorlink.routing

import dev.zorlink.ZorlinkProperties
import org.slf4j.LoggerFactory

class ThreeStageRouter(
    private val cdn: CdnStage,
    private val backend: BackendStage,
    private val props: ZorlinkProperties
) {
    private val log = LoggerFactory.getLogger(ThreeStageRouter::class.java)

    fun resolve(videoId: String): RouteResult {
        if (props.cdn.enabled) {
            val url = cdn.resolve(videoId)
            if (url != null) {
                log.debug("[Zorlink] Stage 1 (CDN) → $videoId")
                return RouteResult.Success(url, RouteStage.CDN)
            }
        }

        if (props.backend.enabled) {
            val url = backend.resolve(videoId)
            if (url != null) {
                log.debug("[Zorlink] Stage 2 (Backend) → $videoId")
                return RouteResult.Success(url, RouteStage.BACKEND)
            }
        }

        log.debug("[Zorlink] Stage 3 (Native) → $videoId")
        return RouteResult.NativeFallback(videoId)
    }
}
