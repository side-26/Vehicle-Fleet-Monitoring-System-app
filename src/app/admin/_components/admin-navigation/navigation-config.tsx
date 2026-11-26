import Link from "next/link";

import { House, Layers, MapPin, Users } from "lucide-react";

export const navigation = [
  {
    label: "Overview",
    href: "/admin/dashboard",
    icon: House,
    render: <Link href="/admin/dashboard" />,
  },
  { label: "Map", href: "/admin/map", icon: MapPin, render: undefined },
  {
    label: "Violation",
    href: "/admin/violation",
    icon: Layers,
    render: undefined,
  },
  { label: "Users", href: "/admin/users", icon: Users, render: undefined },
] as const;
