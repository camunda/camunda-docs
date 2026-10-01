---
id: sizing-physical-tenants
title: Size clusters with Physical Tenants
sidebar_label: Physical Tenants
description: "Size broker memory, secondary storage, and noisy-neighbor protection for a Self-Managed Orchestration Cluster that runs multiple Physical Tenants."
---

<span class="badge badge--platform">Self-Managed only</span>

This page explains what changes in cluster sizing when you run multiple [Physical Tenants](/self-managed/concepts/physical-tenants/index.md) on one Orchestration Cluster.

Start from the [Self-Managed resource planning](sizing-self-managed.md) guide for the baseline configuration, partition count, disk, RocksDB, and Elasticsearch/OpenSearch guidance. This page covers only the additional budgets that Physical Tenants introduce and the limits you are likely to reach first.

:::note
Physical Tenants are available from Camunda 8.10. Everything on this page applies to 8.10.0 unless a section states otherwise.
:::

## Understand the sizing model

Physical Tenants share brokers, gateways, and actor threads, but each tenant brings its own partitions, exporters, and secondary storage connection. Some costs therefore scale with total partitions, some with tenant count, and some with the combined load of all tenants. The default tenant counts as a tenant in every formula on this page.

| Resource                                 | Scales with                                                                         | Notes                                                                                                                                                                     |
| :--------------------------------------- | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Engine CPU and replication               | Total partitions and total throughput across all tenants                            | Splitting a fixed number of partitions across more tenants costs little. Adding partitions or load requires scaling brokers, as on a single-tenant cluster.               |
| RocksDB memory (native)                  | Partition replicas hosted per broker, summed across all tenants                     | Each partition replica needs a minimum RocksDB memory share. See [size broker memory](#size-broker-memory).                                                               |
| Java heap (RDBMS)                        | Number of tenants                                                                   | Every broker holds database infrastructure for every tenant, regardless of where the tenant's partitions are placed. Adding brokers does not reduce this per-broker cost. |
| Broker disk                              | Partition replicas hosted per broker                                                | Each replica keeps its own log segments, snapshots, and RocksDB state. Use the [disk space formula](sizing-self-managed.md#disk-space) with the total replica count.      |
| RDBMS connections                        | Brokers × tenants × connection pool size                                            | See [size RDBMS connections](#size-rdbms-connections).                                                                                                                    |
| Secondary storage CPU, memory, and IOPS  | Aggregate load of all tenants that share a database instance                        | A shared database must absorb the sum of all tenant exports and queries.                                                                                                  |
| Elasticsearch/OpenSearch indices, shards | Number of tenants that share a cluster, each with its own index prefix              | See [size Elasticsearch and OpenSearch](#size-elasticsearch-and-opensearch).                                                                                              |
| CPU throttling and thread count          | Number of tenants, because each adds stream processors, exporters, and thread pools | Average CPU can stay moderate while bursts hit the container CPU quota.                                                                                                   |

For the list of infrastructure that is shared between tenants, see [what is not isolated](/self-managed/concepts/physical-tenants/index.md#what-is-not-isolated) and [performance and noisy neighbors](/self-managed/concepts/physical-tenants/troubleshooting.md#performance-and-noisy-neighbors).

## Size broker memory

Broker memory has two separate budgets that grow with Physical Tenants: native RocksDB memory, which grows with the partition replicas on the broker, and Java heap, which grows with the tenant count. Size them independently.

### Size RocksDB memory

Each partition replica on a broker, leader or follower, needs at least 32 MiB of RocksDB memory. All tenants' replicas on a broker share the same RocksDB memory pool, so the minimum grows with every tenant you add.

The broker checks this minimum at startup for every memory allocation strategy, using the partitions assigned to it in the cluster topology. With the default `FRACTION` strategy, the condition is:

```text
broker memory × memory-fraction  ≥  partition replicas on the broker × 32 MiB

partition replicas on the broker  =  Σ over tenants (partitions × replication factor) / number of brokers
```

If the condition is not met, the broker fails to start with the following error, where the second value is the memory actually available per partition:

```text
Expected the allocated memory for RocksDB per partition to be at least 33554432 bytes, but was <bytes> bytes.
```

For example, on the [baseline](sizing-self-managed.md#baseline-resource-configuration) brokers with 2 GiB of memory and the default fraction of `0.1`, the RocksDB pool is about 205 MiB, enough for six partition replicas. With three partitions and a replication factor of three per tenant on three brokers, each tenant adds three replicas to every broker. Two tenants fit, but a third tenant stops the brokers from starting.

The following minimums are derived from the 32 MiB rule for three brokers, each tenant with three partitions and a replication factor of three:

| Tenants | Partition replicas per broker | Minimum RocksDB memory per broker | Minimum `memory-fraction` at 2 GiB |
| :------ | :---------------------------- | :-------------------------------- | :--------------------------------- |
| 1       | 3                             | 96 MiB                            | 0.05                               |
| 5       | 15                            | 480 MiB                           | 0.23                               |
| 10      | 30                            | 960 MiB                           | 0.47                               |

To meet the minimum, do one of the following:

- Raise `camunda.data.primary-storage.rocksdb.memory-fraction`.
- Raise broker memory.
- Add brokers, so each broker hosts fewer partition replicas.
- Plan fewer partitions for tenants with low load when you create them. You can scale partitions up later, but not down.

Raising the fraction takes memory away from the Java heap, native memory, and the OS page cache. On small brokers, a high fraction can leave too little for the rest of the process, so raising broker memory is usually the safer option. See [memory](sizing-self-managed.md#memory) for how these budgets fit together, and the caution on [keeping the default `FRACTION` strategy](sizing-self-managed.md#keep-the-default-fraction-strategy-for-primary-storage).

The 32 MiB value is a memory minimum only. Disk usage for RocksDB state is a separate budget, sized per replica as described in [RocksDB](sizing-self-managed.md#rocksdb).

### Size Java heap

With RDBMS secondary storage, every broker creates a connection pool and a full set of database mapping metadata for every Physical Tenant at startup. Heap usage therefore grows linearly with the tenant count on every broker, independent of load and of how many brokers the cluster has.

If the heap is too small for the configured tenants, brokers fail with an out-of-memory error during startup, before any load is applied. Validate heap usage at your target tenant count, and after each tenant you add, before you rely on a configuration in production.

As a reference point, Camunda measured the following in an internal test. Treat it as a lower bound for RDBMS deployments, not as a capacity guarantee:

| Observation                                                                                                                                  | Test configuration                                                                                                                                                                                                                                                |
| :------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| About 4.4 MB of heap per tenant, about 700 MB in total for 160 tenants. Brokers ran out of heap during startup, before any load was applied. | Pre-release 8.10 build, September 2026. 160 tenants plus the default tenant, one partition each, replication factor three. 20 brokers with 6 vCPU and 8 GiB memory, Java heap at 25% of memory (2 GiB). PostgreSQL secondary storage, accessed through PgBouncer. |

The figure covers only the database mapping metadata retained per tenant. It does not include other per-tenant heap usage. Camunda has not measured the equivalent per-tenant heap cost for Elasticsearch or OpenSearch secondary storage.

## Size secondary storage

Secondary storage is usually the first bottleneck as you add tenants and load. When tenants share a database instance or cluster, size it for the combined load of all tenants, not the load of a single tenant.

If tenants use dedicated database instances, size each instance for its own tenant's load, using the general [secondary storage](sizing-your-environment.md#secondary-storage) guidance.

### Size RDBMS connections

Each broker opens one HikariCP connection pool per Physical Tenant at startup. The number of database connections therefore scales with brokers multiplied by tenants, not with partitions:

```text
idle connections (floor)    =  brokers × tenants × minimum-idle
maximum connections         =  brokers × tenants × maximum-pool-size
```

With the default `maximum-pool-size` of `10` and `minimum-idle` of `2`, three brokers serving four tenants can open up to 120 connections, already above the PostgreSQL default `max_connections` of 100. See [connection pool configuration](/self-managed/concepts/databases/relational-db/configuration.md#connection-pool-configuration) for the pool properties. You can override them per tenant.

To size connections, do the following:

1. Calculate the maximum connections for each database instance, counting only the tenants that use that instance.
1. Make sure the database's connection limit can accept that number, or place a connection pooler in front of the database.
1. Monitor pool saturation per tenant. HikariCP metrics carry the `physicalTenant` tag, so you can see if a single tenant's pool is exhausted while others are idle.

If data availability latency rises as you add tenants, check connection pool saturation before you add database capacity.

#### Use a connection pooler

A connection pooler such as PgBouncer can multiplex many client connections onto fewer database connections. Camunda does not ship, configure, or require a pooler. Use one if the number of client connections exceeds what your database can serve directly.

Camunda's Physical Tenant load tests used PostgreSQL behind PgBouncer in transaction pooling mode, with `prepareThreshold=0` on the JDBC URL. If you use a pooler, validate it with your own load. When sizing it, keep the following three limits apart:

| Limit                         | What it caps                                    | What to compare it against               |
| :---------------------------- | :---------------------------------------------- | :--------------------------------------- |
| PgBouncer `max_client_conn`   | Client connections from all brokers and tenants | Brokers × tenants × `maximum-pool-size`  |
| PgBouncer `default_pool_size` | Server connections per database and user pair   | Concurrent queries that the tenants need |
| PostgreSQL `max_connections`  | Backend connections on the database server      | Sum of server connections from all pools |

In those tests, the PgBouncer defaults were too low for multiple tenants. A `default_pool_size` of 20 limited throughput with 24 partitions, and a `max_client_conn` of 100 was exhausted at 120 tenants.

#### Tune the table row-count metric

The RDBMS table row-count metric refreshes once per tenant, per broker, every `camunda.data.secondary-storage.rdbms.metrics.table-row-count-cache-duration` (default `5m`). If periodic database CPU spikes line up with this interval at high tenant counts, increase the duration.

### Size Elasticsearch and OpenSearch

When tenants share an Elasticsearch or OpenSearch cluster, each tenant uses its own index prefix and its own set of indices. Size the cluster for:

- **Aggregate write load**: Size CPU, memory, and IOPS for the sum of all tenant exports. If all tenants can peak at the same time, size for that combined peak. Under-provisioning shows up as rising data availability latency or reduced throughput.
- **Shard budget**: Every tenant adds indices, and every index uses at least one shard. Account for all tenants in the [shard budget](sizing-your-environment.md#elasticsearchopensearch-shard-budget).
- **Disk and retention**: Retention is set per tenant, so sum each tenant's expected data volume.

### Benchmark observations for secondary storage

The following results come from internal Camunda tests. They show how secondary storage behaves with Physical Tenants and are not capacity guarantees for your environment.

| Observation                                                                                                                                                                                                                                                                                                                      | Test configuration                                                                                                                                                                                                                                                   |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Splitting the [realistic baseline workload](sizing-self-managed.md#baseline-performance) evenly across five tenants on the baseline hardware met the baseline targets. Data availability p99 was 2.5 s. Broker CPU rose 24%, CPU throttling rose about eight times, and the shared Elasticsearch cluster held about 290 indices. | 8.10.0-rc2, September 2026. Five tenants with three partitions each, replication factor three. Three brokers with 3 vCPU and 2 GiB memory, `memory-fraction` `0.3`. Three shared Elasticsearch nodes with 7 vCPU and 8 GiB memory. One 40-minute measurement window. |
| With 10 tenants at maximum load, one shared PostgreSQL instance reached 69% of the throughput of 10 equivalent single-tenant clusters, with uneven throughput between tenants. Two PostgreSQL instances, five tenants each, reached 88% with an even spread.                                                                     | Pre-release 8.10 build, September 2026. 10 tenants with three partitions each, replication factor three, 30 brokers. PostgreSQL behind PgBouncer. Optimize disabled.                                                                                                 |

## Plan for noisy neighbors

A tenant under high load affects other tenants that share its brokers and secondary storage. In Camunda's tests, the effect was mainly on latency rather than on throughput.

### Observed effects

The following results come from an internal Camunda test. They show how one busy tenant affects the others and are not guarantees for your environment.

The test used a pre-release 8.10 build in September 2026. Eight tenants ran on three brokers with 6 vCPU and 8 GiB memory each, with shared PostgreSQL secondary storage behind PgBouncer. Every tenant ran the same typical workload, and the quiet tenants stayed at 6 PI/s throughout.

When the noisy tenant's offered load increased, its achieved throughput leveled off at about 33–35 PI/s. The quiet tenants kept about 6 PI/s each, but their latency rose:

| Noisy tenant offered load | Quiet tenants' request-response p99 |
| :------------------------ | :---------------------------------- |
| 6 PI/s (baseline)         | 0.05–0.06 s                         |
| 24 PI/s                   | 0.15–0.20 s                         |
| 48 PI/s                   | 1.13–1.72 s                         |
| 96 PI/s                   | 2.48–3.20 s                         |

At the highest load, the quiet tenants' data availability p99 rose from about 1 s to 3.4–3.9 s. Request-response p99 stayed below 5 s, and latency returned to the baseline when the noisy tenant's load dropped back to 6 PI/s.

In a second run, the noisy tenant's partition count increased from three to 12 while every tenant stayed at 6 PI/s. Throughput was unaffected, and the quiet tenants' request-response p99 moved only from about 50 ms to 54–66 ms. The extra partitions used about 0.73 additional broker CPU cores across the cluster and 2.2–2.5 GiB of additional disk per broker.

### Limit tenant load with flow control

Use [flow control](/self-managed/operational-guides/configure-flow-control/configure-flow-control.md) to limit how much load a single tenant can write. You can set write limits per tenant in two ways:

- **Static configuration**: Override `camunda.processing.flow-control.write.*` under `camunda.physical-tenants.<tenant-id>`. Use these properties instead of the legacy `zeebe.broker.flowControl.write.*` properties, which Camunda's tests showed apply only to the default tenant.
- **Runtime change**: Call `POST actuator/flowControl?physicalTenant=<tenant-id>` to change one tenant's limits without a restart. Without the `physicalTenant` parameter, the change applies to every tenant. Runtime changes revert to the static configuration when a broker restarts.

Flow control limits are not a direct per-tenant cap. Keep the following in mind when you set them:

- The write limit applies to each partition. A tenant's effective ceiling is roughly the limit multiplied by the tenant's partition count, so a tenant with more partitions can write more.
- Throttling reacts to each partition's own export backlog. In the 10-tenant test described in [benchmark observations for secondary storage](#benchmark-observations-for-secondary-storage), a single slow shared database throttled tenants unevenly, which caused the uneven throughput between tenants.
- Limits count records per second, not bytes. A tenant that writes large payloads can consume more resources than a tenant with small payloads at the same record rate.
- Flow control does not limit CPU time. A tenant with expensive processing can still use more shared CPU than its record rate suggests.

### Contain atypical workloads

Runaway loops, very large multi-instance elements, and expensive expressions can slow other tenants on the same brokers, but they cannot block them permanently:

- Write limits bound the rate at which loops and multi-instance elements create records.
- Expression evaluation is cancelled after `camunda.expression.timeout` (default `5s`) and raises an incident. See [expression](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#expression) configuration.

## Known limitations

The following limitations apply to Camunda 8.10.0.

| Limitation                                                      | Impact                                                                                                                                                                                                                                                                                                                                                                             |
| :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Per-tenant database infrastructure is allocated on every broker | With RDBMS, every broker holds a connection pool and mapping metadata for every tenant. The tenant count is bounded by single-broker heap and by database connections, not by cluster size. Adding brokers does not increase the number of tenants you can host, and it increases total connections. See [camunda/camunda#61935](https://github.com/camunda/camunda/issues/61935). |
| Tested range is tens of tenants                                 | Camunda's sizing tests focus on tens of tenants per cluster. If you plan for more, run your own load tests at the target tenant count.                                                                                                                                                                                                                                             |
| No per-tenant throughput or latency guarantee                   | Sharing a cluster trades some per-tenant throughput and latency headroom for resource efficiency. If one tenant needs high throughput or strict latency targets on its own, validate it with dedicated load tests or consider a separate cluster.                                                                                                                                  |
| RocksDB memory is shared across tenants                         | All tenants' partitions on a broker share one RocksDB memory pool. You cannot reserve RocksDB memory for a single tenant.                                                                                                                                                                                                                                                          |
| Mixed secondary storage types are not supported                 | All tenants in a cluster must use the same secondary storage type. See [storage isolation known limitations](/self-managed/concepts/physical-tenants/storage-isolation.md#known-limitations).                                                                                                                                                                                      |

## Validate your configuration

The figures on this page come from specific test configurations. Your own limit is whichever resource is smallest in your environment, so validate your configuration with your own workload before production:

- **Representative load**: Run each tenant's realistic process models, payload sizes, and job workers, not a uniform synthetic load.
- **Concurrent tenant load**: Run all tenants at their expected peak at the same time, and run one tenant above its peak while the others stay at normal load.
- **Database pool saturation**: Monitor HikariCP pending connections and connection timeouts filtered by `physicalTenant`. If you use a pooler, also monitor its waiting clients and the database connection count against `max_connections`.
- **Heap usage**: Check heap usage and GC time after the brokers start with the full set of tenants, before load is applied.
- **CPU throttling**: Check container CPU throttling as well as average CPU usage, because more tenants make CPU usage burstier.
- **Latency**: Compare request p99 latency and data availability p99 latency per tenant against your targets.
- **Startup behavior**: Run a rolling restart and add a new tenant. The RocksDB minimum check and heap exhaustion fail at startup, not under load.
