import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import {
  buttonVariants as BUTTON_VARIANTS,
  buttonSizes as BUTTON_SIZES,
  buttonColor as BUTTON_COLORS,
} from "./button.types";
import { Button } from "./index";

const meta = {
  title: "Shared/UI/Button",
  component: Button,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    variant: {
      control: "select",
      options: BUTTON_VARIANTS,
    },

    color: {
      control: "select",
      options: BUTTON_COLORS,
      description: "Semantic button color. Neutral reverses dark/light colors with the theme.",
      type: "string",
    },

    size: {
      control: "inline-radio",
      options: BUTTON_SIZES,
    },

    disabled: {
      control: "boolean",
    },

    children: {
      control: "text",
    },
  },

  args: {
    "aria-label": "Button",
    variant: "filled",
    color: "primary",
    size: "md",
    disabled: false,
    children: "Button",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Neutral: Story = {
  args: { color: "neutral", children: "Neutral", "aria-label": "Neutral" },
};

export const NeutralVariants: Story = {
  args: { color: "neutral" },
  render: (args) => (
    <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-4">
      {BUTTON_VARIANTS.map((variant) => (
        <Button {...args} key={variant} aria-label={`Neutral ${variant}`} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Filled: Story = {
  args: {
    variant: "filled",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
};

export const Tonal: Story = {
  args: {
    variant: "tonal",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    "aria-label": "Saving changes",
    children: "Save changes",
    loading: true,
    loadingText: "Saving changes…",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-4">
      {BUTTON_VARIANTS.map((variant) => (
        <Button {...args} key={variant} aria-label={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const AllColors: Story = {
  render: (args) => (
    <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-4">
      {BUTTON_COLORS.map((color) => (
        <Button {...args} key={color} aria-label={color} color={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-4">
      {BUTTON_SIZES.map((size) => (
        <Button {...args} key={size} aria-label={size} size={size}>
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  ),
};

export const VariantMatrix: Story = {
  args: {
    className: "tw:text-3xl",
  },

  render: (args) => (
    <div className="tw:flex tw:flex-col tw:gap-6">
      {BUTTON_COLORS.map((color) => (
        <div key={color} className="tw:flex tw:items-center tw:gap-4">
          {BUTTON_VARIANTS.map((variant) => (
            <Button
              {...args}
              key={variant}
              aria-label={`${color} ${variant}`}
              color={color}
              variant={variant}
            >
              {variant}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
