import type { ComponentProps } from "react";

export const itemColors = ["inherit", "primary", "neutral", "error", "success"] as const;
export type ItemColor = (typeof itemColors)[number];

export const itemVariants = ["default", "outline", "muted"] as const;
export type ItemVariant = (typeof itemVariants)[number];

/** Native list-item props with semantic surface styling. */
export type ItemProps = Readonly<
  Omit<ComponentProps<"li">, "color"> & {
    /** Border and muted surface palette. Defaults to inherit (currentColor). */
    color?: ItemColor;
    /** Surface treatment. Defaults to default (transparent). */
    variant?: ItemVariant;
  }
>;
/** Native div props for the decorative media or content wrapper. */
export type ItemPartProps = Readonly<ComponentProps<"div">>;
/** Native heading props. Item titles use heading level three. */
export type ItemTitleProps = Readonly<ComponentProps<"h3">>;
/** Native paragraph props for supporting copy. */
export type ItemDescriptionProps = Readonly<ComponentProps<"p">>;

/** Native list props for grouping related Item components. */
export type ItemGroupProps = Readonly<ComponentProps<"ul">>;
