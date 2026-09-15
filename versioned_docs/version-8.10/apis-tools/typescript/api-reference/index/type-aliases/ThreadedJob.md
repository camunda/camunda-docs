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

The job object received by a threaded handler.
Same shape as EnrichedActivatedJob but without the logger (not available across threads).
