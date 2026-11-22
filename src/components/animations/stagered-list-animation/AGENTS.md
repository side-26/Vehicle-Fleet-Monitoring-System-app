# Staggered list animation

Reusable presentation wrappers for motion. stagered-list-animation.tsx exports StaggeredListAnimation with millisecond stagger, duration and initial delay props. Animate each direct child on insertion using the shared slide-y keyframes, retaining React keys and respecting reduced motion. Wrappers are divs, so pass cards/content rather than bare li/tr elements; fragments count as one animation item. Styles are in styles.module.css; props are in the adjacent types file.

Uses useAnimationRunOnIntersectionObserver at threshold 0.4 to start once when 40% of the wrapper is visible. The component is a client boundary; data-visible gates the CSS animation. Reduced-motion users see content immediately. Native refs remain forwarded.
