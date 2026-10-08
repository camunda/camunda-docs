---
title: "Type Alias: ThreadedJob"
sidebar_label: "ThreadedJob"
mdx:
  format: md
---

# Type Alias: ThreadedJob

```ts
type ThreadedJob = Omit<EnrichedActivatedJob, "log" | "clock">;
```

`clock` is omitted alongside `log` for the same reason: both are live in-process objects,
and a pinned clock cannot cross the worker-thread boundary. Threaded handlers use ambient
time — see camunda/orchestration-cluster-api-js#450.
