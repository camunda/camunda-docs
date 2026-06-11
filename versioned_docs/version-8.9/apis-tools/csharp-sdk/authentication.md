---
id: authentication
title: "Authentication"
sidebar_label: "Authentication"
sidebar_position: 6
mdx:
  format: md
---

# Authentication

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

- **OAuth** — Automatic token management with singleflight refresh, caching, and retry
- **Basic** — HTTP Basic Authentication
- **None** — No authentication (local development)

Auth strategy is auto-detected from environment variables when not explicitly set.
