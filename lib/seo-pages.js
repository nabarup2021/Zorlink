export const SEO_PAGE_ORDER = ["discordMusicBot","musicBot","features","commands","premium"];

export const seoPages = {
  "discordMusicBot": {
    "slug": "discordMusicBot",
    "keyword": "Discord Music Bot",
    "title": "Discord Music Bot | Azelia",
    "description": "Azelia is a Discord music bot for queue control, filters, playlists, multi-platform music resolution, 24/7 playback and a web dashboard.",
    "intro": "Azelia is a Discord Music Bot built for servers that want more than a single play command. It combines queue management, Lavalink-backed playback, audio filters, playlists, autoplay, server controls and a browser dashboard in one system.",
    "focus": "playback, queue management, audio filters, music source resolution, playlists, 24/7 voice sessions and dashboard controls",
    "cards": [
      [
        "Fast music playback",
        "Search for music, resolve supported links and place tracks into a guild queue."
      ],
      [
        "Smart queue control",
        "Skip, seek, loop, previous-track recovery, volume and queue controls are part of the player model."
      ],
      [
        "Audio filters",
        "Free and Premium filter families cover bass, treble, stereo, vocal, genre and creative effects."
      ],
      [
        "Multi-platform resolution",
        "The resolver catalog includes YouTube, Spotify, SoundCloud, Deezer, Tidal, Apple Music, Bandcamp and generic URLs."
      ],
      [
        "Playlists and autoplay",
        "Playlists can seed a queue and Premium enables autoplay for continued discovery."
      ],
      [
        "24/7 voice support",
        "Guild settings include persistent voice behavior through Stay 247."
      ],
      [
        "Web dashboard",
        "Eligible Discord users can sign in with Discord and manage authorized servers."
      ],
      [
        "Premium controls",
        "User Premium and Guild Premium extend limits and unlock additional features."
      ]
    ],
    "faq": [
      [
        "What is Azelia?",
        "A Discord-focused music system built around Discord.js, Lavalink and a universal resolver."
      ],
      [
        "Does Azelia support Spotify?",
        "Spotify is present in the resolver catalog and supports link and playlist-oriented workflows."
      ],
      [
        "Can Azelia stay in a voice channel?",
        "The current guild model includes a Stay 247 setting."
      ],
      [
        "Is there a free plan?",
        "Yes. Free is ₹0/month, User Premium is ₹49/month and Guild Premium is ₹99/month."
      ]
    ],
    "related": [
      "musicBot",
      "features",
      "freeDiscordMusicBot",
      "discordMusicDashboard"
    ],
    "extended": true
  },
  "musicBot": {
    "slug": "musicBot",
    "keyword": "Music Bot for Discord",
    "title": "Music Bot for Discord | Azelia",
    "description": "A practical music bot for Discord with playback, queue controls, filters, playlists, autoplay and a web dashboard.",
    "intro": "A music bot for Discord should make listening simpler. Azelia focuses the experience on search, queue flow, playback control and the settings that matter during an active voice session.",
    "focus": "music experience, queue flow, playback controls, filters, playlists, autoplay and setup",
    "cards": [
      [
        "Music experience",
        "Join a voice channel, search or provide a supported URL, add tracks and control playback."
      ],
      [
        "Queue and playback",
        "Skip, seek, loop, previous-track recovery and volume are core player controls."
      ],
      [
        "Filters",
        "Free presets cover common bass, treble, genre, vocal and stereo needs, with a larger Premium catalog."
      ],
      [
        "Playlists",
        "Playlist features provide reusable listening sessions."
      ],
      [
        "Autoplay",
        "Premium access adds autoplay for continued playback and discovery."
      ],
      [
        "Server settings",
        "Guild controls include prefix, DJ role, request channels and 24/7 behavior where configured."
      ]
    ],
    "faq": [
      [
        "Is Azelia free?",
        "Yes. The Free plan costs ₹0/month."
      ],
      [
        "Does Azelia use a dashboard?",
        "Yes. The website includes a protected server dashboard."
      ],
      [
        "What is the command prefix?",
        "The configured default prefix in the current dashboard data is +."
      ],
      [
        "Can users use slash commands?",
        "Many command entries include slash-enabled metadata."
      ]
    ],
    "related": [
      "discordMusicBot",
      "features",
      "discordMusicBotCommands"
    ]
  },
  "features": {
    "slug": "features",
    "keyword": "Discord Music Bot Features",
    "title": "Discord Music Bot Features | Azelia",
    "description": "Explore Azelia Discord music bot features including playback, filters, queues, playlists, autoplay, 24/7 mode, dashboard controls and Premium.",
    "intro": "Azelia's Discord Music Bot Features follow the real bot model: resolver providers, Lavalink playback, command modules, filter presets, guild settings and Premium capabilities.",
    "focus": "playback, audio filters, smart queue, playlists, autoplay, 24/7 mode, web dashboard, anti-abuse behavior and Premium",
    "cards": [
      [
        "Playback",
        "Search, URL resolution, queueing and common player actions including seek, loop, skip and volume."
      ],
      [
        "Audio Filters",
        "Free and Premium filters cover tonal shaping, bass, treble, stereo, vocals, genres and effects."
      ],
      [
        "Smart Queue",
        "Queue behavior includes ordering, previous-track recovery and loop modes."
      ],
      [
        "Playlists",
        "Reusable collections can feed tracks into a queue."
      ],
      [
        "Autoplay",
        "Premium autoplay continues playback after the active queue ends."
      ],
      [
        "24/7 Mode",
        "Guild settings include Stay 247 behavior."
      ],
      [
        "Web Dashboard",
        "Discord OAuth and server-side guild authorization protect management routes."
      ],
      [
        "Anti-Abuse",
        "Signed sessions, origin checks, body limits, rate limits and server-side permission validation protect sensitive routes."
      ],
      [
        "Premium Features",
        "Higher queue and playlist limits, lyrics, autoplay, premium filters and custom profile features."
      ],
      [
        "Provider Coverage",
        "YouTube, Spotify, SoundCloud, Deezer, Tidal, Apple Music, Bandcamp and generic URLs."
      ]
    ],
    "faq": [
      [
        "Which filters are free?",
        "The source data marks a broad set of common filters as free."
      ],
      [
        "What requires Premium?",
        "The Premium filter family and features such as lyrics and autoplay are marked Premium."
      ],
      [
        "Does the dashboard check permissions?",
        "Yes. Guild access is validated server-side."
      ],
      [
        "Does the site expose secrets?",
        "No. Credentials are kept on the server-side proxy path."
      ]
    ],
    "related": [
      "discordMusicBot",
      "premium",
      "discordMusicDashboard"
    ],
    "extended": true
  },
  "commands": {
    "slug": "commands",
    "keyword": "Discord Music Bot Commands",
    "title": "Discord Music Bot Commands | Azelia",
    "description": "Browse Azelia Discord music bot commands by category, with prefix usage, slash availability, Premium markers and source metadata.",
    "intro": "The Azelia command catalog is generated from the current dashboard data model. Commands cover music playback, queues, filters, playlists, settings, information, provider tools and utility modules.",
    "focus": "search, music commands, queue commands, filter commands, Premium commands, playlist commands, configuration, usage and cooldown behavior",
    "commands": true,
    "extended": true,
    "cards": [
      [
        "Search and playback",
        "Music commands resolve searches or links and place playable results into the active player."
      ],
      [
        "Queue commands",
        "Queue actions control ordering and playback state."
      ],
      [
        "Filter commands",
        "Free and Premium filter categories map to the audio preset catalog."
      ],
      [
        "Premium commands",
        "Premium categories identify features that require a Premium tier."
      ],
      [
        "Playlist commands",
        "Playlist commands provide reusable queue and collection workflows."
      ],
      [
        "Config commands",
        "Server settings control prefix, DJ role, request channels and 24/7 configuration."
      ],
      [
        "Provider commands",
        "SoundCloud, Deezer, Genius, Discogs, MusicBrainz and Last.fm have dedicated command surfaces."
      ],
      [
        "Usage and cooldown",
        "Command cards show usage and slash metadata while runtime cooldowns remain enforced."
      ]
    ],
    "faq": [
      [
        "What is the default prefix?",
        "The current Azelia dashboard configuration uses +."
      ],
      [
        "Do commands support slash commands?",
        "Many command entries include slash-enabled metadata."
      ],
      [
        "Are filters free?",
        "The catalog distinguishes free and Premium filter categories."
      ],
      [
        "Where can I see the full catalog?",
        "The /commands page renders the current command data."
      ]
    ],
    "related": [
      "discordMusicBotCommands",
      "features",
      "premium"
    ]
  },
  "premium": {
    "slug": "premium",
    "keyword": "Premium Discord Music Bot",
    "title": "Premium Discord Music Bot | Azelia Premium",
    "description": "Azelia Premium for Discord music with Free, User Premium and Guild Premium tiers, higher limits, premium filters and advanced playback features.",
    "intro": "Azelia Premium is split into three clear tiers so the difference between the base product, user-wide upgrades and server-wide upgrades is easy to understand.",
    "focus": "Free, User Premium, Guild Premium, feature comparison, limits, No-Prefix and Premium-only music features",
    "premium": true,
    "extended": true,
    "cards": [
      [
        "Free · ₹0/month",
        "Core playback, queues, standard playlists, free filters and 24/7 support remain available without a subscription."
      ],
      [
        "User Premium · ₹49/month",
        "User-wide Premium adds higher limits, lyrics, autoplay, Premium filters and No-Prefix where enabled."
      ],
      [
        "Guild Premium · ₹99/month",
        "Guild Premium applies premium enhancements at server scope."
      ],
      [
        "Higher limits",
        "The current matrix lists unlimited queues and playlists for Premium, with higher volume and giveaway limits."
      ],
      [
        "Premium filters",
        "Premium unlocks the extended filter catalog."
      ],
      [
        "Priority experience",
        "The Premium model includes priority support and reduced friction."
      ]
    ],
    "faq": [
      [
        "How much is User Premium?",
        "User Premium is listed at ₹49/month."
      ],
      [
        "How much is Guild Premium?",
        "Guild Premium is listed at ₹99/month."
      ],
      [
        "Is there a free tier?",
        "Yes. Free is ₹0/month."
      ],
      [
        "Does Premium include No-Prefix?",
        "No-Prefix is described as a User Premium capability rather than a separate tier."
      ]
    ],
    "related": [
      "freeDiscordMusicBot",
      "discordMusicBot",
      "247DiscordMusicBot"
    ]
  }
};

