---
title: "Type Alias: UserTaskAuditLogSearchQueryRequest"
sidebar_label: "UserTaskAuditLogSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: UserTaskAuditLogSearchQueryRequest

```ts
type UserTaskAuditLogSearchQueryRequest = SearchQueryRequest & object;
```

User task search query request.

## Type Declaration

### filter?

```ts
optional filter?: UserTaskAuditLogFilter;
```

### sort?

```ts
optional sort?: AuditLogSearchQuerySortRequest[];
```

Sort field criteria.
