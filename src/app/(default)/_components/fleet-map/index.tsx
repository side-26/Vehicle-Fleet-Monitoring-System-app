"use client";

import Image from "next/image";
import { useMemo } from "react";

import type { LatLngBoundsExpression } from "leaflet";

import { LeafletMap } from "@/components/ui/maps/leaflet/leaflet-map";
import { LeafletMapCluster } from "@/components/ui/maps/leaflet/leaflet-map/leaflet-map-cluster";
import { MapPointer } from "@/components/ui/maps/leaflet/map-pointer";
import { MapTile } from "@/components/ui/maps/leaflet/map-tile";
import { PointerIcon } from "@/components/ui/maps/leaflet/pointer-icon";

import { createDemoVehicles } from "./create-demo-vehicles";
import type { FleetMapProps } from "./fleet-map.types";
import styles from "./styles.module.css";

const bounds = [
  [24.5, -125],
  [49.5, -66],
] satisfies LatLngBoundsExpression;

export function FleetMap({ counts, apiKey }: Readonly<FleetMapProps>) {
  const { truck, van, car } = counts;
  const vehicles = useMemo(() => createDemoVehicles({ truck, van, car }), [truck, van, car]);
  return (
    <LeafletMap
      bounds={bounds}
      maxZoom={20}
      scrollWheelZoom={false}
      className={styles.map}
      aria-label="Demo fleet across the United States"
    >
      <MapTile
        lightUrl="https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png"
        darkUrl="https://maps.geoapify.com/v1/tile/dark-matter-brown/{z}/{x}/{y}.png"
        apiKey={apiKey}
        attribution='Powered by <a href="https://www.geoapify.com/">Geoapify</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LeafletMapCluster
        chunkedLoading
        showCoverageOnHover={false}
        animate={false}
        disableClusteringAtZoom={14}
      >
        {vehicles.map(({ id, kind, position, city, route }) => {
          return (
            <MapPointer key={id} position={position} alt={`${kind} ${id} near ${city}, ${route}`}>
              <PointerIcon className={styles.vehicle} data-kind={kind}>
                <Image src={`/images/map-icons/${kind}-map-icon.png`} alt="" fill />
              </PointerIcon>
            </MapPointer>
          );
        })}
      </LeafletMapCluster>
    </LeafletMap>
  );
}
