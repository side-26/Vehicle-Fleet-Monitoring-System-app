import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";

import "@/app/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "FleetOS | Smart Fleet Management & Vehicle Tracking",
    template: "%s | FleetOS",
  },
  description:
    "Streamline fleet operations with FleetOS. Manage vehicles and drivers, monitor trips, schedule maintenance, and gain actionable insights from one powerful platform.",
  keywords: [
    "fleet management software",
    "vehicle fleet monitoring",
    "fleet tracking software",
    "vehicle management system",
    "driver management software",
    "fleet maintenance management",
    "fleet analytics",
    "fleet management USA",
    "FleetOS",
  ],
  applicationName: "FleetOS",
  icons: {
    icon: { url: "/icons/fleetos-logo.svg", type: "image/svg+xml" },
    shortcut: "/icons/fleetos-logo.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "FleetOS",
    title: "FleetOS | Smart Fleet Management & Vehicle Tracking",
    description:
      "Manage your entire fleet from one intelligent platform. Simplify vehicle management, driver operations, maintenance, and fleet analytics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FleetOS | Smart Fleet Management",
    description: "Your fleet. One platform. Total control. Simplify fleet operations with FleetOS.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("tw:h-full", "tw:antialiased", inter.variable, "tw:font-sans")}
    >
      <body className="tw:min-block-lvh tw:inline-full">
        <ThemeProvider>
          <ToastProvider>
            <main>{children}</main>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
