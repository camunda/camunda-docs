---
title: "Type Alias: AgentDefinitionSearchQuerySortRequest"
sidebar_label: "AgentDefinitionSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: AgentDefinitionSearchQuerySortRequest

```ts
type AgentDefinitionSearchQuerySortRequest = object;
```

## Properties

### field

```ts
field:
  | "agentDefinitionKey"
  | "agentType"
  | "name"
  | "elementId"
  | "processDefinitionId"
  | "processDefinitionKey"
  | "processDefinitionVersion"
  | "processDefinitionVersionTag"
  | "tenantId";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
