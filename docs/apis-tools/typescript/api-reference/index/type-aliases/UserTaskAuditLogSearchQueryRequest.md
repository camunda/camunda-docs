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

Defined in: [gen/types.gen.ts:7827](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7827)

User task search query request.

## Type Declaration

### filter?

```ts
optional filter: UserTaskAuditLogFilter;
```

### sort?

```ts
optional sort: AuditLogSearchQuerySortRequest[];
```

Sort field criteria.
