# Landing route components

Contains composed UI used only by the public landing route, including the responsive landing shell and the hero section. The hero owns only its first-screen content and responsive picture; shared header/footer composition remains in landing-shell.

features-section owns the #features anchor and six informational fleet capability cards, with responsive grid, animations and local CSS Module.

how-it-works-section owns the #how-it-works anchor and three numbered onboarding steps with staggered animation and responsive connectors.

fleet-map-section provides the primary-color landing demo preview and lazily loads the route-owned clustered fleet map when visible.

fleet-map owns the landing demo map, synthetic dataset, traffic locations, legend, styles and data tests.

pricing-section owns the #pricing plan comparison with responsive pricing rows, a highlighted Professional plan and staggered card entry on mobile.

about-us-section owns the #about-us anchor, collaborative team photo, company introduction and mission, values and vision in a desktop two-column layout.

faq-section owns the #faq anchor with introductory copy and five mapped questions using the shared Accordion in a responsive two-column layout.
