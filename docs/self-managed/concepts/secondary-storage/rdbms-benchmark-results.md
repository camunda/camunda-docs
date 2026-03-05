---
id: rdbms-benchmark-results
title: "RDBMS benchmarking results"
sidebar_label: "RDBMS benchmark results"
description: "Benchmark results and methodology summary for using PostgreSQL as Camunda 8 secondary storage compared with Elasticsearch/OpenSearch."
---

This page summarizes current benchmark results for using PostgreSQL as Camunda 8 secondary storage.

Use these results as directional guidance, not strict guarantees. Actual performance depends on process complexity, hardware, database configuration, retention settings, and query patterns.

## Test scope and environment

Current published results are based on PostgreSQL benchmarking only.

### Scenarios tested

- **Simple**: 1-task process.
- **Typical**: 10-task process with multiple timers.
- **Realistic**: Complex process with call activities, subprocesses, and DMN.

### Baseline setup used in benchmark discussions

- Orchestration cluster: three nodes, three partitions.
- Orchestration resources: about 3.5 CPU and 2 GB RAM per node.
- PostgreSQL: single-node containerized setup, typically 3-6 CPU and 6-8 GB RAM.
- Retention baseline used in several tests: TTL around one hour.

:::note
Benchmark comparability depends on hardware parity. Interpret Elasticsearch/OpenSearch and RDBMS comparisons only when environments are comparable.

Overall hardware requirements can be similar across Elasticsearch/OpenSearch-based and RDBMS-based setups, but the optimal resource allocation across components may differ.
:::

## Key results summary

### Write throughput

- Across tested scenarios, RDBMS write performance was observed at roughly **~70%** of Elasticsearch/OpenSearch write performance.
- In scale tests, write behavior was described as approximately linear with additional cluster capacity.

### Scenario observations

- **Simple scenario**: Stable exporter behavior under low-complexity flow patterns.
- **Typical scenario**: Stable exporter behavior in multi-step flows, with engine pressure becoming visible before exporter pressure in some runs.
- **Realistic scenario**: Stable exporter behavior in complex business flows, where engine and workload characteristics can dominate end-to-end throughput.

In realistic flows, the engine can become the bottleneck before the exporter.

### Data availability and cleanup

- Data availability in secondary storage was observed in low-latency ranges during benchmark runs, but depends on workload and infrastructure.
- History cleanup overhead was generally low in short-retention tests and increased as retained dataset size grew.

### Read/query behavior

Read performance is currently the main trade-off for RDBMS secondary storage in query-heavy workloads:

- Key-based access patterns scale better.
- Broad filters, sorting, and statistics/count queries can degrade with data growth.
- Operate dashboard statistics queries are known sensitive paths.

:::warning
API read performance (including Operate dashboards) with RDBMS can be significantly slower than with Elasticsearch/OpenSearch on large datasets, especially for complex queries, multi-field filtering, and sorting.
:::

Recommended mitigation:

- Validate your most common read queries with production-like data.
- Add and tune indexes for high-frequency filters used in your environment.
- Re-evaluate index strategy as data volume and query patterns evolve.

## What this means for users

Choose RDBMS secondary storage when:

- You already operate relational databases at scale.
- You prefer operational consistency with existing database tooling.
- Workloads are low-to-moderate and read/query pressure is manageable.

Prefer Elasticsearch/OpenSearch when:

- You need high-throughput, high-volume execution at scale.
- You rely on heavy filtering/sorting/search workloads.
- You require Optimize without introducing a second storage technology.

## Caveats and interpretation guidance

- These results are from controlled benchmark scenarios and should not be interpreted as guaranteed production numbers.
- Results can change as product and exporter optimizations evolve.
- Always validate final sizing with production-like workload tests.

## Planned benchmark expansion

The following benchmark areas were identified for follow-up publication:

- Direct read-performance comparison against Elasticsearch/OpenSearch for key endpoints.
- Longer retention (TTL) runs to evaluate read/query degradation over larger datasets.
- Updated measurements after audit-log and exporter optimizations.

Performance optimizations are ongoing, and this page will be updated as new benchmark results become available.
