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