export const seoPagesExtra1 = {
  "freeDiscordMusicBot": {
    "slug": "freeDiscordMusicBot",
    "keyword": "Free Discord Music Bot",
    "title": "Free Discord Music Bot | Azelia",
    "description": "Use Azelia as a free Discord music bot with queue controls, free filters, playlists and core playback features.",
    "intro": "Azelia's Free plan keeps the core listening experience usable without a subscription. The base tier is ₹0/month and includes the everyday controls a server needs to play and manage music.",
    "focus": "free plan overview, queue, filters, playback, limitations and Premium upgrade",
    "cards": [
      [
        "₹0 core plan",
        "The current pricing model lists Free at ₹0/month."
      ],
      [
        "Playback",
        "Search and supported link resolution provide the base listening workflow."
      ],
      [
        "Queue",
        "The feature matrix lists queues up to 100 songs for Free."
      ],
      [
        "Free filters",
        "A broad free filter set covers common listening presets."
      ],
      [
        "Playlists",
        "Free access includes a defined playlist allowance."
      ],
      [
        "Upgrade path",
        "Premium raises limits and adds lyrics, autoplay and more filters."
      ]
    ],
    "faq": [
      [
        "Is Azelia free?",
        "Yes. Free is ₹0/month."
      ],
      [
        "Can Free use 24/7 mode?",
        "The current feature matrix marks Stay 247 as available on Free."
      ],
      [
        "What is limited?",
        "Queue, volume, playlist and giveaway limits apply, while lyrics, autoplay and Premium filters are Premium."
      ],
      [
        "Can I upgrade later?",
        "Yes. User and Guild Premium add the documented advanced features."
      ]
    ],
    "related": [
      "discordMusicBot",
      "premium",
      "247DiscordMusicBot"
    ]
  },
  "247DiscordMusicBot": {
    "slug": "247DiscordMusicBot",
    "keyword": "24/7 Discord Music Bot",
    "title": "24/7 Discord Music Bot | Azelia",
    "description": "Azelia supports persistent Discord music sessions with Stay 247 guild settings, queue-based playback and voice-session behavior.",
    "intro": "A 24/7 Discord Music Bot needs more than a permanent label. The system has to keep a voice session meaningful, preserve guild configuration and handle transitions between active queues and idle periods.",
    "focus": "continuous playback, auto reconnect, home voice behavior, Premium requirements and session behavior",
    "cards": [
      [
        "Stay 247 setting",
        "Guild configuration contains a stay_247 setting."
      ],
      [
        "Continuous queue",
        "A queue can continue while tracks remain available, with autoplay for Premium users."
      ],
      [
        "Voice lifecycle",
        "The player architecture includes voice lifecycle handling."
      ],
      [
        "Reconnect behavior",
        "Long-running playback depends on configured voice and Lavalink runtime health."
      ],
      [
        "Home voice behavior",
        "Server configuration can determine preferred music-channel behavior."
      ],
      [
        "Session-aware control",
        "Queue, loop, autoplay and previous-track recovery are session features."
      ]
    ],
    "faq": [
      [
        "Is 24/7 available on Free?",
        "The current feature matrix marks Stay 247 as Yes for Free."
      ],
      [
        "Does autoplay require Premium?",
        "The feature matrix marks autoplay as Premium."
      ],
      [
        "Will an empty queue play forever?",
        "Voice presence and continuous music playback are different behaviors."
      ],
      [
        "What affects reliability?",
        "Voice permissions, availability, Lavalink nodes and runtime health."
      ]
    ],
    "related": [
      "discordMusicBot",
      "premium",
      "highQualityDiscordMusicBot"
    ]
  },
  "highQualityDiscordMusicBot": {
    "slug": "highQualityDiscordMusicBot",
    "keyword": "High Quality Discord Music Bot",
    "title": "High Quality Discord Music Bot | Azelia",
    "description": "Azelia combines Lavalink playback, filters, queue control and resolver support for high quality Discord music sessions.",
    "intro": "High quality Discord music is a systems problem: source resolution, audio transport, queue state, filters and voice lifecycle all have to work together. Azelia uses Lavalink as the playback layer and a resolver stack for source-aware discovery.",
    "focus": "audio quality, Lavalink, playback, filters, queue and reliability",
    "cards": [
      [
        "Lavalink playback",
        "Lavalink is the audio playback layer for Azelia's music architecture."
      ],
      [
        "Source resolution",
        "The universal resolver separates source lookup from Discord playback."
      ],
      [
        "Audio filters",
        "The filter catalog includes practical and creative effects."
      ],
      [
        "Queue stability",
        "Controls include queue state, loops, seeking, previous-track recovery and volume."
      ],
      [
        "Reliability",
        "Status telemetry can expose nodes, shards, memory and queue values."
      ],
      [
        "Production controls",
        "The dashboard adds server-side authorization and keeps credentials server-side."
      ]
    ],
    "faq": [
      [
        "What is Lavalink?",
        "It is the playback layer used by Azelia's architecture."
      ],
      [
        "Is every source lossless?",
        "No blanket lossless claim should be made for every third-party source."
      ],
      [
        "Can filters run during playback?",
        "Filters are player-level runtime controls."
      ],
      [
        "Are dashboard secrets public?",
        "No. API credentials are kept server-side."
      ]
    ],
    "related": [
      "discordMusicBot",
      "features",
      "discordMusicDashboard"
    ]
  },
  "youtubeMusicBot": {
    "slug": "youtubeMusicBot",
    "keyword": "YouTube Music Bot Discord",
    "title": "YouTube Music Bot Discord | Azelia",
    "description": "Use Azelia to search and resolve YouTube music, queue tracks and control playback in Discord.",
    "intro": "Azelia includes YouTube as a core resolver source, letting Discord users search for music or provide supported YouTube links and manage the result through the normal queue and player workflow.",
    "focus": "YouTube search, links, playlists, queue behavior, playback controls and limitations",
    "cards": [
      [
        "YouTube search",
        "Search-based music discovery can route through the universal resolver."
      ],
      [
        "Supported links",
        "Direct URLs can enter the normal resolution and queueing flow."
      ],
      [
        "Queue flow",
        "Resolved tracks become normal player entries."
      ],
      [
        "Playback controls",
        "Volume, seek and previous-track recovery operate on the active player."
      ],
      [
        "Filters",
        "The audio filter catalog remains available after a YouTube track enters the player."
      ],
      [
        "Source-aware limits",
        "Actual source availability can change independently from the Discord command interface."
      ]
    ],
    "faq": [
      [
        "Can Azelia play YouTube links?",
        "YouTube is included in the resolver catalog."
      ],
      [
        "Can I search instead of pasting a URL?",
        "The resolver model includes direct search workflows."
      ],
      [
        "Does YouTube Premium change Azelia pricing?",
        "No. Azelia Premium is separate from a source subscription."
      ],
      [
        "Can YouTube results use filters?",
        "Yes. Filters are player features."
      ]
    ],
    "related": [
      "discordMusicBot",
      "spotifyDiscordBot",
      "features"
    ]
  },
  "spotifyDiscordBot": {
    "slug": "spotifyDiscordBot",
    "keyword": "Spotify Discord Bot",
    "title": "Spotify Discord Bot | Azelia",
    "description": "Azelia handles Spotify links and playlist-oriented workflows through its universal resolver and Discord player.",
    "intro": "Azelia supports Spotify as part of its multi-platform resolver stack. The goal is to resolve supported Spotify references into a Discord music session with queue and playback controls.",
    "focus": "Spotify links, search, playlists, queue, playback and supported behavior",
    "cards": [
      [
        "Spotify links",
        "Spotify references can enter the universal resolver path."
      ],
      [
        "Resolver workflow",
        "Source handling is separated from the Discord player."
      ],
      [
        "Playlist workflows",
        "Spotify playlist references can seed queues when supported."
      ],
      [
        "Queue controls",
        "Skip, loop, seek and volume work after a track is added."
      ],
      [
        "Filters",
        "Free and Premium filter presets remain player-level features."
      ],
      [
        "Supported behavior",
        "Exact playback depends on resolver and source availability."
      ]
    ],
    "faq": [
      [
        "Can Azelia accept Spotify links?",
        "Spotify is listed as a resolver provider."
      ],
      [
        "Does Azelia stream directly from Spotify?",
        "The product describes a resolver workflow, not a blanket direct-stream claim."
      ],
      [
        "Can Spotify playlists populate a queue?",
        "Playlist-oriented resolver support is documented."
      ],
      [
        "Do Spotify users need Premium?",
        "Using Spotify as a source is not itself Premium-only."
      ]
    ],
    "related": [
      "discordMusicBot",
      "youtubeMusicBot",
      "soundcloudDiscordBot"
    ]
  }
};

