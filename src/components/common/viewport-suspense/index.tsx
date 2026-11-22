"use client";

import { Suspense } from "react";

import { useAnimationRunOnIntersectionObserver } from "@/hooks/use-animation-run-on-intersection-observer";
import { cn } from "@/lib/utils";

import styles from "./styles.module.css";
import type { ViewportSuspenseProps } from "./viewport-suspense.types";

export type { ViewportSuspenseProps } from "./viewport-suspense.types";

export function ViewportSuspense({
  fallback,
  dynamicMain,
  threshold = 0.35,
  ref: forwardedRef,
  className,
  ...props
}: Readonly<ViewportSuspenseProps>) {
  const { ref, isVisible } = useAnimationRunOnIntersectionObserver<HTMLDivElement>(
    { threshold },
    forwardedRef,
  );
  return (
    <div {...props} ref={ref} className={cn(styles.wrapper, className)}>
      {isVisible ? <Suspense fallback={fallback}>{dynamicMain}</Suspense> : fallback}
    </div>
  );
}
