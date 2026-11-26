---
title: "Type Alias: VariableHistoryItemActorTypeEnum"
sidebar_label: "VariableHistoryItemActorTypeEnum"
mdx:
  format: md
---

# Type Alias: VariableHistoryItemActorTypeEnum

```ts
type VariableHistoryItemActorTypeEnum =
  (typeof VariableHistoryItemActorTypeEnum)[keyof typeof VariableHistoryItemActorTypeEnum];
```

The type of the actor who performed the operation. Camunda can add values in later
versions; clients must handle unknown values gracefully.
