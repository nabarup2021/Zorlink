package dev.zorlink

object ZorlinkInfo {
    const val VERSION = "1.0.0"
    const val NAME = "Zorlink"
    const val AUTHOR = "ZorveX Development"

    const val SPOTIFY_PREFIX = "spotify"
    const val DEEZER_PREFIX = "deezer"
    const val AMAZON_PREFIX = "amazonmusic"
    const val JIOSAAVN_PREFIX = "jiosaavn"
    const val GAANA_PREFIX = "gaana"
    const val INSTAGRAM_PREFIX = "instagram"
    const val PANDORA_PREFIX = "pandora"

    val SPOTIFY_PATTERN = Regex("https?://open\\.spotify\\.com/(track|album|playlist|artist)/([a-zA-Z0-9]+)")
    val DEEZER_PATTERN = Regex("https?://(?:www\\.)?deezer\\.com/(?:[a-z]{2}/)?(track|album|playlist|artist)/(\\d+)")
    val AMAZON_PATTERN = Regex("https?://music\\.amazon\\.[a-z.]+/(?:albums|artists|playlists|tracks)/([^/?&]+)")
    val JIOSAAVN_PATTERN = Regex("https?://(?:www\\.)?jiosaavn\\.com/(song|album|playlist|artist)/[^/]+/([^?]+)")
    val GAANA_PATTERN = Regex("https?://(?:www\\.)?gaana\\.com/(song|album|playlist|artist)/([^?]+)")
    val INSTAGRAM_PATTERN = Regex("https?://(?:www\\.)?instagram\\.com/(?:p|reel)/([a-zA-Z0-9_-]+)")
    val PANDORA_PATTERN = Regex("https?://(?:www\\.)?pandora\\.com/(?:station|artist|album|podcast)/([^?]+)")
}
