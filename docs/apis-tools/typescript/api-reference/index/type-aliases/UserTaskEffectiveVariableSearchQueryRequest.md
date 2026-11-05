---
title: "Type Alias: UserTaskEffectiveVariableSearchQueryRequest"
sidebar_label: "UserTaskEffectiveVariableSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: UserTaskEffectiveVariableSearchQueryRequest

```ts
type UserTaskEffectiveVariableSearchQueryRequest = object;
```

User task effective variable search query request. Uses offset-based pagination only.

## Properties

### filter?

```ts
filter?: UserTaskVariableFilter;
```

The user task variable search filters.

---

### page?

```ts
page?: OffsetPagination;
```

Pagination parameters.

---

### sort?

```ts
sort?: UserTaskVariableSearchQuerySortRequest[];
```

Sort field criteria.
