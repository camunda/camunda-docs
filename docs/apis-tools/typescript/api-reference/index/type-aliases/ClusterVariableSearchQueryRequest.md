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

Defined in: [gen/types.gen.ts:1205](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1205)

Cluster variable search query request.

## Type Declaration

### filter?

```ts
optional filter?: ClusterVariableSearchQueryFilterRequest;
```

The cluster variable search filters.

### sort?

```ts
optional sort?: ClusterVariableSearchQuerySortRequest[];
```

Sort field criteria.
