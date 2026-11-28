import type { ComponentProps } from "react";

import type { DropdownMenuContent } from "@/components/ui/dropdown-menu";

export interface AdminProfileMenuContentProps {
  readonly fullName: string;
  readonly subtitle: string;
  readonly align?: ComponentProps<typeof DropdownMenuContent>["align"];
  readonly onProfile?: () => void;
  readonly onSignOut?: () => void;
}
