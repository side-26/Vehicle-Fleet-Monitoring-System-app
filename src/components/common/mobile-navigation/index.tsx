"use client";

import { useSyncExternalStore } from "react";

import { Card } from "@/components/ui/card";

import { mobileNavigationItems } from "./mobile-navigation.types";
import styles from "./styles.module.css";

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

export function MobileNavigation() {
  const location = useSyncExternalStore(
    subscribe,
    () => window.location.pathname + window.location.hash,
    () => "/",
  );
  return (
    <footer className={styles.footer}>
      <Card className={styles.navigationCard}>
        <nav aria-label="Landing page" className={styles.navigation}>
          {mobileNavigationItems.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className={styles.link}
              aria-current={href === location ? "location" : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </Card>
    </footer>
  );
}
