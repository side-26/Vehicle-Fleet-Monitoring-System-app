import { CarFront, MonitorCheck, UserRoundPlus } from "lucide-react";

export const howItWorksSteps = [
  {
    id: "account",
    number: 1,
    title: "Create Your Account",
    description: "Register your organization and set up your workspace.",
    icon: UserRoundPlus,
  },
  {
    id: "vehicles",
    number: 2,
    title: "Add Vehicles & Drivers",
    description: "Register your vehicles and drivers, and assign them to your fleet.",
    icon: CarFront,
  },
  {
    id: "manage",
    number: 3,
    title: "Manage Your Fleet",
    description: "Track activity, handle maintenance, and review insights in real time.",
    icon: MonitorCheck,
  },
] as const;
