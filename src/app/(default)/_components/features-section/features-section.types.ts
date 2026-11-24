import { Bell, CarFront, ChartNoAxesCombined, Route, Users, Wrench } from "lucide-react";

export const fleetFeatures = [
  {
    id: "vehicles",
    title: "Vehicle Management",
    description: "Register, organize, and monitor all your vehicles in one place.",
    icon: CarFront,
  },
  {
    id: "drivers",
    title: "Driver Management",
    description: "Add drivers, assign vehicles, and manage access and activity.",
    icon: Users,
  },
  {
    id: "trips",
    title: "Trip Management",
    description: "Plan, assign, and track trips with full history and clear visibility.",
    icon: Route,
  },
  {
    id: "maintenance",
    title: "Maintenance Scheduling",
    description: "Keep your fleet road-ready with service reminders and records.",
    icon: Wrench,
  },
  {
    id: "notifications",
    title: "Notifications & Alerts",
    description: "Get instant alerts for maintenance, vehicle status, and unusual activity.",
    icon: Bell,
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    description: "Turn fleet data into insights with clear reports and operational metrics.",
    icon: ChartNoAxesCombined,
  },
] as const;
