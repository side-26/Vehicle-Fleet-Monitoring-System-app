# Fleet map

Landing-owned demo fleet visualization, colocated with the public landing components. Compose local Leaflet adapters, including LeafletMapCluster and PointerIcon; do not import vendor rendering components directly. counts controls exact synthetic truck/van/car totals. createDemoVehicles distributes each type across the PDF's 25 route locations using AADT and largest remainders, with deterministic small metro-center offsets. traffic-locations.ts transcribes the supplied FHWA HPMS 2024 PDF; coordinates are approximate metro centers, not exact road or live GPS positions. No live-data claims, random generation, or external geocoding. The map initially fits the contiguous US, disables scroll-wheel zoom to preserve page scrolling, and declusters at zoom 14. Landing typography/background/lazy loading belong to the sibling fleet-map-section. Styles use Tailwind @apply.

Vehicle markers and legend icons use the supplied truck, van and car PNG assets from public/images/map-icons, preserving their artwork with object-contain.

The landing map uses Geoapify osm-bright in light mode and dark-matter-brown in dark mode, with Geoapify/OpenStreetMap attribution. The server page reads GEOAPIFY_API_KEY and passes it through FleetMapSection to the tile adapter; the key is included in client tile requests.
