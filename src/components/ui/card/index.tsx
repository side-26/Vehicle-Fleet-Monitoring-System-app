import { cn } from "@/lib/utils";

import type { CardProps } from "./card.types";
import styles from "./styles.module.css";

export function Card({
  color = "neutral",
  size = "md",
  variant = "tonal",
  className,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      data-slot="card"
      data-color={color}
      data-size={size}
      data-variant={variant}
      className={cn(styles.card, className)}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} data-slot="card-header" className={cn(styles.header, className)} />;
}

export function CardTitle({ className, children, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2 {...props} data-slot="card-title" className={cn(styles.title, className)}>
      {children}
    </h2>
  );
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p {...props} data-slot="card-description" className={cn(styles.description, className)} />
  );
}

export function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} data-slot="card-action" className={cn(styles.action, className)} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} data-slot="card-content" className={cn(styles.content, className)} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} data-slot="card-footer" className={cn(styles.footer, className)} />;
}
