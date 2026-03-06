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

Defined in: [gen/types.gen.ts:1330](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1330)

Provides information on a broker node.

## Properties

### host

```ts
host: string;
```

Defined in: [gen/types.gen.ts:1338](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1338)

The hostname for reaching the broker.

***

### nodeId

```ts
nodeId: number;
```

Defined in: [gen/types.gen.ts:1334](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1334)

The unique (within a cluster) node ID for the broker.

***

### partitions

```ts
partitions: Partition[];
```

Defined in: [gen/types.gen.ts:1346](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1346)

A list of partitions managed or replicated on this broker.

***

### port

```ts
port: number;
```

Defined in: [gen/types.gen.ts:1342](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1342)

The port for reaching the broker.

***

### version

```ts
version: string;
```

Defined in: [gen/types.gen.ts:1350](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1350)

The broker version.
