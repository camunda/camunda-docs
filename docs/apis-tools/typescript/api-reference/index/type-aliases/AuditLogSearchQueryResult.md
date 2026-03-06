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

Defined in: [gen/types.gen.ts:285](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L285)

Audit log search response.

## Type Declaration

### items

```ts
items: AuditLogResult[];
```

The matching audit logs.
