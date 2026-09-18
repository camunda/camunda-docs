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

The result of the completed job as determined by the worker.
