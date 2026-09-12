---
title: "Type Alias: StateCode"
sidebar_label: "StateCode"
mdx:
  format: md
---

# Type Alias: StateCode

```ts
type StateCode =
  | "DOES_NOT_EXIST"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "INCOMPLETE"
  | "DELETED";
```

Runtime Backup State

The aggregated state of the backup, computed from the state of each partition.
