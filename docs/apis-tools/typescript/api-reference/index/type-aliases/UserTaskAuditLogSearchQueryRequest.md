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

Defined in: [gen/types.gen.ts:7856](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7856)

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
