import Link from "next/link";

import { Check } from "lucide-react";

import { FadeIn } from "@/components/animations/fade-in";
import { StaggeredListAnimation } from "@/components/animations/stagered-list-animation";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";

import { pricingPlans } from "./pricing-section.types";
import styles from "./styles.module.css";

const accountLink = <Link href="/login" />;
const linkSemantics = { role: "link" } as const;

export function PricingSection() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className={styles.section}>
      <Container>
        <FadeIn className={styles.heading}>
          <p className={styles.eyebrow}>Pricing</p>
          <h2 id="pricing-heading" className={styles.title}>
            Simple, Transparent Pricing for Every Fleet.
          </h2>
        </FadeIn>
        <StaggeredListAnimation className={styles.plans} stagger={120}>
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={styles.plan}
              data-featured={plan.featured}
              aria-labelledby={`pricing-${plan.id}`}
            >
              {plan.featured && <span className={styles.badge}>Most Popular</span>}
              <div className={styles.summary}>
                <h3 id={`pricing-${plan.id}`} className={styles.planTitle}>
                  {plan.name}
                </h3>
                <p className={styles.description}>{plan.description}</p>
              </div>
              <div className={styles.priceBlock}>
                <p className={styles.price}>
                  <strong>{plan.price}</strong>
                  {plan.capacity && <span> /month</span>}
                </p>
                {plan.capacity && <p className={styles.capacity}>{plan.capacity}</p>}
              </div>
              <ul className={styles.features} aria-label={`${plan.name} features`}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                render={accountLink}
                nativeButton={false}
                {...linkSemantics}
                aria-label={`${plan.action} — ${plan.name}`}
                variant="filled"
                color={plan.featured ? "neutral" : "primary"}
                className={styles.action}
              >
                {plan.action}
              </Button>
            </article>
          ))}
        </StaggeredListAnimation>
      </Container>
    </section>
  );
}
