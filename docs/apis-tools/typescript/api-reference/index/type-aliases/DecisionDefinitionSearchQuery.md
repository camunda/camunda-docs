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

Defined in: [gen/types.gen.ts:1439](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1439)

## Type Declaration

### filter?

```ts
optional filter?: DecisionDefinitionFilter;
```

The decision definition search filters.

### sort?

```ts
optional sort?: DecisionDefinitionSearchQuerySortRequest[];
```

Sort field criteria.
