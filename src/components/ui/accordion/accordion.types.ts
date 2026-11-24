import type { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

export const accordionColors = ["primary", "inherit", "neutral", "success", "error"] as const;
export const accordionVariants = ["fill", "tonal", "outline", "ghost"] as const;
export const accordionSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export type AccordionColor = (typeof accordionColors)[number];
export type AccordionVariant = (typeof accordionVariants)[number];
export type AccordionSize = (typeof accordionSizes)[number];

export type AccordionProps<Value = string> = Readonly<
  AccordionPrimitive.Root.Props<Value> & {
    /** Surface and border palette, not a text color. Default: inherit. */
    color?: AccordionColor;
    /** Item surface treatment. Default: ghost. */
    variant?: AccordionVariant;
    /** Typography and proportional spacing. Default: md. */
    size?: AccordionSize;
  }
>;
export type AccordionItemProps = Readonly<AccordionPrimitive.Item.Props>;
export type AccordionTriggerProps = Readonly<
  AccordionPrimitive.Trigger.Props & {
    /** Props for the automatic h3 wrapper; use render to change the heading level. */
    headingProps?: Readonly<AccordionPrimitive.Header.Props>;
  }
>;
export type AccordionContentProps = Readonly<AccordionPrimitive.Panel.Props>;
