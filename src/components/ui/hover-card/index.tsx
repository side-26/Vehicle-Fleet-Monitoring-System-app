"use client";
import { useCallback } from "react";

import { PreviewCard } from "@base-ui/react/preview-card";

import { cn } from "@/lib/utils";

import type {
  HoverCardProps,
  HoverCardTriggerProps,
  HoverCardContentProps,
} from "./hover-card.types";
import styles from "./styles.module.css";
export type {
  HoverCardProps,
  HoverCardTriggerProps,
  HoverCardContentProps,
  HoverCardColor,
  HoverCardGutter,
} from "./hover-card.types";
export function HoverCard(props: HoverCardProps) {
  return <PreviewCard.Root {...props} />;
}
export function HoverCardTrigger(props: HoverCardTriggerProps) {
  return <PreviewCard.Trigger {...props} data-slot="hover-card-trigger" />;
}
export function HoverCardContent({
  color = "neutral",
  gutter = "md",
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  ...props
}: HoverCardContentProps) {
  const resolveClassName = useCallback(
    (state: PreviewCard.Popup.State) =>
      cn(styles.content, typeof className === "function" ? className(state) : className),
    [className],
  );
  return (
    <PreviewCard.Portal>
      <PreviewCard.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={styles.positioner}
      >
        <PreviewCard.Popup
          {...props}
          data-slot="hover-card-content"
          data-color={color}
          data-gutter={gutter}
          className={resolveClassName}
        />
      </PreviewCard.Positioner>
    </PreviewCard.Portal>
  );
}
