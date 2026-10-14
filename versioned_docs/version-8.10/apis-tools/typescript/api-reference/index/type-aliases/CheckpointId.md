---
title: "Type Alias: CheckpointId"
sidebar_label: "CheckpointId"
mdx:
  format: md
---

# Type Alias: CheckpointId

```ts
type CheckpointId = number;
```

Checkpoint ID

The id of the checkpoint. Must be a non-negative numerical value. As checkpoints are
logically ordered by their ids (ascending), each successive checkpoint must use a
higher id than the previous one.
