"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";

import type { LoginProvidersProps } from "./login-providers.types";
import styles from "./styles.module.css";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" data-icon="inline-start">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.92a6 6 0 0 1 0-3.84V7.49H3.07a10 10 0 0 0 0 9.02l3.34-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.96c1.47 0 2.79.51 3.82 1.5l2.87-2.86A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.49l3.34 2.59C7.2 7.72 9.4 5.96 12 5.96Z"
      />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" data-icon="inline-start">
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#7FBA00" d="M13 1h10v10H13z" />
      <path fill="#00A4EF" d="M1 13h10v10H1z" />
      <path fill="#FFB900" d="M13 13h10v10H13z" />
    </svg>
  );
}

export function LoginProviders({
  disabled = false,
  pendingProvider,
  onGoogleSignIn,
  onMicrosoftSignIn,
}: LoginProvidersProps) {
  return (
    <FieldGroup className={styles.section}>
      <div className={styles.divider}>
        <Separator aria-hidden="true" />
        <span>or continue with</span>
        <Separator aria-hidden="true" />
      </div>
      <div className={styles.providers}>
        <Button
          type="button"
          aria-label="Continue with Google"
          variant="outlined"
          color="neutral"
          size="md"
          className={styles.providerButton}
          disabled={disabled}
          loading={pendingProvider === "google"}
          loadingText="Connecting…"
          onClick={onGoogleSignIn}
        >
          <GoogleIcon /> Google
        </Button>
        <Button
          type="button"
          aria-label="Continue with Microsoft"
          variant="outlined"
          color="neutral"
          size="md"
          className={styles.providerButton}
          disabled={disabled}
          loading={pendingProvider === "microsoft"}
          loadingText="Connecting…"
          onClick={onMicrosoftSignIn}
        >
          <MicrosoftIcon /> Microsoft
        </Button>
      </div>
    </FieldGroup>
  );
}
