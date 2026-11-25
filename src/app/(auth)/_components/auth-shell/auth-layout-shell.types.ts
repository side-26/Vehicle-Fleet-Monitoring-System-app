import type { ReactNode } from "react";

import type { ResponsiveImageSource } from "@/components/common/responsive-image-source";

export const authImageSources = [
  { media: "(min-width: 64rem)", src: "/images/auth/desktop-image.webp", width: 1382, height: 922 },
  { media: "(min-width: 48rem)", src: "/images/auth/tablet-image.webp", width: 1152, height: 768 },
] as const satisfies readonly ResponsiveImageSource[];

export interface AuthLayoutShellProps {
  /** Authentication page content; the page owns its heading and form. */
  readonly children: ReactNode;
}
