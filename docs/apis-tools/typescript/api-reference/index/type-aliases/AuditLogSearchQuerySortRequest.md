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

Defined in: [gen/types.gen.ts:138](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L138)

## Properties

### field

```ts
field: 
  | "actorId"
  | "actorType"
  | "annotation"
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

Defined in: [gen/types.gen.ts:142](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L142)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:143](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L143)
