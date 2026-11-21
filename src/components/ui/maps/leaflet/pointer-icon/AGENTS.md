# Pointer icon

React-rendered custom icon for a MapPointer. Requires children containing an icon; compose inside MapPointer. Registers a native DivIcon through the internal pointer context and uses a portal so React context and events stay live. Native marker retains its accessible name and click/drag behavior. The marker footprint is 32×32 Leaflet coordinate units with a centered anchor. Keep styling in CSS Module and browser-only Leaflet import behind the dynamic boundary. Remove the registration on unmount so the original marker icon returns. One PointerIcon per marker.
