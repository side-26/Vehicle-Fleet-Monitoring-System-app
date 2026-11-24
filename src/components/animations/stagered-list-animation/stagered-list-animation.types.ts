import type { ComponentProps, CSSProperties } from "react";

export interface StaggeredListAnimationProps extends Omit<ComponentProps<"div">, "children"> {
  readonly children: React.ReactNode;
  /** Milliseconds between items. Defaults to 60. */
  readonly stagger?: number;
  /** Milliseconds per entrance. Defaults to 400. */
  readonly duration?: number;
  /** Initial delay in milliseconds. Defaults to 0. */
  readonly delay?: number;
}

export interface StaggeredListAnimationStyle extends CSSProperties {
  readonly "--stagger-duration": string;
  readonly "--stagger-delay": string;
  readonly "--stagger-interval": string;
}

export interface StaggeredItemStyle extends CSSProperties {
  readonly "--stagger-index": number;
}
