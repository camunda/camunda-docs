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

Defined in: [gen/types.gen.ts:1443](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1443)

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
