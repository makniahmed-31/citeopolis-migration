import clsx from "clsx";
import { ButtonHTMLAttributes, Children, cloneElement, forwardRef, isValidElement, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "contained" | "outlined" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: string;
  endIcon?: string;
  /** Render as child element (e.g., <Link>) — merges className and other props */
  asChild?: boolean;
  children?: ReactNode;
}

/**
 * Reusable button — mirrors original components/ui/button/Button.tsx.
 * Uses `asChild` to merge props onto the single child element (e.g., <Link>).
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "contained", size = "md", startIcon, endIcon, asChild = false, className, children, ...rest },
  ref
) {
  const cls = clsx(styles.button, styles[variant], styles[size], className);

  if (asChild) {
    const child = Children.only(children);
    if (isValidElement(child)) {
      return cloneElement(child, {
        ...rest,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(child.props as any),
        className: clsx(cls, (child.props as { className?: string }).className),
      } as object);
    }
  }

  return (
    <button ref={ref} className={cls} {...rest}>
      {startIcon && <span className={clsx(startIcon, styles.icon)} aria-hidden />}
      {children}
      {endIcon && <span className={clsx(endIcon, styles.icon, styles.iconEnd)} aria-hidden />}
    </button>
  );
});

export default Button;
