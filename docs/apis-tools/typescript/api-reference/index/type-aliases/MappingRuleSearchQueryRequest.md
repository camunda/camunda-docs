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

Defined in: [gen/types.gen.ts:5240](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5240)

## Type Declaration

### filter?

```ts
optional filter: MappingRuleFilter;
```

The mapping rule search filters.

### sort?

```ts
optional sort: MappingRuleSearchQuerySortRequest[];
```

Sort field criteria.
