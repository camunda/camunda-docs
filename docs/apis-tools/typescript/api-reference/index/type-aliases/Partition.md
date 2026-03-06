---
title: "Type Alias: Partition"
sidebar_label: "Partition"
mdx:
  format: md
---

# Type Alias: Partition

```ts
type Partition = object;
```

Defined in: [gen/types.gen.ts:1356](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1356)

Provides information on a partition within a broker node.

## Properties

### health

```ts
health: "healthy" | "unhealthy" | "dead";
```

Defined in: [gen/types.gen.ts:1368](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1368)

Describes the current health of the partition.

***

### partitionId

```ts
partitionId: number;
```

Defined in: [gen/types.gen.ts:1360](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1360)

The unique ID of this partition.

***

### role

```ts
role: "leader" | "follower" | "inactive";
```

Defined in: [gen/types.gen.ts:1364](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1364)

Describes the Raft role of the broker for a given partition.
