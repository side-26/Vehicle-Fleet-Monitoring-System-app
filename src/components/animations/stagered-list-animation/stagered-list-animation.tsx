"use client";

import { Children, type CSSProperties } from "react";

import { useAnimationRunOnIntersectionObserver } from "@/hooks/use-animation-run-on-intersection-observer";
import { cn } from "@/lib/utils";

import type {
  StaggeredItemStyle,
  StaggeredListAnimationProps,
  StaggeredListAnimationStyle,
} from "./stagered-list-animation.types";
import styles from "./styles.module.css";

function getAnimationStyle(
  style: CSSProperties | undefined,
  duration: number,
  delay: number,
  stagger: number,
): StaggeredListAnimationStyle {
  return {
    ...style,
    "--stagger-duration": `${Math.max(0, duration)}ms`,
    "--stagger-delay": `${Math.max(0, delay)}ms`,
    "--stagger-interval": `${Math.max(0, stagger)}ms`,
  };
}

function getItemStyle(index: number): StaggeredItemStyle {
  return { "--stagger-index": index };
}

export function StaggeredListAnimation({
  children,
  stagger = 60,
  duration = 400,
  delay = 0,
  ref: forwardedRef,
  className,
  style,
  ...props
}: Readonly<StaggeredListAnimationProps>) {
  const { ref, isVisible } = useAnimationRunOnIntersectionObserver<HTMLDivElement>(
    { threshold: 0.4 },
    forwardedRef,
  );
  const animationStyle = getAnimationStyle(style, duration, delay, stagger);

  return (
    <div
      {...props}
      ref={ref}
      data-visible={isVisible}
      className={cn(styles.list, className)}
      style={animationStyle}
    >
      {Children.map(Children.toArray(children), (child, index) => (
        <div className={styles.item} style={getItemStyle(index)}>
          {child}
        </div>
      ))}
    </div>
  );
}
