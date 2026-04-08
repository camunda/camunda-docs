---
title: "Type Alias: ProcessDefinitionSearchQuery"
sidebar_label: "ProcessDefinitionSearchQuery"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionSearchQuery

```ts
type ProcessDefinitionSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:5740](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5740)

## Type Declaration

### filter?

```ts
optional filter?: ProcessDefinitionFilter;
```

The process definition search filters.

### sort?

```ts
optional sort?: ProcessDefinitionSearchQuerySortRequest[];
```

Sort field criteria.
