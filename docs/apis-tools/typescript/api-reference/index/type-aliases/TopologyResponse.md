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

Defined in: [gen/types.gen.ts:1294](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1294)

The response of a topology request.

## Properties

### brokers

```ts
brokers: BrokerInfo[];
```

Defined in: [gen/types.gen.ts:1298](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1298)

A list of brokers that are part of this cluster.

---

### clusterId

```ts
clusterId: string | null;
```

Defined in: [gen/types.gen.ts:1302](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1302)

The cluster Id.

---

### clusterSize

```ts
clusterSize: number;
```

Defined in: [gen/types.gen.ts:1306](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1306)

The number of brokers in the cluster.

---

### gatewayVersion

```ts
gatewayVersion: string;
```

Defined in: [gen/types.gen.ts:1318](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1318)

The version of the Zeebe Gateway.

---

### lastCompletedChangeId

```ts
lastCompletedChangeId: string;
```

Defined in: [gen/types.gen.ts:1322](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1322)

ID of the last completed change

---

### partitionsCount

```ts
partitionsCount: number;
```

Defined in: [gen/types.gen.ts:1310](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1310)

The number of partitions are spread across the cluster.

---

### replicationFactor

```ts
replicationFactor: number;
```

Defined in: [gen/types.gen.ts:1314](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1314)

The configured replication factor for this cluster.
