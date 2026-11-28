"use client";

import dynamic from "next/dynamic";

import { LoadingLayout } from "./loading-layout";

// Resolve the viewport on the client before choosing which shell to import.
export const AdminLayoutClient = dynamic(
  () => import("./responsive-admin-layout").then((module) => module.ResponsiveAdminLayout),
  { ssr: false, loading: LoadingLayout },
);
