---
id: configuration
title: "Configuration"
sidebar_label: "Configuration"
sidebar_position: 5
mdx:
  format: md
---

# Configuration

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Every setting is resolved from the environment and overridable with functional
options. Options take precedence over environment variables:

```go
// Functional options override the environment. Here: OAuth 2.0
// client-credentials against a SaaS cluster.
client, err := camunda.New(
	camunda.WithRestAddress("https://my-cluster.region.camunda.io"),
	camunda.WithOAuth(
		"my-client-id",
		"my-client-secret",
		"https://login.cloud.camunda.io/oauth/token",
	),
	camunda.WithOAuthAudience("zeebe.camunda.io"),
)
```
