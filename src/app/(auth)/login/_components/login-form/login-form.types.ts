import type { LoginFormValues } from "@/modules/auth/auth.validation";

export type { LoginFormValues } from "@/modules/auth/auth.validation";

export interface LoginFormProps {
  /** Connects authentication when a sign-in service is available. */
  readonly onSubmit?: (values: LoginFormValues) => Promise<void> | void;
}

export const loginFormOptions = {
  defaultValues: { identifier: "", password: "" },
};
export interface LoginFieldsProps {
  readonly isAuthenticating: boolean;
  readonly submitError: string;
}
