import { FadeIn } from "@/components/animations/fade-in";
import { StaggeredListAnimation } from "@/components/animations/stagered-list-animation";
import Container from "@/components/common/container";

import { howItWorksSteps } from "./how-it-works-section.types";
import styles from "./styles.module.css";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className={styles.section}>
      <Container>
        <FadeIn className={styles.heading}>
          <p className={styles.eyebrow}>How It Works</p>
          <h2 id="how-it-works-heading" className={styles.title}>
            Get Started in Three Simple Steps.
          </h2>
        </FadeIn>
        <StaggeredListAnimation className={styles.steps} stagger={120}>
          {howItWorksSteps.map(({ id, number, title, description, icon: Icon }) => (
            <article key={id} className={styles.step} aria-labelledby={`how-it-works-${id}`}>
              <span className={styles.icon}>
                <Icon aria-hidden="true" />
              </span>
              <h3 id={`how-it-works-${id}`} className={styles.stepTitle}>
                <span className={styles.number} aria-hidden="true">
                  {number}
                </span>
                <span>
                  <span className={styles.srOnly}>Step {number}:</span> {title}
                </span>
              </h3>
              <p className={styles.description}>{description}</p>
            </article>
          ))}
        </StaggeredListAnimation>
      </Container>
    </section>
  );
}
