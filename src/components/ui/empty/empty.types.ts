import type { ComponentProps } from "react";

export const emptyMediaVariants = ["default", "icon"] as const;
export type EmptyMediaVariant = (typeof emptyMediaVariants)[number];

/** Native container props, including ref, for the empty-state root. */
export type EmptyProps = Readonly<ComponentProps<"div">>;
/** Native container props for the header and action content. */
export type EmptyPartProps = Readonly<ComponentProps<"div">>;
/** Decorative artwork container. Defaults to the unstyled default variant. */
export type EmptyMediaProps = Readonly<ComponentProps<"div"> & { variant?: EmptyMediaVariant }>;
/** Empty-state titles are level-two headings. */
export type EmptyTitleProps = Readonly<ComponentProps<"h2">>;
/** Supporting text renders as a semantic paragraph. */
export type EmptyDescriptionProps = Readonly<ComponentProps<"p">>;
