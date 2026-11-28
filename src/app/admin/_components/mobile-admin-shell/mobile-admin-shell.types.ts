import type { ReactNode } from "react";

import type { MobileAdminBottomNavigationProps } from "@/app/admin/_components/mobile-admin-bottom-navigation/mobile-admin-bottom-navigation.types";

export type { MobileAdminDestination } from "@/app/admin/_components/mobile-admin-bottom-navigation/mobile-admin-bottom-navigation.types";

export interface MobileAdminShellProps extends MobileAdminBottomNavigationProps {
  readonly children: ReactNode;
}
