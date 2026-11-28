"use client";

import { ChevronDown } from "lucide-react";

import { AdminProfileMenuContent } from "@/app/admin/layout/_components/shared/admin-profile-menu-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import type { AdminProfileMenuProps } from "./admin-profile-menu.types";
import styles from "./styles.module.css";

const profileTrigger = <Button variant="ghost" color="neutral" aria-label="Administrator menu" />;

export function AdminProfileMenu({ onProfile, onSignOut }: AdminProfileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={profileTrigger} className={styles.profile}>
        <Avatar>
          <AvatarImage src="/images/random-avatar.jpg" alt="" />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <span className={styles.profileText}>
          <strong>Mahdi Rashidi</strong>
          <small>Administrator</small>
        </span>
        <ChevronDown aria-hidden="true" />
      </DropdownMenuTrigger>
      <AdminProfileMenuContent
        fullName="Mahdi Rashidi"
        subtitle="Administrator"
        align="end"
        onProfile={onProfile}
        onSignOut={onSignOut}
      />
    </DropdownMenu>
  );
}
