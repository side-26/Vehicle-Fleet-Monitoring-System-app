"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";

export interface AnimationIntersectionOptions extends IntersectionObserverInit {
  /** Keep the animation enabled after the first visible intersection. Defaults to true. */
  readonly once?: boolean;
}

/** Attach ref to the section, and use isVisible to enable its animation. */
export function useAnimationRunOnIntersectionObserver<TElement extends Element = HTMLElement>(
  {
    root = null,
    rootMargin = "0px",
    threshold = 0.1,
    once = true,
  }: Readonly<AnimationIntersectionOptions> = {},
  forwardedRef?: Ref<TElement | null>,
) {
  const [element, setElement] = useState<TElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasEntered = useRef(false);
  const ref = useCallback((node: TElement | null) => {
    setElement(node);
    if (node && typeof IntersectionObserver === "undefined") setIsVisible(true);
  }, []);
  useImperativeHandle<TElement | null, TElement | null>(forwardedRef, () => element, [element]);
  // A primitive dependency keeps inline threshold arrays from recreating the observer on every render.
  const thresholdKey = (typeof threshold === "number" ? [threshold] : threshold).join(",");

  useEffect(() => {
    if (!element || (once && hasEntered.current)) return;
    if (typeof IntersectionObserver === "undefined") return;
    const thresholds = thresholdKey ? thresholdKey.split(",").map(Number) : [0];
    const minimum = Math.min(...thresholds);
    let active = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!active) return;
        const entry = entries.find((candidate) => candidate.target === element);
        if (!entry) return;
        const visible = entry.isIntersecting && entry.intersectionRatio >= minimum;
        setIsVisible(visible);
        if (visible && once) {
          hasEntered.current = true;
          active = false;
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold: thresholds },
    );
    observer.observe(element);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [element, root, rootMargin, thresholdKey, once]);

  return { ref, isVisible };
}
