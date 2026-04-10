---
title: "Type Alias: UserTaskSearchQuery"
sidebar_label: "UserTaskSearchQuery"
mdx:
  format: md
---

# Type Alias: UserTaskSearchQuery

```ts
type UserTaskSearchQuery = SearchQueryRequest & object;
```

User task search query request.

## Type Declaration

### filter?

```ts
optional filter?: UserTaskFilter;
```

The user task search filters.

### sort?

```ts
optional sort?: UserTaskSearchQuerySortRequest[];
```

Sort field criteria.
