import type { LatLngTuple } from "leaflet";

export const vehicleKinds = ["truck", "van", "car"] as const;
export type VehicleKind = (typeof vehicleKinds)[number];

export type FleetVehicleCounts = Readonly<Record<VehicleKind, number>>;

export interface FleetVehicle {
  readonly id: string;
  readonly kind: VehicleKind;
  readonly city: string;
  readonly route: string;
  readonly position: LatLngTuple;
}

export interface FleetMapProps {
  readonly counts: FleetVehicleCounts;
  readonly apiKey?: string;
}

export interface TrafficLocation {
  readonly city: string;
  readonly route: string;
  readonly aadt: number;
  readonly position: LatLngTuple;
}
