"use client";

import Link from "next/link";

import { MobileAdminBottomNavigation } from "@/app/admin/_components/mobile-admin-bottom-navigation";
import { MobileAdminHeader } from "@/app/admin/_components/mobile-admin-header";

import type { MobileAdminShellProps } from "./mobile-admin-shell.types";
import styles from "./styles.module.css";

export function MobileAdminShell({
  children,
  activeDestination = "overview",
  onNavigate,
}: MobileAdminShellProps) {
  return (
    <article className={styles.shell} data-slot="mobile-admin-shell">
      <Link href="#mobile-admin-content" className={styles.skipLink}>
        Skip to content
      </Link>
      <MobileAdminHeader />
      <section id="mobile-admin-content" tabIndex={-1} className={styles.content}>
        {children}
      </section>
      <MobileAdminBottomNavigation activeDestination={activeDestination} onNavigate={onNavigate} />
    </article>
  );
}
