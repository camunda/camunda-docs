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

Defined in: [gen/types.gen.ts:4147](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4147)

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

Defined in: [gen/types.gen.ts:4151](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4151)

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:4152](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4152)
