import type { TrafficLocation } from "./fleet-map.types";

// Supplied PDF: FHWA Highway Performance Monitoring System (2024), 25 most traveled locations.
// Coordinates are approximate metro-area centers, not surveyed road positions.
export const trafficLocations = [
  { city: "Atlanta", route: "I-75", aadt: 405000, position: [33.749, -84.388] },
  { city: "Los Angeles", route: "I-5", aadt: 386600, position: [34.0522, -118.2437] },
  { city: "Phoenix", route: "I-10", aadt: 386198, position: [33.4484, -112.074] },
  { city: "Los Angeles", route: "I-10", aadt: 345000, position: [34.0522, -118.2437] },
  { city: "Chicago", route: "I-90", aadt: 342000, position: [41.8781, -87.6298] },
  { city: "Salt Lake City", route: "I-15", aadt: 332533, position: [40.7608, -111.891] },
  { city: "Miami", route: "FL-826", aadt: 324500, position: [25.7617, -80.1918] },
  { city: "Los Angeles", route: "CA-60", aadt: 324000, position: [34.0522, -118.2437] },
  { city: "Los Angeles", route: "I-210", aadt: 324000, position: [34.0522, -118.2437] },
  { city: "Los Angeles", route: "US-101", aadt: 323000, position: [34.0522, -118.2437] },
  { city: "Houston", route: "I-10", aadt: 318361, position: [29.7604, -95.3698] },
  { city: "Los Angeles", route: "I-110", aadt: 317000, position: [34.0522, -118.2437] },
  { city: "Atlanta", route: "I-85", aadt: 312000, position: [33.749, -84.388] },
  { city: "Miami", route: "I-95", aadt: 311000, position: [25.7617, -80.1918] },
  { city: "Houston", route: "I-610", aadt: 304321, position: [29.7604, -95.3698] },
  { city: "Washington DC", route: "I-395", aadt: 302435, position: [38.9072, -77.0369] },
  { city: "Houston", route: "I-69", aadt: 294520, position: [29.7604, -95.3698] },
  { city: "San Diego", route: "I-15", aadt: 290000, position: [32.7157, -117.1611] },
  { city: "Denver", route: "I-25", aadt: 289000, position: [39.7392, -104.9903] },
  { city: "Las Vegas", route: "I-15", aadt: 287905, position: [36.1699, -115.1398] },
  { city: "Los Angeles", route: "CA-91", aadt: 284000, position: [34.0522, -118.2437] },
  { city: "Los Angeles", route: "I-105", aadt: 283000, position: [34.0522, -118.2437] },
  { city: "Dallas", route: "I-35", aadt: 280794, position: [32.7767, -96.797] },
  { city: "Dallas", route: "I-635", aadt: 279499, position: [32.7767, -96.797] },
  { city: "Philadelphia", route: "I-95", aadt: 276083, position: [39.9526, -75.1652] },
] as const satisfies readonly TrafficLocation[];
