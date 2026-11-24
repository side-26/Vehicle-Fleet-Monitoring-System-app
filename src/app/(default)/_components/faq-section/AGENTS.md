# FAQ section

Owns the landing #faq anchor below About Us, before the shared footer. Matches the supplied FleetOS reference with vertically centered introductory copy on the left and five initially collapsed accordion questions on the right at desktop widths; smaller screens stack both columns. Keep question IDs and copy in a local array in index.tsx and map it through the shared Accordion parts. Reuse primary outline styling and single-panel expansion. The shared Accordion owns accessible heading/button/panel behavior and motion. Keep layout styling in the local CSS Module with @apply and nested media queries. Answers are general guidance; do not add unverified guarantees about security, tracking hardware or support availability. The browser story verifies headings, the FAQ anchor, initial state and expansion/collapse with accessibility checks enabled.

Responsive browser stories verify actual viewport widths at 320, 390, 768, 1023, 1024 and 1440 CSS pixels, stacked/two-column geometry at the 64rem breakpoint, overflow before and after expansion, and shared accordion interaction/accessibility checks.

Integration tests render the section with the real shared Accordion and verify all answers, single-panel behavior, collapsing and keyboard activation. Browser stories verify desktop vertical centers before and after expansion.
