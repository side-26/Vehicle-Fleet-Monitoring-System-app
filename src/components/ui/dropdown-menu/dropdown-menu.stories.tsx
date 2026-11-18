import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./index";

const meta = {
  title: "Shared/UI/Dropdown Menu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" }, layout: "centered" },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Fleet actions</DropdownMenuLabel>
          <DropdownMenuItem>
            View vehicles<DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>Export report</DropdownMenuItem>
          <DropdownMenuItem disabled>Unavailable</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete report</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
} satisfies Meta<typeof DropdownMenu>;
export default meta;
type Story = StoryObj<typeof meta>;
const tallStyle = { blockSize: "200vh" };
const scrollStyle = { blockSize: "10em", overflow: "auto" } as const;
const scrollContentStyle = { blockSize: "20em" };
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Open menu" }));
    await expect(
      await within(document.body).findByRole("menuitem", { name: /View vehicles/ }),
    ).toBeVisible();
  },
};
export const CheckboxAndRadio: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Preferences</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Display</DropdownMenuLabel>
          <DropdownMenuCheckboxItem defaultChecked>Show map</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup defaultValue="list">
          <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Preferences" }));
    await expect(
      await within(document.body).findByRole("menuitemcheckbox", { name: "Show map" }),
    ).toBeVisible();
    await expect(
      await within(document.body).findByRole("menuitemradio", { name: "List" }),
    ).toBeVisible();
  },
};
export const Submenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>More actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>Copy link</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "More actions" }));
    await expect(
      await within(document.body).findByRole("menuitem", { name: "Share" }),
    ).toBeVisible();
  },
};
export const ClosesOnOutsideScroll: Story = {
  render: () => (
    <div style={tallStyle}>
      <DropdownMenu>
        <DropdownMenuTrigger>Scroll test menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>View vehicles</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div data-testid="outside-scroll" style={scrollStyle}>
        <div style={scrollContentStyle}>Scroll outside the menu</div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Scroll test menu" }));
    await expect(
      await within(document.body).findByRole("menuitem", { name: "View vehicles" }),
    ).toBeVisible();
    canvas.getByTestId("outside-scroll").dispatchEvent(new Event("scroll", { bubbles: false }));
    await waitFor(() =>
      expect(
        within(document.body).queryByRole("menuitem", { name: "View vehicles" }),
      ).not.toBeInTheDocument(),
    );
  },
};
