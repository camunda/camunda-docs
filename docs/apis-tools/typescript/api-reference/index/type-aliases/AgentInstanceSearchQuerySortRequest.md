---
title: "Type Alias: AgentInstanceSearchQuerySortRequest"
sidebar_label: "AgentInstanceSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: AgentInstanceSearchQuerySortRequest

```ts
type AgentInstanceSearchQuerySortRequest = object;
```

## Properties

### field

```ts
field:
  | "agentInstanceKey"
  | "status"
  | "elementId"
  | "processInstanceKey"
  | "rootProcessInstanceKey"
  | "processDefinitionKey"
  | "tenantId"
  | "creationDate"
  | "lastUpdatedDate"
  | "completionDate";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