export const seoPagesExtra2 = {
  "soundcloudDiscordBot": {
    "slug": "soundcloudDiscordBot",
    "keyword": "SoundCloud Discord Bot",
    "title": "SoundCloud Discord Bot | Azelia",
    "description": "Azelia provides SoundCloud search, track, profile, playlist, likes, reposts and discovery workflows for Discord.",
    "intro": "SoundCloud receives deeper provider-specific support in Azelia than a basic URL resolver. The documented catalog includes search, tracks, profiles, playlists, likes, reposts, trending and related discovery.",
    "focus": "SoundCloud track support, search, playlists, queue and playback",
    "cards": [
      [
        "SoundCloud search",
        "Search workflows are part of the provider-specific command layer."
      ],
      [
        "Tracks",
        "Track references can flow into the normal Discord player."
      ],
      [
        "Profiles and collections",
        "Provider commands cover profiles and collections beyond a single URL."
      ],
      [
        "Playlists",
        "SoundCloud playlists can seed queues when resolver support is available."
      ],
      [
        "Likes and reposts",
        "The provider catalog includes likes and repost-oriented discovery."
      ],
      [
        "Trending and related",
        "Discovery extends beyond direct search."
      ],
      [
        "Queue and playback",
        "Resolved tracks use standard queue controls and filters."
      ]
    ],
    "faq": [
      [
        "Does Azelia support SoundCloud search?",
        "Yes. SoundCloud is marked as a Resolver + commands provider."
      ],
      [
        "Can SoundCloud playlists be used?",
        "Playlist support is documented."
      ],
      [
        "Are likes and reposts supported?",
        "The provider description includes them."
      ],
      [
        "Do SoundCloud features require Premium?",
        "Provider support itself is not described as Premium-only."
      ]
    ],
    "related": [
      "discordMusicBot",
      "spotifyDiscordBot",
      "deezerDiscordBot"
    ]
  },
  "appleMusicDiscordBot": {
    "slug": "appleMusicDiscordBot",
    "keyword": "Apple Music Discord Bot",
    "title": "Apple Music Discord Bot | Azelia",
    "description": "Azelia supports Apple Music references through its universal resolver and Discord playback workflow.",
    "intro": "Apple Music is part of Azelia's resolver catalog. Supported references can enter the resolver, then participate in the standard Discord queue and playback system.",
    "focus": "Apple Music links, resolve behavior, search, playlists, queue and playback",
    "cards": [
      [
        "Apple Music links",
        "Supported references can enter the universal resolver."
      ],
      [
        "Metadata-aware resolution",
        "Provider information and fallback metadata paths support source handling."
      ],
      [
        "Playlist flow",
        "Playlist references can work where the resolver exposes sufficient metadata."
      ],
      [
        "Queue controls",
        "Resolved music uses queue, skip, seek, loop and volume controls."
      ],
      [
        "Filters",
        "Free and Premium audio filters remain player-level features."
      ],
      [
        "Source limitations",
        "Exact behavior depends on current resolver support."
      ]
    ],
    "faq": [
      [
        "Is Apple Music supported?",
        "Apple Music is listed as a resolver provider."
      ],
      [
        "Does Azelia replace Apple Music?",
        "No. It resolves supported references into Discord playback."
      ],
      [
        "Can Apple Music playlists be resolved?",
        "Where configured resolver support permits."
      ],
      [
        "Can Premium change source availability?",
        "Premium changes Azelia features, not third-party source availability."
      ]
    ],
    "related": [
      "discordMusicBot",
      "spotifyDiscordBot",
      "deezerDiscordBot"
    ]
  },
  "deezerDiscordBot": {
    "slug": "deezerDiscordBot",
    "keyword": "Deezer Discord Bot",
    "title": "Deezer Discord Bot | Azelia",
    "description": "Azelia includes Deezer resolver and provider commands for search, albums, artists, charts, playlists, radio and discovery.",
    "intro": "Deezer receives provider-specific treatment in Azelia. The current catalog includes search, albums, artists, charts, playlists, radio and related discovery alongside the general playback pipeline.",
    "focus": "Deezer links, search, albums, artists, charts, playlists, radio, queue and playback",
    "cards": [
      [
        "Deezer search",
        "Search workflows can resolve Deezer-oriented results."
      ],
      [
        "Albums and artists",
        "Provider commands cover artist and album discovery."
      ],
      [
        "Charts and radio",
        "The catalog includes chart and radio features."
      ],
      [
        "Playlists",
        "Playlist references can populate the queue where supported."
      ],
      [
        "Queue and playback",
        "Resolved tracks use the standard player controls."
      ],
      [
        "Discovery",
        "Related source features expand beyond one result."
      ]
    ],
    "faq": [
      [
        "Does Azelia support Deezer search?",
        "Yes. Deezer is a Resolver + commands provider."
      ],
      [
        "Are Deezer charts supported?",
        "Charts are included in the provider description."
      ],
      [
        "Can I use Deezer playlists?",
        "Playlist support is documented."
      ],
      [
        "Are Deezer features Premium-only?",
        "The integration itself is not identified as Premium-only."
      ]
    ],
    "related": [
      "soundcloudDiscordBot",
      "spotifyDiscordBot",
      "discordMusicBot"
    ]
  },
  "jioSaavnDiscordBot": {
    "slug": "jioSaavnDiscordBot",
    "keyword": "JioSaavn Discord Bot",
    "title": "JioSaavn Discord Bot | Azelia",
    "description": "Azelia explains JioSaavn search intent while keeping provider claims aligned with the documented resolver list.",
    "intro": "JioSaavn is a useful search target for Indian music communities, but the current Azelia source data does not document a dedicated first-class JioSaavn provider alongside YouTube, Spotify, SoundCloud and Deezer. This page explains that boundary instead of inventing unsupported integration.",
    "focus": "JioSaavn search intent, links, playlist expectations, queue behavior and source limitations",
    "cards": [
      [
        "Search intent",
        "Users can search for the same artists and tracks across documented supported sources."
      ],
      [
        "Links and fallback resolution",
        "Generic URL and metadata-aware paths may help with supported references, but no dedicated connector is claimed."
      ],
      [
        "Playlist expectations",
        "Dedicated JioSaavn playlist support is not asserted without source evidence."
      ],
      [
        "Queue and playback",
        "Any successfully resolved track enters the standard Azelia queue."
      ],
      [
        "Filters",
        "Filters operate after a track is resolved."
      ],
      [
        "Transparent boundaries",
        "The page separates documented providers from unverified integrations."
      ]
    ],
    "faq": [
      [
        "Is JioSaavn a documented first-class provider?",
        "No. It is not named in the current provider list."
      ],
      [
        "Can I still play an Indian song?",
        "Often through supported sources such as YouTube or Spotify, subject to availability."
      ],
      [
        "Will Premium add JioSaavn?",
        "Premium does not imply an undocumented provider integration."
      ],
      [
        "Why have this page?",
        "It answers search intent without promising unsupported behavior."
      ]
    ],
    "related": [
      "discordMusicBotIndia",
      "discordMusicBot",
      "youtubeMusicBot"
    ]
  },
  "discordMusicDashboard": {
    "slug": "discordMusicDashboard",
    "keyword": "Discord Music Bot Dashboard",
    "title": "Discord Music Bot Dashboard | Azelia",
    "description": "Azelia's Discord Music Bot Dashboard provides protected Discord login, server controls, player state, queue management and Premium access.",
    "intro": "A Discord Music Bot Dashboard should simplify server management without turning privileged controls into a browser-side security problem. Azelia uses Discord OAuth, signed sessions and server-side guild authorization before exposing protected controls.",
    "focus": "dashboard, server overview, player control, queue, server settings, Premium, analytics, notifications and security",
    "cards": [
      [
        "Server overview",
        "Authenticated users can see guilds returned by the server bridge and manage authorized servers."
      ],
      [
        "Player control",
        "The dashboard can connect to player and telemetry endpoints when the bridge is configured."
      ],
      [
        "Queue management",
        "Queue state can be surfaced alongside track and playback concepts."
      ],
      [
        "Server settings",
        "Guild controls include prefix, DJ role, request channels and 24/7 behavior."
      ],
      [
        "Premium",
        "User and Guild Premium states can be represented without exposing backend credentials."
      ],
      [
        "Analytics",
        "Telemetry can surface runtime counts, resolver requests, queues and node state."
      ],
      [
        "Notifications",
        "The site can present bridge responses and authentication state without browser-side secrets."
      ],
      [
        "Security",
        "Signed sessions, CSRF state, origin validation, limits and permission checks protect sensitive routes."
      ]
    ],
    "faq": [
      [
        "How does dashboard login work?",
        "Discord OAuth uses a short-lived state and a signed session cookie."
      ],
      [
        "Can any logged-in user manage any server?",
        "No. Guild access is validated server-side."
      ],
      [
        "Are API keys stored in the browser?",
        "The API bridge keeps its credential on the server."
      ],
      [
        "What if the backend is unavailable?",
        "The site should report the bridge error rather than invent live server state."
      ]
    ],
    "related": [
      "discordMusicBot",
      "premium",
      "azeliaStatus"
    ],
    "extended": true
  }
};

