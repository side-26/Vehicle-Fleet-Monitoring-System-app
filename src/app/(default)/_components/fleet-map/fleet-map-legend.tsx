import Image from "next/image";

import type { FleetMapProps, VehicleKind } from "./fleet-map.types";
import styles from "./styles.module.css";

const legend = [
  { kind: "truck", label: "Trucks" },
  { kind: "van", label: "Vans" },
  { kind: "car", label: "Cars" },
] as const satisfies readonly {
  readonly kind: VehicleKind;
  readonly label: string;
}[];

export function FleetMapLegend({ counts }: Readonly<FleetMapProps>) {
  return (
    <ul className={styles.legend} aria-label="Demo fleet vehicle counts">
      {legend.map(({ kind, label }) => (
        <li key={kind}>
          <div className={styles["legend--icon"]}>
            <Image src={`/images/map-icons/${kind}-map-icon.png`} alt={label} fill />
          </div>
          <span>
            <strong>{counts[kind]}</strong> {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
