import type { ReactNode } from "react";

import { cn } from "cn";

// style-modules
import styles from "./container.module.css";
export default function Container({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: HTMLElement["className"] }>) {
  return <section className={cn(styles.container, className)}>{children}</section>;
}
