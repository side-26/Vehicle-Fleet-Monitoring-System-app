interface PerformanceRoute {
  name: string;
  path: string;
}

export const PERFORMANCE_ROUTES = [
  {
    name: "home",
    path: "/",
  },
] as const satisfies readonly PerformanceRoute[];
