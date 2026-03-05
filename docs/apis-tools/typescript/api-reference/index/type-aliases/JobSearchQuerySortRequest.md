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

Defined in: [gen/types.gen.ts:4076](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4076)

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

Defined in: [gen/types.gen.ts:4080](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4080)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:4081](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4081)
