import type { ReactNode } from "react";

import { AdminShell } from "./_components/admin-shell";

export default function AdminLayout({ children }: { readonly children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
