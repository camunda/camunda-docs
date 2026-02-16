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

Defined in: [gen/types.gen.ts:268](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L268)

Audit log search response.

## Type Declaration

### items?

```ts
optional items: AuditLogResult[];
```

The matching audit logs.
