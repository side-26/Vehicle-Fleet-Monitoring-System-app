import { FadeIn } from "@/components/animations/fade-in";
import { StaggeredListAnimation } from "@/components/animations/stagered-list-animation";
import Container from "@/components/common/container";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

import { fleetFeatures } from "./features-section.types";
import styles from "./styles.module.css";

export function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-heading" className={styles.section}>
      <Container>
        <FadeIn className={styles.heading}>
          <p className={styles.eyebrow}>Features</p>
          <h2 id="features-heading" className={styles.title}>
            Everything You Need to Manage Your Fleet.
          </h2>
        </FadeIn>
        <StaggeredListAnimation className={styles.grid} stagger={70}>
          {fleetFeatures.map(({ id, title, description, icon: Icon }) => (
            <article key={id} aria-labelledby={`feature-${id}`} className={styles.feature}>
              <Card className={styles.card}>
                <CardHeader className={styles.cardHeader}>
                  <span className={styles.icon}>
                    <Icon aria-hidden="true" />
                  </span>
                  <div className={styles.details}>
                    <h3 id={`feature-${id}`} className={styles.featureTitle}>
                      {title}
                    </h3>
                    <CardDescription className={styles.description}>{description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </article>
          ))}
        </StaggeredListAnimation>
      </Container>
    </section>
  );
}
