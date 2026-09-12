---
id: logging
title: "Logging"
sidebar_label: "Logging"
sidebar_position: 16
mdx:
  format: md
---

# Logging

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

The SDK logs through a level-gated internal logger, off by default at anything
above `info`:

```go
// Levels: LogOff, LogError, LogWarn, LogInfo (default), LogDebug, LogTrace.
// LogDebug reports auth-token refreshes, retries, and backpressure decisions;
// LogTrace adds per-request detail. Credentials are never logged.
client, err := camunda.New(camunda.WithLogLevel(camunda.LogDebug))
```

Set `CAMUNDA_SDK_LOG_LEVEL=debug` to get the same effect without a code change —
useful when diagnosing an authentication or backpressure problem in a deployed
service. Secrets (client secrets, passwords, bearer tokens, TLS key material) are
never written to the log at any level.
