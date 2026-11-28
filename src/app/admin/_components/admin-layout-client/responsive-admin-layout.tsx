"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import { LoadingLayout } from "./loading-layout";

const DesktopShell = dynamic(
  () =>
    import("@/app/admin/_components/desktop-admin-layout-shell").then(
      (module) => module.DesktopAdminLayoutShell,
    ),
  { loading: LoadingLayout },
);
const MobileShell = dynamic(
  () =>
    import("@/app/admin/_components/mobile-admin-shell").then((module) => module.MobileAdminShell),
  { loading: LoadingLayout },
);

export function ResponsiveAdminLayout({ children }: { readonly children: ReactNode }) {
  const isMobile = useIsMobile(1025);
  return isMobile ? <MobileShell>{children}</MobileShell> : <DesktopShell>{children}</DesktopShell>;
}
