"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import styles from "./styles.module.css";
import {
  DEFAULT_TOAST_DURATION,
  getToastAlign,
  getToastColor,
  toastAlignments,
} from "./toast.types";
import type {
  ToastActionProps,
  ToastCloseProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastPortalProps,
  ToastProps,
  ToastProviderProps,
  ToastTitleProps,
  ToastViewportProps,
} from "./toast.types";

const toast = ToastPrimitive.createToastManager<Record<string, unknown>>();
const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

function ToastProvider({ timeout = DEFAULT_TOAST_DURATION, ...props }: ToastProviderProps) {
  return <ToastPrimitive.Provider {...props} timeout={timeout} />;
}
function ToastPortal(props: ToastPortalProps) {
  return <ToastPrimitive.Portal {...props} data-slot="toast-portal" />;
}
function ToastViewport({ className, ...props }: ToastViewportProps) {
  return (
    <ToastPrimitive.Viewport
      {...props}
      data-slot="toast-viewport"
      className={cn(styles.viewport, className)}
    />
  );
}
function Toast({ className, toast: toastItem, ...props }: ToastProps) {
  return (
    <ToastPrimitive.Root
      {...props}
      toast={toastItem}
      data-slot="toast"
      data-align={getToastAlign(toastItem)}
      data-color={getToastColor(toastItem)}
      data-glassy="true"
      className={cn(styles.toast, className)}
    />
  );
}
function ToastContent({ className, ...props }: ToastContentProps) {
  return (
    <ToastPrimitive.Content
      {...props}
      data-slot="toast-content"
      className={cn(styles.content, className)}
    />
  );
}
function ToastTitle({ className, ...props }: ToastTitleProps) {
  return (
    <ToastPrimitive.Title
      {...props}
      data-slot="toast-title"
      className={cn(styles.title, className)}
    />
  );
}
function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return (
    <ToastPrimitive.Description
      {...props}
      data-slot="toast-description"
      className={cn(styles.description, className)}
    />
  );
}
function ToastAction({ className, ...props }: ToastActionProps) {
  return (
    <ToastPrimitive.Action
      {...props}
      data-slot="toast-action"
      className={cn(styles.action, className)}
    />
  );
}
function ToastClose({ className, children, ...props }: ToastCloseProps) {
  return (
    <ToastPrimitive.Close
      aria-hidden={false}
      aria-label="Close toast"
      {...props}
      data-slot="toast-close"
      className={cn(styles.close, className)}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ToastPrimitive.Close>
  );
}

const icons = {
  success: CircleCheckIcon,
  info: InfoIcon,
  warning: TriangleAlertIcon,
  error: OctagonXIcon,
  loading: Loader2Icon,
};
function ToastIcon({ type }: { readonly type?: string }) {
  const Icon = Object.entries(icons).find(([key]) => key === type)?.[1];
  return Icon ? (
    <span data-slot="toast-icon" data-type={type} className={styles.icon}>
      <Icon aria-hidden="true" />
    </span>
  ) : null;
}
function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager<Record<string, unknown>>();
  return toastAlignments.map((align) => {
    const group = toasts.filter((item) => getToastAlign(item) === align);
    if (!group.length) return null;
    return (
      <div key={align} data-slot="toast-group" data-align={align} className={styles.group}>
        {group.map((item) => (
          <Toast key={item.id} toast={item}>
            <ToastContent>
              <ToastIcon type={item.type ?? getToastColor(item)} />
              <div className={styles.message}>
                <ToastTitle />
                <ToastDescription />
              </div>
              {item.actionProps ? <ToastAction /> : null}
              <ToastClose />
            </ToastContent>
          </Toast>
        ))}
      </div>
    );
  });
}
function Toaster({ children, toastManager = toast, ...props }: ToastProviderProps) {
  return (
    <ToastProvider {...props} toastManager={toastManager}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
};
export { toastAlignments } from "./toast.types";
export type { ToastAlign } from "./toast.types";
