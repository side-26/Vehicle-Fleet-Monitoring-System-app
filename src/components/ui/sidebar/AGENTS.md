# Sidebar

Compound application navigation adapted from the existing shadcn sidebar. Owns controlled/uncontrolled desktop expansion, independent mobile Dialog state, shortcut and cookie persistence. Mobile uses installed Base UI Dialog for focus management and dismissal. Keep all parts exported from index.tsx, public types/constants in sidebar.types.ts, and styles in the named CSS Module layer with canonical Tailwind @apply and logical directions. Group/peer class markers carry descendant state, not visual styles. Keep skeleton widths deterministic for hydration. Tests and stories cover variants, collapse modes, menu states and responsive interaction.

Sidebar color accepts primary and neutral (default). glassy defaults to true and reuses glass-interactive without scaling the navigation surface. Apply the same surface metadata to desktop, static and mobile panels. Primary remaps descendant sidebar tokens for readable active and inactive navigation.

Round only the exposed inline edge of every sidebar surface with rounded-xl; keep its attachment edge square. Side metadata must be present on desktop inner, static, and mobile surfaces.

Icon collapse widths for the desktop panel and spacer use explicit selectors rooted at `.outer[data-collapsible="icon"]`; keep these in sync for sidebar, floating and inset variants.
