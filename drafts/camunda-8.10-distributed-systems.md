# Reshaping, recovering, and rebalancing a live cluster: Distributed Systems in Camunda 8.10

The Distributed Systems team owns the parts of Camunda 8 that most users never think about until they have to: Raft and replication, partition placement, cluster configuration, the log and snapshot storage engine, transport, and backup and restore.

If there is one theme running through our 8.10 work, it is this: **a Camunda cluster should be something you can reshape, recover, and reason about while it is running** — through a documented API, not through a runbook full of environment variables and broker restarts.

Here is what we shipped, with a short example for each.

---

## 1. Zone-aware clusters

Until 8.10, a multi-region cluster was described by the _parity of its node IDs_. Even IDs (`0, 2, 4, …`) belonged to one region, odd IDs to the other. That works, but only for exactly two regions, and it hides the topology inside the numbering: nothing about broker `3` tells you where broker `3` lives.

8.10 introduces the `ZONE_AWARE` partitioning scheme. Each broker declares the zone it belongs to, and the cluster uses that to place partition replicas across zones and to assign Raft election priorities per zone — so leadership is biased toward a preferred zone. Brokers get composite member IDs of the form `<zone>_<index>` (`us-east1_0`, `us-west2_1`), so the topology is readable straight off the broker names.

Because zones are named rather than inferred, you can now run **three or more zones**, and you can change the number of zones on a live cluster. It also pays off in a single region: map zones to availability zones, give one AZ a higher priority, and partition leaders stay there — which meaningfully cuts cross-AZ traffic to the single writer of an RDBMS.

**Example — a three-zone cluster with `us-east1` preferred for leadership:**

```yaml
camunda:
  cluster:
    size: 5
    replication-factor: 5
    # set per broker; env: CAMUNDA_CLUSTER_ZONE
    zone: us-east1
    partitioning:
      scheme: ZONE_AWARE
      zone-aware:
        zones:
          - name: us-east1
            number-of-brokers: 2
            number-of-replicas: 2
            priority: 1000
          - name: us-west2
            number-of-brokers: 2
            number-of-replicas: 2
            priority: 500
          - name: eu-west1
            number-of-brokers: 1
            number-of-replicas: 1
            priority: 10
```

Zones are also operable at runtime. There is a new zones API on the management port for the operations you actually need during a regional incident — force-remove an unreachable zone, add it back, migrate an existing bare cluster into a zone-aware topology one zone at a time, or just reorder which zone is preferred:

```bash
# Prefer zone-b for partition leadership from now on
curl -X PUT 'http://localhost:9600/actuator/cluster/partition-distribution' \
  -H 'Content-Type: application/json' \
  -d '{ "zonePriorities": ["zone-b", "zone-a"] }'

# Zone A is gone and its brokers are unreachable: evict it and drop it
# from the persisted distribution, in one atomic change
curl -X DELETE 'http://localhost:9600/actuator/cluster/zones/zone-a'
```

Scaling is zone-aware too — the broker count is now scoped to one zone, so you grow a single zone rather than the whole cluster:

```bash
curl -X PATCH 'http://localhost:9600/actuator/cluster' \
  -H 'Content-Type: application/json' \
  -d '{ "brokers": { "zone": "zone-a", "count": 4 } }'
```

Every one of these accepts `dryRun=true` and returns the change plan without touching the cluster.

---

## 2. Restore a cluster in place, without restarting a single broker

Restoring Zeebe used to mean deploying a separate standalone restore application: override the broker start command, set restore-only environment variables, clear the data directories by hand, then undo all of it. It worked, but it was a deployment change in the middle of an incident — which is the worst possible time to be editing a StatefulSet.

In 8.10, restore is an operation on the running cluster, driven by two API calls. The brokers stay up the whole time.

It works through a new **cluster mode**. `PROCESSING` is the normal mode. In `RECOVERING`, every broker deactivates its partitions and switches to a reduced set of services: partitions register as `inactive`, don't join their Raft group, and neither process nor export. What remains available is exactly what a restore needs — read the cluster state, read the backup store, restore from it.

