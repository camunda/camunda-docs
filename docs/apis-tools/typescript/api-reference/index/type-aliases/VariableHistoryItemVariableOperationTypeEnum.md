---
title: "Type Alias: VariableHistoryItemVariableOperationTypeEnum"
sidebar_label: "VariableHistoryItemVariableOperationTypeEnum"
mdx:
  format: md
---

# Type Alias: VariableHistoryItemVariableOperationTypeEnum

```ts
type VariableHistoryItemVariableOperationTypeEnum =
  (typeof VariableHistoryItemVariableOperationTypeEnum)[keyof typeof VariableHistoryItemVariableOperationTypeEnum];
```

What wrote this variable value, for example a job completion, a script result, or a
multi-instance output collection. Camunda can add values in later versions; clients must
handle unknown values gracefully.
