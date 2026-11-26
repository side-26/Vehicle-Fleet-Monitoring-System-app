"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, type ReactNode } from "react";

import { AdminNavigation } from "@/app/admin/_components/admin-navigation";
import { AdminNotifications } from "@/app/admin/_components/admin-notifications";
import { AdminProfileMenu } from "@/app/admin/_components/admin-profile-menu";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SearchField } from "@/components/ui/search-field";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import styles from "./styles.module.css";

const sidebarStyle = {
  "--sidebar-width": "20rem",
  "--sidebar-width-mobile": "20rem",
  "--sidebar-width-icon": "5rem",
  minWidth: "2.5rem",
} satisfies CSSProperties & Record<string, string>;

export function AdminShell({ children }: { readonly children: ReactNode }) {
  return (
    <SidebarProvider className={styles.shell} style={sidebarStyle}>
      <AdminFrame>{children}</AdminFrame>
    </SidebarProvider>
  );
}

function AdminFrame({ children }: { readonly children: ReactNode }) {
  return (
    <>
      <Link href="#admin-content" className={styles.skipLink}>
        Skip to content
      </Link>
      <Sidebar color="primary" glassy={true} collapsible="icon" className={styles.sidebar}>
        <SidebarHeader className={styles.sidebarHeader}>
          <Link href="/admin/dashboard" className={styles.brand} aria-label="FleetOS admin home">
            <Image src="/icons/mini-favicon.svg" alt="" width={44} height={44} />
            <span>FleetOS</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className={styles.sidebarContent}>
          <AdminNavigation />
        </SidebarContent>
        <div className={styles.waves} aria-hidden="true" />
      </Sidebar>
      <Card variant="tonal" color="secondary" className={styles.workspace}>
        <CardHeader className={styles.topbar}>
          <SidebarTrigger aria-label="Toggle navigation" />
          <search className={styles.search}>
            <SearchField
              aria-label="Search vehicles, drivers, violations"
              placeholder="Search vehicles, drivers, violations..."
              variant="outline"
            />
          </search>
          <div className={styles.actions}>
            <AdminNotifications />
            <AdminProfileMenu />
          </div>
        </CardHeader>
        <CardContent id="admin-content" tabIndex={-1} className={styles.content}>
          {children}
        </CardContent>
      </Card>
    </>
  );
}
