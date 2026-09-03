---
title: "Type Alias: ClusterRebalanceOperationPartition"
sidebar_label: "ClusterRebalanceOperationPartition"
mdx:
  format: md
---

# Type Alias: ClusterRebalanceOperationPartition

```ts
type ClusterRebalanceOperationPartition = object;
```

One partition's plan, progress, and outcome within a rebalance.

## Properties

### currentLeader

```ts
currentLeader: string | null;
```

The leader last observed by this rebalance, or absent if there was no leader.

---

### desiredLeader

```ts
desiredLeader: string;
```

The leader selected when this rebalance was planned.

---

### partitionId

```ts
partitionId: number;
```

The unique ID of this partition, within its physical tenant.

---

### physicalTenantId

```ts
physicalTenantId: string;
```

The partition group this partition belongs to.

---

### progress

```ts
progress: "PENDING" | "TRANSFERRING" | "COMPLETED";
```

Where this rebalance has reached for the partition.

---

### result

```ts
result:
  | "TRANSFERRED"
  | "ALREADY_LEADER"
  | "NOT_MEMBER"
  | "NOT_REPLICATING"
  | "UNREACHABLE"
  | "NOT_COORDINATOR"
  | "STALE_CONFIGURATION"
  | "TRANSFER_IN_PROGRESS"
  | "LAG_TOO_HIGH"
  | "LEADER_INITIALIZING"
  | "CONFIGURATION_CHANGE_IN_PROGRESS"
  | "PAUSE_FAILED"
  | "REPLICATION_TIMED_OUT"
  | "TIMEOUT_NOW_EXHAUSTED"
  | "LEADER_CHANGED"
  | "NO_LEADER"
  | "NO_RESPONSE"
  | "CANCELLED";
```

The terminal outcome, present only when progress is COMPLETED.
