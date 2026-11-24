# Common components

This folder contains reusable application components that are not tied to a specific UI primitive or route.

The toast folder owns application notifications, their common Toaster host, and per-toast alignment. The useToast hook shares its options and constants.

theme-dropdown owns shared light/dark/system theme selection. mobile-navigation owns the mobile/tablet glass footer and active landing section links. Each keeps its implementation, styles, types/constants and tests together.

viewport-suspense defers mounting lazy content until viewport entry and owns the surrounding Suspense fallback. Threshold defaults to 0.35; the shared observer hook handles once-only visibility and ref forwarding.
