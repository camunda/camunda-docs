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

Defined in: [gen/types.gen.ts:4602](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4602)

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
