---
title: "Type Alias: AuditLogSearchQuerySortRequest"
sidebar_label: "AuditLogSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: AuditLogSearchQuerySortRequest

```ts
type AuditLogSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:134](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L134)

## Properties

### field

```ts
field:
  | "actorId"
  | "actorType"
  | "auditLogKey"
  | "batchOperationKey"
  | "batchOperationType"
  | "category"
  | "decisionDefinitionId"
  | "decisionDefinitionKey"
  | "decisionEvaluationKey"
  | "decisionRequirementsId"
  | "decisionRequirementsKey"
  | "elementInstanceKey"
  | "entityKey"
  | "entityType"
  | "jobKey"
  | "operationType"
  | "processDefinitionId"
  | "processDefinitionKey"
  | "processInstanceKey"
  | "result"
  | "tenantId"
  | "timestamp"
  | "userTaskKey";
```

Defined in: [gen/types.gen.ts:138](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L138)

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:139](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L139)
