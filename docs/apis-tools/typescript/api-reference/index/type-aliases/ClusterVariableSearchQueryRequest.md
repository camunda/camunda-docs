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

Defined in: [gen/types.gen.ts:1207](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1207)

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