**Example — the full restore:**

```bash
# 1. Stop processing cluster-wide
curl -X PATCH 'http://localhost:8080/v2/mode?mode=RECOVERING'
# → { "changeId": "7", "plannedChanges": [
#      { "operation": "ModeChangeOperation", "mode": "RECOVERING" },
#      { "operation": "AwaitModeChangeOperation", "mode": "RECOVERING" } ] }

# 2. (restore secondary storage to the matching point in time)

# 3. Restore every partition on every broker from the backup
curl -X POST 'http://localhost:8080/v2/restore' \
  -H 'Content-Type: application/json' \
  -d '{ "backupIds": [1748937221] }'

# 4. Follow it, per broker and per partition
curl 'http://localhost:8080/v2/restore'
```

```json
{
  "status": "IN_PROGRESS",
  "changeId": "8",
  "brokers": [
    {
      "brokerId": "1",
      "partitionsRestored": 1,
      "partitionsToRestore": 3,
      "partitions": [
        { "partitionId": 1, "state": "RESTORED", "backupIds": [1748937221] },
        { "partitionId": 2, "state": "RESTORING", "backupIds": [1748937221] }
      ]
    }
  ]
}
```

Both requests are non-blocking, both are cluster configuration changes with a `changeId` you can track and cancel, and both accept `dryRun=true` — so you can validate a backup selection _before_ the maintenance window starts. The restore plan ends by switching the cluster back to `PROCESSING` on its own, so there is no manual step to forget.

A failed partition is retried automatically with backoff rather than failing the whole restore, and with an RDBMS as secondary storage you can restore to a point in time instead of a backup ID:

```bash
curl -X POST 'http://localhost:8080/v2/restore' \
  -H 'Content-Type: application/json' \
  -d '{ "from": "2026-01-01T10:00:00Z", "to": "2026-01-01T12:00:00Z" }'
```

---

## 3. Backups became a first-class part of the Orchestration Cluster API

Backup management used to live on the management port as an actuator: convenient for an operator with cluster access, awkward for anything else, and outside the product's authorization model.

In 8.10 backups are proper `/v2` endpoints on the Orchestration Cluster REST API, authenticated like the rest of the API and gated by `BACKUP` resource permissions — `CREATE` to take one, `READ` to list, `DELETE` to remove, `RESTORE` to restore.

```bash
# Take a runtime backup
curl -X POST 'http://localhost:8080/v2/backups/runtime' \
  -H 'Content-Type: application/json' \
  -d '{ "backupId": 1748937221 }'
# → 202 { "backupId": 1748937221 }

# List backups, filtered by id prefix, newest first
curl 'http://localhost:8080/v2/backups/runtime?prefix=17489*'
```

The listing aggregates per-partition state into one answer — `COMPLETED` only when every partition is complete, `INCOMPLETE` when a partition is missing, `FAILED` with a reason if one failed — and still hands you the per-partition detail underneath. History backups get the same treatment under `/v2/backups/history`.

Underneath the API, backup state moved from marker files to RocksDB column families, which is why 8.10 can also expose the runtime backup state directly, plus escape hatches to force a resync or reset it (`/v2/backups/runtime/state`, `/state/sync`) when the store and the cluster's view of it disagree.

---

## 4. Backup stores that hold up under load

The API is only half of it. Backup stores got a round of hardening across all four implementations — S3, GCS, Azure, and filesystem:

- **Connections are verified at startup**, not on the first backup at 3 a.m.
- **Read and write timeouts** are configurable, so one slow object can't hold a backup hostage.
- **Batch deletion** on S3, GCS, and Azure — deleting an old backup is now a handful of requests instead of one per object.
- **Parallel segment and snapshot upload** on Azure, and GCS listing that interleaves listing with downloading and reads object metadata instead of fetching contents.
- **SSE-C support on S3**: you supply the encryption key, S3 never stores it.

