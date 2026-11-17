import type { ReactNode } from "react";

// style-modules
import styles from "./container.module.css";
import { cn } from "cn";
export default function Container({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: HTMLElement["className"] }>) {
  return <section className={cn(styles.container, className)}>{children}</section>;
}
