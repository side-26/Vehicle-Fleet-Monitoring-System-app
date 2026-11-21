import type { Separator } from "@base-ui/react/separator";

export const separatorOrientations = ["horizontal", "vertical"] as const;
export type SeparatorOrientation = (typeof separatorOrientations)[number];

/** Base UI separator props, including ref and render. Orientation defaults to horizontal. */
export type SeparatorProps = Readonly<
  Omit<Separator.Props, "orientation"> & { readonly orientation?: SeparatorOrientation }
>;
