---
title: "Type Alias: DecisionDefinitionSearchQuery"
sidebar_label: "DecisionDefinitionSearchQuery"
mdx:
  format: md
---

# Type Alias: DecisionDefinitionSearchQuery

```ts
type DecisionDefinitionSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:1408](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1408)

## Type Declaration

### filter?

```ts
optional filter: DecisionDefinitionFilter;
```

The decision definition search filters.

### sort?

```ts
optional sort: DecisionDefinitionSearchQuerySortRequest[];
```

Sort field criteria.
