export const loginProviders = ["google", "microsoft"] as const;
export type LoginProvider = (typeof loginProviders)[number];

export interface LoginProvidersProps {
  /** Disables both provider actions during any authentication request. */
  readonly disabled?: boolean;
  /** Provider displaying a loading state. */
  readonly pendingProvider?: LoginProvider;
  readonly onGoogleSignIn: () => void;
  readonly onMicrosoftSignIn: () => void;
}
