# MapPointer

Thin client-only adapter for React Leaflet Marker. Forward every native prop and instance ref. Must render beneath LeafletMap. Keep business rules and tile-provider/marker defaults outside this adapter. Keep types, CSS Module, stories and tests beside index.tsx.

Supports PointerIcon children through an internal icon registration context. React custom icons temporarily override the native icon and restore it on removal; title falls back to alt so custom DivIcon markers retain an accessible name.
