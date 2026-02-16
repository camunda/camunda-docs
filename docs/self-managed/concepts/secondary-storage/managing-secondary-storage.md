---
id: managing-secondary-storage
title: "Manage secondary storage"
sidebar_label: "Manage"
description: "Follow best practices to maintain, back up, and monitor your secondary storage data to ensure reliability and performance."
---

Manage your secondary storage carefully to maintain data integrity, performance, and system stability.

For definitions and conceptual context, see [secondary storage](/reference/glossary.md#secondary-storage).

## Modifying secondary storage data

:::warning
You should never manually modify data stored in secondary storage unless instructed by Camunda Support during an active support case. Do not make direct edits to data in secondary storage outside of explicit Camunda Support guidance.
:::

### Risks of manual modification

Unsupervised changes to secondary storage data can lead to severe issues, such as the following:

| Risk                       | Description                                                                                                    |
| :------------------------- | :------------------------------------------------------------------------------------------------------------- |
| Data loss                  | Manual edits may delete or overwrite essential records that cannot be recovered without backups.               |
| Data corruption            | Structural or value changes can leave indices or tables in inconsistent states, leading to application errors. |
| Unsupported system states  | Unapproved modifications may break compatibility with upgrades, patches, or new features.                      |
| Troubleshooting challenges | Custom edits make it difficult for support engineers to diagnose and resolve issues.                           |
| Security vulnerabilities   | Unauthorized changes can expose sensitive data or weaken access controls.                                      |
| Compliance issues          | Altered records may violate internal or external data-integrity regulations.                                   |

## Configuring capacity and redundancy

Secondary storage configuration depends on the backend you choose (for example, Elasticsearch/OpenSearch or an RDBMS). Use the documentation for your selected backend and validate decisions against your expected workload.

:::note
Backend selection and sizing should be based on benchmarking and realistic workload expectations. Prefer configuration choices that you can validate with measured throughput, latency, and retention needs.
:::

### Elasticsearch/OpenSearch: shards and replicas

:::warning
When Elasticsearch/OpenSearch Exporter indices and Orchestration Cluster indices share the same Elasticsearch or OpenSearch cluster, their index prefixes must be different, one prefix must not be the beginning of the other (for example, avoid `custom` and `custom-zeebe` together because `custom*` matches both), they must not use the reserved Orchestration index names `operate`, `tasklist`, or `camunda`, and Orchestration Cluster indices must not use the reserved `zeebe-record` prefix, which is the default for Elasticsearch/OpenSearch Exporter indices.

For detailed requirements, configuration examples, and common mistakes, see
[Index prefix configuration](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md#index-prefix-configuration).
:::

If you use [Elasticsearch/OpenSearch](/reference/glossary.md#elasticsearchopensearch) as your secondary storage backend, configure shards and replicas to support resilience and scalability.

#### Shards

Define shard count according to your data size and expected growth.

- Start with **1–5 primary shards** per index.
- More shards can improve scalability but increase management complexity.
- Avoid over-sharding, which can reduce performance and add unnecessary overhead.

#### Replicas

- **Single-node clusters:** Do not configure replicas. Replicas provide redundancy only when distributed across multiple nodes. On a single node, replicas remain unassigned and may prevent the cluster from reporting as healthy.

- **Multi-node clusters:** Configure at least **one replica per index**. Replicas ensure fault tolerance by keeping data available if one node fails.

## Backups

Regular backups of your secondary storage are critical for disaster recovery and business continuity.

<div className="list-tick">

- Follow the official Camunda backup procedure step by step.
- Schedule backups regularly based on data volume and business requirements.
- Periodically test restore operations to confirm that your backups are valid and usable.

</div>

## Index templates

If you use [Elasticsearch/OpenSearch](/reference/glossary.md#elasticsearchopensearch), Camunda uses index templates to define settings and mappings for indices.

To prevent issues:

<div className="list-cross">

- Avoid using custom index templates that conflict with Camunda’s defaults. Templates with higher priority may override Camunda mappings and cause incorrect index creation.
- Do not delete or modify existing Camunda index templates without explicit guidance from Camunda Support.

</div>

If your provider includes predefined wildcard index templates, set a higher priority for the Camunda templates to prevent conflicts.

## Monitoring secondary storage health

Use the [Data Layer Dashboard](/self-managed/operational-guides/monitoring/metrics.md) to monitor performance and detect issues with your secondary storage integration.

For example:

- Track exporter and indexing latency.
- Detect shard or replica imbalances (Elasticsearch/OpenSearch).
- Identify degraded query performance early (Elasticsearch/OpenSearch or RDBMS).
