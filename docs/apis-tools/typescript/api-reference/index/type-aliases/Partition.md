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

Defined in: [gen/types.gen.ts:1358](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1358)

Provides information on a partition within a broker node.

## Properties

### health

```ts
health: "healthy" | "unhealthy" | "dead";
```

Defined in: [gen/types.gen.ts:1370](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1370)

Describes the current health of the partition.

***

### partitionId

```ts
partitionId: number;
```

Defined in: [gen/types.gen.ts:1362](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1362)

The unique ID of this partition.

***

### role

```ts
role: "leader" | "follower" | "inactive";
```

Defined in: [gen/types.gen.ts:1366](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1366)

Describes the Raft role of the broker for a given partition.
