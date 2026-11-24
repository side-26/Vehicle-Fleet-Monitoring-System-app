# Landing shell

Composes the public landing layout with FleetOS branding, the common ThemeDropdown and the common MobileNavigation. Keep the shell as a Server Component; interactive logic belongs to those common components. Reserve content space below the desktop breakpoint so the navigation never covers the last content. Section anchors are contracts for future landing content; this shell does not create that content. Shell/header styles live in styles.module.css; dropdown and navigation styles live beside their respective common components.

On desktop (above 1024px), show section navigation and Account/theme actions in the header and a full-width petrol footer with brand/product/company/support content. Header and footer own backgrounds; their inner content uses the common Container. Keep the mobile/tablet FAQ shortcut and bottom bar separate from desktop-only navigation.

landing-shell.stories.tsx provides fullscreen mobile (390), tablet (768), desktop (1440), and 1024/1025 boundary previews with real ThemeProvider integration and failing axe checks. Unit tests cover layout composition and responsive assets. Integration tests exercise the route layout with real theme persistence, keyboard dismissal/focus and section history. Browser stories verify responsive visibility, touch targets, no horizontal overflow, card width and fixed scrolling.
