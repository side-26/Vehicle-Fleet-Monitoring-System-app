"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import {
  demoFleetCounts,
  demoFleetTotal,
} from "@/app/(default)/_components/fleet-map/demo-fleet-config";
import { FleetMapLegend } from "@/app/(default)/_components/fleet-map/fleet-map-legend";
import { FadeIn } from "@/components/animations/fade-in";
import Container from "@/components/common/container";
import { ViewportSuspense } from "@/components/common/viewport-suspense";

import styles from "./styles.module.css";

const fallback = <output className={styles.fallback}>Loading fleet map…</output>;
const DynamicFleetMap = dynamic(
  () => import("@/app/(default)/_components/fleet-map").then((module) => module.FleetMap),
  { loading: () => fallback },
);

export function FleetMapSection({ apiKey }: { readonly apiKey?: string }) {
  const preview = useMemo(
    () => <DynamicFleetMap counts={demoFleetCounts} apiKey={apiKey} />,
    [apiKey],
  );
  return (
    <section id="fleet-preview" className={styles.section} aria-labelledby="fleet-preview-heading">
      <Container className={styles.container}>
        <FadeIn className={styles.heading}>
          <p className={styles.eyebrow}>Your fleet, connected</p>
          <h2 id="fleet-preview-heading" className={styles.title}>
            See Your Fleet Across the USA.
          </h2>
          <p className={styles.subtitle}>
            Explore {demoFleetTotal} demo vehicles around America’s busiest road locations. Zoom in
            to discover trucks, vans, and cars, or select a cluster to explore an area.
          </p>
        </FadeIn>
        <div className={styles.preview}>
          <div className={styles.toolbar}>
            <FleetMapLegend counts={demoFleetCounts} />
            <span className={styles.badge}>Demo fleet</span>
          </div>
          <ViewportSuspense className={styles.mapSlot} fallback={fallback} dynamicMain={preview} />
          <div className={styles.caption}>
            <p>Synthetic positions near the 25 high-traffic route locations in FHWA’s 2024 data.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
