"use client";

import Link from "next/link";
import { useCallback, type MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { mobileAdminNavigationItems } from "./mobile-admin-bottom-navigation.types";
import type { MobileAdminBottomNavigationProps } from "./mobile-admin-bottom-navigation.types";
import styles from "./styles.module.css";

const overviewLink = <Link href="/admin/dashboard" />;

export function MobileAdminBottomNavigation({
  activeDestination = "overview",
  onNavigate,
}: MobileAdminBottomNavigationProps) {
  const navigate = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const destination = mobileAdminNavigationItems.find(
        (item) => item.key === event.currentTarget.dataset.destination,
      )?.key;
      if (destination && onNavigate) {
        event.preventDefault();
        onNavigate(destination);
      }
    },
    [onNavigate],
  );
  return (
    <footer className={styles.footer}>
      <Card variant="ghost" className={styles.navigationCard}>
        <CardContent className={styles.navigationContent}>
          <nav aria-label="Admin bottom navigation" className={styles.navigation}>
            {mobileAdminNavigationItems.map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                render={!onNavigate && key === "overview" ? overviewLink : undefined}
                nativeButton={Boolean(onNavigate) || key !== "overview"}
                role={!onNavigate && key === "overview" ? "link" : undefined}
                disabled={!onNavigate && key !== "overview"}
                data-destination={key}
                aria-label={label}
                aria-current={activeDestination === key ? "page" : undefined}
                onClick={navigate}
                variant="ghost"
                color="neutral"
                className={styles.navigationItem}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>
    </footer>
  );
}
