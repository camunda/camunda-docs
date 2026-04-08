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

Defined in: [gen/types.gen.ts:281](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L281)

Audit log search response.

## Type Declaration

### items

```ts
items: AuditLogResult[];
```

The matching audit logs.
