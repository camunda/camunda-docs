---
title: "Type Alias: ClusterVariableSearchQueryResult"
sidebar_label: "ClusterVariableSearchQueryResult"
mdx:
  format: md
---

# Type Alias: ClusterVariableSearchQueryResult

```ts
type ClusterVariableSearchQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:1253](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1253)

Cluster variable search query response.

## Type Declaration

### items?

```ts
optional items: ClusterVariableSearchResult[];
```

The matching cluster variables.
