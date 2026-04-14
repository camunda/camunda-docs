---
title: "Type Alias: BrokerInfo"
sidebar_label: "BrokerInfo"
mdx:
  format: md
---

# Type Alias: BrokerInfo

```ts
type BrokerInfo = object;
```

Provides information on a broker node.

## Properties

### host

```ts
host: string;
```

The hostname for reaching the broker.

---

### nodeId

```ts
nodeId: number;
```

The unique (within a cluster) node ID for the broker.

---

### partitions

```ts
partitions: Partition[];
```

A list of partitions managed or replicated on this broker.

---

### port

```ts
port: number;
```

The port for reaching the broker.

---

### version

```ts
version: string;
```

The broker version.
