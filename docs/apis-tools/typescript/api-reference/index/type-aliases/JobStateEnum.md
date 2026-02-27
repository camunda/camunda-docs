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

Defined in: [gen/types.gen.ts:3901](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3901)

The state of the job.
