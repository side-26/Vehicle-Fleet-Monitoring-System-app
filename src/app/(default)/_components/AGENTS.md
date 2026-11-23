# Landing route components

Contains composed UI used only by the public landing route, including the responsive landing shell and the hero section. The hero owns only its first-screen content and responsive picture; shared header/footer composition remains in landing-shell.

features-section owns the #features anchor and six informational fleet capability cards, with responsive grid, animations and local CSS Module.

how-it-works-section owns the #how-it-works anchor and three numbered onboarding steps with staggered animation and responsive connectors.

fleet-map-section provides the primary-color landing demo preview and lazily loads the route-owned clustered fleet map when visible.

fleet-map owns the landing demo map, synthetic dataset, traffic locations, legend, styles and data tests.
