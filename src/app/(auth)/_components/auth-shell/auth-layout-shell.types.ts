import type { ReactNode } from "react";

export interface AuthLayoutShellProps {
  /** Authentication page content; the page owns its heading and form. */
  readonly children: ReactNode;
}
