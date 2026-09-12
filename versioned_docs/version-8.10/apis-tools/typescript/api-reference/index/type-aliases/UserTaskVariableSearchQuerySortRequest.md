---
title: "Type Alias: UserTaskVariableSearchQuerySortRequest"
sidebar_label: "UserTaskVariableSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: UserTaskVariableSearchQuerySortRequest

```ts
type UserTaskVariableSearchQuerySortRequest = object;
```

## Properties

### field

```ts
field:
  | "value"
  | "name"
  | "tenantId"
  | "variableKey"
  | "scopeKey"
  | "processInstanceKey";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
