---
title: "Type Alias: PhysicalTenantBrokerTopology"
sidebar_label: "PhysicalTenantBrokerTopology"
mdx:
  format: md
---

# Type Alias: PhysicalTenantBrokerTopology

```ts
type PhysicalTenantBrokerTopology = object;
```

The partitions of one physical tenant that one broker manages or replicates.

## Properties

### brokerId

```ts
brokerId: string;
```

The unique (within a cluster) identifier of the broker, as reported in the cluster-level broker list.

---

### partitions

```ts
partitions: Partition[];
```

The partitions of this physical tenant managed or replicated on this broker.
