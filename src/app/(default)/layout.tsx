import type { ReactNode } from "react";

import { LandingShell } from "./_components/landing-shell";

export default function DefaultLayout({ children }: { readonly children: ReactNode }) {
  return <LandingShell>{children}</LandingShell>;
}
