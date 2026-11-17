import type { PlaywrightTestOptions } from "@playwright/test";

export const PERFORMANCE_DEVICES = {
  mobile: {
    viewport: {
      width: 390,
      height: 844,
    },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  },

  tablet: {
    viewport: {
      width: 768,
      height: 1024,
    },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  },

  desktop: {
    viewport: {
      width: 1440,
      height: 900,
    },
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
  },
} satisfies Record<string, Partial<PlaywrightTestOptions>>;

export type PerformanceDevice = keyof typeof PERFORMANCE_DEVICES;
