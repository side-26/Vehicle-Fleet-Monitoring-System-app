"use client";

import { useCallback, useSyncExternalStore } from "react";

const getServerSnapshot = () => false;

export function useIsMobile(mobileBreakpoint = 768) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQuery = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
      mediaQuery.addEventListener("change", onStoreChange);
      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    [mobileBreakpoint],
  );
  const getSnapshot = useCallback(() => window.innerWidth < mobileBreakpoint, [mobileBreakpoint]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
