import { expect, it } from "vitest";

import { createDemoVehicles } from "./create-demo-vehicles";
import { trafficLocations } from "./traffic-locations";

const counts = { truck: 40, van: 30, car: 20 };

it("preserves exact counts, stable IDs and deterministic positions", () => {
  const vehicles = createDemoVehicles(counts);
  expect(vehicles).toHaveLength(90);
  expect(new Set(vehicles.map((vehicle) => vehicle.id)).size).toBe(90);
  expect(vehicles.filter((vehicle) => vehicle.kind === "truck")).toHaveLength(40);
  expect(vehicles.filter((vehicle) => vehicle.kind === "van")).toHaveLength(30);
  expect(vehicles.filter((vehicle) => vehicle.kind === "car")).toHaveLength(20);
  expect(createDemoVehicles(counts)).toEqual(vehicles);
});

it("uses all 25 sourced routes and weights dense metro areas", () => {
  expect(trafficLocations).toHaveLength(25);
  const vehicles = createDemoVehicles({ truck: 1000, van: 0, car: 0 });
  const cities = new Set(vehicles.map((vehicle) => vehicle.city));
  expect(cities.size).toBe(13);
  expect(vehicles.filter((vehicle) => vehicle.city === "Los Angeles").length).toBeGreaterThan(
    vehicles.filter((vehicle) => vehicle.city === "Denver").length,
  );
  for (const vehicle of vehicles) {
    expect(vehicle.position[0]).toBeGreaterThan(24);
    expect(vehicle.position[0]).toBeLessThan(50);
    expect(vehicle.position[1]).toBeGreaterThan(-126);
    expect(vehicle.position[1]).toBeLessThan(-66);
  }
});

it("handles zero counts and rejects negative, fractional or nonfinite values", () => {
  expect(createDemoVehicles({ truck: 0, van: 0, car: 0 })).toEqual([]);
  for (const truck of [-1, 1.5, Infinity, NaN]) {
    expect(() => createDemoVehicles({ truck, van: 0, car: 0 })).toThrow(RangeError);
  }
});
