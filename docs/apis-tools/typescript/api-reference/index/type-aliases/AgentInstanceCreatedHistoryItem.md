---
title: "Type Alias: AgentInstanceCreatedHistoryItem"
sidebar_label: "AgentInstanceCreatedHistoryItem"
mdx:
  format: md
---

# Type Alias: AgentInstanceCreatedHistoryItem

```ts
type AgentInstanceCreatedHistoryItem = object;
```

The outcome of appending a single history item from an update request's
history batch.

## Properties

### historyItemId

```ts
historyItemId: string;
```

The historyItemId of the corresponding item in the request, echoed back
so callers can correlate response entries with request items by id.

---

### historyItemKey

```ts
historyItemKey: AgentHistoryItemKey;
```

The system-generated key for the history item. When isDuplicate is true,
this is the key of the original entry, not a new one.

---

### isDuplicate

```ts
isDuplicate: boolean;
```

True if this item had already been recorded and no new AGENT_HISTORY event
was created for it; false if a new event was created.
