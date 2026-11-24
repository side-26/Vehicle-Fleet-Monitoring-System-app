import Container from "@/components/common/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import styles from "./styles.module.css";

const frequentlyAskedQuestions = [
  {
    id: "supported-vehicles",
    question: "What types of vehicles are supported?",
    answer:
      "Manage cars, vans, and trucks in one workspace, whether you run a small team or a mixed commercial fleet.",
  },
  {
    id: "hardware",
    question: "Do I need special hardware to use the platform?",
    answer:
      "You can manage your vehicles, drivers, trips, and maintenance from your browser. Live location tracking may require a compatible tracking device or integration.",
  },
  {
    id: "growing-fleet",
    question: "Can I add more vehicles or drivers later?",
    answer:
      "Yes. Add vehicles and drivers as your fleet grows. Check your plan’s vehicle limit to choose the right capacity for your team.",
  },
  {
    id: "data-security",
    question: "Is my data secure?",
    answer:
      "Keep your account credentials private and give access only to authorized team members. For details about data storage and security practices, contact your account administrator.",
  },
  {
    id: "support",
    question: "What kind of support do you provide?",
    answer:
      "For help with setup or day-to-day fleet management, contact your fleet administrator or support team. Include a description of your question so they can help you get back on track.",
  },
] as const;

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className={styles.section}>
      <Container className={styles.container}>
        <div className={styles.introduction}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2 id="faq-heading" className={styles.title}>
            Frequently Asked Questions
          </h2>
          <p className={styles.description}>
            Have a question? Here are answers to some of the most common ones.
          </p>
        </div>
        <Accordion
          variant="outline"
          color="primary"
          size="md"
          aria-label="FleetOS frequently asked questions"
        >
          {frequentlyAskedQuestions.map(({ id, question, answer }) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>
                <p>{answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
