---
title: "Type Alias: ClusterRestoreModeChangeOperation"
sidebar_label: "ClusterRestoreModeChangeOperation"
mdx:
  format: md
---

# Type Alias: ClusterRestoreModeChangeOperation

```ts
type ClusterRestoreModeChangeOperation = object;
```

The operation that transitions a broker to a mode once its partitions are restored.

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

The mode the broker is transitioned to.

---

### operation

```ts
operation: string;
```

The type of the operation.