```yaml
camunda:
  data:
    primary-storage:
      backup:
        store: S3
        read-timeout: 30s
        write-timeout: 60s
        s3:
          bucket-name: camunda-backups
          # base64-encoded 32-byte AES-256 key; the same key must be set
          # on every broker. S3 cannot decrypt these objects without it.
          ssec-key: ${BACKUP_SSEC_KEY}
```

---

## 5. Coordinated leadership transfer, and a rebalance API to drive it

Rebalancing leadership used to be optimistic: the leader stepped down and an election decided the rest. Usually fine. Occasionally the replica that won was the one furthest behind, and the partition spent the next while catching up instead of serving.

8.10 replaces that with a **coordinated leadership transfer**. Before handing over, the current leader checks the desired leader's replication lag; if it is too far behind, the transfer is refused (`LAG_TOO_HIGH`) rather than attempted. If it is close enough, the leader freezes writes to the log stream, waits for the follower to catch up, and then prompts it to take over with a Raft `TimeoutNow` — retried a bounded number of times, with a watchdog that unfreezes the partition if a transfer gets stuck.

On top of that sits a cluster-wide rebalance API that moves one partition at a time and reports what it did:

```bash
# What would a rebalance do right now?
curl -X POST 'http://localhost:8080/cluster/v2/rebalance?dryRun=true'

# Run it, with tighter settings than the configured defaults for this run only
curl -X POST 'http://localhost:8080/cluster/v2/rebalance' \
  -H 'Content-Type: application/json' \
  -d '{ "replicationLagThreshold": 8388608, "replicationTimeout": "PT10S" }'

# Are we balanced?
curl 'http://localhost:8080/cluster/v2/rebalance'
# → { "state": "UNBALANCED",
#     "partitions": [ { "partitionId": 1, "currentLeader": "2",
#                       "desiredLeader": "0", ... } ], ... }
```

The defaults are configurable, and a request body overrides them per run:

```yaml
camunda:
  cluster:
    raft:
      rebalance:
        replication-lag-threshold: 8MB # skip a replica lagging further behind
        replication-timeout: 10s # how long the partition may stay frozen
        max-transfer-attempts: 3 # TimeoutNow prompts before giving up
        leader-wait-timeout: 1m # wait for a leaderless partition
```

There is matching telemetry: `zeebe.raft.replication.lag.bytes` per follower, and `zeebe.cluster.rebalance.elapsed`, `zeebe.cluster.rebalance.partition.duration`, and `zeebe.cluster.rebalance.partition.state` for the rebalance itself.

---

## 6. Pausing exporting is now a cluster decision

Pausing exporters is a prerequisite for a consistent backup, and it used to be a per-broker actuator call backed by a local file. Two failure modes followed from that: the pause could be applied unevenly across replicas, and the local state could drift from what the cluster believed after a restart.

In 8.10, exporting state lives in the dynamic cluster configuration. Pause and resume are cluster configuration changes applied to every replica of every partition, and the status endpoint is honest about the in-between:

```bash
# Soft pause: exporting keeps running, but its position is not committed —
# so the log is not compacted, and the state after resuming is identical
# to a hard pause. This is the one you want during a backup.
curl -X POST 'http://localhost:8080/v2/exporting/pause?soft=true'

curl 'http://localhost:8080/v2/exporting'
# → { "status": "SOFT_PAUSED" }   # or EXPORTING | PAUSED | MIXED

curl -X POST 'http://localhost:8080/v2/exporting/resume'
```

`MIXED` means a pause or resume is still in flight or only partially applied. Backup tooling should treat only `PAUSED` and `SOFT_PAUSED` as a confirmed pause — which is exactly the guarantee the old file-based state couldn't give you.

---

## 7. The cluster configuration model behind physical tenants

Physical tenants — strong isolation between tenants inside a single Orchestration Cluster — is a cross-team feature. Our share of it was rebuilding cluster configuration around **multiple partition groups**.

