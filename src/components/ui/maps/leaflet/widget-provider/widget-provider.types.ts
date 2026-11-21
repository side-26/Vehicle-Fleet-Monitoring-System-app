import type { ComponentProps } from "react";
export const widgetAlignments = ["top-left", "bottom-left", "top-right", "bottom-right"] as const;
export type WidgetAlignment = (typeof widgetAlignments)[number];
export type WidgetProviderProps = Readonly<
  ComponentProps<"div"> & {
    /** Native map-control corner. Defaults to top-right. */
    align?: WidgetAlignment;
  }
>;

export type WidgetProviderClientProps = Readonly<
  Omit<WidgetProviderProps, "ref"> & { instanceRef?: WidgetProviderProps["ref"] }
>;
