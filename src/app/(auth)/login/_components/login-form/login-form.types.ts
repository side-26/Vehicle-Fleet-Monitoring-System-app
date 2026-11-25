import type { LoginProvider } from "@/app/(auth)/login/_components/login-providers/login-providers.types";
import type { LoginFormValues } from "@/modules/auth/auth.validation";

export type { LoginProvider } from "@/app/(auth)/login/_components/login-providers/login-providers.types";

export type { LoginFormValues } from "@/modules/auth/auth.validation";

export interface LoginFormProps {
  /** Connects authentication when a sign-in service is available. */
  readonly onProviderSignIn?: (provider: LoginProvider) => Promise<void> | void;
  readonly onSubmit?: (values: LoginFormValues) => Promise<void> | void;
}

export const loginFormOptions = {
  defaultValues: { identifier: "", password: "" },
};
export interface LoginFieldsProps {
  readonly isAuthenticating: boolean;
  readonly submitError: string;
  readonly pendingProvider?: LoginProvider;
  readonly onGoogleSignIn: () => void;
  readonly onMicrosoftSignIn: () => void;
}
