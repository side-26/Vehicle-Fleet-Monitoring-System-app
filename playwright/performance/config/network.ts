export const NETWORK_PROFILES = {
  slow4G: {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
    connectionType: "cellular4g",
  },
} as const;

export const DEFAULT_NETWORK = "slow4G";
