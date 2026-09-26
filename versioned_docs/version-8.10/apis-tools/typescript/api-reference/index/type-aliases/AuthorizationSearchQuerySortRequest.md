---
title: "Type Alias: AuthorizationSearchQuerySortRequest"
sidebar_label: "AuthorizationSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: AuthorizationSearchQuerySortRequest

```ts
type AuthorizationSearchQuerySortRequest = object;
```

## Properties

### field

```ts
field:
  | "ownerId"
  | "ownerType"
  | "resourceId"
  | "resourcePropertyName"
  | "resourceType";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
