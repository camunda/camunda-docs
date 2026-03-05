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

Defined in: [gen/types.gen.ts:1323](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1323)

Provides information on a partition within a broker node.

## Properties

### health

```ts
health: "healthy" | "unhealthy" | "dead";
```

Defined in: [gen/types.gen.ts:1335](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1335)

Describes the current health of the partition.

---

### partitionId

```ts
partitionId: number;
```

Defined in: [gen/types.gen.ts:1327](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1327)

The unique ID of this partition.

---

### role

```ts
role: "leader" | "follower" | "inactive";
```

Defined in: [gen/types.gen.ts:1331](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1331)

Describes the Raft role of the broker for a given partition.
