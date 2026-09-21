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
