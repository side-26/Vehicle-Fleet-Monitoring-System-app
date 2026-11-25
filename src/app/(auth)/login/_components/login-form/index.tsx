"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { MailIcon } from "lucide-react";
import { useFormState } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { PasswordFormField } from "@/components/ui/form-fields/password-form-field";
import { TextFormField } from "@/components/ui/form-fields/text-form-field";
import { InputGroupAddon } from "@/components/ui/input-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { loginValidation } from "@/modules/auth/auth.validation";

import { loginFormOptions } from "./login-form.types";
import type { LoginFieldsProps, LoginFormProps, LoginFormValues } from "./login-form.types";
import styles from "./styles.module.css";

function LoginFields({ isAuthenticating, submitError }: LoginFieldsProps) {
  const isMobile = useIsMobile();
  const { errors, isSubmitting } = useFormState<LoginFormValues>();

  return (
    <FieldGroup className={styles.fields}>
      <TextFormField<LoginFormValues>
        name="identifier"
        label="Email or Username"
        placeholder="Enter your email or username"
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        size={isMobile ? "md" : "lg"}
        required
        haveMessage={Boolean(errors.identifier)}
        disabled={isAuthenticating}
      >
        <InputGroupAddon className={styles.addon}>
          <MailIcon aria-hidden="true" />
        </InputGroupAddon>
      </TextFormField>
      <PasswordFormField<LoginFormValues>
        name="password"
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
        size="md"
        required
        haveMessage={Boolean(errors.password)}
        disabled={isAuthenticating}
      />
      <Link href="/forget-password" className={styles.recovery}>
        Forgot password?
      </Link>
      {submitError && (
        <p role="alert" className={styles.error}>
          {submitError}
        </p>
      )}
      <Button
        type="submit"
        aria-label="Sign In"
        size="md"
        className={styles.submit}
        loading={isSubmitting}
        loadingText="Signing in…"
      >
        Sign In
      </Button>
    </FieldGroup>
  );
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const submit = useCallback(
    async (values: LoginFormValues) => {
      setSubmitError("");
      if (!onSubmit) {
        setSubmitError("Sign-in is currently unavailable. Please try again later.");
        return;
      }
      setIsAuthenticating(true);
      try {
        await onSubmit(values);
      } catch {
        setSubmitError("Unable to sign in. Please check your details and try again.");
      } finally {
        setIsAuthenticating(false);
      }
    },
    [onSubmit],
  );

  return (
    <section className={styles.login} aria-labelledby="login-title">
      <header className={styles.header}>
        <h1 id="login-title">Welcome Back</h1>
        <p>Sign in to your FleetOS account</p>
      </header>
      <Form<LoginFormValues>
        formOptions={loginFormOptions}
        validation={loginValidation}
        onSubmit={submit}
        aria-label="Sign in"
      >
        <LoginFields isAuthenticating={isAuthenticating} submitError={submitError} />
      </Form>
    </section>
  );
}
