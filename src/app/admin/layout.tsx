import type { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

import { AdminLayoutClient } from "./_components/admin-layout-client";

export default function AdminLayout({ children }: { readonly children: ReactNode }) {
  return (
    <TooltipProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </TooltipProvider>
  );
}
