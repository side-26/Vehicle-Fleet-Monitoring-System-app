"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

import { cn } from "@/lib/utils";

import type {
  AvatarBadgeProps,
  AvatarFallbackProps,
  AvatarGroupCountProps,
  AvatarGroupProps,
  AvatarImageProps,
  AvatarProps,
} from "./avatar.types";
import styles from "./styles.module.css";

export function Avatar({ className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root {...props} data-slot="avatar" className={cn(styles.avatar, className)} />
  );
}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      {...props}
      data-slot="avatar-image"
      className={cn(styles.image, className)}
    />
  );
}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      {...props}
      data-slot="avatar-fallback"
      className={cn(styles.fallback, className)}
    />
  );
}

export function AvatarBadge({ className, ...props }: AvatarBadgeProps) {
  return <span {...props} data-slot="avatar-badge" className={cn(styles.badge, className)} />;
}

export function AvatarGroup({ className, ...props }: AvatarGroupProps) {
  return <div {...props} data-slot="avatar-group" className={cn(styles.group, className)} />;
}

export function AvatarGroupCount({ className, ...props }: AvatarGroupCountProps) {
  return (
    <div {...props} data-slot="avatar-group-count" className={cn(styles.groupCount, className)} />
  );
}
