"use client";

import { LogOut, Monitor, Moon, Palette, Sun, UserRound } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import type { AdminProfileMenuContentProps } from "./admin-profile-menu-content.types";
import styles from "./styles.module.css";

export function AdminProfileMenuContent({
  fullName,
  subtitle,
  align = "end",
  onProfile,
  onSignOut,
}: AdminProfileMenuContentProps) {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenuContent align={align}>
      <DropdownMenuGroup>
        <DropdownMenuLabel className={styles.identity}>
          <strong>{fullName}</strong>
          <span>{subtitle}</span>
        </DropdownMenuLabel>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem disabled={!onProfile} onClick={onProfile}>
          <UserRound aria-hidden="true" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette aria-hidden="true" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuGroup>
              <DropdownMenuRadioGroup
                value={theme ?? "system"}
                onValueChange={setTheme}
                aria-label="Color theme"
              >
                <DropdownMenuRadioItem value="light">
                  <Sun aria-hidden="true" />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  <Moon aria-hidden="true" />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  <Monitor aria-hidden="true" />
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem variant="destructive" disabled={!onSignOut} onClick={onSignOut}>
          <LogOut aria-hidden="true" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
