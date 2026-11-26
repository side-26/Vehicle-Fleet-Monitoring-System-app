import type { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

import { AdminShell } from "./_components/admin-shell";

export default function AdminLayout({ children }: { readonly children: ReactNode }) {
  return (
    <TooltipProvider>
      <AdminShell>{children}</AdminShell>
    </TooltipProvider>
  );
}
