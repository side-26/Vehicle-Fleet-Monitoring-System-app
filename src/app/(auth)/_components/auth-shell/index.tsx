import Image from "next/image";
import Link from "next/link";

import type { AuthLayoutShellProps } from "./auth-layout-shell.types";
import styles from "./styles.module.css";

export function AuthLayoutShell({ children }: AuthLayoutShellProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.frame}>
        <div className={styles.hero}>
          <picture className={styles.picture}>
            <source
              media="(min-width: 64rem)"
              srcSet="/images/auth/desktop-image.webp"
              width={1382}
              height={922}
            />
            <source media="(min-width: 48rem)" srcSet="/images/auth/tablet-image.webp" />
            {/* Native img enables art direction with the enclosing picture sources. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/auth/mobile-image.webp" alt="" width={768} height={512} />
          </picture>
          <Link href="/" className={styles.brand} aria-label="FleetOS home">
            <Image src="/icons/mini-favicon.svg" alt="" width={48} height={48} />
            <span>FleetOS</span>
          </Link>
          <div className={styles.introduction}>
            <h2>Smarter Fleet Operations</h2>
            <p>Manage vehicles, drivers, and operations from one powerful platform.</p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.panel}>{children}</div>
        </div>
      </div>
    </div>
  );
}
