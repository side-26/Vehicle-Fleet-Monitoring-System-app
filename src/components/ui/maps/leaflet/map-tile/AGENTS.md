# MapTile

Thin client-only adapter for React Leaflet TileLayer. Forward every native prop and instance ref. Must render beneath LeafletMap. Keep business rules and tile-provider/marker defaults outside this adapter. Keep types, CSS Module, stories and tests beside index.tsx.

Requires lightUrl; darkUrl and apiKey are optional. Select darkUrl using next-themes resolvedTheme, falling back to lightUrl. Append an encoded apiKey query parameter when provided and preserve existing query parameters. Standard OpenStreetMap URLs retain default attribution; other providers require caller attribution. Provider defaults and server environment reads belong to the calling route.
