---
title: "Type Alias: JobResult"
sidebar_label: "JobResult"
mdx:
  format: md
---

# Type Alias: JobResult

```ts
type JobResult =
  | (object & JobResultUserTask)
  | (object & JobResultAdHocSubProcess);
```

Defined in: [gen/types.gen.ts:4409](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4409)

The result of the completed job as determined by the worker.
