---
title: "Type Alias: IncidentSearchQuery"
sidebar_label: "IncidentSearchQuery"
mdx:
  format: md
---

# Type Alias: IncidentSearchQuery

```ts
type IncidentSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:3361](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3361)

## Type Declaration

### filter?

```ts
optional filter?: IncidentFilter;
```

The incident search filters.

### sort?

```ts
optional sort?: IncidentSearchQuerySortRequest[];
```

Sort field criteria.
