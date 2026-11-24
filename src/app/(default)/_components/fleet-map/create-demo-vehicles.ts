import { vehicleKinds } from "./fleet-map.types";
import type { FleetVehicle, FleetVehicleCounts } from "./fleet-map.types";
import { trafficLocations } from "./traffic-locations";

/** Deterministic synthetic demo: exact counts, with AADT-weighted route allocation. */
export function createDemoVehicles(counts: FleetVehicleCounts): readonly FleetVehicle[] {
  const totalTraffic = trafficLocations.reduce((sum, location) => sum + location.aadt, 0);
  return vehicleKinds.flatMap((kind, kindIndex) => {
    const count = counts[kind];
    if (!Number.isSafeInteger(count) || count < 0)
      throw new RangeError("Vehicle counts must be nonnegative safe integers.");
    const allocations = trafficLocations.map((location, index) => {
      const quota = (count * location.aadt) / totalTraffic;
      return { index, count: Math.floor(quota), remainder: quota % 1 };
    });
    const remaining = count - allocations.reduce((sum, entry) => sum + entry.count, 0);
    const priority = allocations.toSorted((a, b) => b.remainder - a.remainder || a.index - b.index);
    priority.slice(0, remaining).forEach((entry) => {
      entry.count += 1;
    });
    return allocations.flatMap(({ index, count: locationCount }) => {
      const location = trafficLocations[index];
      if (!location) return [];
      return Array.from({ length: locationCount }, (_, markerIndex) => {
        const seed = (index + 1) * 41 + (kindIndex + 1) * 131 + markerIndex * 17;
        const latitudeOffset = Math.sin(seed * 1.618) * 0.045;
        const longitudeOffset = Math.cos(seed * 2.414) * 0.06;
        return {
          id: `${kind}-${index}-${markerIndex}`,
          kind,
          city: location.city,
          route: location.route,
          position: [location.position[0] + latitudeOffset, location.position[1] + longitudeOffset],
        } satisfies FleetVehicle;
      });
    });
  });
}
