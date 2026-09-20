# Azelia Source Sync

The source-synced dashboard model in `lib/azelia-data.js` was generated from the supplied Azelia source archive.

Snapshot facts used:
- 343 command modules parsed from `src/commands`
- 102 filter names parsed from `src/utils/PremiumTiers.js`
- 8 resolver providers represented from the Universal Resolver provider stack
- 5 team members parsed from `src/config/team.json`
- Premium pricing mirrored from `src/commands/premium/premiumpricing.js`
- Free/Premium capability limits mirrored from `src/utils/PremiumTiers.js`

Live guild, player and telemetry data still require an Azelia-compatible HTTP bridge because the supplied bot archive does not contain a public dashboard REST service.
