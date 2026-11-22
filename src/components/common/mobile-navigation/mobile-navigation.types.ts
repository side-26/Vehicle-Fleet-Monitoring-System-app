import { CircleUserRound, LayoutGrid, Tag, UserRoundPlus, Users } from "lucide-react";

export const mobileNavigationItems = [
  { label: "Account", href: "/login", icon: CircleUserRound },
  { label: "Features", href: "/#features", icon: LayoutGrid },
  { label: "How It Works", href: "/#how-it-works", icon: UserRoundPlus },
  { label: "Pricing", href: "/#pricing", icon: Tag },
  { label: "About Us", href: "/#about-us", icon: Users },
] as const;
