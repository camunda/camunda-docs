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

Defined in: [gen/types.gen.ts:145](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L145)

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
