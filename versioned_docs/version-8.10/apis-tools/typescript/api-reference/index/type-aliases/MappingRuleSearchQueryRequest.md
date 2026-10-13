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
