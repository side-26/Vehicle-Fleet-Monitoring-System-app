# Application providers

ThemeProvider wraps next-themes in a client boundary. Defaults to class-based light/dark themes, follows the system preference, persists the selection through next-themes, and disables transitions during theme changes. Forward native provider options for overrides. The root layout mounts it around ToastProvider and application content, with suppressHydrationWarning on html because next-themes updates its class and color scheme.

Owns application-level React context composition. ToastProvider is a client boundary that accepts children and renders the common Toaster once around the application content. The root App Router layout mounts it inside body; keep the layout itself a Server Component. Descendant client components can use useToast without mounting another host. Preserve common Toast defaults, per-toast duration/type/alignment, portals and accessible notifications.
