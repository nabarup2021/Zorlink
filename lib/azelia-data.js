export const azeliaBrand = {
  name: 'Azelia',
  subtitle: 'Advanced Discord Music System',
  developer: 'ZorveX Development',
  author: 'Nabarup Chanda',
  support: 'https://discord.gg/mfKEF3uQqU',
  defaultPrefix: '+',
};

export const azeliaProviders = [
  {
    "id": "youtube",
    "name": "YouTube",
    "kind": "Resolver provider",
    "description": "Direct YouTube search and URL resolution."
  },
  {
    "id": "spotify",
    "name": "Spotify",
    "kind": "Resolver provider",
    "description": "Spotify links and playlist/profile workflows with resolver support."
  },
  {
    "id": "soundcloud",
    "name": "SoundCloud",
    "kind": "Resolver + commands",
    "description": "Search, tracks, profiles, playlists, likes, reposts, trending and related discovery."
  },
  {
    "id": "deezer",
    "name": "Deezer",
    "kind": "Resolver + commands",
    "description": "Search, albums, artists, charts, playlists, radio and related discovery."
  },
  {
    "id": "tidal",
    "name": "Tidal",
    "kind": "Resolver provider",
    "description": "Tidal URL resolution through the universal resolver."
  },
  {
    "id": "applemusic",
    "name": "Apple Music",
    "kind": "Resolver provider",
    "description": "Apple Music links with resolver fallback support."
  },
  {
    "id": "bandcamp",
    "name": "Bandcamp",
    "kind": "Resolver provider",
    "description": "Bandcamp link resolution through the generic provider path."
  },
  {
    "id": "generic",
    "name": "Generic",
    "kind": "Resolver provider",
    "description": "Metadata-aware fallback resolution for supported music URLs."
  }
];

export const azeliaMetadataIntegrations = [
  {
    "name": "Genius",
    "description": "Lyrics and music metadata commands."
  },
  {
    "name": "Discogs",
    "description": "Artist, release, label, catalog and collection metadata commands."
  },
  {
    "name": "MusicBrainz",
    "description": "Recording, release, artist, work, label, tag and relation metadata."
  },
  {
    "name": "iTunes / OpenGraph / JSON-LD",
    "description": "Metadata extraction stages used by the Universal Resolver."
  },
  {
    "name": "Last.fm",
    "description": "Account linking, scrobbling, playback, discovery and top-list commands."
  }
];

export const azeliaPremiumPlans = [
  {
    "name": "Free",
    "price": "₹0 / month",
    "description": "Core music playback with queue controls, free filters, playlists, 24/7 support and standard limits.",
    "scope": "Base"
  },
  {
    "name": "User Premium",
    "price": "₹49 / month",
    "description": "User-wide Premium access including No-Prefix, unlimited queues and playlists, lyrics, autoplay, premium filters and higher limits.",
    "scope": "User"
  },
  {
    "name": "Guild Premium",
    "price": "₹99 / month",
    "description": "Server-wide Premium including premium filters, custom server profile, premium music cards and guild-level enhancements.",
    "scope": "Guild"
  }
];

export const azeliaFeatureMatrix = {
  "Free": {
    "Queue": "Up to 100 songs",
    "Volume": "Up to 100",
    "Playlists": "5",
    "Tracks per playlist": "25",
    "Giveaways": "3 concurrent",
    "Lyrics": "No",
    "Autoplay": "No",
    "Premium filters": "No",
    "Custom profile": "No",
    "Stay 247": "Yes"
  },
  "Premium": {
    "Queue": "Unlimited",
    "Volume": "Up to 200",
    "Playlists": "Unlimited",
    "Tracks per playlist": "Unlimited",
    "Giveaways": "20 concurrent",
    "Lyrics": "Yes",
    "Autoplay": "Yes",
    "Premium filters": "Yes",
    "Custom profile": "Yes",
    "Stay 247": "Yes",
    "Priority support": "Yes"
  }
};

export const azeliaFilters = [
  {
    "name": "acoustic",
    "tier": "free"
  },
  {
    "name": "bassboost",
    "tier": "free"
  },
  {
    "name": "basscut",
    "tier": "free"
  },
  {
    "name": "boost",
    "tier": "free"
  },
  {
    "name": "bright",
    "tier": "free"
  },
  {
    "name": "classical",
    "tier": "free"
  },
  {
    "name": "club",
    "tier": "free"
  },
  {
    "name": "deepbass",
    "tier": "free"
  },
  {
    "name": "electronic",
    "tier": "free"
  },
  {
    "name": "flat",
    "tier": "free"
  },
  {
    "name": "headphone",
    "tier": "free"
  },
  {
    "name": "hiphop",
    "tier": "free"
  },
  {
    "name": "jazz",
    "tier": "free"
  },
  {
    "name": "natural",
    "tier": "free"
  },
  {
    "name": "pop",
    "tier": "free"
  },
  {
    "name": "presence",
    "tier": "free"
  },
  {
    "name": "reggae",
    "tier": "free"
  },
  {
    "name": "rock",
    "tier": "free"
  },
  {
    "name": "soft",
    "tier": "free"
  },
  {
    "name": "stereo",
    "tier": "free"
  },
  {
    "name": "treble",
    "tier": "free"
  },
  {
    "name": "trebleboost",
    "tier": "free"
  },
  {
    "name": "vocals",
    "tier": "free"
  },
  {
    "name": "warm",
    "tier": "free"
  },
  {
    "name": "width",
    "tier": "free"
  },
  {
    "name": "airboost",
    "tier": "premium"
  },
  {
    "name": "anime",
    "tier": "premium"
  },
  {
    "name": "basshead",
    "tier": "premium"
  },
  {
    "name": "blues",
    "tier": "premium"
  },
  {
    "name": "clarity",
    "tier": "premium"
  },
  {
    "name": "concert",
    "tier": "premium"
  },
  {
    "name": "country",
    "tier": "premium"
  },
  {
    "name": "crispboost",
    "tier": "premium"
  },
  {
    "name": "edm",
    "tier": "premium"
  },
  {
    "name": "fullrange",
    "tier": "premium"
  },
  {
    "name": "funk",
    "tier": "premium"
  },
  {
    "name": "hifi",
    "tier": "premium"
  },
  {
    "name": "indie",
    "tier": "premium"
  },
  {
    "name": "latin",
    "tier": "premium"
  },
  {
    "name": "loudness",
    "tier": "premium"
  },
  {
    "name": "megabass",
    "tier": "premium"
  },
  {
    "name": "metal",
    "tier": "premium"
  },
  {
    "name": "mono",
    "tier": "premium"
  },
  {
    "name": "narrow",
    "tier": "premium"
  },
  {
    "name": "oldschool",
    "tier": "premium"
  },
  {
    "name": "opera",
    "tier": "premium"
  },
  {
    "name": "punchbass",
    "tier": "premium"
  },
  {
    "name": "rnb",
    "tier": "premium"
  },
  {
    "name": "soul",
    "tier": "premium"
  },
  {
    "name": "stadium",
    "tier": "premium"
  },
  {
    "name": "subwoofer",
    "tier": "premium"
  },
  {
    "name": "superbass",
    "tier": "premium"
  },
  {
    "name": "swap",
    "tier": "premium"
  },
  {
    "name": "treblecut",
    "tier": "premium"
  },
  {
    "name": "vocal-boost",
    "tier": "premium"
  },
  {
    "name": "vocal-cut",
    "tier": "premium"
  },
  {
    "name": "16d",
    "tier": "premium"
  },
  {
    "name": "8d",
    "tier": "premium"
  },
  {
    "name": "ambient",
    "tier": "premium"
  },
  {
    "name": "cavern",
    "tier": "premium"
  },
  {
    "name": "chipmunk",
    "tier": "premium"
  },
  {
    "name": "chorus",
    "tier": "premium"
  },
  {
    "name": "cosmic",
    "tier": "premium"
  },
  {
    "name": "daycore",
    "tier": "premium"
  },
  {
    "name": "deepwater",
    "tier": "premium"
  },
  {
    "name": "distort",
    "tier": "premium"
  },
  {
    "name": "doubletime",
    "tier": "premium"
  },
  {
    "name": "dream",
    "tier": "premium"
  },
  {
    "name": "echo",
    "tier": "premium"
  },
  {
    "name": "flutter",
    "tier": "premium"
  },
  {
    "name": "galaxyspin",
    "tier": "premium"
  },
  {
    "name": "gaming",
    "tier": "premium"
  },
  {
    "name": "glitch",
    "tier": "premium"
  },
  {
    "name": "halftime",
    "tier": "premium"
  },
  {
    "name": "heavydistort",
    "tier": "premium"
  },
  {
    "name": "karaoke",
    "tier": "premium"
  },
  {
    "name": "lofi",
    "tier": "premium"
  },
  {
    "name": "lush",
    "tier": "premium"
  },
  {
    "name": "megaphone",
    "tier": "premium"
  },
  {
    "name": "nightcore",
    "tier": "premium"
  },
  {
    "name": "phonk",
    "tier": "premium"
  },
  {
    "name": "pitchdown",
    "tier": "premium"
  },
  {
    "name": "pitchup",
    "tier": "premium"
  },
  {
    "name": "pulsate",
    "tier": "premium"
  },
  {
    "name": "radio",
    "tier": "premium"
  },
  {
    "name": "reverb",
    "tier": "premium"
  },
  {
    "name": "robot",
    "tier": "premium"
  },
  {
    "name": "slowmo",
    "tier": "premium"
  },
  {
    "name": "slowspin",
    "tier": "premium"
  },
  {
    "name": "smooth",
    "tier": "premium"
  },
  {
    "name": "space",
    "tier": "premium"
  },
  {
    "name": "speaker",
    "tier": "premium"
  },
  {
    "name": "speeddown",
    "tier": "premium"
  },
  {
    "name": "speedup",
    "tier": "premium"
  },
  {
    "name": "spin",
    "tier": "premium"
  },
  {
    "name": "surround",
    "tier": "premium"
  },
  {
    "name": "telephone",
    "tier": "premium"
  },
  {
    "name": "underwater",
    "tier": "premium"
  },
  {
    "name": "vaporwave",
    "tier": "premium"
  },
  {
    "name": "vibra",
    "tier": "premium"
  },
  {
    "name": "warp",
    "tier": "premium"
  },
  {
    "name": "wobble",
    "tier": "premium"
  }
];

