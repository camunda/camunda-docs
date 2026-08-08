---
title: "Type Alias: LoopIterationId"
sidebar_label: "LoopIterationId"
mdx:
  format: md
---

# Type Alias: LoopIterationId

```ts
type LoopIterationId = number;
```

A client-provided sequential integer identifying one pass through the agent
feedback loop: one LLM call, its tool dispatches, and their results. Must be
a positive integer, increasing with each loopIteration. Established by the
connector when appending the first history item of a loopIteration.
