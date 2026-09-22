package dev.zorlink.sources.spotify

import com.google.gson.annotations.SerializedName

data class SpotifyTrack(
    val id: String,
    val name: String,
    val artists: List<SpotifyArtist>,
    val album: SpotifyAlbumSimple?,
    @SerializedName("duration_ms") val durationMs: Long,
    @SerializedName("external_ids") val externalIds: ExternalIds?,
    val uri: String
) {
    val artistNames get() = artists.joinToString(", ") { it.name }
    val isrc get() = externalIds?.isrc
    val thumbnailUrl get() = album?.images?.firstOrNull()?.url
}

data class SpotifyArtist(val id: String, val name: String)

data class SpotifyAlbumSimple(
    val id: String,
    val name: String,
    val images: List<SpotifyImage>
)

data class SpotifyAlbum(
    val id: String,
    val name: String,
    val artists: List<SpotifyArtist>,
    val images: List<SpotifyImage>,
    val tracks: SpotifyPagingTracks?,
    @SerializedName("total_tracks") val totalTracks: Int
)

data class SpotifyPlaylist(
    val id: String,
    val name: String,
    val description: String?,
    val images: List<SpotifyImage>,
    val tracks: SpotifyPagingPlaylistTracks?
)

data class SpotifyPagingTracks(val items: List<SpotifyTrack>?, val total: Int)
data class SpotifyPagingPlaylistTracks(val items: List<SpotifyPlaylistTrackItem>?, val total: Int)
data class SpotifyPlaylistTrackItem(val track: SpotifyTrack?)
data class SpotifyImage(val url: String, val width: Int?, val height: Int?)
data class ExternalIds(val isrc: String?, val ean: String?, val upc: String?)
