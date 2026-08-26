---
title: "Type Alias: ClusterRestoreAwaitModeChangeOperation"
sidebar_label: "ClusterRestoreAwaitModeChangeOperation"
mdx:
  format: md
---

# Type Alias: ClusterRestoreAwaitModeChangeOperation

```ts
type ClusterRestoreAwaitModeChangeOperation = object;
```

The operation that awaits the transition of a broker to a mode.

## Properties

### brokerId

```ts
brokerId: string;
```

The ID of the broker that applies the operation, including its zone if it belongs to one.

---

### mode

```ts
mode: string;
```

The mode the broker is awaited to have transitioned to.

---

### operation

```ts
operation: string;
```

The type of the operation.
