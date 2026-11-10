---
title: "Type Alias: TenantSearchQuerySortRequest"
sidebar_label: "TenantSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: TenantSearchQuerySortRequest

```ts
type TenantSearchQuerySortRequest = object;
```

## Properties

### field

```ts
field: "key" | "name" | "tenantId";
```

The field to sort by. `key` is deprecated and should not be used anymore.

---

### order?

```ts
optional order?: SortOrderEnum;
```
