---
title: "Type Alias: IterationId"
sidebar_label: "IterationId"
mdx:
  format: md
---

# Type Alias: IterationId

```ts
type IterationId = number;
```

A client-provided sequential integer identifying a logical iteration: one LLM
call, its tool dispatches, and their results. Must be a positive integer,
increasing with each iteration. Established by the
connector when appending the first history item of an iteration.
