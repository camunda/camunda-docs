---
id: rdbms-production-architecture
sidebar_label: Production architecture
title: Production architecture for Camunda 8 with RDBMS
description: "Reference architecture for deploying Camunda 8 Self-Managed in production using an external RDBMS as secondary storage."
---

Understand reference architectures for running Camunda 8 Self-Managed in production with a relational database (RDBMS) as secondary storage, including supported topologies, Orchestration Cluster interactions, and critical constraints.

## Recommended topology

For production deployments with RDBMS, Camunda recommends a **HA Zeebe cluster backed by an external managed RDBMS**:

```
Orchestration Cluster (HA)
├── Zeebe Broker 1 (AZ-1)
├── Zeebe Broker 2 (AZ-2)
├── Zeebe Broker 3 (AZ-3)
└── Operate, Tasklist, Connectors (stateless)
         ↓
    External RDBMS
    (PostgreSQL, MariaDB, Oracle, MySQL, SQL Server)
    HA: 3-way replication across AZs
```

### Key characteristics

**Zeebe clustering**

- Minimum three brokers for production HA
- Each broker in separate availability zone
- Default replication factor 3 (spans AZs)

**Secondary storage**

- Single external managed RDBMS instance
- Database handles replication and failover
- Camunda does not manage database HA

**Data flow**

- Zeebe processes work
- RdbmsExporter flushes state to RDBMS
- Operate and Tasklist access the Orchestration Cluster API and do not directly access the database (v2 API)

## When Elasticsearch/OpenSearch is required

Elasticsearch or OpenSearch is required **only for Optimize**. When Optimize is enabled:

- Deploy Elasticsearch/OpenSearch alongside your RDBMS
- Enable Zeebe exporter to push analytics data
- Zeebe, Operate, and Tasklist use RDBMS as secondary storage

Without Optimize: RDBMS-only stack is fully supported.

## Production constraints

❌ **ES/OS ↔ RDBMS migration not supported**: Choose your secondary storage backend before production. No automated migration tools available.

❌ **Mixed storage modes not supported**: All Zeebe brokers must use the same storage backend (cannot mix RDBMS and ES/OS).

❌ **v1 API not supported**: Only the v2 Orchestration Cluster REST API works with RDBMS. See [migrate to the Orchestration Cluster API](/apis-tools/migration-manuals/migrate-to-camunda-api.md).

❌ **No automatic fallback**: If RDBMS becomes unavailable, Zeebe continues processing in-memory but cannot export. Pending operations queue until database recovers.

## Network and security

- **Zeebe ↔ RDBMS**: Low-latency, private network connectivity
- **All components ↔ RDBMS**: Use TLS in production
- **Network isolation**: Restrict RDBMS access to Camunda pods only (use NetworkPolicies)

## Supported scenarios

✅ **Single-node orchestration + external RDBMS** (non-HA, acceptable for non-critical workloads)

✅ **HA Zeebe cluster + external managed RDBMS** (recommended for production)

✅ **Separate RDBMS per Orchestration Cluster or team** (advanced use case: different backup schedules, HA policies, compliance requirements)

✅ **Managed database services** (AWS Aurora, Azure Database, GCP Cloud SQL)

## Orchestration Cluster component details

- **Zeebe**: Exporter flushes at configurable intervals (default 0.5s)
- **Operate and Tasklist**: Access the Orchestration Cluster API (v2), stateless, scalable independently
- **Optimize**: Requires Elasticsearch/OpenSearch (cannot use RDBMS)

## Next steps

- [RDBMS configuration](/self-managed/deployment/manual/rdbms/configuration.md)
- [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)
- [RDBMS Helm configuration](/self-managed/deployment/helm/configure/database/rdbms.md)
