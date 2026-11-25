import { getImageProps } from "next/image";

import type { ResponsiveImageProps } from "./responsive-image-source.types";

export type { ResponsiveImageProps, ResponsiveImageSource } from "./responsive-image-source.types";

export function ResponsiveImage({
  sources,
  pictureClassName,
  ...imageProps
}: ResponsiveImageProps) {
  const { props: fallbackProps } = getImageProps(imageProps);

  return (
    <picture className={pictureClassName}>
      {sources.map(({ media, ...source }) => {
        const { props } = getImageProps({
          sizes: imageProps.sizes,
          quality: imageProps.quality,
          loader: imageProps.loader,
          unoptimized: imageProps.unoptimized,
          ...source,
          alt: imageProps.alt,
        });

        return (
          <source
            key={media}
            media={media}
            srcSet={props.srcSet ?? props.src}
            sizes={props.sizes}
            width={props.width}
            height={props.height}
          />
        );
      })}
      {/* Native img preserves picture source selection with Next.js-generated props. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...fallbackProps} alt={fallbackProps.alt} />
    </picture>
  );
}
