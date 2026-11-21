"use client";

import { useCallback, useMemo } from "react";

import { Toast } from "@base-ui/react/toast";
import type { ToastManagerAddOptions } from "@base-ui/react/toast";

import { DEFAULT_TOAST_ALIGN, DEFAULT_TOAST_DURATION } from "@/components/common/toast/toast.types";
import type { ToastAlign } from "@/components/common/toast/toast.types";

export { DEFAULT_TOAST_DURATION } from "@/components/common/toast/toast.types";
export type { ToastAlign } from "@/components/common/toast/toast.types";

export type ToastOptions<Data extends object = Record<string, unknown>> = Readonly<
  ToastManagerAddOptions<Data> & {
    /** Auto-dismiss duration in milliseconds. Overrides native timeout; 0 means persistent. */
    readonly duration?: number;
    /** Viewport position. @default "top-center" */
    readonly align?: ToastAlign;
  }
>;

/** Use inside Toaster/ToastProvider. Native update/close/promise APIs remain available. */
export function useToast<Data extends object = Record<string, unknown>>() {
  const manager = Toast.useToastManager<Data>();
  const nativeAdd = manager.add;
  const add = useCallback(
    <T extends Data = Data>({
      duration,
      timeout,
      align = DEFAULT_TOAST_ALIGN,
      ...options
    }: ToastOptions<T>) => {
      const nativeOptions = {
        ...options,
        align,
        timeout: duration ?? timeout ?? DEFAULT_TOAST_DURATION,
      };
      return nativeAdd<T>(nativeOptions);
    },
    [nativeAdd],
  );
  return useMemo(() => ({ ...manager, add }), [manager, add]);
}
