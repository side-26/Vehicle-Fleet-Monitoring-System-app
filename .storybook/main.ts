import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";

const storybookConfig: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
    "storybook-dark-mode",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  viteFinal: async (viteConfig) => {
    return mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: {
        dedupe: ["react", "react-dom"],
      },
      optimizeDeps: {
        include: [
          "@base-ui/react/input",
          "@base-ui/react/separator",
          "@base-ui/react/checkbox",
          "@base-ui/react/radio-group",
          "@base-ui/react/radio",
          "@base-ui/react/switch",
          "@base-ui/react/tooltip",
          "@base-ui/react/preview-card",
          "@base-ui/react/slider",
          "@base-ui/react/toast",
          "next-themes",
          "next/link",
          "react-hook-form",
          "react-dom",
          "react-leaflet",
          "leaflet",
        ],
      },
    });
  },
};
export default storybookConfig;
