import { DEFAULT_NETWORK, NETWORK_PROFILES } from "@playwright/performance/config/network";
import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  page: async ({ page, context }, runTest) => {
    const session = await context.newCDPSession(page);

    try {
      await session.send("Network.enable");

      await session.send("Network.setCacheDisabled", {
        cacheDisabled: true,
      });

      await session.send("Network.emulateNetworkConditions", NETWORK_PROFILES[DEFAULT_NETWORK]);

      await runTest(page);
    } finally {
      await session.detach();
    }
  },
});

export { expect };
