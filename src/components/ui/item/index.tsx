import { cn } from "@/lib/utils";

import type {
  ItemDescriptionProps,
  ItemGroupProps,
  ItemPartProps,
  ItemProps,
  ItemTitleProps,
} from "./item.types";
import styles from "./styles.module.css";

export function ItemGroup({ className, ...props }: ItemGroupProps) {
  return <ul {...props} data-slot="item-group" className={cn(styles.group, className)} />;
}

export function Item({ className, color = "inherit", variant = "default", ...props }: ItemProps) {
  return (
    <li
      {...props}
      data-slot="item"
      data-color={color}
      data-variant={variant}
      className={cn(styles.item, className)}
    />
  );
}

export function ItemMedia({ className, ...props }: ItemPartProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="item-media"
      className={cn(styles.media, className)}
    />
  );
}

export function ItemContent({ className, ...props }: ItemPartProps) {
  return <div {...props} data-slot="item-content" className={cn(styles.content, className)} />;
}

export function ItemTitle({ className, children, ...props }: ItemTitleProps) {
  return (
    <h3 {...props} data-slot="item-title" className={cn(styles.title, className)}>
      {children}
    </h3>
  );
}

export function ItemDescription({ className, ...props }: ItemDescriptionProps) {
  return (
    <p {...props} data-slot="item-description" className={cn(styles.description, className)} />
  );
}
