# MapTile

Thin client-only adapter for React Leaflet TileLayer. Forward every native prop and instance ref. Must render beneath LeafletMap. Keep business rules and tile-provider/marker defaults outside this adapter. Keep types, CSS Module, stories and tests beside index.tsx.

URL defaults to https://tile.openstreetmap.org/{z}/{x}/{y}.png with OpenStreetMap attribution. Explicit URLs and attribution remain supported; custom URLs do not inherit OpenStreetMap attribution.
