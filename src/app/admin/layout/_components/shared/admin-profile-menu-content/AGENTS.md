# Shared admin profile menu content

Shared dropdown content for mobile and desktop triggers. Owns identity header, Profile action, theme submenu/radios and Sign out action. Align defaults to end; mobile passes start. Actions remain disabled without callbacks. Uses existing dropdown primitives, next-themes and colocated Tailwind @apply styles. Caller supplies DropdownMenu root and trigger. Existing desktop-menu and mobile-shell tests cover the shared behavior.
