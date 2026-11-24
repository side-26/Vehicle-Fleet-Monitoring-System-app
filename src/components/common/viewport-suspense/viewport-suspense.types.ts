import type { ComponentProps, ReactNode } from "react";

export interface ViewportSuspenseProps extends Omit<ComponentProps<"div">, "children"> {
  /** Placeholder displayed before entry and while the main component suspends. */
  readonly fallback: ReactNode;
  /** Rendered only after entry. Pass an element created from React.lazy or next/dynamic. */
  readonly dynamicMain: ReactNode;
  /** Visible fraction required to start loading, between 0 and 1. Defaults to 0.35. */
  readonly threshold?: number;
}
