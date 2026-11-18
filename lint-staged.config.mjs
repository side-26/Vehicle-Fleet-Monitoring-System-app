const formatSourceFiles = ["oxfmt --write", "oxlint --fix --deny-warnings"];
const formatTextFiles = ["oxfmt --write"];
const stagedFormatterIgnore = [".agents/**"];

export default {
  "*.{ts,tsx,js,jsx,mts,mjs,cts,cjs}": formatSourceFiles,
  "*.{json,jsonc,css,scss,md,mdx,yaml,yml}": (filePaths) => {
    const formatableFiles = filePaths.filter(
      (filePath) =>
        !stagedFormatterIgnore.some((pattern) => filePath.includes(pattern.slice(0, -3))),
    );

    return formatableFiles.length > 0 ? `${formatTextFiles[0]} ${formatableFiles.join(" ")}` : [];
  },
};
