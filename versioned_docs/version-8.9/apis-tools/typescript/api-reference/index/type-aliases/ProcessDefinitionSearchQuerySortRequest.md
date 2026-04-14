---
title: "Type Alias: ProcessDefinitionSearchQuerySortRequest"
sidebar_label: "ProcessDefinitionSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionSearchQuerySortRequest

```ts
type ProcessDefinitionSearchQuerySortRequest = object;
```

## Properties

### field

```ts
field:
  | "processDefinitionKey"
  | "name"
  | "resourceName"
  | "version"
  | "versionTag"
  | "processDefinitionId"
  | "tenantId";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
