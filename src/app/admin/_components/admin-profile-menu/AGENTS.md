# Admin profile menu

Owns the admin header profile dropdown, avatar, identity and responsive identity styles. Options are Profile, Theme and Sign out. Theme composes the shared dropdown submenu/radio primitives and uses next-themes for Light, Dark and System. Optional onProfile and onSignOut callbacks bind app flows; their items remain disabled until handlers exist. Do not emulate sign-out by navigating to login without invalidating a session.

Uses shared AdminProfileMenuContent from admin/layout/_components/shared; menu styles and theme logic live there. This component owns the trigger and its surrounding layout.
