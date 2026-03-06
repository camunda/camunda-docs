---
title: "Type Alias: JobStateEnum"
sidebar_label: "JobStateEnum"
mdx:
  format: md
---

# Type Alias: JobStateEnum

```ts
type JobStateEnum = 
  | "CANCELED"
  | "COMPLETED"
  | "CREATED"
  | "ERROR_THROWN"
  | "FAILED"
  | "MIGRATED"
  | "RETRIES_UPDATED"
  | "TIMED_OUT";
```

Defined in: [gen/types.gen.ts:4475](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4475)

The state of the job.
