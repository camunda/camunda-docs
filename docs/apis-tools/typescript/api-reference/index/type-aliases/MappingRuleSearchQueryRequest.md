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

Defined in: [gen/types.gen.ts:5172](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5172)

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
