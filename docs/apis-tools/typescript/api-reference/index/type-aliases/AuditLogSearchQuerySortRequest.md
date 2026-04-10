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

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
