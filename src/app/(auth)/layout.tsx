import type { ReactNode } from "react";

import { AuthLayoutShell } from "./_components/auth-shell";

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <AuthLayoutShell>{children}</AuthLayoutShell>;
}
