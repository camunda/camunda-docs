---
title: "Type Alias: AuditLogSearchQueryResult"
sidebar_label: "AuditLogSearchQueryResult"
mdx:
  format: md
---

# Type Alias: AuditLogSearchQueryResult

```ts
type AuditLogSearchQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:285](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L285)

Audit log search response.

## Type Declaration

### items

```ts
items: AuditLogResult[];
```

The matching audit logs.
