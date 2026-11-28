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
filter?: ResourceFilter;
```

The resource search filters.

### sort?

```ts
sort?: ResourceSearchQuerySortRequest[];
```

Sort field criteria.
