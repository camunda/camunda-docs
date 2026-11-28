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

The on-disk tier is opt-in and holds a bearer token, so it is treated as
credential storage. The directory is created mode `0700` and each entry is
written mode `0600` through a temp file renamed into place — so the mode is
reapplied on every rewrite and a concurrent reader never sees a partially written
entry. An entry found expired is deleted rather than left behind, after a
re-read confirms another process has not just published a fresh one.

Entries are also checked before they are trusted. If the cache directory is
writable by group or other, the cache is disabled rather than used: the entry
path is derived from the token URL, client id and audience, so write access to
that directory would be enough to substitute the token the SDK presents to the
cluster. An individual entry whose own mode is wider than `0600` is ignored for
the same reason — a restrictive directory does not stop someone rewriting a file
their own permissions already allow — and the refetch that follows republishes it
at `0600`.

> **Windows:** none of the above is enforced by the operating system. Go's
> permission bits are largely ignored on Windows — a file inherits the ACL of its
> parent directory, and `0700` on the directory does not restrict that ACL — so
> the group/other-writable check is skipped and the cache has no OS-enforced
> protection. Leave the on-disk cache disabled on a shared Windows host.
