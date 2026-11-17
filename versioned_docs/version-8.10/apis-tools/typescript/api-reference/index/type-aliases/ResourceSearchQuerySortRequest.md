---
title: "Type Alias: ResourceSearchQuerySortRequest"
sidebar_label: "ResourceSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: ResourceSearchQuerySortRequest

```ts
type ResourceSearchQuerySortRequest = object;
```

## Properties

### field

```ts
field:
  | "resourceKey"
  | "resourceName"
  | "resourceId"
  | "version"
  | "versionTag"
  | "deploymentKey"
  | "tenantId";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
