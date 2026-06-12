---
title: "Type Alias: AgentInstanceHistoryCommitStatusEnum"
sidebar_label: "AgentInstanceHistoryCommitStatusEnum"
mdx:
  format: md
---

# Type Alias: AgentInstanceHistoryCommitStatusEnum

```ts
type AgentInstanceHistoryCommitStatusEnum =
  (typeof AgentInstanceHistoryCommitStatusEnum)[keyof typeof AgentInstanceHistoryCommitStatusEnum];
```

The commit status of a history item.
COMMITTED: the producing job completed successfully.
PENDING: the producing job is still active (in-flight).
DISCARDED: the producing job failed; this item was superseded by a later activation.
