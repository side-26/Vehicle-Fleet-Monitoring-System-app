import type { ImageLoaderProps } from "next/image";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ResponsiveImage } from "./index";

const sources = [
  { media: "(min-width: 64rem)", src: "/desktop.webp", width: 1382, height: 922 },
  { media: "(min-width: 48rem)", src: "/tablet.webp", width: 1152, height: 768 },
];
const overrideSources = [sources[0]!, { ...sources[1]!, sizes: "50vw", quality: 80 }];
const optimizedSources = [{ ...sources[0]!, unoptimized: false }];
const noSources: readonly [] = [];
const loader = ({ src, width, quality }: ImageLoaderProps) => `${src}?w=${width}&q=${quality}`;

describe("ResponsiveImage", () => {
  it("preserves source order and dimensions, and uses direct URLs when unoptimized", () => {
    const { container } = render(
      <ResponsiveImage
        sources={sources}
        src="/mobile.webp"
        width={768}
        height={512}
        alt="Fleet on a highway"
        unoptimized
        pictureClassName="picture"
        className="image"
      />,
    );
    const picture = container.querySelector("picture");
    const elements = picture?.querySelectorAll("source");
    expect(elements).toHaveLength(2);
    expect(elements?.[0]?.getAttribute("media")).toBe("(min-width: 64rem)");
    expect(elements?.[0]?.getAttribute("srcset")).toBe("/desktop.webp");
    expect(elements?.[0]?.getAttribute("width")).toBe("1382");
    expect(elements?.[0]?.getAttribute("height")).toBe("922");
    expect(elements?.[1]?.getAttribute("srcset")).toBe("/tablet.webp");
    expect(picture?.className).toBe("picture");
    const image = screen.getByRole("img", { name: "Fleet on a highway" });
    expect(image.className).toBe("image");
    expect(image.getAttribute("src")).toBe("/mobile.webp");
    expect(image.getAttribute("width")).toBe("768");
    expect(picture?.lastElementChild).toBe(image);
  });

  it("inherits loader, sizes, and quality while allowing per-source overrides", () => {
    const { container } = render(
      <ResponsiveImage
        sources={overrideSources}
        src="/mobile.webp"
        width={768}
        height={512}
        alt="Fleet"
        sizes="100vw"
        quality={60}
        loader={loader}
      />,
    );
    const elements = container.querySelectorAll("source");
    expect(elements[0]?.getAttribute("srcset")).toContain("/desktop.webp?w=");
    expect(elements[0]?.getAttribute("srcset")).toContain("&q=60");
    expect(elements[0]?.getAttribute("sizes")).toBe("100vw");
    expect(elements[1]?.getAttribute("srcset")).toContain("/tablet.webp?w=");
    expect(elements[1]?.getAttribute("srcset")).toContain("&q=80");
    expect(elements[1]?.getAttribute("sizes")).toBe("50vw");
    expect(screen.getByRole("img").getAttribute("srcset")).toContain("/mobile.webp?w=");
  });

  it("allows a source to override inherited unoptimized behavior", () => {
    const { container } = render(
      <ResponsiveImage
        sources={optimizedSources}
        src="/mobile.webp"
        width={768}
        height={512}
        alt="Fleet"
        unoptimized
      />,
    );
    expect(container.querySelector("source")?.getAttribute("srcset")).toContain("/_next/image?");
    expect(screen.getByRole("img").getAttribute("srcset")).toBeNull();
  });

  it("supports a fallback-only decorative image and forwards native attributes and events", () => {
    const onClick = vi.fn();
    const onError = vi.fn();
    const { container } = render(
      <ResponsiveImage
        sources={noSources}
        src="/mobile.webp"
        width={768}
        height={512}
        alt=""
        loading="eager"
        onClick={onClick}
        onError={onError}
        unoptimized
      />,
    );
    const image = container.querySelector("img");
    if (!image) throw new Error("Missing image");
    expect(screen.queryByRole("img")).toBeNull();
    expect(container.querySelector("source")).toBeNull();
    expect(image.getAttribute("loading")).toBe("eager");
    fireEvent.click(image);
    fireEvent.error(image);
    expect(onClick).toHaveBeenCalledOnce();
    expect(onError).toHaveBeenCalledOnce();
  });
});
