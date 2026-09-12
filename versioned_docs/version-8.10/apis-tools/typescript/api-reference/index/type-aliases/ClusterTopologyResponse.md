---
title: "Type Alias: ClusterTopologyResponse"
sidebar_label: "ClusterTopologyResponse"
mdx:
  format: md
---

# Type Alias: ClusterTopologyResponse

```ts
type ClusterTopologyResponse = object;
```

The topology of the whole cluster, aggregated over all physical tenants.

## Properties

### brokers

```ts
brokers: ClusterBrokerInfo[];
```

The brokers that are part of this cluster, across all physical tenants.

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
gatewayVersion: string | null;
```

The version of the Orchestration Cluster Gateway.

---

### physicalTenants

```ts
physicalTenants: PhysicalTenantTopology[];
```

The topology of each physical tenant of this cluster.
