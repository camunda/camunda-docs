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

Defined in: [gen/types.gen.ts:3510](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3510)

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

Defined in: [gen/types.gen.ts:3514](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3514)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:3515](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3515)
