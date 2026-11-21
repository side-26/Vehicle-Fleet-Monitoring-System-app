import type { Toast as ToastPrimitive } from "@base-ui/react/toast";

export const toastColors = ["info", "primary", "success", "error", "warning"] as const;
export type ToastColor = (typeof toastColors)[number];
export const DEFAULT_TOAST_COLOR: ToastColor = "primary";

/** Glass color is derived only from the native toast type. */
export function getToastColor(toast: object): ToastColor {
  const status = "type" in toast ? toastColors.find((value) => value === toast.type) : undefined;
  return status ?? DEFAULT_TOAST_COLOR;
}

export const toastAlignments = [
  "top-start",
  "top-center",
  "top-end",
  "bottom-start",
  "bottom-center",
  "bottom-end",
] as const;
export type ToastAlign = (typeof toastAlignments)[number];
export const DEFAULT_TOAST_ALIGN: ToastAlign = "top-center";
export const DEFAULT_TOAST_DURATION = 3000;

/** Native managers preserve additional toast metadata; unknown values use the default. */
export function getToastAlign(toast: object): ToastAlign {
  return "align" in toast
    ? (toastAlignments.find((align) => align === toast.align) ?? DEFAULT_TOAST_ALIGN)
    : DEFAULT_TOAST_ALIGN;
}

type Styled<Props> = Readonly<Omit<Props, "className"> & { readonly className?: string }>;
export type ToastProviderProps = Readonly<ToastPrimitive.Provider.Props>;
export type ToastPortalProps = Styled<ToastPrimitive.Portal.Props>;
export type ToastViewportProps = Styled<ToastPrimitive.Viewport.Props>;
export type ToastProps = Omit<Styled<ToastPrimitive.Root.Props>, "color">;
export type ToastContentProps = Styled<ToastPrimitive.Content.Props>;
export type ToastTitleProps = Styled<ToastPrimitive.Title.Props>;
export type ToastDescriptionProps = Styled<ToastPrimitive.Description.Props>;
export type ToastActionProps = Styled<ToastPrimitive.Action.Props>;
export type ToastCloseProps = Styled<ToastPrimitive.Close.Props>;
