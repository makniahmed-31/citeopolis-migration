import { getEnv } from "./env";

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Builds an image URL with resize parameters.
 * Mirrors the original lib/image-loader.ts pattern for the WP media endpoint.
 */
export function imageLoader({ src, width, quality = 75 }: ImageLoaderParams): string {
  if (!src) return src;
  try {
    const url = new URL(src, getEnv().BACKEND_URL);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality));
    return url.toString();
  } catch {
    return src;
  }
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width: number;
  height: number;
  alt: string;
  quality?: number;
  /** Eagerly load and decode — use for above-the-fold images */
  priority?: boolean;
}

/**
 * Simple image component.
 * Replaces next/image — no optimization server required.
 * Generates srcset at ×1, ×1.5, ×2 of requested width.
 */
export function Image({ src, width, height, alt, quality, priority = false, ...rest }: ImageProps) {
  const srcSet = [1, 1.5, 2]
    .map((scale) => {
      const w = Math.round(width * scale);
      return `${imageLoader({ src, width: w, quality })} ${w}w`;
    })
    .join(", ");

  return (
    <img
      src={imageLoader({ src, width, quality })}
      srcSet={srcSet}
      sizes={`${width}px`}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...rest}
    />
  );
}
