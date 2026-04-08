---
title: "Type Alias: DecisionRequirementsSearchQuery"
sidebar_label: "DecisionRequirementsSearchQuery"
mdx:
  format: md
---

# Type Alias: DecisionRequirementsSearchQuery

```ts
type DecisionRequirementsSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:1982](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1982)

## Type Declaration

### filter?

```ts
optional filter?: DecisionRequirementsFilter;
```

The decision definition search filters.

### sort?

```ts
optional sort?: DecisionRequirementsSearchQuerySortRequest[];
```

Sort field criteria.
