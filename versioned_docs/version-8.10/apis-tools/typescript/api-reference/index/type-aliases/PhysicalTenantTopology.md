---
title: "Type Alias: PhysicalTenantTopology"
sidebar_label: "PhysicalTenantTopology"
mdx:
  format: md
---

# Type Alias: PhysicalTenantTopology

```ts
type PhysicalTenantTopology = object;
```

The topology of a single physical tenant.

## Properties

### brokers

```ts
brokers: PhysicalTenantBrokerTopology[];
```

The brokers holding partitions of this physical tenant.

---

### lastCompletedChangeId

```ts
lastCompletedChangeId: string;
```

ID of the last completed change of this physical tenant.

---

### partitionsCount

```ts
partitionsCount: number;
```

The number of partitions spread across this physical tenant.

---

### physicalTenantId

```ts
physicalTenantId: string;
```

The id of the physical tenant.

---

### replicationFactor

```ts
replicationFactor: number;
```

The configured replication factor for this physical tenant.
