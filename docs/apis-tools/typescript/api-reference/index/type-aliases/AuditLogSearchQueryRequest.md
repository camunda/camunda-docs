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

Defined in: [gen/types.gen.ts:136](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L136)

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
