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
