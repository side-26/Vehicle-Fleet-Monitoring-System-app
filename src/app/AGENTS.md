# App routes and global styles

This folder contains the Next.js App Router route segments, layouts, pages, and application-wide styles.

The root layout mounts src/providers/theme-provider.tsx around ToastProvider inside body, enabling class-based system-aware themes and one application-wide notification host while retaining a Server Component layout. Keep suppressHydrationWarning on html for next-themes attribute updates.
