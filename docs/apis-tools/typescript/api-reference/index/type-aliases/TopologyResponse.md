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

Defined in: [gen/types.gen.ts:1296](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1296)

The response of a topology request.

## Properties

### brokers

```ts
brokers: BrokerInfo[];
```

Defined in: [gen/types.gen.ts:1300](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1300)

A list of brokers that are part of this cluster.

***

### clusterId?

```ts
optional clusterId: string | null;
```

Defined in: [gen/types.gen.ts:1304](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1304)

The cluster Id.

***

### clusterSize

```ts
clusterSize: number;
```

Defined in: [gen/types.gen.ts:1308](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1308)

The number of brokers in the cluster.

***

### gatewayVersion

```ts
gatewayVersion: string;
```

Defined in: [gen/types.gen.ts:1320](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1320)

The version of the Zeebe Gateway.

***

### lastCompletedChangeId

```ts
lastCompletedChangeId: string;
```

Defined in: [gen/types.gen.ts:1324](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1324)

ID of the last completed change

***

### partitionsCount

```ts
partitionsCount: number;
```

Defined in: [gen/types.gen.ts:1312](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1312)

The number of partitions are spread across the cluster.

***

### replicationFactor

```ts
replicationFactor: number;
```

Defined in: [gen/types.gen.ts:1316](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1316)

The configured replication factor for this cluster.