export const seoPagesExtra3 = {
  "discordMusicBotCommands": {
    "slug": "discordMusicBotCommands",
    "keyword": "Discord Music Commands",
    "title": "Discord Music Commands | Azelia Command Guide",
    "description": "A long-form Azelia guide to Discord music commands covering playback, queues, filters, playlists, Premium, configuration and usage.",
    "intro": "Discord Music Commands are easiest to use when the command catalog is grouped by task. This Azelia guide explains the command surface from the user's point of view while keeping syntax tied to the current command data.",
    "focus": "music, queue, filters, playlist, Premium, configuration, developer, usage and cooldowns",
    "commands": true,
    "cards": [
      [
        "Music commands",
        "Start playback, search supported sources, resolve links and control the active track."
      ],
      [
        "Queue commands",
        "Manage order and playback state, including queue navigation and loop behavior."
      ],
      [
        "Filter commands",
        "Apply free or Premium filter presets during playback."
      ],
      [
        "Playlist commands",
        "Create reusable collections and feed tracks into a queue."
      ],
      [
        "Premium commands",
        "Access features whose source category is marked Premium."
      ],
      [
        "Configuration commands",
        "Set guild-level behavior such as prefix, DJ role and request channel."
      ],
      [
        "Developer and information",
        "The command surface also includes information, utility and developer categories."
      ],
      [
        "Cooldown behavior",
        "Runtime cooldowns remain enforced by the bot."
      ]
    ],
    "faq": [
      [
        "What prefix should I type?",
        "The current configured default prefix is +."
      ],
      [
        "Are all commands slash-enabled?",
        "No. Slash capability is command-specific."
      ],
      [
        "Can I use Premium filters without Premium?",
        "Premium filters require the relevant Premium state."
      ],
      [
        "Does the website change cooldowns?",
        "No. Cooldown enforcement belongs to the bot runtime."
      ]
    ],
    "related": [
      "commands",
      "features",
      "premium"
    ],
    "extended": true
  },
  "azeliaStatus": {
    "slug": "azeliaStatus",
    "keyword": "Azelia Status",
    "title": "Azelia Status | Bot, Shards and Lavalink Health",
    "description": "Check Azelia runtime health, Discord shard state, Lavalink nodes, telemetry and service incidents.",
    "intro": "Azelia Status brings operational information into one page: overall service state, bot telemetry, Discord shards, Lavalink nodes, runtime signals and incident notes when the backend bridge exposes them.",
    "focus": "overall status, bot status, shards, Lavalink nodes, incidents, maintenance and historical status",
    "cards": [
      [
        "Overall status",
        "A high-level service signal without hiding node and shard details."
      ],
      [
        "Bot status",
        "Telemetry can expose uptime, memory, command counts, songs and queue totals."
      ],
      [
        "Discord shards",
        "Shard entries can show whether the bridge reports them as operational."
      ],
      [
        "Lavalink nodes",
        "Node cards can show connection state, player counts and ping."
      ],
      [
        "Incidents",
        "Operational notes can explain outages or degradation."
      ],
      [
        "Maintenance",
        "Planned maintenance can be described with scope and expected behavior."
      ],
      [
        "Historical status",
        "A timeline can show previous incidents when telemetry retains history."
      ],
      [
        "Data honesty",
        "When live telemetry is unavailable, the page says so instead of fabricating numbers."
      ]
    ],
    "faq": [
      [
        "Is Azelia Status live?",
        "Only when the configured telemetry bridge returns current data."
      ],
      [
        "What does a node status mean?",
        "It describes the playback infrastructure node as reported by the bridge."
      ],
      [
        "Can a server have a local problem while status is green?",
        "Yes. Permissions and voice connectivity can fail independently."
      ],
      [
        "Where do incidents come from?",
        "Incident entries should come from the operational status source."
      ]
    ],
    "related": [
      "discordMusicDashboard",
      "azeliaSupport",
      "discordMusicBot"
    ],
    "extended": true
  },
  "azeliaSupport": {
    "slug": "azeliaSupport",
    "keyword": "Azelia Support",
    "title": "Azelia Support | Setup, Dashboard and Premium Help",
    "description": "Azelia Support guide for setup, playback problems, dashboard login, server permissions and Premium questions.",
    "intro": "Azelia Support answers the boring questions before they become support tickets: how to add the bot, why a command is unavailable, why a dashboard action is blocked and where to check service status.",
    "focus": "support hero, common issues, setup help, dashboard help, Premium help, support server and FAQ",
    "cards": [
      [
        "Setup help",
        "Use the invite flow, grant required permissions and start in a controlled music channel."
      ],
      [
        "Playback issues",
        "Check status, voice permissions, player state and source availability before changing server settings."
      ],
      [
        "Dashboard help",
        "Discord login and server management depend on OAuth state, sessions and guild authorization."
      ],
      [
        "Premium help",
        "Confirm whether a feature is user-scoped or guild-scoped."
      ],
      [
        "Status first",
        "Azelia Status helps separate service incidents from local configuration problems."
      ],
      [
        "Community support",
        "The configured support server is the path for account-specific or deployment-specific help."
      ]
    ],
    "faq": [
      [
        "What should I check first when music stops?",
        "Check Azelia Status, voice permissions, active player state and source availability."
      ],
      [
        "Why can I log in but not manage a server?",
        "The dashboard checks server-side guild permissions."
      ],
      [
        "Where can I get community help?",
        "Use the configured Azelia support server."
      ],
      [
        "Can Premium fix a source outage?",
        "No. Premium changes product access and limits, not third-party outages."
      ]
    ],
    "related": [
      "inviteAzelia",
      "azeliaStatus",
      "discordMusicDashboard"
    ]
  },
  "azeliaTeam": {
    "slug": "azeliaTeam",
    "keyword": "Azelia Team",
    "title": "Azelia Team | ZorveX Development",
    "description": "Meet the Azelia team configuration, project roles, development focus and support structure.",
    "intro": "The Azelia Team page presents the people and roles currently represented in the project's source-oriented team configuration, alongside the development focus behind the bot and dashboard.",
    "focus": "team hero, developer, development, project background, support and contact",
    "cards": [
      [
        "Project leadership",
        "The current configuration identifies owners and a co-owner responsible for project direction."
      ],
      [
        "Core development",
        "Development roles focus on the bot, dashboard and supporting infrastructure."
      ],
      [
        "Community management",
        "Community-facing roles connect feedback with the project."
      ],
      [
        "Project background",
        "Azelia combines Discord.js, Lavalink, a universal resolver and a protected web dashboard."
      ],
      [
        "Support",
        "A support-server path is available for questions and community issues."
      ],
      [
        "Contact",
        "Public contact paths remain separate from backend credentials and private account data."
      ]
    ],
    "faq": [
      [
        "Who develops Azelia?",
        "The current source contains a named team configuration with OWNER, CO-OWNER, CORE MEMBER and COMMUNITY MANAGER roles."
      ],
      [
        "Where is support handled?",
        "The configured Discord support server is the main community path."
      ],
      [
        "Is the team list editable publicly?",
        "No. The page reads project team data."
      ],
      [
        "Who is ZorveX Development?",
        "The source branding identifies it as the development label for Azelia."
      ]
    ],
    "related": [
      "azeliaSupport",
      "azeliaStatus",
      "discordMusicBot"
    ]
  },
  "bestDiscordMusicBot": {
    "slug": "bestDiscordMusicBot",
    "keyword": "Best Discord Music Bot",
    "title": "Best Discord Music Bot | What to Evaluate",
    "description": "A practical guide to evaluating the best Discord music bot by audio, source support, queues, dashboards, reliability and Premium value.",
    "intro": "Choosing the best Discord music bot is not about one screenshot. A useful evaluation checks the audio path, source handling, queue behavior, filters, server administration, uptime practices and the way Premium changes the experience.",
    "focus": "selection criteria, audio quality, features, dashboard, sources, Premium, reliability and Azelia overview",
    "cards": [
      [
        "Audio path",
        "Check how playback is handled and where Lavalink or equivalent infrastructure sits."
      ],
      [
        "Source coverage",
        "Compare the sources a server actually uses rather than counting provider names."
      ],
      [
        "Queue depth",
        "Look for ordering, loop, seek, previous-track recovery and clear playback state."
      ],
      [
        "Filters",
        "Understand useful free presets and which advanced filters require Premium."
      ],
      [
        "Dashboard quality",
        "Server management should verify Discord permissions server-side."
      ],
      [
        "Premium value",
        "Compare what Free already provides against User Premium and Guild Premium."
      ],
      [
        "Reliability",
        "Status and node telemetry are more useful than vague uptime badges."
      ],
      [
        "Azelia overview",
        "Azelia combines Discord.js, Lavalink, a resolver and a protected dashboard."
      ]
    ],
    "faq": [
      [
        "What should I compare?",
        "Playback, sources, queue features, filters, server controls, security and transparent limits."
      ],
      [
        "Does more features always mean better?",
        "No. Useful comparisons depend on reliability and actual server needs."
      ],
      [
        "Is Azelia free?",
        "Yes. Free is ₹0/month, with User and Guild Premium tiers."
      ],
      [
        "Should I compare dashboards too?",
        "Yes. Authentication and permission isolation matter."
      ]
    ],
    "related": [
      "bestDiscordMusicBot2026",
      "features",
      "premium"
    ],
    "extended": true
  }
};

