---
title: "Type Alias: ThreadedJobHandler"
sidebar_label: "ThreadedJobHandler"
mdx:
  format: md
---

# Type Alias: ThreadedJobHandler

```ts
type ThreadedJobHandler = (
  job,
  client
) => Promise<JobActionReceipt> | JobActionReceipt;
```

Defined in: [runtime/threadedJobWorker.ts:31](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L31)

Handler function signature for threaded job workers.

Import this type in your handler module for full intellisense on `job` and `client`:

```ts
import type { ThreadedJobHandler } from "@camunda8/orchestration-cluster-api";

const handler: ThreadedJobHandler = async (job, client) => {
  // full intellisense for job.variables, job.complete(), client.publishMessage(), etc.
  return job.complete({ result: "done" });
};
export default handler;
```

## Parameters

### job

[`ThreadedJob`](ThreadedJob.md)

### client

[`CamundaClient`](../classes/CamundaClient.md)

## Returns

\| `Promise`\<[`JobActionReceipt`](JobActionReceipt.md)\>
\| [`JobActionReceipt`](JobActionReceipt.md)
