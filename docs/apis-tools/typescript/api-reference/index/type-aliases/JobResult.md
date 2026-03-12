---
title: "Type Alias: JobResult"
sidebar_label: "JobResult"
mdx:
  format: md
---

# Type Alias: JobResult

```ts
type JobResult = 
  | object & JobResultUserTask
  | object & JobResultAdHocSubProcess;
```

Defined in: [gen/types.gen.ts:4406](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4406)

The result of the completed job as determined by the worker.
