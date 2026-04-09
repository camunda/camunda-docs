---
title: "Type Alias: TopologyResponse"
sidebar_label: "TopologyResponse"
mdx:
  format: md
---

# Type Alias: TopologyResponse

```ts
type TopologyResponse = object;
```

The response of a topology request.

## Properties

### brokers

```ts
brokers: BrokerInfo[];
```

A list of brokers that are part of this cluster.

---

### clusterId

```ts
clusterId: string | null;
```

The cluster Id.

---

### clusterSize

```ts
clusterSize: number;
```

The number of brokers in the cluster.

---

### gatewayVersion

```ts
gatewayVersion: string;
```

The version of the Zeebe Gateway.

---

### lastCompletedChangeId

```ts
lastCompletedChangeId: string;
```

ID of the last completed change

---

### partitionsCount

```ts
partitionsCount: number;
```

The number of partitions are spread across the cluster.

---

### replicationFactor

```ts
replicationFactor: number;
```

The configured replication factor for this cluster.
