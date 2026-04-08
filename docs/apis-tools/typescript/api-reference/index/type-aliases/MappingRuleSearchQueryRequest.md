---
title: "Type Alias: MappingRuleSearchQueryRequest"
sidebar_label: "MappingRuleSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: MappingRuleSearchQueryRequest

```ts
type MappingRuleSearchQueryRequest = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:5243](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5243)

## Type Declaration

### filter?

```ts
optional filter?: MappingRuleFilter;
```

The mapping rule search filters.

### sort?

```ts
optional sort?: MappingRuleSearchQuerySortRequest[];
```

Sort field criteria.
