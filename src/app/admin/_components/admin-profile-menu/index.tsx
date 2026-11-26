"use client";

import Link from "next/link";

import { ChevronDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import styles from "./styles.module.css";

const profileTrigger = <Button variant="ghost" color="neutral" aria-label="Administrator menu" />;
const websiteLink = <Link href="/" />;

export function AdminProfileMenu() {
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
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Administrator</DropdownMenuLabel>
          <DropdownMenuItem render={websiteLink}>FleetOS website</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
