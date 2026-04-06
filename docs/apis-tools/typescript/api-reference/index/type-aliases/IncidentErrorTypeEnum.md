---
title: "Type Alias: IncidentErrorTypeEnum"
sidebar_label: "IncidentErrorTypeEnum"
mdx:
  format: md
---

# Type Alias: IncidentErrorTypeEnum

```ts
type IncidentErrorTypeEnum =
  | "AD_HOC_SUB_PROCESS_NO_RETRIES"
  | "CALLED_DECISION_ERROR"
  | "CALLED_ELEMENT_ERROR"
  | "CONDITION_ERROR"
  | "DECISION_EVALUATION_ERROR"
  | "EXECUTION_LISTENER_NO_RETRIES"
  | "EXTRACT_VALUE_ERROR"
  | "FORM_NOT_FOUND"
  | "IO_MAPPING_ERROR"
  | "JOB_NO_RETRIES"
  | "MESSAGE_SIZE_EXCEEDED"
  | "RESOURCE_NOT_FOUND"
  | "TASK_LISTENER_NO_RETRIES"
  | "UNHANDLED_ERROR_EVENT"
  | "UNKNOWN"
  | "UNSPECIFIED";
```

Defined in: [gen/types.gen.ts:3463](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3463)

Incident error type with a defined set of values.
