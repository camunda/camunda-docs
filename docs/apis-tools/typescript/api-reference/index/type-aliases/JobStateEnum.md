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

Defined in: [gen/types.gen.ts:4543](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4543)

The state of the job.
