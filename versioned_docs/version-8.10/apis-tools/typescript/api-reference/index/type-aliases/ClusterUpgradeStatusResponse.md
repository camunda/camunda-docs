---
title: "Type Alias: ClusterUpgradeStatusResponse"
sidebar_label: "ClusterUpgradeStatusResponse"
mdx:
  format: md
---

# Type Alias: ClusterUpgradeStatusResponse

```ts
type ClusterUpgradeStatusResponse = object;
```

The upgrade-readiness status of the whole cluster.

## Properties

### status

```ts
status: "MIGRATED" | "MIGRATION_IN_PROGRESS" | "UNKNOWN";
```

`MIGRATED` once every known upgrade-readiness condition is met for every known physical tenant; `MIGRATION_IN_PROGRESS` when at least one is confirmed not yet migrated; `UNKNOWN` otherwise.
