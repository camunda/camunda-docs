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

Defined in: [gen/types.gen.ts:4546](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4546)

The state of the job.