export const seoPagesExtra4 = {
  "bestDiscordMusicBot2026": {
    "slug": "bestDiscordMusicBot2026",
    "keyword": "Best Discord Music Bot 2026",
    "title": "Best Discord Music Bot 2026 | Evaluation Guide",
    "description": "A 2026 guide to evaluating Discord music bots by audio, sources, dashboards, queues, Premium features, reliability and current capabilities.",
    "intro": "The best Discord music bot in 2026 is still a requirements question rather than a universal winner. A modern evaluation should include playback architecture, provider coverage, dashboard security, queue design, filter depth, 24/7 behavior and transparent Premium limits.",
    "focus": "2026 comparison criteria, features, audio, sources, dashboard, Premium and current updates",
    "cards": [
      [
        "2026 criteria",
        "Start with real server needs: sound quality, source availability, queue depth, filters and 24/7 behavior."
      ],
      [
        "Audio infrastructure",
        "Lavalink-backed architectures separate audio transport from the Discord command layer."
      ],
      [
        "Source diversity",
        "YouTube, Spotify, SoundCloud, Deezer and other documented paths should be tested for actual community usage."
      ],
      [
        "Dashboard security",
        "OAuth state, signed sessions, origin checks, permission validation and rate limits matter."
      ],
      [
        "Premium clarity",
        "A current pricing page should explain what each scope changes."
      ],
      [
        "Current Azelia model",
        "Azelia combines playback, resolver providers, filters, playlists and dashboard controls."
      ],
      [
        "Operational visibility",
        "Status pages exposing shards and nodes help diagnose issues."
      ],
      [
        "Ongoing maintenance",
        "Source integrations change, so current documentation must stay aligned with runtime behavior."
      ]
    ],
    "faq": [
      [
        "Why 2026?",
        "This page targets current 2026 search intent while older-year queries may still exist."
      ],
      [
        "Does Azelia claim to be the universal best bot?",
        "No. It provides criteria and describes documented capabilities."
      ],
      [
        "What are the Premium prices?",
        "Free ₹0/month, User Premium ₹49/month and Guild Premium ₹99/month."
      ],
      [
        "What should I test before switching?",
        "Test the sources, voice reliability, queue controls, permissions and Premium features you actually need."
      ]
    ],
    "related": [
      "bestDiscordMusicBot",
      "discordMusicBot",
      "premium"
    ],
    "extended": true
  },
  "discordMusicBotIndia": {
    "slug": "discordMusicBotIndia",
    "keyword": "Discord Music Bot India",
    "title": "Discord Music Bot India | Azelia",
    "description": "Azelia for Indian Discord communities with multi-platform music sources, INR pricing and support workflows.",
    "intro": "Indian Discord communities often want a music bot that handles regional listening habits without making setup complicated. Azelia combines a Free plan, INR pricing, multi-platform resolution, playlist support and a dashboard for server controls.",
    "focus": "India availability, music sources, pricing, server setup and support",
    "cards": [
      [
        "India-friendly pricing",
        "Free ₹0/month, User Premium ₹49/month and Guild Premium ₹99/month."
      ],
      [
        "Multi-source music",
        "YouTube, Spotify, SoundCloud, Deezer, Tidal, Apple Music and Bandcamp are documented providers."
      ],
      [
        "Server setup",
        "Invite the bot, configure guild settings and start playback in a voice channel."
      ],
      [
        "Indian music discovery",
        "Supported sources can often cover the same artists and tracks even when a regional service is not first-class."
      ],
      [
        "Dashboard",
        "Discord OAuth and server-side permission checks protect server management."
      ],
      [
        "Support",
        "The support page and Discord community provide setup help."
      ]
    ],
    "faq": [
      [
        "Is Azelia priced in INR?",
        "Yes. Current Premium pricing is listed in rupees."
      ],
      [
        "Is JioSaavn a documented provider?",
        "Not in the current named provider list."
      ],
      [
        "Can Indian servers use YouTube and Spotify?",
        "Yes. Both are in the resolver catalog."
      ],
      [
        "Can I use 24/7 mode?",
        "The feature matrix marks Stay 247 as available."
      ]
    ],
    "related": [
      "jioSaavnDiscordBot",
      "discordMusicBot",
      "premium"
    ]
  },
  "bestDiscordMusicBotAustralia": {
    "slug": "bestDiscordMusicBotAustralia",
    "keyword": "Best Discord Music Bot Australia",
    "title": "Best Discord Music Bot Australia | Azelia Guide",
    "description": "A practical guide for Australian Discord servers comparing music bot playback, sources, dashboard controls, Premium and reliability.",
    "intro": "Australian Discord communities can evaluate a music bot using the same practical criteria as any server: source availability, voice reliability, queue behavior, filters, 24/7 support, dashboard permissions and transparent limits.",
    "focus": "Australia availability, music features, pricing, server setup and support",
    "cards": [
      [
        "Playback and queues",
        "Use the same queue and playback controls across supported source integrations."
      ],
      [
        "Source coverage",
        "YouTube, Spotify, SoundCloud, Deezer, Tidal, Apple Music and Bandcamp are documented."
      ],
      [
        "24/7 support",
        "Stay 247 is available in the current feature matrix."
      ],
      [
        "Dashboard",
        "Server-side permission validation ties guild controls to real Discord authorization."
      ],
      [
        "Pricing",
        "Public pricing is Free ₹0, User Premium ₹49 and Guild Premium ₹99."
      ],
      [
        "Support and status",
        "Use Status and Support to separate incidents from local configuration."
      ]
    ],
    "faq": [
      [
        "Does location change pricing?",
        "The public pricing model is listed in INR and is not documented here as region-specific."
      ],
      [
        "What should an Australian server test?",
        "Voice connectivity, source resolution, queue behavior and server settings."
      ],
      [
        "Does Azelia have 24/7 mode?",
        "Yes."
      ],
      [
        "Can moderators use the dashboard?",
        "They need the required Discord guild permissions."
      ]
    ],
    "related": [
      "bestDiscordMusicBot",
      "discordMusicBot",
      "discordMusicDashboard"
    ]
  },
  "bestDiscordMusicBotCanada": {
    "slug": "bestDiscordMusicBotCanada",
    "keyword": "Best Discord Music Bot Canada",
    "title": "Best Discord Music Bot Canada | Azelia Guide",
    "description": "A practical guide for Canadian Discord servers comparing music bot sources, queues, filters, dashboard controls and Premium.",
    "intro": "Canadian Discord communities can compare music bots using measurable product behavior instead of vague feature counts. Azelia provides a source-aware resolver model, Lavalink playback, queue controls, filters, 24/7 settings and a protected dashboard.",
    "focus": "Canada availability, music features, pricing, setup, support and current bot behavior",
    "cards": [
      [
        "Multi-platform sources",
        "Azelia documents several common music source integrations."
      ],
      [
        "Queue and playback",
        "Skip, seek, loop, previous-track recovery and volume are core controls."
      ],
      [
        "Filters",
        "The data model separates Free and Premium filter families."
      ],
      [
        "24/7 mode",
        "Stay 247 is available in the feature matrix."
      ],
      [
        "Dashboard security",
        "OAuth, signed sessions and server-side Manage Server checks protect sensitive operations."
      ],
      [
        "Transparent Premium",
        "Free, User Premium and Guild Premium have separate scopes."
      ]
    ],
    "faq": [
      [
        "Is Azelia available to Canadian servers?",
        "The site documents a general Discord deployment model."
      ],
      [
        "What should I compare first?",
        "Sources, queue controls, voice reliability, filters and dashboard permissions."
      ],
      [
        "What are the Premium prices?",
        "Free ₹0/month, User Premium ₹49/month and Guild Premium ₹99/month."
      ],
      [
        "Does every provider behave identically?",
        "No. Provider availability and resolution differ by source."
      ]
    ],
    "related": [
      "bestDiscordMusicBot",
      "discordMusicBot",
      "highQualityDiscordMusicBot"
    ]
  },
  "inviteAzelia": {
    "slug": "inviteAzelia",
    "keyword": "Invite Azelia",
    "title": "Invite Azelia | Add the Discord Music Bot",
    "description": "Invite Azelia to Discord, review permissions, complete setup and troubleshoot common installation issues.",
    "intro": "The Invite Azelia page explains the shortest path from an empty server to a working music session: authorize the bot, choose the correct guild, review permissions and run a simple playback test.",
    "focus": "invite hero, required permissions, add to server, setup steps, troubleshooting and CTA",
    "cards": [
      [
        "Choose the server",
        "Use Discord's authorization flow to select a server where you have the required permission."
      ],
      [
        "Review permissions",
        "Grant only the permissions required by the configured bot features."
      ],
      [
        "Join a voice channel",
        "Start in a test voice channel where the bot can connect and speak."
      ],
      [
        "Run a music test",
        "Use the configured + prefix or a slash command to test playback."
      ],
      [
        "Configure the server",
        "Set prefix, DJ role, request channel and 24/7 behavior where available."
      ],
      [
        "Troubleshoot",
        "Check status, voice permissions, source availability and Lavalink health."
      ]
    ],
    "faq": [
      [
        "Who can invite Azelia?",
        "The authorizing Discord user needs the necessary guild permissions."
      ],
      [
        "What is the default prefix?",
        "The current public configuration uses +."
      ],
      [
        "What should I do after inviting?",
        "Join voice, test playback and configure guild settings."
      ],
      [
        "Does inviting automatically grant dashboard access?",
        "Dashboard access still uses Discord authentication and server-side permission checks."
      ]
    ],
    "related": [
      "discordMusicBot",
      "azeliaSupport",
      "discordMusicDashboard"
    ]
  }
};
