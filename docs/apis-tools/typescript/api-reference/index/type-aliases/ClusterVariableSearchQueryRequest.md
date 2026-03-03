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

Defined in: [gen/types.gen.ts:1174](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1174)

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
