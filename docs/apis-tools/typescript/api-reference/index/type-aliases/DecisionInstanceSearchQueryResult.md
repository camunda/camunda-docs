---
title: "Type Alias: DecisionInstanceSearchQueryResult"
sidebar_label: "DecisionInstanceSearchQueryResult"
mdx:
  format: md
---

# Type Alias: DecisionInstanceSearchQueryResult

```ts
type DecisionInstanceSearchQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:1752](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1752)

## Type Declaration

### items?

```ts
optional items: DecisionInstanceResult[];
```

The matching decision instances.
