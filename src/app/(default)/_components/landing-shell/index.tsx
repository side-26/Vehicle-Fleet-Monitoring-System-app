import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { CircleHelp, CircleUserRound } from "lucide-react";

import Container from "@/components/common/container";
import { MobileNavigation } from "@/components/common/mobile-navigation";
import { ThemeDropdown } from "@/components/common/theme-dropdown";

import styles from "./styles.module.css";

export function LandingShell({ children }: { readonly children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Container className={styles.headerContent}>
          <Link href="/" aria-label="FleetOS home" className={styles.brand}>
            <picture>
              <source media="(width < 48rem)" srcSet="/icons/mini-favicon.svg" />
              <Image
                src="/icons/fleetos-logo.svg"
                alt="FleetOS"
                width={220}
                height={54}
                loading="eager"
              />
            </picture>
          </Link>
          <nav aria-label="Desktop landing page" className={styles.desktopNavigation}>
            <Link href="/#features">Features</Link>
            <Link href="/#how-it-works">How It Works</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/#about-us">About Us</Link>
            <Link href="/#faq">FAQ</Link>
          </nav>
          <div className={styles.actions}>
            <Link href="/login" className={styles.account}>
              <CircleUserRound aria-hidden="true" /> Account
            </Link>
            <Link href="/#faq" aria-label="FAQ" className={styles.faq}>
              <CircleHelp aria-hidden="true" />
            </Link>
            <ThemeDropdown />
          </div>
        </Container>
      </header>
      <div className={styles.content}>{children}</div>
      <MobileNavigation />
      <footer className={styles.desktopFooter}>
        <Container className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <Link href="/" aria-label="FleetOS home">
              <Image src="/icons/mini-favicon.svg" alt="" width={32} height={32} />
              <span>FleetOS</span>
            </Link>
            <p>
              A complete fleet monitoring platform to manage vehicles, drivers, and operations with
              confidence.
            </p>
          </div>
          <nav aria-label="Product" className={styles.footerGroup}>
            <h2>Product</h2>
            <Link href="/#features">Features</Link>
            <Link href="/#how-it-works">How It Works</Link>
            <Link href="/#pricing">Pricing</Link>
          </nav>
          <nav aria-label="Company" className={styles.footerGroup}>
            <h2>Company</h2>
            <Link href="/#about-us">About Us</Link>
          </nav>
          <nav aria-label="Support" className={styles.footerGroup}>
            <h2>Support</h2>
            <Link href="/#faq">FAQ</Link>
            <Link href="/login">Account</Link>
          </nav>
          <div className={styles.footerGroup}>
            <h2>Stay connected</h2>
            <p>Your fleet. One platform. Total control.</p>
            <Link href="/login">Access your account →</Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}
