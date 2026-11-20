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
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Three strategies are supported: OAuth 2.0 client credentials, HTTP Basic, and
none. The strategy is inferred from the credentials you supply, or set explicitly
with `CAMUNDA_AUTH_STRATEGY=OAUTH|BASIC|NONE`.

```go
// OAuth 2.0 client credentials. Tokens are cached in memory and on disk, and
// refreshed before expiry; concurrent refreshes are collapsed into one.
oauthClient, err := camunda.New(
	camunda.WithOAuth(
		"my-client-id",
		"my-client-secret",
		"https://login.cloud.camunda.io/oauth/token",
	),
	camunda.WithOAuthAudience("zeebe.camunda.io"),
	camunda.WithOAuthScope("camunda:read"),
	camunda.WithOAuthCacheDir("/var/cache/camunda"),
)

// HTTP Basic — typical for a Self-Managed cluster behind basic auth.
basicClient, err := camunda.New(
	camunda.WithBasicAuth("demo", "demo"),
)

// No authentication — a local development cluster with auth disabled.
openClient, err := camunda.New(camunda.WithNoAuth())
```

The OAuth token cache is two-tier: an in-memory cache backed by an on-disk cache
(`CAMUNDA_OAUTH_CACHE_DIR`), so short-lived processes and CLI invocations reuse a
valid token instead of re-authenticating on every start. Concurrent refreshes are
collapsed into a single in-flight request.
