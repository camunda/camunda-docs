# Reshaping, recovering, and rebalancing a live cluster: Distributed Systems in Camunda 8.10

The Distributed Systems team owns the parts of Camunda 8 that most users never think about until they have to: Raft and replication, partition placement, cluster configuration, the log and snapshot storage engine, transport, and backup and restore.

If there is one theme running through our 8.10 work, it is this: **a Camunda cluster should be something you can reshape, recover, and reason about while it is running** — through a documented API, not through a runbook full of environment variables and broker restarts.

Here is what we shipped, with a short example for each — and, since all of this is developed in the open, links to the issues and pull requests behind it.

---

## 1. Zone-aware clusters

Until 8.10, a multi-region cluster was described by the _parity of its node IDs_. Even IDs (`0, 2, 4, …`) belonged to one region, odd IDs to the other. That works, but only for exactly two regions, and it hides the topology inside the numbering: nothing about broker `3` tells you where broker `3` lives.

8.10 introduces the [`ZONE_AWARE` partitioning scheme](https://github.com/camunda/camunda/issues/51587). Each broker declares the zone it belongs to, and the cluster uses that to place partition replicas across zones and to assign Raft election priorities per zone — so leadership is biased toward a preferred zone. Brokers get composite member IDs of the form `<zone>_<index>` (`us-east1_0`, `us-west2_1`), so the topology is readable straight off the broker names.

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

Zones are operable at runtime, too. There is a [new zones API](https://github.com/camunda/camunda/pull/58519) on the management port for the operations you actually need during a regional incident — force-remove an unreachable zone, add it back, [migrate an existing bare cluster](https://github.com/camunda/camunda/issues/51986) into a zone-aware topology one zone at a time, or just reorder which zone is preferred:

```bash
# Prefer zone-b for partition leadership from now on
curl -X PUT 'http://localhost:9600/actuator/cluster/partition-distribution' \
  -H 'Content-Type: application/json' \
  -d '{ "zonePriorities": ["zone-b", "zone-a"] }'

# Zone A is gone and its brokers are unreachable: evict it and drop it
# from the persisted distribution, in one atomic change
curl -X DELETE 'http://localhost:9600/actuator/cluster/zones/zone-a'
```

[Scaling became zone-aware](https://github.com/camunda/camunda/issues/55163) as well — broker count is now scoped to a zone, so you grow one zone rather than the whole cluster:

```bash
curl -X PATCH 'http://localhost:9600/actuator/cluster' \
  -H 'Content-Type: application/json' \
  -d '{ "brokers": { "zone": "zone-a", "count": 4 } }'
```

Every one of these accepts `dryRun=true` and returns the change plan without touching the cluster.

_Tracked in [#51412 — [EPIC] Cluster Zone Awareness](https://github.com/camunda/camunda/issues/51412), 20 of 23 sub-issues closed at the time of writing._

### Zone awareness on ECS

The dynamic node ID provider — brokers leasing their node ID from an S3 bucket, because ECS tasks have no stable ordinal the way StatefulSet pods do — landed in 8.9. What 8.10 adds is **zone awareness inside it** ([#55925](https://github.com/camunda/camunda/pull/55925)): leases and member IDs now carry the broker's zone, and the provider recognises zone-aware members when it hands an ID back to a replacement task.

That is what makes **dual-region ECS** ([#55588](https://github.com/camunda/camunda/pull/55588)) a supported topology rather than a single-region one, and there is now a Terraform reference architecture to go with it.

_Part of [#51411 — [EPIC] ECS Dual Region w/ Aurora Global](https://github.com/camunda/camunda/issues/51411), the parent of the zone-awareness epic._

---

## 2. Restore a cluster in place, without restarting a single broker

Restoring Zeebe used to mean deploying a separate standalone restore application: override the broker start command, set restore-only environment variables, clear the data directories by hand, then undo all of it. It worked, but it was a deployment change in the middle of an incident — which is the worst possible time to be editing a StatefulSet.

In 8.10, restore is an operation on the running cluster, driven by two API calls. The brokers stay up the whole time.

It works through a new [**cluster mode**](https://github.com/camunda/camunda/issues/56391). `PROCESSING` is the normal mode. In `RECOVERING`, every broker deactivates its partitions and switches to a reduced set of services: partitions register as `inactive`, don't join their Raft group, and neither process nor export. What remains available is exactly what a restore needs — read the cluster state, [read the backup store](https://github.com/camunda/camunda/issues/55938), restore from it.

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

_Tracked in [#53801 — [EPIC] Restore API Breakdown](https://github.com/camunda/camunda/issues/53801); the restore itself is [#55940](https://github.com/camunda/camunda/issues/55940). Milestones 1 and 2 are complete; observability metrics and SaaS adoption are still open._

---

## 3. Coordinated leadership transfer, and a rebalance API to drive it

Rebalancing leadership used to be optimistic: `POST /actuator/rebalance` broadcast `stepDownIfNotPrimary()` to every node and returned immediately — an election on every partition at once, with no coordination, no feedback, and no guarantee the highest-priority node won. Occasionally the replica that won was the one furthest behind, and the partition spent the next while catching up instead of serving.

8.10 replaces that with a **coordinated leadership transfer**. Before handing over, the current leader checks the desired leader's [replication lag](https://github.com/camunda/camunda/issues/56806); if it is too far behind, the transfer is refused (`LAG_TOO_HIGH`) rather than attempted. If it is close enough, [the leader freezes writes](https://github.com/camunda/camunda/issues/56812) to the log stream, waits for the follower to catch up, and then prompts it to take over with a Raft `TimeoutNow` — retried a bounded number of times, with a watchdog that unfreezes the partition if a transfer gets stuck.

On top of that sits a [cluster-wide rebalance coordinator and API](https://github.com/camunda/camunda/issues/56815) that moves one partition at a time and reports what it did:

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

_Tracked in [#56752 — Coordinated Leadership Transfer](https://github.com/camunda/camunda/issues/56752), whose description carries the full sequence diagram. The [v2 endpoint](https://github.com/camunda/camunda/pull/60521) merged on 21 August; benchmarking, chaos tests, Grafana panels and user-facing docs ([#56820](https://github.com/camunda/camunda/issues/56820)) are still in flight._

---

## 4. Physical tenants: dedicated Raft groups on shared brokers

Physical tenants are 8.10's strong-isolation tenancy model — one Orchestration Cluster, several tenants, each with its own execution and storage boundary. It is a cross-team feature; the part we built is the one the isolation actually rests on: **each physical tenant gets its own Raft groups**, running on the same shared brokers.

That sounds like a small statement and was not a small change. Almost every cluster-level concept in Zeebe assumed exactly one of itself:

- **Cluster configuration** went from a single partition distribution, routing state, and exporter state to one **partition group per tenant**, each with its own ([#56018](https://github.com/camunda/camunda/issues/56018)). This is the piece that makes the rest possible.
- **Transport** subscribes per partition group, and requests carry the group they are destined for, so a request lands on the right tenant's partition rather than the right partition number. [Job streams](https://github.com/camunda/camunda/issues/56219) register and route per tenant too.
- **Backups, exporter state, and metrics** are per tenant — every partition-scoped meter registry now carries the physical tenant ID, so a dashboard can separate them. The [`/actuator/cluster` topology](https://github.com/camunda/camunda/issues/57016) reports across all groups.
- **Cluster-wide operations fan out.** Adding or removing a broker, changing the replication factor, [migrating a zone](https://github.com/camunda/camunda/issues/60341) or [force-removing one](https://github.com/camunda/camunda/issues/60343) applies to every tenant as a single change. [Partition-count scaling](https://github.com/camunda/camunda/issues/60077) is the exception that scopes to one tenant — and even then placement considers every tenant's partitions at once, so scaling one tenant doesn't pile partitions onto brokers already busy with another.

Tenants are configured statically and provisioned by rolling restart, with root-level `camunda.*` as the shared default and per-tenant overrides on top:

```yaml
camunda:
  physical-tenants:
    default:
      cluster:
        partitions-count: 3
    tenanta:
      cluster:
        partitions-count: 3
      data:
        secondary-storage:
          rdbms:
            url: jdbc:postgresql://db/tenanta
      security:
        authentication:
          providers:
            assigned:
              - my-idp
```

At the API, tenant-scoped requests get their own prefix, and cluster-wide operations get theirs:

```bash
# Is this tenant able to accept work, and which partitions are available?
curl 'http://localhost:8080/physical-tenants/tenanta/v2/topology'

# Scale one tenant's partitions
curl -X PATCH 'http://localhost:9600/actuator/cluster?physicalTenant=tenanta' \
  -H 'Content-Type: application/json' \
  -d '{ "partitions": { "count": 6 } }'
```

Existing 8.9 clusters keep working: plain `/v2/...` routes to the `default` tenant, and root-level configuration becomes that tenant's configuration with no migration step. Internally, the cluster gossips both the old single-group model and the new multi-group one during the transition, and the on-disk format is versioned with a v1 → v2 migration — so moving to the new model is a rolling upgrade, not a stop-the-world one.

_The feature as a whole is [#50782 — [EPIC] Strong Multi‑Tenant Support with Isolated Physical Tenants](https://github.com/camunda/camunda/issues/50782), spanning Zeebe, clients, the C8 API, Identity, and the data layer._

---

## 5. Performance, observability, and resilience

Not one headline, but the half of the work that shows up in latency graphs and incident counts.

### Seeing inside replication and the write path

Two things we have wanted for a long time and could only estimate before:

- **Per-follower replication lag**, in bytes, as `zeebe.raft.replication.lag.bytes`. It covers [pending snapshot replication](https://github.com/camunda/camunda/pull/58107) _and_ [pending and in-flight log appends](https://github.com/camunda/camunda/pull/58309), tracked through a monotonic watermark of bytes sent per follower so unacknowledged appends and stale callbacks both account correctly. This is also what the coordinated leadership transfer in section 3 checks before it commits to a handover.
- **Sequencer lock contention** ([#49506](https://github.com/camunda/camunda/pull/49506)), as `zeebe.sequencer.lock.hold.time` (labeled by writer) and `zeebe.sequencer.lock.wait.time` (labeled by the holder that blocked you). When the stream processor, scheduled jobs, and inter-partition commands [compete for the log](https://github.com/camunda/camunda/issues/49717), you can now see _which_ writer is holding things up rather than inferring it. Percentiles are exported directly, and the metrics are recorded outside the critical section so measuring contention doesn't add to it.

### Snapshot replication

Snapshot replication got a round of I/O work:

- Chunks are read into direct `ByteBuffer`s instead of being materialized as `byte[]` and wrapped — no heap copy on the sender path ([#53803](https://github.com/camunda/camunda/issues/53803), [PR #55371](https://github.com/camunda/camunda/pull/55371)).
- The receiver **flushes once per file** instead of once per chunk. Small chunks made fsyncs the dominant cost; flushing at the end is enough, since a restart discards a partially received snapshot anyway.
- The first snapshot file is now **chunked like every other file**. It used to be sent as one big chunk purely as a backwards-compatibility probe; every receiver has supported partial file chunks for a while, so that is gone.
- Total snapshot size is [persisted in the snapshot metadata](https://github.com/camunda/camunda/pull/57859), which is what makes the snapshot half of the replication-lag metric possible.

### Backpressure that fires when it should

Two fixes in the same area, both of which cost real availability:

- **Spurious backpressure after every leader transition** ([PR #56682](https://github.com/camunda/camunda/pull/56682)). `FlowControl` is recreated on each transition and seeded `lastExportedPosition` to `0` rather than the `-1` sentinel. Until the exporter exported its first record, the computed backlog was the partition's _entire_ written position — billions on a long-lived partition — so the throttle clamped the write rate to its minimum and briefly rejected user commands with `RESOURCE_EXHAUSTED` after every failover.
- **Write retries in a hot loop** ([PR #58058](https://github.com/camunda/camunda/pull/58058)). The `ProcessingStateMachine` retried failed log writes by re-inserting the retry job at the head of the actor's queue. Under write backpressure that burned a core and starved everything else on the stream processor actor — health ticks, pause/resume, position queries. Retries now schedule as actor timers with exponential backoff (1 ms doubling to 100 ms), so the actor stays responsive while it waits, and deterministic failures like `INVALID_ARGUMENT` escalate to real error handling instead of being retried forever.

### Failing later, and on purpose

- **Recoverable retries are configurable**, and the default went from 100 to 1000. The old limit turned a long-but-recoverable stall into a partition restart:

  ```yaml
  camunda:
    processing:
      # state update and replay retries before the partition restarts
      max-recoverable-retries: 1000
  ```

- Retry strategies in general gained a [**maximum retry limit**](https://github.com/camunda/camunda/issues/50993) with a dedicated `RetryLimitExceededException`, so an endless retry loop is now a bounded, diagnosable failure rather than a silent hang — and the logs it produces are throttled instead of flooding.
- **RocksDB memory is validated at startup.** A cache configured larger than the machine's RAM now fails fast with a clear message instead of being discovered by the OOM killer.

### Fewer sharp edges

- Broker errors and rejections are no longer wrapped as exceptions before completing the request future ([#46132](https://github.com/camunda/camunda/issues/46132), [PR #55373](https://github.com/camunda/camunda/pull/55373)). JFR exception tracking against a load test counted ~26,600 `BrokerErrorException` throws, almost all of them `RESOURCE_EXHAUSTED` responses being wrapped only to be unwrapped again. A rejection is a normal broker response, and the future-based broker client now completes with one — exceptional paths are reserved for genuine transport, timeout, and parsing failures.
- The per-tenant partition distribution is scanned once per placement request instead of twice.
- Journal appends are guarded, and closing a `SegmentedJournal` no longer unmaps segments out from under an in-progress read.
- `zeebe/journal`, `zeebe/snapshot`, `zeebe/scheduler`, `zeebe/transport`, and `zeebe/logstreams` are now `@NullMarked` with NullAway enforcing it in the build — a large share of the NPE class of bug is now a compile error in the modules where an NPE is most expensive.
- Agrona 2.0.

---

## Wrapping up

The through-line for 8.10 is that the cluster is now something you operate through an API. Reshape it across zones, move leadership deliberately instead of hoping an election goes your way, isolate tenants down to their own Raft groups, and restore it in place without touching the deployment. The clusters that need these operations most are the ones you least want to hand-edit.

If you want to go deeper, the reference material lives in the Camunda 8.10 docs: [zone-aware clusters](https://docs.camunda.io/docs/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters/), [cluster mode](https://docs.camunda.io/docs/self-managed/components/orchestration-cluster/zeebe/operations/modes/), [in-process restore](https://docs.camunda.io/docs/self-managed/operational-guides/backup-restore/in-process-restore/), and the [physical tenant isolation model](https://docs.camunda.io/docs/self-managed/concepts/physical-tenants/).
