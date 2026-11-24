import type { FleetVehicleCounts } from "./fleet-map.types";

// Preserve the requested breakdown: 400 + 300 + 200 = 900 demo vehicles.
export const demoFleetCounts = {
  truck: 400,
  van: 300,
  car: 200,
} as const satisfies FleetVehicleCounts;
export const demoFleetTotal = demoFleetCounts.truck + demoFleetCounts.van + demoFleetCounts.car;
