---
title: "Type Alias: AgentInstanceHistorySearchQuery"
sidebar_label: "AgentInstanceHistorySearchQuery"
mdx:
  format: md
---

# Type Alias: AgentInstanceHistorySearchQuery

```ts
type AgentInstanceHistorySearchQuery = SearchQueryRequest & object;
```

Agent instance history search request.

## Type Declaration

### filter?

```ts
optional filter?: AgentInstanceHistoryFilter;
```

The history item search filters.

### sort?

```ts
optional sort?: AgentInstanceHistorySearchQuerySortRequest[];
```

Sort field criteria.
