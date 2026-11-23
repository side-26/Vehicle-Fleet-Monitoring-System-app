# Fleet map section

Primary-background landing section after How It Works. Owns heading, subtitle, demo counts/legend. Uses FleetMap and demo config from the sibling route-owned fleet-map folder; never duplicate the dataset here. Lazy-load the map through React.lazy and ViewportSuspense (0.35 threshold) with a matching-height accessible fallback. Keep the preview isolated so Leaflet panes cannot overlap mobile navigation. Mark data as synthetic and attribute FHWA 2024 route locations; never label these as live GPS locations. Styles use Tailwind @apply in a local CSS Module. Tests cover copy/counts and viewport-deferred map loading.

The preview wrapper containing the legend toolbar, map and caption occupies 100dvh and does not shrink. The section height includes the heading and section padding in addition to that preview. The toolbar and caption use flex-none, while the viewport suspense slot, fallback and map fill the remaining preview space with flex-1 and min-block-size: 0.

At mobile/tablet widths up to 64rem, reduce heading, toolbar and caption spacing to preserve map space within the preview's 100dvh. Short landscape viewports omit supplementary heading copy and further compact spacing. The route-owned map hides Leaflet zoom buttons at this breakpoint while keeping touch gestures and attribution.
