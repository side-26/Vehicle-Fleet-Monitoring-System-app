import Image from "next/image";

import { Gem, Target, UsersRound } from "lucide-react";

import Container from "@/components/common/container";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item/index";

import styles from "./styles.module.css";

const aboutUsPrinciples = [
  {
    id: "mission",
    icon: Target,
    title: "Our Mission",
    description: "Simplify fleet operations for every business.",
  },
  {
    id: "values",
    icon: Gem,
    title: "Our Values",
    description: "Reliability, transparency, and continuous improvement.",
  },
  {
    id: "vision",
    icon: UsersRound,
    title: "Our Vision",
    description: "A smarter and more connected transportation ecosystem.",
  },
] as const;

export function AboutUsSection() {
  return (
    <section id="about-us" aria-labelledby="about-us-heading" className={styles.section}>
      <Container className={styles.container}>
        <div className={styles.visual}>
          <Image
            src="/images/landing/about-us-team.jpg"
            alt="A fleet operations team collaborating around a table with vehicle tracking dashboards behind them."
            width={1013}
            height={760}
            sizes="(min-width: 64rem) 40vw, 100vw"
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <p className={styles.eyebrow}>About Us</p>
          <h2 id="about-us-heading" className={styles.title}>
            Building Smarter Tools for Modern Fleet Management.
          </h2>
          <p className={styles.description}>
            We are a team of technology and transportation enthusiasts, focused on creating
            practical and reliable fleet management solutions. Our goal is to help businesses
            operate safer, more efficient, and more data-driven fleets.
          </p>
          <ItemGroup className={styles.principles} aria-label="What guides FleetOS">
            {aboutUsPrinciples.map(({ id, icon: Icon, title, description }) => (
              <Item key={id} className={styles.principle}>
                <ItemMedia>
                  <Icon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{title}</ItemTitle>
                  <ItemDescription>{description}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </div>
      </Container>
    </section>
  );
}
