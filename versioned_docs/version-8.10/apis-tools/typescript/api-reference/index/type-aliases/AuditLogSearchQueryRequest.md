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

Audit log search request.

## Type Declaration

### filter?

```ts
optional filter?: AuditLogFilter;
```

The audit log search filters.

### sort?

```ts
optional sort?: AuditLogSearchQuerySortRequest[];
```

Sort field criteria.
