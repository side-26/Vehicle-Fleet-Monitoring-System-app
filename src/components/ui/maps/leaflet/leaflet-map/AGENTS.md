# LeafletMap

Thin client-only adapter for React Leaflet MapContainer. Forward every native prop and instance ref. Accept children for tiles, markers and context consumers; import Leaflet CSS once here. Default viewport has a minimum block size; caller style/className can supply layout dimensions. Initialization options follow native immutable behavior. Keep types, CSS Module, stories and tests beside index.tsx.

Remove only the native Leaflet attribution prefix on map readiness, preserving tile credits and the caller whenReady callback.

leaflet-map-cluster contains the LeafletMapCluster adapter for the installed clustering dependency. Import it from that subfolder and compose MapPointer children inside it under LeafletMap; set a finite map maxZoom when no tile layer provides one.
