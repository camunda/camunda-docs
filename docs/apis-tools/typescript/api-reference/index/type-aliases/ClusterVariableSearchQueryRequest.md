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

Defined in: [gen/types.gen.ts:1209](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1209)

Cluster variable search query request.

## Type Declaration

### filter?

```ts
optional filter: ClusterVariableSearchQueryFilterRequest;
```

The cluster variable search filters.

### sort?

```ts
optional sort: ClusterVariableSearchQuerySortRequest[];
```

Sort field criteria.
