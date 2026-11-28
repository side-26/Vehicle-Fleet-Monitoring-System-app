"use client";

import { AdminProfileMenuContent } from "@/app/admin/layout/_components/shared/admin-profile-menu-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SearchField } from "@/components/ui/search-field";

import styles from "./styles.module.css";

const avatarTrigger = <Button variant="ghost" color="neutral" aria-label="Administrator menu" />;
const fullName = "Mahdi Rashidi";
const subtitle = "Administrator";
const avatarSrc = "/images/random-avatar.jpg";

export function MobileAdminHeader() {
  const initials = fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
  return (
    <header className={styles.header}>
      <Card variant="ghost" className={styles.headerCard}>
        <CardContent className={styles.headerContent}>
          <DropdownMenu>
            <DropdownMenuTrigger render={avatarTrigger} className={styles.avatarTrigger}>
              <Avatar>
                <AvatarImage src={avatarSrc} alt="" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <AdminProfileMenuContent fullName={fullName} subtitle={subtitle} align="start" />
          </DropdownMenu>
          <search className={styles.search}>
            <SearchField
              aria-label="Search vehicles, drivers, violations"
              placeholder="Search your fleet..."
              variant="outline"
            />
          </search>
        </CardContent>
      </Card>
    </header>
  );
}
