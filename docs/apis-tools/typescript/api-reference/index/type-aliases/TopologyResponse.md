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

Defined in: [gen/types.gen.ts:1263](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1263)

The response of a topology request.

## Properties

### brokers

```ts
brokers: BrokerInfo[];
```

Defined in: [gen/types.gen.ts:1267](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1267)

A list of brokers that are part of this cluster.

---

### clusterId?

```ts
optional clusterId: string | null;
```

Defined in: [gen/types.gen.ts:1271](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1271)

The cluster Id.

---

### clusterSize

```ts
clusterSize: number;
```

Defined in: [gen/types.gen.ts:1275](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1275)

The number of brokers in the cluster.

---

### gatewayVersion

```ts
gatewayVersion: string;
```

Defined in: [gen/types.gen.ts:1287](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1287)

The version of the Zeebe Gateway.

---

### lastCompletedChangeId

```ts
lastCompletedChangeId: string;
```

Defined in: [gen/types.gen.ts:1291](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1291)

ID of the last completed change

---

### partitionsCount

```ts
partitionsCount: number;
```

Defined in: [gen/types.gen.ts:1279](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1279)

The number of partitions are spread across the cluster.

---

### replicationFactor

```ts
replicationFactor: number;
```

Defined in: [gen/types.gen.ts:1283](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1283)

The configured replication factor for this cluster.