export const azeliaTeam = [
  {
    "id": "876743202051346432",
    "name": "venom_2021_",
    "display": "𒌋𒀖𓆩ζ͜͡𝙑𝙀𝙉𝙊𝙈 メㄚㄒ ",
    "role": "OWNER"
  },
  {
    "id": "1427743346562043937",
    "name": "wraith_2021_",
    "display": "𒌋𒀖𓆩ζ͜͡𝙒𝙍𝘼𝙄𝙏𝙃 メㄚㄒ ",
    "role": "OWNER"
  },
  {
    "id": "1390320426097442919",
    "name": "bhishmcoder",
    "display": "!   ! 𝐁𝐇𝐈𝐒𝐇𝐌 ღ ",
    "role": "CO-OWNER"
  },
  {
    "id": "1419187369789362226",
    "name": "rishabh_rajput1",
    "display": "DEV 々 Ꮢɪsʜᴀʙʜ ",
    "role": "CORE MEMBER"
  },
  {
    "id": "893728991490494466",
    "name": "viper_2021_",
    "display": "DEV 々 Vɪᴩᴇʀ",
    "role": "COMMUNITY MANAGER"
  }
];

export const azeliaCommands = [
  {
    "name": "swap",
    "description": "Swap left and right audio channels",
    "usage": "swap",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /swap.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "surround",
    "description": "Pseudo-surround using channel matrix and slow rotation",
    "usage": "surround",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /surround.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "telephone",
    "description": "Telephone bandpass EQ approximation at 300Hz-3.4kHz",
    "usage": "telephone",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /telephone.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "subwoofer",
    "description": "Sub-bass focus for deep low-end extension",
    "usage": "subwoofer",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /subwoofer.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "daycore",
    "description": "Slower and lower-pitched playback — daycore aesthetic",
    "usage": "daycore",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /daycore.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "space",
    "description": "Ethereal spatial effect using rotation and vibrato",
    "usage": "space",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /space.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "mono",
    "description": "Collapse stereo to full mono",
    "usage": "mono",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /mono.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "dream",
    "description": "Dreamy washed-out effect using vibrato, tremolo and low-pass",
    "usage": "dream",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /dream.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "lofi",
    "description": "Lo-fi degradation with rolled-off highs and low-pass",
    "usage": "lofi",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /lofi.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "loudness",
    "description": "Gain boost for increased perceived loudness",
    "usage": "loudness",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /loudness.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "16d",
    "description": "Apply 16D rotation filter to the music",
    "usage": "16d",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /16d.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "vocal-boost",
    "description": "Boost vocal presence range at 2-6kHz",
    "usage": "vocal-boost",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /vocal-boost.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "radio",
    "description": "AM radio bandpass EQ approximation",
    "usage": "radio",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /radio.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "megabass",
    "description": "Maximum bass boost with aggressive compensation",
    "usage": "megabass",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /megabass.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "warp",
    "description": "Warped distortion combined with pitch modulation",
    "usage": "warp",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /warp.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "doubletime",
    "description": "Double-speed playback with pitch preserved",
    "usage": "doubletime",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /doubletime.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "underwater",
    "description": "Underwater muffled effect using heavy low-pass and slow tremolo",
    "usage": "underwater",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /underwater.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "cavern",
    "description": "Cave-like effect using low-pass, rotation and light distortion",
    "usage": "cavern",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /cavern.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "pulsate",
    "description": "Medium-frequency tremolo pulse at 3Hz",
    "usage": "pulsate",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /pulsate.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "speaker",
    "description": "Small speaker simulation with limited frequency response",
    "usage": "speaker",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /speaker.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "robot",
    "description": "Robot voice approximation using high-frequency vibrato and light distortion",
    "usage": "robot",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /robot.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "latin",
    "description": "Latin low-end rhythm and upper percussion emphasis",
    "usage": "latin",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /latin.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "lush",
    "description": "Subtle tremolo and vibrato modulation for lush sound",
    "usage": "lush",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /lush.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "reverb",
    "description": "Apply reverb equalizer preset to the music",
    "usage": "reverb",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /reverb.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "opera",
    "description": "Opera vocal intelligibility and upper-mid presence",
    "usage": "opera",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /opera.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "pitchdown",
    "description": "Pitch shift down by 15% at normal speed",
    "usage": "pitchdown",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /pitchdown.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "concert",
    "description": "Concert hall tonal shaping — EQ approximation",
    "usage": "concert",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /concert.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "funk",
    "description": "Funk mid-bass punch and groove",
    "usage": "funk",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /funk.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "karaoke",
    "description": "Center-channel vocal attenuation — works on center-panned vocals only",
    "usage": "karaoke",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /karaoke.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "vaporwave",
    "description": "Apply vaporwave equalizer preset to the music",
    "usage": "vaporwave",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /vaporwave.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "halftime",
    "description": "Half-speed playback with pitch preserved",
    "usage": "halftime",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /halftime.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "anime",
    "description": "Anime OP bright upper mids and controlled air",
    "usage": "anime",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /anime.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "echo",
    "description": "Echo delay effect — requires FFmpeg external DSP",
    "usage": "echo",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /echo.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "vocal-remover",
    "description": "Remove center-panned vocals using karaoke phase cancellation",
    "usage": "vocal-remover",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /vocal-remover.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "edm",
    "description": "EDM sub-bass and sparkle preset with volume compensation",
    "usage": "edm",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /edm.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "superbass",
    "description": "Apply superbass equalizer preset to the music",
    "usage": "superbass",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /superbass.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "glitch",
    "description": "Harsh asymmetric waveshaping for glitch artifacts",
    "usage": "glitch",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /glitch.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "metal",
    "description": "Apply metal equalizer preset to the music",
    "usage": "metal",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /metal.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "clarity",
    "description": "High-frequency presence boost for clearer audio",
    "usage": "clarity",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /clarity.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "flutter",
    "description": "High-frequency tremolo flutter at 8Hz",
    "usage": "flutter",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /flutter.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "crispboost",
    "description": "Aggressive high-frequency boost for ultra-bright sound",
    "usage": "crispboost",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /crispboost.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "cosmic",
    "description": "Cosmic spatial effect using slow rotation and vibrato",
    "usage": "cosmic",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /cosmic.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "spin",
    "description": "Standard 8D stereo rotation at 0.30Hz",
    "usage": "spin",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /spin.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "fullrange",
    "description": "Full-range flat response — all EQ bands at zero",
    "usage": "fullrange",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /fullrange.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "smooth",
    "description": "Smooth high-frequency reduction with low-pass softening",
    "usage": "smooth",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /smooth.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "country",
    "description": "Country kick body and vocal presence",
    "usage": "country",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /country.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "gaming",
    "description": "Apply gaming equalizer preset to the music",
    "usage": "gaming",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /gaming.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "distort",
    "description": "Moderate waveshaping distortion",
    "usage": "distort",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /distort.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "chipmunk",
    "description": "High-pitched fast playback — chipmunk effect",
    "usage": "chipmunk",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /chipmunk.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "nightcore",
    "description": "Apply nightcore equalizer preset to the music",
    "usage": "nightcore",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /nightcore.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "deepwater",
    "description": "Deep underwater effect with very heavy low-pass and slow tremolo",
    "usage": "deepwater",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /deepwater.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "vocal-cut",
    "description": "Reduce vocal presence frequency region",
    "usage": "vocal-cut",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /vocal-cut.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "speeddown",
    "description": "Slower playback at 75% speed with pitch preserved",
    "usage": "speeddown",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /speeddown.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "airboost",
    "description": "Ultra-high air frequency boost",
    "usage": "airboost",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /airboost.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "oldschool",
    "description": "Apply oldschool equalizer preset to the music",
    "usage": "oldschool",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /oldschool.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "indie",
    "description": "Indie warmth with softened high end and air",
    "usage": "indie",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /indie.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "speedup",
    "description": "Faster playback at 125% speed with pitch preserved",
    "usage": "speedup",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /speedup.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "basshead",
    "description": "Extreme sub-bass boost for bass-heavy genres",
    "usage": "basshead",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /basshead.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "phonk",
    "description": "Phonk sub-bass weight with mild saturation distortion",
    "usage": "phonk",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /phonk.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "hifi",
    "description": "Flat response with subtle sub-bass and air boost",
    "usage": "hifi",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /hifi.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "heavydistort",
    "description": "Aggressive waveshaping distortion — intentionally harsh",
    "usage": "heavydistort",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /heavydistort.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "punchbass",
    "description": "Mid-bass emphasis for punchy kick drums",
    "usage": "punchbass",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /punchbass.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "megaphone",
    "description": "Megaphone bandpass approximation with light distortion",
    "usage": "megaphone",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /megaphone.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "chorus",
    "description": "Chorus modulated delay — requires FFmpeg external DSP",
    "usage": "chorus",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /chorus.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "vibra",
    "description": "Standard musical vibrato at 5Hz",
    "usage": "vibra",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /vibra.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "stadium",
    "description": "Stadium large-venue EQ approximation",
    "usage": "stadium",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /stadium.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "treblecut",
    "description": "High-frequency reduction for a dark, smooth sound",
    "usage": "treblecut",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /treblecut.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "ambient",
    "description": "Ambient spatial effect using slow rotation and low-pass",
    "usage": "ambient",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /ambient.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "soul",
    "description": "Soul warm low mids and vocal presence",
    "usage": "soul",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /soul.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "slowmo",
    "description": "Apply slowmotion timescale filter to the music",
    "usage": "slowmo",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /slowmo.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "8d",
    "description": "Apply 8D rotation filter to the music",
    "usage": "8d",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /8d.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "pitchup",
    "description": "Pitch shift up by 15% at normal speed",
    "usage": "pitchup",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /pitchup.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "narrow",
    "description": "Narrow the stereo field",
    "usage": "narrow",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /narrow.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "blues",
    "description": "Blues low-mid warmth and vocal presence",
    "usage": "blues",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /blues.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "rnb",
    "description": "R&B sub-bass warmth and smooth presence",
    "usage": "rnb",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /rnb.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "galaxyspin",
    "description": "Fast 8D stereo rotation at 0.70Hz",
    "usage": "galaxyspin",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /galaxyspin.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "slowspin",
    "description": "Subtle 8D slow stereo rotation at 0.10Hz",
    "usage": "slowspin",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /slowspin.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "wobble",
    "description": "Low-frequency tremolo for bass wobble at 0.8Hz",
    "usage": "wobble",
    "category": "filters/premium",
    "file": "src/commands/filters/premium /wobble.js",
    "slash": true,
    "categoryLabel": "Filters / Premium"
  },
  {
    "name": "flat",
    "description": "Apply flat equalizer preset to the music",
    "usage": "flat",
    "category": "filters/free",
    "file": "src/commands/filters/free/flat.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "basscut",
    "description": "Reduce sub-bass for a thin, clean sound",
    "usage": "basscut",
    "category": "filters/free",
    "file": "src/commands/filters/free/basscut.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "bassboost",
    "description": "Apply bassboost equalizer preset to the music",
    "usage": "bassboost",
    "category": "filters/free",
    "file": "src/commands/filters/free/bassboost.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "headphone",
    "description": "Generic headphone tonal correction curve",
    "usage": "headphone",
    "category": "filters/free",
    "file": "src/commands/filters/free/headphone.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "treble",
    "description": "Apply treble equalizer preset to the music",
    "usage": "treble",
    "category": "filters/free",
    "file": "src/commands/filters/free/treble.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "stereo",
    "description": "Controlled crossfeed for natural stereo imaging",
    "usage": "stereo",
    "category": "filters/free",
    "file": "src/commands/filters/free/stereo.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "boost",
    "description": "Apply boost equalizer preset to the music",
    "usage": "boost",
    "category": "filters/free",
    "file": "src/commands/filters/free/boost.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "electronic",
    "description": "Apply electronic equalizer preset to the music",
    "usage": "electronic",
    "category": "filters/free",
    "file": "src/commands/filters/free/electronic.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "reset",
    "description": "Reset all audio filters to default",
    "usage": "reset",
    "category": "filters/free",
    "file": "src/commands/filters/free/reset.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "bright",
    "description": "Apply bright equalizer preset to the music",
    "usage": "bright",
    "category": "filters/free",
    "file": "src/commands/filters/free/bright.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "natural",
    "description": "Completely flat response — all EQ bands at zero",
    "usage": "natural",
    "category": "filters/free",
    "file": "src/commands/filters/free/natural.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "classical",
    "description": "Apply classical equalizer preset to the music",
    "usage": "classical",
    "category": "filters/free",
    "file": "src/commands/filters/free/classical.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "deepbass",
    "description": "Apply deepbass equalizer preset to the music",
    "usage": "deepbass",
    "category": "filters/free",
    "file": "src/commands/filters/free/deepbass.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "jazz",
    "description": "Apply jazz equalizer preset to the music",
    "usage": "jazz",
    "category": "filters/free",
    "file": "src/commands/filters/free/jazz.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "pop",
    "description": "Apply pop equalizer preset to the music",
    "usage": "pop",
    "category": "filters/free",
    "file": "src/commands/filters/free/pop.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "warm",
    "description": "Apply warm equalizer preset to the music",
    "usage": "warm",
    "category": "filters/free",
    "file": "src/commands/filters/free/warm.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "rock",
    "description": "Apply rock equalizer preset to the music",
    "usage": "rock",
    "category": "filters/free",
    "file": "src/commands/filters/free/rock.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "presence",
    "description": "Vocal presence range boost at 2-4kHz",
    "usage": "presence",
    "category": "filters/free",
    "file": "src/commands/filters/free/presence.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "reggae",
    "description": "Apply reggae equalizer preset to the music",
    "usage": "reggae",
    "category": "filters/free",
    "file": "src/commands/filters/free/reggae.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "vocals",
    "description": "Apply vocals equalizer preset to the music",
    "usage": "vocals",
    "category": "filters/free",
    "file": "src/commands/filters/free/vocals.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "soft",
    "description": "Apply soft equalizer preset to the music",
    "usage": "soft",
    "category": "filters/free",
    "file": "src/commands/filters/free/soft.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "hiphop",
    "description": "Apply hiphop equalizer preset to the music",
    "usage": "hiphop",
    "category": "filters/free",
    "file": "src/commands/filters/free/hiphop.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "trebleboost",
    "description": "Full treble shelf boost for bright sound",
    "usage": "trebleboost",
    "category": "filters/free",
    "file": "src/commands/filters/free/trebleboost.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "acoustic",
    "description": "Acoustic warmth and presence for acoustic music",
    "usage": "acoustic",
    "category": "filters/free",
    "file": "src/commands/filters/free/acoustic.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "width",
    "description": "Stereo width enhancement via channel matrix",
    "usage": "width",
    "category": "filters/free",
    "file": "src/commands/filters/free/width.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "club",
    "description": "Club V-curve EQ with bass and treble boost",
    "usage": "club",
    "category": "filters/free",
    "file": "src/commands/filters/free/club.js",
    "slash": true,
    "categoryLabel": "Filters / Free"
  },
  {
    "name": "slist",
    "description": "View and manage all servers the bot is in (Owner Only)",
    "usage": "srvlist",
    "category": "developer",
    "file": "src/commands/developer/srvlist.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "presetlist",
    "description": "View current music card preset and reset to default (Owner Only)",
    "usage": "presetlist",
    "category": "developer",
    "file": "src/commands/developer/presetlist.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "rlbot",
    "description": "Perform a hard restart on the bot process (Owner Only)",
    "usage": "rlbot",
    "category": "developer",
    "file": "src/commands/developer/rdbot.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "vc",
    "description": "Owner-only voice channel management",
    "usage": "vc <subcommand> [args]",
    "category": "developer",
    "file": "src/commands/developer/vccmd.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "preset",
    "description": "Change the global music card preset theme (Owner Only)",
    "usage": "preset",
    "category": "developer",
    "file": "src/commands/developer/preset.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "clusterdetails",
    "description": "Full cluster & shard health dashboard",
    "usage": "clusterdetails",
    "category": "developer",
    "file": "src/commands/developer/shardsinfo.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "gadmin",
    "description": "Grant or remove Administrator role in a target guild",
    "usage": "gadmin <guildId> | radmin <guildId>",
    "category": "developer",
    "file": "src/commands/developer/gadmin.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "lava",
    "description": "Lavalink Global Network Dashboard with pagination",
    "usage": "lava",
    "category": "developer",
    "file": "src/commands/developer/lava.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "bdg",
    "description": "Manage profile badges",
    "usage": "bdg <name add|name remove|name list|add|remove|view|reset> ...",
    "category": "developer",
    "file": "src/commands/developer/badge.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "cnode",
    "description": "Check which Lavalink node a guild",
    "usage": "cnode [guildId]",
    "category": "developer",
    "file": "src/commands/developer/cnode.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "247list",
    "description": "View and manage all guilds where 24/7 mode is enabled (Owner Only)",
    "usage": "247list",
    "category": "developer",
    "file": "src/commands/developer/dsb247.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "botadmin",
    "description": "Manage bot administrators (Hardcoded Owners Only)",
    "usage": "botadmin <list|config|add|remove> <@user/id/username>",
    "category": "developer",
    "file": "src/commands/developer/adminadd.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "dm",
    "description": "Send a direct message to a user as the bot (Owner Only)",
    "usage": "dm @user/id/name <message>",
    "category": "developer",
    "file": "src/commands/developer/dm.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "expire",
    "description": "Manage and notify expired premium subscriptions (Owner Only)",
    "usage": "expire noti",
    "category": "developer",
    "file": "src/commands/developer/noti.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "noprefix",
    "description": "Manage No-Prefix access for users and guilds.",
    "usage": "noprefix <add/remove/extend> <id/mention> [duration]",
    "category": "developer",
    "file": "src/commands/developer/noprefixmanage.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "rl",
    "description": "Reloads all commands for development purposes",
    "usage": "rl",
    "category": "developer",
    "file": "src/commands/developer/rl.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "node",
    "description": "Lavalink Cluster Monitor — Full details with pagination",
    "usage": "node",
    "category": "developer",
    "file": "src/commands/developer/node.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "ownercusm",
    "description": "Owner-only: reset premium mirror pfp/banner for a guild or all guilds",
    "usage": "ownercusm reset <guildId|all>",
    "category": "developer",
    "file": "src/commands/developer/ownercusm.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "gmrcnv",
    "description": "Change the left-side background image for the Gamer Music Card",
    "usage": "gmrcnv <url>",
    "category": "developer",
    "file": "src/commands/developer/gmrcnv.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "ubl",
    "description": "User Blacklist Management (Owner Only)",
    "usage": "ubl <add|remove|check|list> [userid] [reason]",
    "category": "developer",
    "file": "src/commands/developer/ubl.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "ai",
    "description": "Manage the AI chat channel for this server (owner-only)",
    "usage": "ai <activate <#channel> | deactivate | config>",
    "category": "developer",
    "file": "src/commands/developer/ai.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "gbl",
    "description": "Guild Blacklist Management (Owner Only)",
    "usage": "gbl <add|remove|check|list> [guildid] [reason]",
    "category": "developer",
    "file": "src/commands/developer/gbl.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "backup",
    "description": "Creates a backup of the bot source code and sends it to the owner",
    "usage": "backup",
    "category": "developer",
    "file": "src/commands/developer/backup.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "orderpay",
    "description": "Mark a credit order as paid and add balance (Owner/Admin)",
    "usage": "orderpay <order_id> [notes]",
    "category": "developer",
    "file": "src/commands/developer/orderpay.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "team",
    "description": "Manage the Azelia team roster, grant limits and premium grants",
    "usage": "team <add|remove|config|limit|grant|list> ...",
    "category": "developer",
    "file": "src/commands/developer/teammanage.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "sudo",
    "description": "Run a command as another user (owner-only)",
    "usage": "sudo @user/id/name <command> [args...]",
    "category": "developer",
    "file": "src/commands/developer/sudo.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "lbedit",
    "description": "[OWNER] Manually set leaderboard counts for users, guilds, or songs",
    "usage": "lbedit <user|guild|songs> <target> <count|reset>",
    "category": "developer",
    "file": "src/commands/developer/lbedit.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "clearemoji",
    "description": "Delete ALL emojis from a specified guild (Owner Only)",
    "usage": "clearemoji <guild_id>",
    "category": "developer",
    "file": "src/commands/developer/clearemoji.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "gi",
    "description": "Full guild details — every available field (Owner only)",
    "usage": "gi <guild_id>",
    "category": "developer",
    "file": "src/commands/developer/guildinfo.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "canvaprem",
    "description": "Toggle the Canva (premium music card) feature for a guild (Owner Only)",
    "usage": "canvaprem <add|remove|status> <guild_id>",
    "category": "developer",
    "file": "src/commands/developer/premcanva.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "jsk",
    "description": "Evaluate JavaScript code (Developer Only)",
    "usage": "jsk",
    "category": "developer",
    "file": "src/commands/developer/jsk.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "order",
    "description": "Manage your Azelia orders",
    "usage": "order <list|cancel|details|pay> [args]",
    "category": "developer",
    "file": "src/commands/developer/order.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "shipvalu",
    "description": "Sets a custom ship percentage for a user.",
    "usage": "shipvalu",
    "category": "developer",
    "file": "src/commands/developer/shipvalue.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "updateslash",
    "description": "Registers or updates all slash commands with Discord globally (Owner Only)",
    "usage": "updateslash",
    "category": "developer",
    "file": "src/commands/developer/slahs.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "ctrllink",
    "description": "Create a custom invite link for a server (Owner Only)",
    "usage": "ctrllink <server_id> <duration> <newlink/yes/no>",
    "category": "developer",
    "file": "src/commands/developer/crtlnk.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "purge",
    "description": "Bulk delete messages in a channel (Owner Only)",
    "usage": "purge <count|all>",
    "category": "developer",
    "file": "src/commands/developer/purge.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "votenoti",
    "description": "Configure discordbotlist.com vote notification channel (Owner only)",
    "usage": "votenoti <config|set|reset> [channel]",
    "category": "developer",
    "file": "src/commands/developer/votenoti.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "code",
    "description": "Generate a discount coupon code (Owner Only)",
    "usage": "code create <percent|flat> <value> [max_redemptions] [duration]",
    "category": "developer",
    "file": "src/commands/developer/code.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "votebypass",
    "description": "Manage vote bypass for users and guilds (Hardcoded Owners Only)",
    "usage": "votebypass grant <useruid/guilduid> <add/remove/reset>",
    "category": "developer",
    "file": "src/commands/developer/votebypass.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "crdt",
    "description": "Developer: manage user credit balances",
    "usage": "crdt <add|remove|status> <user> [user|guild] [count]",
    "category": "developer",
    "file": "src/commands/developer/crdt.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "rping",
    "description": "Raw latency diagnostics — owner only",
    "usage": "rping",
    "category": "developer",
    "file": "src/commands/developer/rping.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "mnt",
    "description": "Enable or disable maintenance mode globally or per-command",
    "usage": "mnt <enable|disable> <all|cmdname> [reason]",
    "category": "developer",
    "file": "src/commands/developer/mnt.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "ownz",
    "description": "Display the supreme Developer and Owner command manifest.",
    "usage": "ownz",
    "category": "developer",
    "file": "src/commands/developer/ownz.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "orderinfo",
    "description": "Check your order status OR submit UTR after payment",
    "usage": "utr <order_id> [utr_number]",
    "category": "developer",
    "file": "src/commands/developer/orderinfo.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "orderlist",
    "description": "View your pending orders (Owner: view any user",
    "usage": "orderlist [user]",
    "category": "developer",
    "file": "src/commands/developer/orderlist.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "prem",
    "description": "Manage Guild/User Premium subscriptions (Owner/Admin/Team)",
    "usage": "prem <add|remove|extend|stats|cleanup> <guild_id|user_id> [duration] [reason]",
    "category": "developer",
    "file": "src/commands/developer/prem.js",
    "slash": false,
    "categoryLabel": "Developer"
  },
  {
    "name": "sc",
    "description": "SoundCloud integration — browse profiles, tracks, playlists & more",
    "usage": "sc <subcommand> [args]",
    "category": "soundcloud",
    "file": "src/commands/soundcloud/sc.js",
    "slash": false,
    "categoryLabel": "Soundcloud"
  },
  {
    "name": "ship",
    "description": "Ship two users together with a love percentage banner",
    "usage": "ship [@user1] [@user2 | random]",
    "category": "information",
    "file": "src/commands/information/ship.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "ping",
    "description": "Real-time Network Latency Dashboard",
    "usage": "ping",
    "category": "information",
    "file": "src/commands/information/ping.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "invite",
    "description": "Get the bot",
    "usage": "invite",
    "category": "information",
    "file": "src/commands/information/invite.js",
    "slash": false,
    "categoryLabel": "Information"
  },
  {
    "name": "privacy-policy",
    "description": "View Azelia",
    "usage": "pp",
    "category": "information",
    "file": "src/commands/information/pp.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "vote",
    "description": "Vote for Azelia on discordbotlist.com",
    "usage": "vote",
    "category": "information",
    "file": "src/commands/information/vote.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "serverinfo",
    "description": "Shows detailed information about the server.",
    "usage": "serverinfo",
    "category": "information",
    "file": "src/commands/information/serverinfo.js",
    "slash": false,
    "categoryLabel": "Information"
  },
  {
    "name": "report",
    "description": "Report bugs or issues with the bot to the developers.",
    "usage": "report <issue description>",
    "category": "information",
    "file": "src/commands/information/report.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "userinfo",
    "description": "Shows a clean profile card with live status & badges.",
    "usage": "userinfo [@user]",
    "category": "information",
    "file": "src/commands/information/userinfo.js",
    "slash": false,
    "categoryLabel": "Information"
  },
  {
    "name": "help",
    "description": "Shows all available commands and their information",
    "usage": "help [command]",
    "category": "information",
    "file": "src/commands/information/help.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "mypoints",
    "description": "Check your Azelia listening points, rank, and stats.",
    "usage": "mypoints [@user]",
    "category": "information",
    "file": "src/commands/information/mypoints.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "banner",
    "description": "Get a user\\",
    "usage": "!banner [@user|userID]",
    "category": "information",
    "file": "src/commands/information/banner.js",
    "slash": false,
    "categoryLabel": "Information"
  },
  {
    "name": "clusterinfo",
    "description": "Display cluster and shard information for this instance.",
    "usage": "clusterinfo",
    "category": "information",
    "file": "src/commands/information/Clusterinfo.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "membercount",
    "description": "Shows the server member count with a detailed breakdown.",
    "usage": "membercount",
    "category": "information",
    "file": "src/commands/information/membercount.js",
    "slash": false,
    "categoryLabel": "Information"
  },
  {
    "name": "botinfo",
    "description": "Shows detailed information about the bot.",
    "usage": "botinfo",
    "category": "information",
    "file": "src/commands/information/botinfo.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "avatar",
    "description": "Shows a user\\",
    "usage": "!avatar [@user]",
    "category": "information",
    "file": "src/commands/information/avatar.js",
    "slash": false,
    "categoryLabel": "Information"
  },
  {
    "name": "support",
    "description": "Get support and help with the bot.",
    "usage": "support",
    "category": "information",
    "file": "src/commands/information/support.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "azelia_user",
    "description": "View Azelia",
    "usage": "top [users|guilds|songs]",
    "category": "information",
    "file": "src/commands/information/top.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "stats",
    "description": "Display bot statistics",
    "usage": "stats",
    "category": "information",
    "file": "src/commands/information/stats.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "tos",
    "description": "View Azelia",
    "usage": "tos",
    "category": "information",
    "file": "src/commands/information/tos.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "feedback",
    "description": "Send feedback about the bot to the developers.",
    "usage": "feedback <your feedback>",
    "category": "information",
    "file": "src/commands/information/feedback.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "afk",
    "description": "Set your AFK status with an optional message",
    "usage": "afk [message]",
    "category": "information",
    "file": "src/commands/information/afk.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "suggest",
    "description": "Suggest new features or improvements for the bot.",
    "usage": "suggest <your suggestion>",
    "category": "information",
    "file": "src/commands/information/suggest.js",
    "slash": true,
    "categoryLabel": "Information"
  },
  {
    "name": "customprofile",
    "description": "Customize the bot",
    "usage": "customprofile",
    "category": "premium",
    "file": "src/commands/premium/customprofile.js",
    "slash": true,
    "categoryLabel": "Premium"
  },
  {
    "name": "premiuminfo",
    "description": "View the full Azelia Premium feature guide",
    "usage": "premiuminfo",
    "category": "premium",
    "file": "src/commands/premium/premiumInfo.js",
    "slash": true,
    "categoryLabel": "Premium"
  },
  {
    "name": "azelia_tiick",
    "description": "Purchase credits for your Azelia account",
    "usage": "buy [user|guild] [credits]",
    "category": "premium",
    "file": "src/commands/premium/buy.js",
    "slash": true,
    "categoryLabel": "Premium"
  },
  {
    "name": "noprefixtoggle",
    "description": "Check or manage your personal No-Prefix perk",
    "usage": "np <status|enable|disable>",
    "category": "premium",
    "file": "src/commands/premium/noprefixtoggle.js",
    "slash": true,
    "categoryLabel": "Premium"
  },
  {
    "name": "premiumactivate",
    "description": "Activate User Premium or Guild Premium using your credits",
    "usage": "premiumactivate [guildid]",
    "category": "premium",
    "file": "src/commands/premium/premiumactivate.js",
    "slash": true,
    "categoryLabel": "Premium"
  },
  {
    "name": "premiumstatus",
    "description": "Check premium status for yourself, a user, or a server",
    "usage": "premiumstatus [user id / mention / guild id]",
    "category": "premium",
    "file": "src/commands/premium/premiumStatus.js",
    "slash": true,
    "categoryLabel": "Premium"
  },
  {
    "name": "premium",
    "description": "Manage your Azelia Premium subscriptions and credits",
    "usage": "premium [info|pricing|activate|status|credits|deactivate|gift|transfer]",
    "category": "premium",
    "file": "src/commands/premium/premium.js",
    "slash": true,
    "categoryLabel": "Premium"
  },
  {
    "name": "premiumpricing",
    "description": "View Azelia Premium plans and pricing",
    "usage": "premiumpricing",
    "category": "premium",
    "file": "src/commands/premium/premiumpricing.js",
    "slash": true,
    "categoryLabel": "Premium"
  },
  {
    "name": "premiumdeactivate",
    "description": "Deactivate Guild Premium for this or another server",
    "usage": "premiumdeactivate [guildid]",
    "category": "premium",
    "file": "src/commands/premium/premiumdeactivate.js",
    "slash": true,
    "categoryLabel": "Premium"
  },
  {
    "name": "premiumcredits",
    "description": "View your Azelia credit balances and recent transactions",
    "usage": "premiumcredits",
    "category": "premium",
    "file": "src/commands/premium/premiumcredits.js",
    "slash": true,
    "categoryLabel": "Premium"
  },
  {
    "name": "premiumgift",
    "description": "Give your Azelia credits to another user",
    "usage": "premiumgift <user> <amount>",
    "category": "premium",
    "file": "src/commands/premium/premiumgift.js",
    "slash": true,
    "categoryLabel": "Premium"
  },
  {
    "name": "redeem",
    "description": "Redeem a discount code for your next purchase",
    "usage": "redeem <code>",
    "category": "premium",
    "file": "src/commands/premium/redeem.js",
    "slash": true,
    "categoryLabel": "Premium"
  },
  {
    "name": "musiccard",
    "description": "Enable or disable premium canva music card for this guild",
    "usage": "musiccard <enable/disable>",
    "category": "premium",
    "file": "src/commands/premium/canvaenable.js",
    "slash": false,
    "categoryLabel": "Premium"
  },
  {
    "name": "azelia_premium",
    "description": "Set a personal custom prefix (User Premium required)",
    "usage": "userprefix [newprefix | show | enable | disable | reset]",
    "category": "premium",
    "file": "src/commands/premium/userprefix.js",
    "slash": false,
    "categoryLabel": "Premium"
  },
  {
    "name": "profile",
    "description": "Shows a personalized clean profile card with achievements.",
    "usage": "profile [@user]",
    "category": "utility",
    "file": "src/commands/utility/profile.js",
    "slash": false,
    "categoryLabel": "Utility"
  },
  {
    "name": "glist",
    "description": "List all giveaways in this server",
    "usage": "glist",
    "category": "utility",
    "file": "src/commands/utility/glist.js",
    "slash": false,
    "categoryLabel": "Utility"
  },
  {
    "name": "greroll",
    "description": "Reroll winners for an ended giveaway",
    "usage": "greroll [message_id]",
    "category": "utility",
    "file": "src/commands/utility/greroll.js",
    "slash": false,
    "categoryLabel": "Utility"
  },
  {
    "name": "gstart",
    "description": "Start a giveaway",
    "usage": "gstart <duration> <winners> <prize> [#channel | channel_id]",
    "category": "utility",
    "file": "src/commands/utility/gstart.js",
    "slash": false,
    "categoryLabel": "Utility"
  },
  {
    "name": "gend",
    "description": "End an active giveaway early",
    "usage": "gend [message_id]",
    "category": "utility",
    "file": "src/commands/utility/gend.js",
    "slash": false,
    "categoryLabel": "Utility"
  },
  {
    "name": "setdefaultvolume",
    "description": "Set the default volume for new music players in this server",
    "usage": "setdefaultvolume [volume]",
    "category": "settings",
    "file": "src/commands/settings/volume.js",
    "slash": true,
    "categoryLabel": "Settings"
  },
  {
    "name": "moveme",
    "description": "Bring the bot to your voice channel",
    "usage": "moveme",
    "category": "settings",
    "file": "src/commands/settings/moveme.js",
    "slash": true,
    "categoryLabel": "Settings"
  },
  {
    "name": "247",
    "description": "Toggle 24/7 mode — keeps the bot in VC permanently",
    "usage": "247 [on/off]",
    "category": "settings",
    "file": "src/commands/settings/stay247.js",
    "slash": true,
    "categoryLabel": "Settings"
  },
  {
    "name": "gamemode",
    "description": "Auto-queue fitting music when members start playing games",
    "usage": "gamemode <on | off | status | games>",
    "category": "settings",
    "file": "src/commands/settings/gamemode.js",
    "slash": true,
    "categoryLabel": "Settings"
  },
  {
    "name": "ignore",
    "description": "Manage ignored channels, commands, and users for this server",
    "usage": "ignore <channel|command|user> <add|remove|list> <target>",
    "category": "settings",
    "file": "src/commands/settings/ignore.js",
    "slash": false,
    "categoryLabel": "Settings"
  },
  {
    "name": "djrole",
    "description": "Manage the DJ role for audio filter commands",
    "usage": "djrole <set <role> | reset | config>",
    "category": "settings",
    "file": "src/commands/settings/djrole.js",
    "slash": true,
    "categoryLabel": "Settings"
  },
  {
    "name": "prefix",
    "description": "View or change the bot prefix for this server.",
    "usage": "prefix [new prefix]",
    "category": "settings",
    "file": "src/commands/settings/Prefix.js",
    "slash": true,
    "categoryLabel": "Settings"
  },
  {
    "name": "requestchannel",
    "description": "Set a channel where members can drop audio files to queue them",
    "usage": "requestchannel <set <#channel> | remove | status>",
    "category": "settings",
    "file": "src/commands/settings/requestchannel.js",
    "slash": true,
    "categoryLabel": "Settings"
  },
  {
    "name": "listenalong",
    "description": "Auto-queue Spotify tracks when members start listening",
    "usage": "listenalong <on | off | status>",
    "category": "settings",
    "file": "src/commands/settings/listenalong.js",
    "slash": true,
    "categoryLabel": "Settings"
  },
  {
    "name": "joingate",
    "description": "Protect your server from alt/new accounts with automatic gating",
    "usage": "joingate <on [days] [kick|verify] | off | verify @role | status>",
    "category": "settings",
    "file": "src/commands/settings/joingate.js",
    "slash": false,
    "categoryLabel": "Settings"
  },
  {
    "name": "disc",
    "description": "Discogs integration — browse releases, artists, labels & marketplace",
    "usage": "disc <subcommand> [args]",
    "category": "discogs",
    "file": "src/commands/discogs/disc.js",
    "slash": false,
    "categoryLabel": "Discogs"
  },
  {
    "name": "bump",
    "description": "Move track(s) to the top of the queue",
    "usage": "bump <position> [end_position]",
    "category": "music/queue",
    "file": "src/commands/music/queue/bump.js",
    "slash": true,
    "categoryLabel": "Music / Queue"
  },
  {
    "name": "queue",
    "description": "View and manage the song queue with pagination and interactive controls",
    "usage": "queue [page]",
    "category": "music/queue",
    "file": "src/commands/music/queue/q.js",
    "slash": true,
    "categoryLabel": "Music / Queue"
  },
  {
    "name": "loop",
    "description": "Set the loop mode (off / track / queue)",
    "usage": "loop [mode]",
    "category": "music/queue",
    "file": "src/commands/music/queue/loop.js",
    "slash": true,
    "categoryLabel": "Music / Queue"
  },
  {
    "name": "move",
    "description": "Move a track to a different position in the queue",
    "usage": "move <from> <to>",
    "category": "music/queue",
    "file": "src/commands/music/queue/move.js",
    "slash": true,
    "categoryLabel": "Music / Queue"
  },
  {
    "name": "clear",
    "description": "clear the queue songs",
    "usage": "shuffle",
    "category": "music/queue",
    "file": "src/commands/music/queue/clear.js",
    "slash": true,
    "categoryLabel": "Music / Queue"
  },
  {
    "name": "shuffle",
    "description": "Shuffle the current queue",
    "usage": "shuffle",
    "category": "music/queue",
    "file": "src/commands/music/queue/shuffle.js",
    "slash": true,
    "categoryLabel": "Music / Queue"
  },
  {
    "name": "remove",
    "description": "Remove a track from the queue",
    "usage": "remove <position>",
    "category": "music/queue",
    "file": "src/commands/music/queue/remove.js",
    "slash": true,
    "categoryLabel": "Music / Queue"
  },
  {
    "name": "recommendations",
    "description": "Get song recommendations based on what",
    "usage": "recommendations",
    "category": "music/extra",
    "file": "src/commands/music/extra/rec.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "autoplay",
    "description": "Toggle autoplay feature that adds similar songs when queue ends",
    "usage": "autoplay [on|off]",
    "category": "music/extra",
    "file": "src/commands/music/extra/ap.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "seek",
    "description": "Seek to a specific time in the current track using various time formats",
    "usage": "seek <time>",
    "category": "music/extra",
    "file": "src/commands/music/extra/seek.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "like",
    "description": "Like the currently playing song or a specific song",
    "usage": "like",
    "category": "music/extra",
    "file": "src/commands/music/extra/like.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "replay",
    "description": "Replay the current track from the beginning (not available for live streams)",
    "usage": "replay",
    "category": "music/extra",
    "file": "src/commands/music/extra/replay.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "skip",
    "description": "Skip the current track or jump to a specific position in the queue",
    "usage": "skip [amount]",
    "category": "music/extra",
    "file": "src/commands/music/extra/Skip.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "lyrics",
    "description": "Get synchronized lyrics for the currently playing song.",
    "usage": "lyrics",
    "category": "music/extra",
    "file": "src/commands/music/extra/lyric.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "rewind",
    "description": "Rewind the current track by specified seconds (default: 10 seconds, not available for live streams)",
    "usage": "rewind [seconds]",
    "category": "music/extra",
    "file": "src/commands/music/extra/rewind.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "playnow",
    "description": "Play music immediately (skips current song)",
    "usage": "playnow <query> [--src yt/am/sp/sc/dz]",
    "category": "music/extra",
    "file": "src/commands/music/extra/playnow.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "nowplaying",
    "description": "Displays the currently playing song with a beautiful music card",
    "usage": "nowplaying",
    "category": "music/extra",
    "file": "src/commands/music/extra/np.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "previous",
    "description": "Play the previous track from the queue history",
    "usage": "previous",
    "category": "music/extra",
    "file": "src/commands/music/extra/previous.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "skipto",
    "description": "Skip to a specific position in the queue",
    "usage": "skipto <position>",
    "category": "music/extra",
    "file": "src/commands/music/extra/SkipTo.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "forward",
    "description": "Forward the current track by specified seconds (default: 10 seconds, not available for live streams)",
    "usage": "forward [seconds]",
    "category": "music/extra",
    "file": "src/commands/music/extra/forward.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "volume",
    "description": "Adjust or view the music playback volume with an interactive control panel",
    "usage": "volume [level]",
    "category": "music/extra",
    "file": "src/commands/music/extra/vol.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "search",
    "description": "Search for music across multiple platforms",
    "usage": "search <query> [--src yt/sp/am/sc]",
    "category": "music/extra",
    "file": "src/commands/music/extra/search.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "history",
    "description": "View your personal listening history and re-play songs with interactive controls",
    "usage": "history [page]",
    "category": "music/extra",
    "file": "src/commands/music/extra/history.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "favorite",
    "description": "View and play your liked songs",
    "usage": "liked-songs",
    "category": "music/extra",
    "file": "src/commands/music/extra/liked-songs.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "mood",
    "description": "Queue songs that match a vibe/mood",
    "usage": "mood <happy|sad|energetic|chill|romantic|party|focus|angry>",
    "category": "music/extra",
    "file": "src/commands/music/extra/mood.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "unlike",
    "description": "Remove the currently playing song from your liked songs",
    "usage": "unlike",
    "category": "music/extra",
    "file": "src/commands/music/extra/unlike.js",
    "slash": true,
    "categoryLabel": "Music / Extra"
  },
  {
    "name": "play",
    "description": "Play music from YouTube, Spotify, or other platforms",
    "usage": "play <query> [--src yt/am/sp/sc/dz]",
    "category": "music/core",
    "file": "src/commands/music/core/Play.js",
    "slash": true,
    "categoryLabel": "Music / Core"
  },
  {
    "name": "resume",
    "description": "Resume paused playback",
    "usage": "resume",
    "category": "music/core",
    "file": "src/commands/music/core/resume.js",
    "slash": true,
    "categoryLabel": "Music / Core"
  },
  {
    "name": "stop",
    "description": "Stop music playback, clear the queue, and disconnect from the voice channel",
    "usage": "stop",
    "category": "music/core",
    "file": "src/commands/music/core/Stop.js",
    "slash": true,
    "categoryLabel": "Music / Core"
  },
  {
    "name": "join",
    "description": "Summon the bot to your voice channel",
    "usage": "join",
    "category": "music/core",
    "file": "src/commands/music/core/join.js",
    "slash": true,
    "categoryLabel": "Music / Core"
  },
  {
    "name": "pause",
    "description": "Pause the current track",
    "usage": "pause",
    "category": "music/core",
    "file": "src/commands/music/core/pause.js",
    "slash": true,
    "categoryLabel": "Music / Core"
  },
  {
    "name": "mb",
    "description": "MusicBrainz integration — open music encyclopedia",
    "usage": "mb <subcommand> [args]",
    "category": "musicbrainz",
    "file": "src/commands/musicbrainz/mb.js",
    "slash": false,
    "categoryLabel": "Musicbrainz"
  },
  {
    "name": "pl-add",
    "description": "Add current track or entire queue to a playlist",
    "usage": "pl-add [playlist_name/id]",
    "category": "playlists",
    "file": "src/commands/playlists/pl-add.js",
    "slash": true,
    "categoryLabel": "Playlists"
  },
  {
    "name": "pl-delete",
    "description": "Delete one of your custom playlists",
    "usage": "pl-delete <playlist_name_or_id>",
    "category": "playlists",
    "file": "src/commands/playlists/pl-delete.js",
    "slash": true,
    "categoryLabel": "Playlists"
  },
  {
    "name": "playlist-info",
    "description": "View detailed information and manage a custom playlist",
    "usage": "playlist-info [playlist_id_or_name]",
    "category": "playlists",
    "file": "src/commands/playlists/pl-info.js",
    "slash": true,
    "categoryLabel": "Playlists"
  },
  {
    "name": "pl-create",
    "description": "Create a new custom playlist",
    "usage": "pl-create <name> [description]",
    "category": "playlists",
    "file": "src/commands/playlists/pl-create.js",
    "slash": true,
    "categoryLabel": "Playlists"
  },
  {
    "name": "remove-track",
    "description": "Remove tracks from a playlist by position or range",
    "usage": "remove-track <playlist_name_or_id> <positions>",
    "category": "playlists",
    "file": "src/commands/playlists/pl-remove.js",
    "slash": true,
    "categoryLabel": "Playlists"
  },
  {
    "name": "pl-edit",
    "description": "Edit the name or description of a custom playlist",
    "usage": "pl-edit <playlist_id_or_name>",
    "category": "playlists",
    "file": "src/commands/playlists/pl-edit.js",
    "slash": true,
    "categoryLabel": "Playlists"
  },
  {
    "name": "pl-load",
    "description": "Load a playlist, or specific tracks/ranges from it",
    "usage": "load-playlist <playlist_name_or_id> [positions]",
    "category": "playlists",
    "file": "src/commands/playlists/pl-load.js",
    "slash": true,
    "categoryLabel": "Playlists"
  },
  {
    "name": "my-playlists",
    "description": "View all of your custom playlists",
    "usage": "my-playlists [page]",
    "category": "playlists",
    "file": "src/commands/playlists/my-pl.js",
    "slash": true,
    "categoryLabel": "Playlists"
  },
  {
    "name": "lastfm-recent",
    "description": "View your recent Last.fm scrobbles",
    "usage": "lastfm-recent [limit 1-10]",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-recent.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-play",
    "description": "Play an artist",
    "usage": "lastfm-play <artist name>",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-play.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-search",
    "description": "Search for a track on Last.fm",
    "usage": "lastfm-search <query>",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-search.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-playall",
    "description": "Queue an artist",
    "usage": "lastfm-playall <artist name> [limit 1-10]",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-playall.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-find",
    "description": "Get detailed info about a specific track on Last.fm",
    "usage": "lastfm-find <artist> - <track>",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-find.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-scrobble",
    "description": "Scrobble the currently playing track to your Last.fm",
    "usage": "lastfm-scrobble [artist - title]",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-scrobble.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-topartists",
    "description": "View your top artists on Last.fm",
    "usage": "lastfm-topartists [period: overall/7day/1month/3month/6month/12month]",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-topartists.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-topalbums",
    "description": "View your top albums on Last.fm",
    "usage": "lastfm-topalbums [period]",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-topalbums.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-nowplaying",
    "description": "Show what you (or someone else) are scrobbling right now on Last.fm",
    "usage": "lastfm-nowplaying [@user|lfm:username]",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-nowplaying.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-toptracks",
    "description": "View your top tracks on Last.fm",
    "usage": "lastfm-toptracks [period]",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-toptracks.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-artist",
    "description": "Get info about an artist from Last.fm",
    "usage": "lastfm-artist <name>",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-artist.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-shuffle",
    "description": "Shuffle an artist",
    "usage": "lastfm-shuffle <artist name> [limit 1-10]",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-shuffle.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-profile",
    "description": "View your Last.fm profile statistics",
    "usage": "lastfm-profile [@user|lfm:username]",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-profile.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-logout",
    "description": "Unlink your Last.fm account from Azelia",
    "usage": "lastfm-logout",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-logout.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm-login",
    "description": "Link your Last.fm account to Azelia",
    "usage": "lastfm-login | lastfm-login confirm",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm-login.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "lastfm",
    "description": "Last.fm dashboard — shows your account & available commands",
    "usage": "lastfm",
    "category": "lastfm",
    "file": "src/commands/lastfm/lastfm.js",
    "slash": false,
    "categoryLabel": "Lastfm"
  },
  {
    "name": "bored",
    "description": "Show off your boredom",
    "usage": "bored [@user]",
    "category": "fun",
    "file": "src/commands/fun/bored.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "surprised",
    "description": "Express surprise at someone",
    "usage": "surprised [@user]",
    "category": "fun",
    "file": "src/commands/fun/surprised.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "bully",
    "description": "Playfully bully someone",
    "usage": "bully [@user]",
    "category": "fun",
    "file": "src/commands/fun/bully.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "scared",
    "description": "Show that you are scared",
    "usage": "scared [@user]",
    "category": "fun",
    "file": "src/commands/fun/scared.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "bite",
    "description": "Give someone a playful bite",
    "usage": "bite [@user]",
    "category": "fun",
    "file": "src/commands/fun/bite.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "facepalm",
    "description": "Facepalm at someone",
    "usage": "facepalm [@user]",
    "category": "fun",
    "file": "src/commands/fun/facepalm.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "cheer",
    "description": "Cheer someone on",
    "usage": "cheer [@user]",
    "category": "fun",
    "file": "src/commands/fun/cheer.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "smash",
    "description": "Cartoon-smash someone",
    "usage": "smash [@user]",
    "category": "fun",
    "file": "src/commands/fun/smash.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "lick",
    "description": "Give someone a playful lick",
    "usage": "lick [@user]",
    "category": "fun",
    "file": "src/commands/fun/lick.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "peck",
    "description": "Give someone a quick peck",
    "usage": "peck [@user]",
    "category": "fun",
    "file": "src/commands/fun/peck.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "run",
    "description": "Run away or chase someone",
    "usage": "run [@user]",
    "category": "fun",
    "file": "src/commands/fun/run.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "hate",
    "description": "Express playful hate for someone",
    "usage": "hate [@user]",
    "category": "fun",
    "file": "src/commands/fun/hate.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "love",
    "description": "Express love for someone",
    "usage": "love [@user]",
    "category": "fun",
    "file": "src/commands/fun/love.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "baka",
    "description": "Call someone a baka",
    "usage": "baka [@user]",
    "category": "fun",
    "file": "src/commands/fun/baka.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "beg",
    "description": "Beg someone for something",
    "usage": "beg [@user]",
    "category": "fun",
    "file": "src/commands/fun/beg.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "groan",
    "description": "Groan in exasperation",
    "usage": "groan [@user]",
    "category": "fun",
    "file": "src/commands/fun/groan.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "blush",
    "description": "Blush at someone",
    "usage": "blush [@user]",
    "category": "fun",
    "file": "src/commands/fun/blush.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "bang",
    "description": "Bang dramatically",
    "usage": "bang [@user]",
    "category": "fun",
    "file": "src/commands/fun/bang.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "pet",
    "description": "Pet someone gently",
    "usage": "pet [@user]",
    "category": "fun",
    "file": "src/commands/fun/pet.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "wink",
    "description": "Wink at someone",
    "usage": "wink [@user]",
    "category": "fun",
    "file": "src/commands/fun/wink.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "sulk",
    "description": "Sulk at someone",
    "usage": "sulk [@user]",
    "category": "fun",
    "file": "src/commands/fun/sulk.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "tickle",
    "description": "Tickle someone",
    "usage": "tickle [@user]",
    "category": "fun",
    "file": "src/commands/fun/tickle.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "sip",
    "description": "Sip some tea dramatically",
    "usage": "sip [@user]",
    "category": "fun",
    "file": "src/commands/fun/sip.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "tired",
    "description": "Show how tired you are",
    "usage": "tired [@user]",
    "category": "fun",
    "file": "src/commands/fun/tired.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "nervous",
    "description": "Show your nervousness",
    "usage": "nervous [@user]",
    "category": "fun",
    "file": "src/commands/fun/nervous.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "smile",
    "description": "Smile at someone",
    "usage": "smile [@user]",
    "category": "fun",
    "file": "src/commands/fun/smile.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "handhold",
    "description": "Hold hands with someone",
    "usage": "handhold [@user]",
    "category": "fun",
    "file": "src/commands/fun/handhold.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "angry",
    "description": "Express anger at someone",
    "usage": "angry [@user]",
    "category": "fun",
    "file": "src/commands/fun/angry.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "smirk",
    "description": "Give someone a smirk",
    "usage": "smirk [@user]",
    "category": "fun",
    "file": "src/commands/fun/smirk.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "pat",
    "description": "Give someone a headpat",
    "usage": "pat [@user]",
    "category": "fun",
    "file": "src/commands/fun/pat.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "stare",
    "description": "Stare at someone intensely",
    "usage": "stare [@user]",
    "category": "fun",
    "file": "src/commands/fun/stare.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "cook",
    "description": "Cook something for someone",
    "usage": "cook [@user]",
    "category": "fun",
    "file": "src/commands/fun/cook.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "tap",
    "description": "Tap someone on the shoulder",
    "usage": "tap [@user]",
    "category": "fun",
    "file": "src/commands/fun/tap.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "kiss",
    "description": "Kiss someone",
    "usage": "kiss [@user]",
    "category": "fun",
    "file": "src/commands/fun/kiss.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "fun",
    "description": "Shows all available fun commands grouped by category",
    "usage": "fun",
    "category": "fun",
    "file": "src/commands/fun/fun.js",
    "slash": true,
    "categoryLabel": "Fun"
  },
  {
    "name": "sweat",
    "description": "Sweat nervously",
    "usage": "sweat [@user]",
    "category": "fun",
    "file": "src/commands/fun/sweat.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "wave",
    "description": "Wave at someone",
    "usage": "wave [@user]",
    "category": "fun",
    "file": "src/commands/fun/wave.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "sleep",
    "description": "Fall asleep on someone",
    "usage": "sleep [@user]",
    "category": "fun",
    "file": "src/commands/fun/sleep.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "confused",
    "description": "Show your confusion",
    "usage": "confused [@user]",
    "category": "fun",
    "file": "src/commands/fun/confused.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "shrug",
    "description": "Shrug at someone",
    "usage": "shrug [@user]",
    "category": "fun",
    "file": "src/commands/fun/shrug.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "slap",
    "description": "Slap someone dramatically",
    "usage": "slap [@user]",
    "category": "fun",
    "file": "src/commands/fun/slap.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "nope",
    "description": "Refuse with style",
    "usage": "nope [@user]",
    "category": "fun",
    "file": "src/commands/fun/nope.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "thumbsup",
    "description": "Give someone a thumbs up",
    "usage": "thumbsup [@user]",
    "category": "fun",
    "file": "src/commands/fun/thumbsup.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "whine",
    "description": "Whine at someone",
    "usage": "whine [@user]",
    "category": "fun",
    "file": "src/commands/fun/whine.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "mines",
    "description": "Claim someone as yours",
    "usage": "mines [@user]",
    "category": "fun",
    "file": "src/commands/fun/mines.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "mad",
    "description": "Show you are mad",
    "usage": "mad [@user]",
    "category": "fun",
    "file": "src/commands/fun/mad.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "dance",
    "description": "Dance with someone",
    "usage": "dance [@user]",
    "category": "fun",
    "file": "src/commands/fun/dance.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "clap",
    "description": "Applaud someone",
    "usage": "clap [@user]",
    "category": "fun",
    "file": "src/commands/fun/clap.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "happy",
    "description": "Express your happiness",
    "usage": "happy [@user]",
    "category": "fun",
    "file": "src/commands/fun/happy.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "poke",
    "description": "Poke someone",
    "usage": "poke [@user]",
    "category": "fun",
    "file": "src/commands/fun/poke.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "think",
    "description": "Think deeply about something",
    "usage": "think [@user]",
    "category": "fun",
    "file": "src/commands/fun/think.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "shoot",
    "description": "Shoot someone with finger guns",
    "usage": "shoot [@user]",
    "category": "fun",
    "file": "src/commands/fun/shoot.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "yawn",
    "description": "Yawn dramatically",
    "usage": "yawn [@user]",
    "category": "fun",
    "file": "src/commands/fun/yawn.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "yeet",
    "description": "Yeet someone into the void",
    "usage": "yeet [@user]",
    "category": "fun",
    "file": "src/commands/fun/yeet.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "choke",
    "description": "Dramatically choke",
    "usage": "choke [@user]",
    "category": "fun",
    "file": "src/commands/fun/choke.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "feed",
    "description": "Feed someone",
    "usage": "feed [@user]",
    "category": "fun",
    "file": "src/commands/fun/feed.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "worry",
    "description": "Worry about someone",
    "usage": "worry [@user]",
    "category": "fun",
    "file": "src/commands/fun/worry.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "shy",
    "description": "Be shy around someone",
    "usage": "shy [@user]",
    "category": "fun",
    "file": "src/commands/fun/shy.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "glare",
    "description": "Glare at someone menacingly",
    "usage": "glare [@user]",
    "category": "fun",
    "file": "src/commands/fun/glare.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "flirt",
    "description": "Flirt with someone",
    "usage": "flirt [@user]",
    "category": "fun",
    "file": "src/commands/fun/flirt.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "peek",
    "description": "Peek at someone sneakily",
    "usage": "peek [@user]",
    "category": "fun",
    "file": "src/commands/fun/peek.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "sorry",
    "description": "Apologize to someone",
    "usage": "sorry [@user]",
    "category": "fun",
    "file": "src/commands/fun/sorry.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "cry",
    "description": "Cry your heart out",
    "usage": "cry [@user]",
    "category": "fun",
    "file": "src/commands/fun/cry.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "laugh",
    "description": "Laugh out loud",
    "usage": "laugh [@user]",
    "category": "fun",
    "file": "src/commands/fun/laugh.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "tease",
    "description": "Tease someone playfully",
    "usage": "tease [@user]",
    "category": "fun",
    "file": "src/commands/fun/tease.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "highfive",
    "description": "High five someone",
    "usage": "highfive [@user]",
    "category": "fun",
    "file": "src/commands/fun/highfive.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "dap",
    "description": "Give someone a dap",
    "usage": "dap [@user]",
    "category": "fun",
    "file": "src/commands/fun/dap.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "smug",
    "description": "Be smug at someone",
    "usage": "smug [@user]",
    "category": "fun",
    "file": "src/commands/fun/smug.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "punch",
    "description": "Give someone a playful punch",
    "usage": "punch [@user]",
    "category": "fun",
    "file": "src/commands/fun/punch.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "hug",
    "description": "Give someone a warm hug",
    "usage": "hug [@user]",
    "category": "fun",
    "file": "src/commands/fun/hug.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "bonk",
    "description": "Bonk someone on the head",
    "usage": "bonk [@user]",
    "category": "fun",
    "file": "src/commands/fun/bonk.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "cuddle",
    "description": "Cuddle with someone",
    "usage": "cuddle [@user]",
    "category": "fun",
    "file": "src/commands/fun/cuddle.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "boop",
    "description": "Boop someone on the nose",
    "usage": "boop [@user]",
    "category": "fun",
    "file": "src/commands/fun/boop.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "kill",
    "description": "Cartoon-eliminate someone",
    "usage": "kill [@user]",
    "category": "fun",
    "file": "src/commands/fun/kill.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "pout",
    "description": "Pout at someone",
    "usage": "pout [@user]",
    "category": "fun",
    "file": "src/commands/fun/pout.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "cringe",
    "description": "Cringe at something",
    "usage": "cringe [@user]",
    "category": "fun",
    "file": "src/commands/fun/cringe.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "roll",
    "description": "Roll your eyes or roll around",
    "usage": "roll [@user]",
    "category": "fun",
    "file": "src/commands/fun/roll.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "nom",
    "description": "Nom nom nom",
    "usage": "nom [@user]",
    "category": "fun",
    "file": "src/commands/fun/nom.js",
    "slash": false,
    "categoryLabel": "Fun"
  },
  {
    "name": "dz",
    "description": "Deezer integration — browse tracks, albums, artists & charts",
    "usage": "dz <subcommand> [args]",
    "category": "deezer",
    "file": "src/commands/deezer/dz.js",
    "slash": false,
    "categoryLabel": "Deezer"
  },
  {
    "name": "Spotify-playlists",
    "description": "View and play your linked Spotify playlists with advanced navigation",
    "usage": "playlists",
    "category": "Spotify",
    "file": "src/commands/Spotify/Spotify-Playlist.js",
    "slash": true,
    "categoryLabel": "Spotify"
  },
  {
    "name": "sp-profile",
    "description": "View your linked Spotify profile info",
    "usage": "sp-profile",
    "category": "Spotify",
    "file": "src/commands/Spotify/Spotify-Profile.js",
    "slash": true,
    "categoryLabel": "Spotify"
  },
  {
    "name": "link-spotify",
    "description": "Link your Spotify profile to access your public playlists",
    "usage": "link-spotify <spotify profile URL>",
    "category": "Spotify",
    "file": "src/commands/Spotify/Spotify-link.js",
    "slash": true,
    "categoryLabel": "Spotify"
  },
  {
    "name": "unlink-spotify",
    "description": "Unlink your Spotify profile from the bot",
    "usage": "unlink-spotify",
    "category": "Spotify",
    "file": "src/commands/Spotify/unlink-sp.js",
    "slash": true,
    "categoryLabel": "Spotify"
  },
  {
    "name": "gen",
    "description": "Genius integration — lyrics, song info, artist bios & more",
    "usage": "gen <subcommand> [args]",
    "category": "genius",
    "file": "src/commands/genius/gen.js",
    "slash": false,
    "categoryLabel": "Genius"
  }
];

export const azeliaCommandCategories = [
  'music/core',
  'music/queue',
  'music/extra',
  'settings',
  'playlists',
  'premium',
  'information',
  'utility',
  'soundcloud',
  'deezer',
  'Spotify',
  'genius',
  'discogs',
  'musicbrainz',
  'lastfm',
  'filters/free',
  'filters/premium',
  'fun',
  'developer',
];
