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

Defined in: [gen/types.gen.ts:4338](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4338)

The result of the completed job as determined by the worker.
