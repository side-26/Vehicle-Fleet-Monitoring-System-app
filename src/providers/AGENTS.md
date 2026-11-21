# Application providers

Owns application-level React context composition. ToastProvider is a client boundary that accepts children and renders the common Toaster once around the application content. The root App Router layout mounts it inside body; keep the layout itself a Server Component. Descendant client components can use useToast without mounting another host. Preserve common Toast defaults, per-toast duration/type/alignment, portals and accessible notifications.
