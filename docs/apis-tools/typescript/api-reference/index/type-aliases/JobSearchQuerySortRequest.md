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

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
