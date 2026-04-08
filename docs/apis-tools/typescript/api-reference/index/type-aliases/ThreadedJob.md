---
title: "Type Alias: ThreadedJob"
sidebar_label: "ThreadedJob"
mdx:
  format: md
---

# Type Alias: ThreadedJob

```ts
type ThreadedJob = Omit<EnrichedActivatedJob, "log">;
```

Defined in: [runtime/threadedJobWorker.ts:14](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L14)

The job object received by a threaded handler.
Same shape as EnrichedActivatedJob but without the logger (not available across threads).
