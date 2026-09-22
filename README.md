<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=6C63FF&height=200&section=header&text=Zorlink&fontSize=80&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Multi-Source%20Lavalink%20Plugin%20by%20ZorveX%20Development&descAlignY=60&descAlign=50" width="100%"/>

[![](https://img.shields.io/badge/Java-17+-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://java.com)
[![](https://img.shields.io/badge/Kotlin-1.9-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)](https://kotlinlang.org)
[![](https://img.shields.io/badge/Lavalink-4.0+-7289DA?style=for-the-badge)](https://github.com/lavalink-devs/Lavalink)
[![](https://img.shields.io/badge/License-Apache_2.0-764ba2?style=for-the-badge)](LICENSE)
[![](https://img.shields.io/badge/Sources-9-667eea?style=for-the-badge)](#sources)
[![](https://img.shields.io/badge/CDN-3--Stage-00C853?style=for-the-badge)](#3-stage-cdn-routing)

**Zorlink** is a Lavalink v4 plugin that adds 9 audio sources and a fully autonomous 3-stage CDN routing system for YouTube — eliminating rate limits and ensuring zero-downtime playback.

[Sources](#sources) • [Setup](#setup) • [Configuration](#configuration) • [Search Prefixes](#search-prefixes) • [CDN Routing](#3-stage-cdn-routing) • [Credits](#credits)

</div>

---

## Sources

| Source | Tracks | Albums | Playlists | Artists | Playback |
|---|:---:|:---:|:---:|:---:|---|
| YouTube | ✅ | ✅ | ✅ | — | Native |
| YouTube Music | ✅ | ✅ | ✅ | — | Native |
| Spotify | ✅ | ✅ | ✅ | ✅ | Mirror (ISRC → YT) |
| Deezer | ✅ | ✅ | ✅ | ✅ | Mirror (ISRC → YT) |
| JioSaavn | ✅ | ✅ | ✅ | — | Native CDN + YT fallback |
| Gaana | ✅ | ✅ | ✅ | ✅ | Mirror (YT) |
| Amazon Music | ✅ | ✅ | ✅ | ✅ | Mirror (ISRC → YT) |
| Instagram | ✅ | — | — | — | Native embed + YT fallback |
| Pandora | ✅ | ✅ | ✅ | ✅ | Mirror (YT) |
| SoundCloud | ✅ | ✅ | ✅ | — | Native (Lavalink built-in) |

> **Mirror** = metadata fetched from the source, audio resolved from YouTube using ISRC first, then title search.

---

## Features

- **3-Stage CDN Routing** — Private CDN cache → Backend proxy → Native YouTube, fully automatic
- **ISRC-First Resolution** — Uses ISRC codes for precise YouTube matching on all mirror sources
- **JioSaavn Native Stream** — DES-decrypted CDN URLs at up to 320kbps before YT fallback
- **Spotify Recommendations** — Autoplay via hosted Recommendations API (`sprecsearch:`)
- **Discord Webhooks** — Real-time deploy, track, and search event notifications
- **Retry on Error** — All sources retry gracefully instead of hard-failing
- **Zero Extra Auth** — Deezer, Gaana, Amazon Music, Pandora need no credentials

---

## Setup

### 1. Install via application.yml (recommended)

```yaml
lavalink:
  plugins:
    - dependency: "com.github.zorvexdev.zorlink:zorlink:VERSION"
      repository: https://jitpack.io
```

### 2. Manual install

Download the latest JAR from [Releases](../../releases) and drop it into your Lavalink `plugins/` folder.

```
lavalink/
└── plugins/
    └── zorlink-1.0.0.jar
```

Restart Lavalink.

---

## Configuration

> [!WARNING]
> The `plugins` block must be at the **root** of your `application.yml`.

```yaml
plugins:
  zorlink:
    webhookEnabled: true
    webhookUrl: "https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN"
    webhookBotName: "Zorlink"
    logTrackEvents: true
    logSearchEvents: false

    cdn:
      enabled: true
      url: "https://zorlink-ytcdn.vercel.app"
      timeoutMs: 4000

    backend:
      enabled: false
      url: ""
      apiKey: ""

    spotify:
      enabled: true
      clientId: "YOUR_CLIENT_ID"
      clientSecret: "YOUR_CLIENT_SECRET"
      countryCode: "IN"
      searchLimit: 10
      recsApiUrl: "https://zorlink-spotify.vercel.app"

    deezer:
      enabled: true
      searchLimit: 10

    amazonmusic:
      enabled: true
      searchLimit: 10

    jiosaavn:
      enabled: true
      quality: "320kbps"
      searchLimit: 10

    gaana:
      enabled: true
      searchLimit: 10

    instagram:
      enabled: false

    pandora:
      enabled: true
      tokenApiUrl: "https://get.1lucas1apk.fun/pandora/gettoken"
      preferTokenApi: true
      searchLimit: 6

    soundcloud:
      enabled: true
```

---

## Search Prefixes

### Spotify
```
spsearch:Arijit Singh Tum Hi Ho
sprecsearch:4cOdK2wGhE3fKFKSR3dH9n
https://open.spotify.com/track/4cOdK2wGhE3fKFKSR3dH9n
https://open.spotify.com/album/...
https://open.spotify.com/playlist/...
https://open.spotify.com/artist/...
```

### Deezer
```
dzsearch:Kesariya
https://www.deezer.com/track/...
https://www.deezer.com/album/...
https://www.deezer.com/playlist/...
```

### JioSaavn
```
jiosearch:Raataan Lambiyan
https://www.jiosaavn.com/song/...
https://www.jiosaavn.com/album/...
https://www.jiosaavn.com/playlist/...
```

### Gaana
```
gaanasearch:Ek Do Teen
https://gaana.com/song/...
https://gaana.com/album/...
https://gaana.com/playlist/...
```

### Amazon Music
```
amsearch:Tum Hi Ho
https://music.amazon.com/tracks/...
https://music.amazon.com/albums/...
https://music.amazon.com/playlists/...
```

### Pandora
```
pdsearch:Bollywood Hits
https://www.pandora.com/station/...
https://www.pandora.com/artist/...
```

### Instagram
```
https://www.instagram.com/reel/...
https://www.instagram.com/p/...
```

---

## 3-Stage CDN Routing

> [!TIP]
> Zorlink implements a fully autonomous 3-stage routing pipeline for YouTube that eliminates IP blocks and rate limits entirely.

```
Track Request
      │
      ▼
 Stage 1 — YTCDN (zorlink-ytcdn.vercel.app)
      │  GET /api/v1/metadata/{videoId}
      ├── HIT  → stream instantly from /api/v1/stream/{videoId} ✅
      └── MISS → continue
      │
      ▼
 Stage 2 — Backend Proxy (your own server, optional)
      │  GET /resolve/{videoId}
      ├── OK   → stream via backend ✅
      └── FAIL → continue
      │
      ▼
 Stage 3 — Native Lavalink YouTube ✅ (always succeeds)
```

### YTCDN API

Your CDN (zorlink-ytcdn) exposes:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/v1/status` | Health check |
| `GET` | `/api/v1/metadata/:videoId` | Check cache (200 = hit, 404 = miss) |
| `GET` | `/api/v1/stream/:videoId` | Stream cached audio |
| `POST` | `/api/v1/upload/:videoId` | Upload audio to cache |

Upload example (after native playback):
```bash
curl -X POST "https://zorlink-ytcdn.vercel.app/api/v1/upload/{videoId}" \
  -H "Authorization: Bearer YOUR_MASTER_KEY" \
  -F 'metadata={"title":"Track Name","duration":240}' \
  -F "audio=@./audio.webm"
```

---

## Auto Deploy (GitHub Actions)

Push to `main` → JAR builds → deploys to your server automatically.

Set these secrets in your repo → Settings → Secrets → Actions:

| Secret | Value |
|---|---|
| `EC2_HOST` | Your server IP |
| `EC2_USER` | SSH username |
| `EC2_SSH_KEY` | Private key content |
| `LAVALINK_PLUGINS_PATH` | Path to plugins folder |
| `DISCORD_WEBHOOK` | Webhook for deploy notifications |

---

## Build

```bash
./gradlew jar
```

Output: `build/libs/zorlink-1.0.0.jar`

---

## Credits

- **[ZorveX Development](https://github.com/nabarup2021)** — Plugin author
- **[xylen-py / SlugYZeon](https://github.com/xylen-py/SlugYZeon)** — YTCDN architecture reference
- **[topi314 / LavaSrc](https://github.com/topi314/LavaSrc)** — Mirror system inspiration
- **[lavalink-devs](https://github.com/lavalink-devs)** — Lavalink plugin template

---

## Disclaimer

For educational and research purposes. Use responsibly and respect each platform's terms of service.

---

## License

Licensed under the **Apache License 2.0** — see [LICENSE](LICENSE) for details.

<div align="center">

<br>

<img src="https://capsule-render.vercel.app/api?type=waving&color=6C63FF&height=100&section=footer" width="100%"/>

**built by [ZorveX Development](https://github.com/nabarup2021)**

`Zorlink v1.0.0 — Lavalink Plugin`

</div>
