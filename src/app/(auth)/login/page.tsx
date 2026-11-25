import type { Metadata } from "next";

import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your FleetOS account to manage your fleet.",
};

export default function LoginPage() {
  return <LoginForm />;
}
