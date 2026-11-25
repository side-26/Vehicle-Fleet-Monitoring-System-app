import type { ImageProps } from "next/image";

/** A picture source, evaluated in array order; put larger breakpoints first. */
export type ResponsiveImageSource = Readonly<
  Pick<ImageProps, "src" | "width" | "height" | "sizes" | "quality" | "loader" | "unoptimized"> & {
    media: string;
  }
>;

/** Native picture art direction using Next.js image prop generation.
 * Placeholder and preload props are excluded because this renders a native img.
 */
export type ResponsiveImageProps = Readonly<
  Omit<ImageProps, "placeholder" | "blurDataURL" | "priority" | "preload"> & {
    sources: readonly ResponsiveImageSource[];
    pictureClassName?: string;
  }
>;
