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

Defined in: [gen/types.gen.ts:1297](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1297)

Provides information on a broker node.

## Properties

### host

```ts
host: string;
```

Defined in: [gen/types.gen.ts:1305](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1305)

The hostname for reaching the broker.

---

### nodeId

```ts
nodeId: number;
```

Defined in: [gen/types.gen.ts:1301](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1301)

The unique (within a cluster) node ID for the broker.

---

### partitions

```ts
partitions: Partition[];
```

Defined in: [gen/types.gen.ts:1313](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1313)

A list of partitions managed or replicated on this broker.

---

### port

```ts
port: number;
```

Defined in: [gen/types.gen.ts:1309](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1309)

The port for reaching the broker.

---

### version

```ts
version: string;
```

Defined in: [gen/types.gen.ts:1317](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1317)

The broker version.
