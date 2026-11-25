import Link from "next/link";

import { ArrowRight, ChartNoAxesCombined, ShieldCheck, Zap } from "lucide-react";

import { FadeIn } from "@/components/animations/fade-in";
import { StaggeredListAnimation } from "@/components/animations/stagered-list-animation";
import Container from "@/components/common/container";
import { ResponsiveImage } from "@/components/common/responsive-image-source";
import { Button } from "@/components/ui/button";

import { heroImageSources } from "./hero-section.types";
import styles from "./styles.module.css";

// Base UI defaults non-native renders to role=button; these calls to action navigate.
const linkSemantics = { role: "link" } as const;
const accountLink = <Link href="/login" />;
const featuresLink = <Link href="/#features" />;

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <Container className={styles.container}>
        <StaggeredListAnimation className={styles.copy} stagger={90}>
          <p className={styles.eyebrow}>Vehicle fleet management</p>
          <h1 id="hero-heading" className={styles.heading}>
            Your Fleet. One Platform.
            <br /> Total Control.
          </h1>
          <p className={styles.description}>
            Manage vehicles, organize drivers, track maintenance, and streamline operations from one
            connected platform.
          </p>
          <div className={styles.actions}>
            <Button
              render={accountLink}
              nativeButton={false}
              {...linkSemantics}
              aria-label="Get started"
              size="lg"
            >
              Get Started <ArrowRight aria-hidden="true" data-icon="inline-end" />
            </Button>
            <Button
              render={featuresLink}
              nativeButton={false}
              {...linkSemantics}
              aria-label="Explore features"
              size="lg"
              variant="outlined"
            >
              Explore Features
            </Button>
          </div>
          <ul className={styles.benefits} aria-label="FleetOS benefits">
            <li>
              <Zap aria-hidden="true" />
              <span>Track in real time</span>
            </li>
            <li>
              <ChartNoAxesCombined aria-hidden="true" />
              <span>Improve efficiency</span>
            </li>
            <li>
              <ShieldCheck aria-hidden="true" />
              <span>Keep your fleet reliable</span>
            </li>
          </ul>
        </StaggeredListAnimation>
        <FadeIn className={styles.visual} duration={700}>
          <ResponsiveImage
            sources={heroImageSources}
            pictureClassName={styles.picture}
            src="/images/landing/hero-mobile-tablet.png"
            alt="A car, van, and truck on a lakefront highway with live fleet tracking indicators."
            width={868}
            height={651}
            unoptimized
            loading="eager"
            fetchPriority="high"
            className={styles.image}
          />
        </FadeIn>
      </Container>
    </section>
  );
}
