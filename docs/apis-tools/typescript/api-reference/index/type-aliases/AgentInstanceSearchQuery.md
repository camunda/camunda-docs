---
title: "Type Alias: AgentInstanceSearchQuery"
sidebar_label: "AgentInstanceSearchQuery"
mdx:
  format: md
---

# Type Alias: AgentInstanceSearchQuery

```ts
type AgentInstanceSearchQuery = SearchQueryRequest & object;
```

Agent instance search request.

## Type Declaration

### filter?

```ts
filter?: AgentInstanceFilter;
```

The agent instance search filters.

### sort?

```ts
sort?: AgentInstanceSearchQuerySortRequest[];
```

Sort field criteria.
