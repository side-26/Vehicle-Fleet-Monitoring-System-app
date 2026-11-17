export default {
  "*.{ts,tsx,js,jsx,mts,mjs,cts,cjs}": ["oxfmt --write", "oxlint --fix --deny-warnings"],

  "*.{json,jsonc,css,scss,md,mdx,yaml,yml}": ["oxfmt --write"],
};
