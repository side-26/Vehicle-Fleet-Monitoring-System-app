import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // agentFeedback: true,
    // cssChunking: true,
    // optimizeCss: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  typedRoutes: true,
  productionBrowserSourceMaps: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
        condition: {
          not: {
            path: /\.module\.css$/,
          },
        },
      },
      "*.module.css": {
        loaders: ["@tailwindcss/turbopack"],
      },
    },
  },
};

export default nextConfig;
