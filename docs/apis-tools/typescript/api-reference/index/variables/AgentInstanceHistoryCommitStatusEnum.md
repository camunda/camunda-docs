---
title: "Variable: AgentInstanceHistoryCommitStatusEnum"
sidebar_label: "AgentInstanceHistoryCommitStatusEnum"
mdx:
  format: md
---

# Variable: AgentInstanceHistoryCommitStatusEnum

```ts
const AgentInstanceHistoryCommitStatusEnum: object;
```

The commit status of a history item.
COMMITTED: the producing job completed successfully.
PENDING: the producing job is still active (in-flight).
DISCARDED: the producing job failed; this item was superseded by a later activation.

## Type Declaration

### COMMITTED

```ts
readonly COMMITTED: "COMMITTED" = 'COMMITTED';
```

### DISCARDED

```ts
readonly DISCARDED: "DISCARDED" = 'DISCARDED';
```

### PENDING

```ts
readonly PENDING: "PENDING" = 'PENDING';
```
