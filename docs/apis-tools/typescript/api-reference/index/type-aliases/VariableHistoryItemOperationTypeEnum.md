---
title: "Type Alias: VariableHistoryItemOperationTypeEnum"
sidebar_label: "VariableHistoryItemOperationTypeEnum"
mdx:
  format: md
---

# Type Alias: VariableHistoryItemOperationTypeEnum

```ts
type VariableHistoryItemOperationTypeEnum =
  (typeof VariableHistoryItemOperationTypeEnum)[keyof typeof VariableHistoryItemOperationTypeEnum];
```

The type of operation that produced this variable change. Camunda can add values in later
versions; clients must handle unknown values gracefully.
