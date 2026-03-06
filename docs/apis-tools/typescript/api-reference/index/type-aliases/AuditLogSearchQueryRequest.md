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

Defined in: [gen/types.gen.ts:149](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L149)

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
