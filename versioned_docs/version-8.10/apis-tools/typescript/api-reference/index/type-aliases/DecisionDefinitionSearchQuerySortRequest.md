---
title: "Type Alias: DecisionDefinitionSearchQuerySortRequest"
sidebar_label: "DecisionDefinitionSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: DecisionDefinitionSearchQuerySortRequest

```ts
type DecisionDefinitionSearchQuerySortRequest = object;
```

## Properties

### field

```ts
field:
  | "decisionDefinitionKey"
  | "decisionDefinitionId"
  | "name"
  | "version"
  | "decisionRequirementsId"
  | "decisionRequirementsKey"
  | "decisionRequirementsName"
  | "decisionRequirementsVersion"
  | "tenantId";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
