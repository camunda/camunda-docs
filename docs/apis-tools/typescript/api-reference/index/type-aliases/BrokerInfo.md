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

### brokerId

```ts
brokerId: string;
```

The unique (within a cluster) broker identifier. When the cluster is not zoned, then it's a string that represents the nodeId (an integer). When the cluster is zoned, instead, it's of the form "$zoneName_$nodeId", providing uniqueness even across zones.

---

### host

```ts
host: string;
```

The hostname for reaching the broker.

---

### ~~nodeId~~

```ts
nodeId: number;
```

The node ID for the broker. The uniqueness of this identifier depends if the cluster is zone-aware or not. - non zone-aware: (default) nodeId is unique across the cluster - zone-aware: (opt-in) nodeId is unique only within its zone. If you are migrating to a zone aware cluster, you must use `brokerId` instead. This property is deprecated, as it's been replaced by `brokerId`.

#### Deprecated

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
