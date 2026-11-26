"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { navigation } from "./navigation-config";
import styles from "./styles.module.css";

export function AdminNavigation() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const closeMobile = useCallback(() => setOpenMobile(false), [setOpenMobile]);
  return (
    <nav aria-label="Admin navigation">
      <SidebarMenu className={styles.menu}>
        {navigation.map(({ label, href, icon: Icon, render }) => (
          <SidebarMenuItem key={label}>
            <SidebarMenuButton
              className={styles.menuButton}
              render={render}
              disabled={!render}
              isActive={pathname === href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={closeMobile}
              aria-label={label}
              tooltip={label}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  );
}