Before, a cluster had one partition distribution, one routing state, one exporter state. Now each physical tenant is its own partition group with its own distribution, routing state, exporter state, backups, and metrics, and cluster-wide operations fan out across all of them: adding or removing a broker, changing the replication factor, migrating a zone, or force-removing one applies to every physical tenant as a single change. Configuration operations, in turn, can be scoped to one tenant.

This came with a new applier layer, phased change plans that can run as a dependency graph, and concurrent independently-cancellable plans — plus dual-write gossip and a versioned on-disk format, so a cluster running the legacy single-group model rolls forward to the new one without downtime.

```bash
# Cluster state, now reported per physical tenant
curl 'http://localhost:9600/actuator/cluster'

# Scale one tenant's partitions. Placement still considers every tenant's
# partitions at once, so scaling `acme` doesn't overload brokers already
# busy with someone else's.
curl -X PATCH 'http://localhost:9600/actuator/cluster?physicalTenant=acme' \
  -H 'Content-Type: application/json' \
  -d '{ "partitions": { "count": 6 } }'

# Each tenant's API is addressable under its own prefix
curl 'http://localhost:8080/physical-tenants/acme/v2/topology'
```

---

## 8. Camunda on Amazon ECS, including dual-region

Kubernetes gives brokers stable ordinal identities for free; a StatefulSet pod is always `broker-2`. ECS tasks aren't like that — they come and go with no stable index — which is why running Zeebe there has been awkward.

8.10 adds a **dynamic node ID provider**. Brokers lease their node ID from an S3 bucket, renewing the lease while they run. If a task dies, its lease expires and the replacement takes the same ID and data directory back. If the lease expired long enough ago that the previous task is certainly gone, the new one skips copying the old data directory entirely — a real startup saving.

```yaml
camunda:
  cluster:
    zone: eu-west-1
    node-id-provider:
      type: s3
      s3:
        bucket-name: camunda-node-id-leases
        lease-duration: 30s
        # if a lease expired more than this ago, treat the previous node
        # as gracefully shut down and skip the data directory copy
        expired-lease-threshold: 2m
        readiness-check-timeout: 2m
```

The task ID is resolved automatically from the ECS task metadata endpoint. Combined with zone awareness, this makes a **dual-region ECS deployment** a supported topology, with a Terraform reference architecture to go with it.

---

## 9. Performance and resilience, the unglamorous half

A grab bag of work that doesn't get its own headline but shows up in latency graphs and incident counts:

- **Flow control** replaced a `ConcurrentSkipListMap` with a ring buffer sized from the request limiter config, and the sequencer now publishes lock contention metrics and percentiles directly.
- **Snapshots** flush once per file instead of repeatedly, chunk the first file like every other, avoid a heap copy when reading chunks, and persist total snapshot size in the metadata.
- **Log stream reads** no longer deserialize `RecordMetadata` just to filter records out.
- **Recoverable retries** are now configurable and default to 1000 instead of 100 — the old limit turned a long-but-recoverable stall into a partition restart:

  ```yaml
  camunda:
    processing:
      # state update and replay retries before the partition restarts
      max-recoverable-retries: 1000
  ```

- **Record skipping is per partition.** When a single record blocks exporting, you can skip it precisely instead of cluster-wide:

  ```yaml
  camunda:
    data:
      export:
        # partition id → record positions to skip
        skip-records:
          3: 4294967296, 4294967300
  ```

  (Recovery tool, not a config knob. Use it to get unstuck, then remove it.)

---

## Wrapping up

The through-line for 8.10 is that the cluster is now something you operate through an API. Reshape it across zones, move leadership deliberately instead of hoping an election goes your way, pause exporting with a guarantee behind it, and restore it in place without touching the deployment. The clusters that need these operations most are the ones you least want to hand-edit.

If you want to go deeper, the reference material lives in the Camunda 8.10 docs: [zone-aware clusters](https://docs.camunda.io/docs/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters/), [cluster mode](https://docs.camunda.io/docs/self-managed/components/orchestration-cluster/zeebe/operations/modes/), and [in-process restore](https://docs.camunda.io/docs/self-managed/operational-guides/backup-restore/in-process-restore/).
