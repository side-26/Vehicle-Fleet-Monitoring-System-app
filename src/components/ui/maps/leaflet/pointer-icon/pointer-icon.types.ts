import type { ComponentProps, ReactNode } from "react";
export type PointerIconProps = Readonly<
  Omit<ComponentProps<"div">, "children" | "ref"> & {
    /** React icon content rendered inside the parent MapPointer. */
    children: ReactNode;
  }
>;
