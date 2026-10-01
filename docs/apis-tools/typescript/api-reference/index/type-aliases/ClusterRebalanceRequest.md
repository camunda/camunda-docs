---
title: "Type Alias: ClusterRebalanceRequest"
sidebar_label: "ClusterRebalanceRequest"
mdx:
  format: md
---

# Type Alias: ClusterRebalanceRequest

```ts
type ClusterRebalanceRequest = object;
```

The settings to run a given rebalance with. Every setting is optional; an absent request body is equivalent to a body with every field absent, and means "use the configured settings".

## Properties

### leaderWaitTimeout?

```ts
optional leaderWaitTimeout?: string;
```

How long the coordinator waits for a partition without a leader to acquire one before reporting `NO_LEADER` and moving on (as a positive ISO-8601 duration).

---

### maxTransferAttempts?

```ts
optional maxTransferAttempts?: number;
```

How many times a current leader may prompt the desired leader to take over leadership before giving up.

---

### replicationLagThreshold?

```ts
optional replicationLagThreshold?: number;
```

The highest replication lag (in bytes) that a desired leader may have for its transfer to be accepted.

---

### replicationTimeout?

```ts
optional replicationTimeout?: string;
```

How long a partition may stay frozen waiting for its desired leader to catch up (as a positive ISO-8601 duration).
