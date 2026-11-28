import { Bell, House, Layers, MapPin, Users } from "lucide-react";

export const mobileAdminNavigationItems = [
  { key: "overview", label: "Overview", icon: House },
  { key: "violations", label: "Violations", icon: Layers },
  { key: "map", label: "Map", icon: MapPin },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "users", label: "Users", icon: Users },
] as const;
export type MobileAdminDestination = (typeof mobileAdminNavigationItems)[number]["key"];

export interface MobileAdminBottomNavigationProps {
  /** Current destination; defaults to overview. */
  readonly activeDestination?: MobileAdminDestination;
  /** Connects app routes. Without a handler, only the existing overview link is enabled. */
  readonly onNavigate?: (destination: MobileAdminDestination) => void;
}
