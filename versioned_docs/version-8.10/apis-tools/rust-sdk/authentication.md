---
id: authentication
title: "Authentication"
sidebar_label: "Authentication"
sidebar_position: 5
mdx:
  format: md
---

# Authentication

:::caution Technical Preview
The Rust SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

The strategy is chosen by `CAMUNDA_AUTH_STRATEGY` (or inferred from the presence of OAuth
credentials):

| Strategy | Required configuration                                                                                                      |
| -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `OAUTH`  | `CAMUNDA_CLIENT_ID`, `CAMUNDA_CLIENT_SECRET`, `CAMUNDA_OAUTH_URL`, optional `CAMUNDA_TOKEN_AUDIENCE`, `CAMUNDA_OAUTH_SCOPE` |
| `BASIC`  | `CAMUNDA_BASIC_AUTH_USERNAME`, `CAMUNDA_BASIC_AUTH_PASSWORD`                                                                |
| `NONE`   | — (local development)                                                                                                       |

OAuth uses the client-credentials grant. Tokens are cached in memory and refreshed shortly
before expiry.
