---
title: "Type Alias: AuditLogSearchQueryRequest"
sidebar_label: "AuditLogSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: AuditLogSearchQueryRequest

```ts
type AuditLogSearchQueryRequest = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:149](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L149)

Audit log search request.

## Type Declaration

### filter?

```ts
optional filter: AuditLogFilter;
```

The audit log search filters.

### sort?

```ts
optional sort: AuditLogSearchQuerySortRequest[];
```

Sort field criteria.
