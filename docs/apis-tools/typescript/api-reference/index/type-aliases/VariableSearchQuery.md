---
title: "Type Alias: VariableSearchQuery"
sidebar_label: "VariableSearchQuery"
mdx:
  format: md
---

# Type Alias: VariableSearchQuery

```ts
type VariableSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:8062](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8062)

Variable search query request.

## Type Declaration

### filter?

```ts
optional filter?: VariableFilter;
```

The variable search filters.

### sort?

```ts
optional sort?: VariableSearchQuerySortRequest[];
```

Sort field criteria.
