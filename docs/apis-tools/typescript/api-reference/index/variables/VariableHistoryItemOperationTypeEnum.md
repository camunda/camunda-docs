---
title: "Variable: VariableHistoryItemOperationTypeEnum"
sidebar_label: "VariableHistoryItemOperationTypeEnum"
mdx:
  format: md
---

# Variable: VariableHistoryItemOperationTypeEnum

```ts
const VariableHistoryItemOperationTypeEnum: object;
```

The type of operation that produced this variable change. Camunda can add values in later
versions; clients must handle unknown values gracefully.

## Type Declaration

### CREATE

```ts
readonly CREATE: "CREATE" = 'CREATE';
```

### UPDATE

```ts
readonly UPDATE: "UPDATE" = 'UPDATE';
```
