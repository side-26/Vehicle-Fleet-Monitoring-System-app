import type { ComponentProps, CSSProperties } from "react";

export interface FadeInProps extends ComponentProps<"div"> {
  /** Entrance duration in milliseconds. Defaults to 400. */
  readonly duration?: number;
  /** Initial delay in milliseconds. Defaults to 0. */
  readonly delay?: number;
}

export interface FadeInStyle extends CSSProperties {
  readonly "--fade-in-duration": string;
  readonly "--fade-in-delay": string;
}
