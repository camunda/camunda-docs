---
title: "Type Alias: ElementInstanceSearchQuery"
sidebar_label: "ElementInstanceSearchQuery"
mdx:
  format: md
---

# Type Alias: ElementInstanceSearchQuery

```ts
type ElementInstanceSearchQuery = SearchQueryRequest & object;
```

Element instance search request.

## Type Declaration

### filter?

```ts
optional filter?: ElementInstanceFilter;
```

The element instance search filters.

### sort?

```ts
optional sort?: ElementInstanceSearchQuerySortRequest[];
```

Sort field criteria.
