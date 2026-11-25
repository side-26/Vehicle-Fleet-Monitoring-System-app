# App routes and global styles

This folder contains the Next.js App Router route segments, layouts, pages, and application-wide styles.

The root layout mounts ThemeProvider around ClientQueryProvider and ToastProvider inside body, enabling class-based system-aware themes, application-wide TanStack Query context, and one notification host while retaining a Server Component layout. Providers live in src/providers. Keep suppressHydrationWarning on html for next-themes attribute updates.
