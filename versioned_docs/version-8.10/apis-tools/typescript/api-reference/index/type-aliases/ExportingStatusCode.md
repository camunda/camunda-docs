---
title: "Type Alias: ExportingStatusCode"
sidebar_label: "ExportingStatusCode"
mdx:
  format: md
---

# Type Alias: ExportingStatusCode

```ts
type ExportingStatusCode = "EXPORTING" | "PAUSED" | "SOFT_PAUSED" | "MIXED";
```

Exporting Status Code

The exporting status of a physical tenant, aggregated over every replica of every one of
its partitions:

- `EXPORTING`: all replicas are exporting and committing their position.
- `PAUSED`: all replicas are paused, nothing is being exported.
- `SOFT_PAUSED`: all replicas keep exporting but do not commit their position.
- `MIXED`: replicas report different phases, so the tenant is in no single phase.
