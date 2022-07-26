import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    // specify a relatively large viewport so that we capture
    //   the entire header & footer
    viewport: { width: 1400, height: 1400 },
  },
};

export default config;
