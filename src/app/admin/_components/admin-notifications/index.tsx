"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DotBadge } from "@/components/ui/dot-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import styles from "./styles.module.css";

const notificationTrigger = <Button variant="ghost" color="neutral" aria-label="Notifications" />;

export function AdminNotifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={notificationTrigger} className={styles.notification}>
        <Bell aria-hidden="true" />
        <DotBadge size="sm" color="primary" position="top-end" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuItem disabled>No notifications yet</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
