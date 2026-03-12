---
title: "Type Alias: JobSearchQuerySortRequest"
sidebar_label: "JobSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: JobSearchQuerySortRequest

```ts
type JobSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:4144](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4144)

## Properties

### field

```ts
field: 
  | "deadline"
  | "deniedReason"
  | "elementId"
  | "elementInstanceKey"
  | "endTime"
  | "errorCode"
  | "errorMessage"
  | "hasFailedWithRetriesLeft"
  | "isDenied"
  | "jobKey"
  | "kind"
  | "listenerEventType"
  | "processDefinitionId"
  | "processDefinitionKey"
  | "processInstanceKey"
  | "retries"
  | "state"
  | "tenantId"
  | "type"
  | "worker";
```

Defined in: [gen/types.gen.ts:4148](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4148)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:4149](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4149)
