import type { ResponsiveImageSource } from "@/components/common/responsive-image-source";

export const landingLogoSources = [
  { media: "(width < 48rem)", src: "/icons/mini-favicon.svg", width: 64, height: 64 },
] as const satisfies readonly ResponsiveImageSource[];
