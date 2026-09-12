---
title: "Type Alias: ResourceSearchQuery"
sidebar_label: "ResourceSearchQuery"
mdx:
  format: md
---

# Type Alias: ResourceSearchQuery

```ts
type ResourceSearchQuery = SearchQueryRequest & object;
```

## Type Declaration

### filter?

```ts
optional filter?: ResourceFilter;
```

The resource search filters.

### sort?

```ts
optional sort?: ResourceSearchQuerySortRequest[];
```

Sort field criteria.
