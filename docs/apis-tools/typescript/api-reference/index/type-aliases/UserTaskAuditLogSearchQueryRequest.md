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

Defined in: [gen/types.gen.ts:7713](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7713)

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
