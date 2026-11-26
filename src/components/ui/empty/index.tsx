import { cn } from "@/lib/utils";

import type {
  EmptyDescriptionProps,
  EmptyMediaProps,
  EmptyPartProps,
  EmptyProps,
  EmptyTitleProps,
} from "./empty.types";
import styles from "./styles.module.css";

export function Empty({ className, ...props }: EmptyProps) {
  return <div {...props} data-slot="empty" className={cn(styles.empty, className)} />;
}
export function EmptyHeader({ className, ...props }: EmptyPartProps) {
  return <div {...props} data-slot="empty-header" className={cn(styles.header, className)} />;
}
export function EmptyMedia({ className, variant = "default", ...props }: EmptyMediaProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(styles.media, className)}
    />
  );
}
export function EmptyTitle({ className, children, ...props }: EmptyTitleProps) {
  return (
    <h2 {...props} data-slot="empty-title" className={cn(styles.title, className)}>
      {children}
    </h2>
  );
}
export function EmptyDescription({ className, ...props }: EmptyDescriptionProps) {
  return (
    <p {...props} data-slot="empty-description" className={cn(styles.description, className)} />
  );
}
export function EmptyContent({ className, ...props }: EmptyPartProps) {
  return <div {...props} data-slot="empty-content" className={cn(styles.content, className)} />;
}
