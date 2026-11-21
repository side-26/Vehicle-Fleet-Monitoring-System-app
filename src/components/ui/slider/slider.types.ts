import type { Ref } from "react";

import type { Slider as SliderPrimitive } from "@base-ui/react/slider";

export const sliderColors = ["primary", "neutral"] as const;
export const sliderOrientations = ["horizontal", "vertical"] as const;
export type SliderColor = (typeof sliderColors)[number];
export type SliderValue = NonNullable<SliderPrimitive.Root.Props["value"]>;
export type SliderProps<Value extends SliderValue = number> = Readonly<
  Omit<SliderPrimitive.Root.Props<Value>, "children" | "color" | "aria-label"> & {
    /** Accessible name for the control. Range thumbs append their 1-based index. */
    readonly "aria-label": string;
    /** Semantic indicator and thumb color. @default "primary" */
    readonly color?: SliderColor;
    /** Override individual thumb names, for example minimum and maximum speed. */
    readonly getAriaLabel?: SliderPrimitive.Thumb.Props["getAriaLabel"];
    /** Format the spoken value, including units when appropriate. */
    readonly getAriaValueText?: SliderPrimitive.Thumb.Props["getAriaValueText"];
    readonly ref?: Ref<HTMLDivElement>;
  }
>;
