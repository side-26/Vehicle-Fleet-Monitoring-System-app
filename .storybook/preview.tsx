import type { Preview } from "@storybook/nextjs-vite";

import "@/app/src/app/styles/globals.css";

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
