---
title: "Type Alias: AgentDefinitionSearchQuery"
sidebar_label: "AgentDefinitionSearchQuery"
mdx:
  format: md
---

# Type Alias: AgentDefinitionSearchQuery

```ts
type AgentDefinitionSearchQuery = SearchQueryRequest & object;
```

Agent definition search request.

## Type Declaration

### filter?

```ts
optional filter?: AgentDefinitionFilter;
```

The agent definition search filters.

### sort?

```ts
optional sort?: AgentDefinitionSearchQuerySortRequest[];
```

Sort field criteria.
