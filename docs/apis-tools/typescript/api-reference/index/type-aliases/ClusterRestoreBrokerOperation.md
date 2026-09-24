---
title: "Type Alias: ClusterRestoreBrokerOperation"
sidebar_label: "ClusterRestoreBrokerOperation"
mdx:
  format: md
---

# Type Alias: ClusterRestoreBrokerOperation

```ts
type ClusterRestoreBrokerOperation = object;
```

A restore operation that applies to a broker as a whole, such as the one that updates its incarnation number.

## Properties

### brokerId

```ts
brokerId: string;
```

The ID of the broker that applies the operation, including its zone if it belongs to one.

---

### operation

```ts
operation: string;
```

The type of the operation.
