import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { CircleHelp } from "lucide-react";

import { MobileNavigation } from "@/components/common/mobile-navigation";
import { ThemeDropdown } from "@/components/common/theme-dropdown";

import styles from "./styles.module.css";

export function LandingShell({ children }: { readonly children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link href="/" aria-label="FleetOS home" className={styles.brand}>
          <picture>
            <source media="(width < 48rem)" srcSet="/icons/mini-favicon.svg" />
            <Image src="/icons/fleetos-logo.svg" alt="FleetOS" width={220} height={54} />
          </picture>
        </Link>
        <div className={styles.actions}>
          <Link href="/#faq" aria-label="FAQ" className={styles.faq}>
            <CircleHelp aria-hidden="true" />
          </Link>
          <ThemeDropdown />
        </div>
      </header>
      <div className={styles.content}>{children}</div>
      <MobileNavigation />
    </div>
  );
}
