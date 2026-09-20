# Azelia Web Dashboard

Web dashboard and browser player UI rebuilt around the current **Azelia** Discord music bot source.

## What is synchronized

The dashboard data model is generated from the supplied Azelia source archive and currently tracks:

- 343 command modules across music, queues, settings, playlists, premium, providers, filters, information, utility, Last.fm, fun and developer categories
- 8 resolver provider definitions
- Genius, Discogs, MusicBrainz, iTunes, OpenGraph, JSON-LD and Last.fm integration surfaces
- 102 named audio filters from the PremiumTiers filter map
- Free vs Premium feature limits
- Current premium pricing exposed by the bot
- The 5 configured Azelia team members
- Guild controls matching the source store vocabulary: prefix, Stay 247, default volume, DJ role, request channel, autoplay, listen-along, game-mode DJ and join gate

## Important runtime boundary

The supplied Azelia archive does **not** contain a public HTTP dashboard API. The website therefore uses an adapter boundary:

- `AZELIA_API_HOST` points the Next.js API proxy at a compatible Azelia control/telemetry bridge.
- Without that bridge, source-synced pages still render from the extracted bot model, but live guild/player/status data is not fabricated.
- Discord OAuth routes expect the bridge to expose an OAuth exchange endpoint.

## Stack

- Next.js 14 App Router
- React 18
- Tailwind CSS 3
- Lucide React
- Discord OAuth session flow
- Optional Azelia control/telemetry bridge
- Browser Web Audio player

## Environment

```env
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_discord_client_id
NEXTAUTH_URL=http://localhost:3000
AZELIA_API_URL=http://your-azelia-bridge:5767
AZELIA_API_HOST=http://your-azelia-bridge:5767
AZELIA_API_KEY=your_api_key
```

## Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## License

Copyright 2026 Nabarup Chanda.

The dashboard's application code is distributed under the MIT License. See `LICENSE`.
