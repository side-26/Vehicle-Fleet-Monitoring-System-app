"use client";

import type { CSSProperties } from "react";

import { useAnimationRunOnIntersectionObserver } from "@/hooks/use-animation-run-on-intersection-observer";
import { cn } from "@/lib/utils";

import type { FadeInProps, FadeInStyle } from "./fade-in.types";
import styles from "./styles.module.css";

function getAnimationStyle(
  style: CSSProperties | undefined,
  duration: number,
  delay: number,
): FadeInStyle {
  return {
    ...style,
    "--fade-in-duration": `${Number.isFinite(duration) ? Math.max(0, duration) : 400}ms`,
    "--fade-in-delay": `${Number.isFinite(delay) ? Math.max(0, delay) : 0}ms`,
  };
}

export function FadeIn({
  children,
  duration = 400,
  delay = 0,
  ref: forwardedRef,
  className,
  style,
  ...props
}: Readonly<FadeInProps>) {
  const { ref, isVisible } = useAnimationRunOnIntersectionObserver<HTMLDivElement>(
    { threshold: 0.4 },
    forwardedRef,
  );
  const animationStyle = getAnimationStyle(style, duration, delay);
  return (
    <div
      {...props}
      ref={ref}
      data-visible={isVisible}
      className={cn(styles.fadeIn, className)}
      style={animationStyle}
    >
      {children}
    </div>
  );
}
