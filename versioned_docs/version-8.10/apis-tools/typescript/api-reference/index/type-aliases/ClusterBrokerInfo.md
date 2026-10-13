---
title: "Type Alias: ClusterBrokerInfo"
sidebar_label: "ClusterBrokerInfo"
mdx:
  format: md
---

# Type Alias: ClusterBrokerInfo

```ts
type ClusterBrokerInfo = object;
```

Provides information on a broker node, independent of any physical tenant.

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
