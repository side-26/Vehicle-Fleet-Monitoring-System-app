/* oxlint-disable react/no-array-index-key -- Thumb identity is its fixed positional index, not its changing value. */
"use client";

import { useCallback } from "react";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

import type { SliderProps, SliderValue } from "./slider.types";
import styles from "./styles.module.css";

export type { SliderColor, SliderProps, SliderValue } from "./slider.types";

export function Slider<Value extends SliderValue = number>({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  color = "primary",
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  getAriaLabel,
  getAriaValueText,
  thumbAlignment = "center",
  ...props
}: SliderProps<Value>) {
  const currentValue = value ?? defaultValue ?? min;
  const thumbCount = Array.isArray(currentValue) ? currentValue.length : 1;
  const resolveClassName = useCallback(
    (state: SliderPrimitive.Root.State) =>
      cn(styles.root, typeof className === "function" ? className(state) : className),
    [className],
  );

  return (
    <SliderPrimitive.Root
      {...props}
      aria-label={ariaLabel}
      className={resolveClassName}
      data-slot="slider"
      data-color={color}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment={thumbAlignment}
    >
      <SliderPrimitive.Control data-slot="slider-control" className={styles.control}>
        <SliderPrimitive.Track data-slot="slider-track" className={styles.track}>
          <SliderPrimitive.Indicator data-slot="slider-range" className={styles.indicator} />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }, (_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            index={index}
            data-slot="slider-thumb"
            className={styles.thumb}
            aria-label={thumbCount === 1 ? ariaLabel : `${ariaLabel} ${index + 1}`}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            getAriaLabel={getAriaLabel}
            getAriaValueText={getAriaValueText}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}
