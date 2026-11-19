# Repository scripts

Contains repository validation tools. check-tailwind-classes.mjs recursively checks every .module.css file in the repository against the installed Tailwind compiler's canonical forms for @apply utilities and exits unsuccessfully for noncanonical utilities. Dependencies, version control data, build output, coverage, and test reports are excluded. It runs through lint:tailwind and the main lint command.
