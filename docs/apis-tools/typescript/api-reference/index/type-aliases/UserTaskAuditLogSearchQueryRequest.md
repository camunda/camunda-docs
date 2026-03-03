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

Defined in: [gen/types.gen.ts:7051](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7051)

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
