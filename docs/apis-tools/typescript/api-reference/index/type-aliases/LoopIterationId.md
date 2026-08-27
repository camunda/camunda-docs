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

A client-provided sequential integer identifying a loop iteration: one pass
through an AI agent's loop, during which the model reasons, selects tools,
evaluates the result, and decides whether to continue. One iteration covers
the input for the LLM call, the call itself, and the tools it dispatches;
the results of those tool calls are input to the next iteration. Must be a
positive integer, increasing with each loopIteration. Established by the
connector when appending the first history item of a loopIteration.
