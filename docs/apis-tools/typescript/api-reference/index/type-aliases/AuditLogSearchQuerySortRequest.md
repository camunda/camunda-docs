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

Defined in: [gen/types.gen.ts:125](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L125)

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

Defined in: [gen/types.gen.ts:129](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L129)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:130](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L130)
