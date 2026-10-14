---
title: "Type Alias: ClusterStatusResponse"
sidebar_label: "ClusterStatusResponse"
mdx:
  format: md
---

# Type Alias: ClusterStatusResponse

```ts
type ClusterStatusResponse = object;
```

The aggregated status of the whole cluster.

## Properties

### status

```ts
status: "HEALTHY" | "DEGRADED" | "DOWN";
```

`HEALTHY` when every physical tenant is healthy, `DOWN` when no physical tenant can process work, `DEGRADED` in every other case.
