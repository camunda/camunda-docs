---
title: "Type Alias: ClusterVariableSearchQueryRequest"
sidebar_label: "ClusterVariableSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: ClusterVariableSearchQueryRequest

```ts
type ClusterVariableSearchQueryRequest = SearchQueryRequest & object;
```

Cluster variable search query request.

## Type Declaration

### filter?

```ts
filter?: ClusterVariableSearchQueryFilterRequest;
```

The cluster variable search filters.

### sort?

```ts
sort?: ClusterVariableSearchQuerySortRequest[];
```

Sort field criteria.
