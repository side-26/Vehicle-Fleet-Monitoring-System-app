# Leaflet integration

First-layer React Leaflet adapters: LeafletMap owns the map context and viewport, MapTile owns a raster tile layer, MapPointer owns a marker. Each adapter forwards vendor props and refs without business logic. Leaflet is browser-only; runtime vendor imports stay behind next/dynamic with ssr:false. Type imports remain safe during server module evaluation. Compose MapTile and MapPointer as descendants of LeafletMap. Vendor options retain their native mutability rules; map initialization options are immutable.

WidgetProvider places custom widget children in native map-control corners and isolates widget pointer/scroll interactions from the map.

Map stories use fullscreen layout so percentage-width map viewports cannot collapse in Storybook’s centered flex wrapper. Show the default OpenStreetMap tiles in visual examples, including widget examples. Browser tests assert nonzero map dimensions after client initialization.

LeafletMapCluster lives under leaflet-map/leaflet-map-cluster and owns the react-leaflet-cluster boundary, vendor CSS and browser-only cluster initialization.
