# Authentication layout shell

Owns the route-local auth-page frame and FleetOS home link. Receives page content through children; pages own headings, forms, and validation. Uses a native picture element to select the user-supplied mobile, tablet, or desktop WebP art at 48rem and 64rem breakpoints. Mobile stacks the image above a rounded content panel. Tablet places introductory copy and artwork beside the panel. Desktop expands this split into a large rounded frame with larger introductory copy, a decorative teal arc, bottom-aligned fleet artwork, and an inset form card on a translucent side panel. Desktop art dimensions are 1382 by 922. Styles live in a named CSS Module layer with Tailwind @apply and logical dimensions. Tests cover source selection, desktop geometry, content, form interactions, and accessibility.

Responsive artwork composes the common ResponsiveImage from responsive-image-source. Source breakpoints and intrinsic dimensions live in this folder’s types file; preserve direct asset URLs through unoptimized and existing eager loading behavior. Do not duplicate native picture/source/img markup here.

The shared Container wraps the frame and owns inline gutters. Container and frame are capped at 90dvh; the frame fills that available block size without a fixed minimum height. The content panel scrolls when needed, keeping forms usable on short viewports. Hero height and desktop typography adapt to viewport block size.

Keep responsive declarations in each related selector using Tailwind md (48rem) and lg (64rem) variants through @apply, including the picture mask, desktop gradient, and decorative pseudo-element.
