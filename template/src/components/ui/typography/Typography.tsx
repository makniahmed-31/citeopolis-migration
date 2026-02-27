import clsx from "clsx";
import { ElementType, ReactNode } from "react";
import styles from "./Typography.module.scss";

type TypographyVariant =
  | "display-1"
  | "display-2"
  | "display-3"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "text-base"
  | "text-small";

interface TypographyProps {
  variant: TypographyVariant;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Semantic typography component.
 * Applies the correct CSS font-style token for the given variant.
 * The `as` prop controls the DOM element (e.g., h2 with display-3 size).
 */
export default function Typography({ variant, as: Tag = "span", className, children }: TypographyProps) {
  return (
    <Tag className={clsx(styles[variant.replace("-", "_")], className)}>
      {children}
    </Tag>
  );
}
