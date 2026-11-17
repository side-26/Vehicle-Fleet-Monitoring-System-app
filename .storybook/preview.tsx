import type { Preview } from "@storybook/nextjs-vite";

// @ts-expect-error CSS side-effect imports are handled by the Storybook bundler.
import "@/app/styles/globals.css";

const preview = {
  tags: ["autodocs"],

  parameters: {
    layout: "centered",

    nextjs: {
      appDirectory: true,
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "error",
    },
  },
} satisfies Preview;

export default preview;
