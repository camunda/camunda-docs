---
title: "Type Alias: AgentInstanceHistoryFilter"
sidebar_label: "AgentInstanceHistoryFilter"
mdx:
  format: md
---

# Type Alias: AgentInstanceHistoryFilter

```ts
type AgentInstanceHistoryFilter = object;
```

Agent instance history item search filter.

## Properties

### commitStatus?

```ts
commitStatus?: AgentInstanceHistoryCommitStatusFilterProperty;
```

The commit status of the history item. Defaults to COMMITTED only.
Include PENDING or DISCARDED explicitly to debug in-flight or failed activations.

---

### elementInstanceKey?

```ts
elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The key of the element instance under which the history item was produced.

---

### historyItemKey?

```ts
historyItemKey?: AgentHistoryItemKeyFilterProperty;
```

The unique key of the history item.

---

### jobKey?

```ts
jobKey?: JobKeyFilterProperty;
```

The key of the job activation that produced the history item.

---

### loopIteration?

```ts
loopIteration?: IntegerFilterProperty;
```

Filter by loop iteration number.

---

### producedAt?

```ts
producedAt?: DateTimeFilterProperty;
```

The timestamp when the history item was produced.

---

### role?

```ts
role?: AgentInstanceHistoryRoleFilterProperty;
```

The role of the history item.
