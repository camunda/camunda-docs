---
id: transient-retry
title: "Transient retry"
sidebar_label: "Transient retry"
sidebar_position: 12
mdx:
  format: md
---

# Transient retry

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Retries are layered _below_ backpressure in the `http.RoundTripper` chain, so a
retried request is still subject to the concurrency limiter and cannot amplify a
load spike:

```go
// Transient failures (429, 502, 503, 504 and network errors) are retried with
// exponential backoff and full jitter. Non-transient 4xx are never retried.
client, err := camunda.New(
	camunda.WithRetry(camunda.RetryConfig{
		MaxAttempts: 5,
		BaseDelay:   100 * time.Millisecond,
		MaxDelay:    5 * time.Second,
	}),
)
```

Only transient failures are retried. A `400`, `403`, or `404` is returned to you
immediately — retrying a request the server has definitively rejected wastes time
and hides the real error.
