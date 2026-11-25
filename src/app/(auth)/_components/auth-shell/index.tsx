import Image from "next/image";
import Link from "next/link";

import Container from "@/components/common/container";
import { ResponsiveImage } from "@/components/common/responsive-image-source";

import { authImageSources } from "./auth-layout-shell.types";
import type { AuthLayoutShellProps } from "./auth-layout-shell.types";
import styles from "./styles.module.css";

export function AuthLayoutShell({ children }: AuthLayoutShellProps) {
  return (
    <div className={styles.shell}>
      <Container className={styles.container}>
        <div className={styles.frame}>
          <div className={styles.hero}>
            <ResponsiveImage
              sources={authImageSources}
              pictureClassName={styles.picture}
              src="/images/auth/mobile-image.webp"
              alt=""
              width={768}
              height={512}
              loading="eager"
              unoptimized
            />
            <Link href="/" className={styles.brand} aria-label="FleetOS home">
              <Image src="/icons/mini-favicon.svg" alt="" width={48} height={48} />
              <span>FleetOS</span>
            </Link>
            <div className={styles.introduction}>
              <h2>Smarter Fleet Operations</h2>
              <p>Manage vehicles, drivers, and operations from one powerful platform.</p>
            </div>
          </div>
          <section className={styles.content}>
            <div className={styles.panel}>{children}</div>
          </section>
        </div>
      </Container>
    </div>
  );
}
