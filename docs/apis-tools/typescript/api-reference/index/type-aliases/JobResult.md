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

Defined in: [gen/types.gen.ts:3764](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3764)

The result of the completed job as determined by the worker.
