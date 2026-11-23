import type { ReactNode } from "react";

export default function AdminLayout({ children }: { readonly children: ReactNode }) {
  return <article>{children}</article>;
}
