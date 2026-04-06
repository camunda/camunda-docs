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

Defined in: [gen/types.gen.ts:1328](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1328)

Provides information on a broker node.

## Properties

### host

```ts
host: string;
```

Defined in: [gen/types.gen.ts:1336](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1336)

The hostname for reaching the broker.

---

### nodeId

```ts
nodeId: number;
```

Defined in: [gen/types.gen.ts:1332](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1332)

The unique (within a cluster) node ID for the broker.

---

### partitions

```ts
partitions: Partition[];
```

Defined in: [gen/types.gen.ts:1344](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1344)

A list of partitions managed or replicated on this broker.

---

### port

```ts
port: number;
```

Defined in: [gen/types.gen.ts:1340](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1340)

The port for reaching the broker.

---

### version

```ts
version: string;
```

Defined in: [gen/types.gen.ts:1348](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1348)

The broker version.
