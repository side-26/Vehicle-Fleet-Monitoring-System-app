"use client";

import type { ReactNode } from "react";

import { Toaster } from "@/components/common/toast";

export function ToastProvider({ children }: { readonly children: ReactNode }) {
  return <Toaster>{children}</Toaster>;
}
