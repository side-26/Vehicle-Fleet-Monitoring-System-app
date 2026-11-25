import type { ResponsiveImageSource } from "@/components/common/responsive-image-source";

export const heroImageSources = [
  { media: "(width > 1024px)", src: "/images/landing/hero-desktop.png", width: 868, height: 651 },
] as const satisfies readonly ResponsiveImageSource[];
