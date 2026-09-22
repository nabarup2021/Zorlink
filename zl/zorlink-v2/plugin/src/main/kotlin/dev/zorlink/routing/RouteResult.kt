package dev.zorlink.routing

sealed class RouteResult {
    data class Success(val audioUrl: String, val stage: RouteStage, val contentType: String = "audio/webm") : RouteResult()
    data class NativeFallback(val videoId: String) : RouteResult()
    data object Failed : RouteResult()
}

enum class RouteStage(val displayName: String) {
    CDN("CDN Cache"),
    BACKEND("Backend Network"),
    NATIVE("Native Lavalink")
}
