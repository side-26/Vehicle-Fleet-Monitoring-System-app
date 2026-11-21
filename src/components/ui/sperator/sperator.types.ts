import type { Separator } from "@base-ui/react/separator";

export const speratorOrientations = ["horizontal", "vertical"] as const;
export type SperatorOrientation = (typeof speratorOrientations)[number];

/** Base UI separator props, including ref and render. Orientation defaults to horizontal. */
export type SperatorProps = Readonly<
  Omit<Separator.Props, "orientation"> & { readonly orientation?: SperatorOrientation }
>;
