---
id: secondary-storage
title: "Secondary storage architecture"
description: "Understand how Camunda uses primary and secondary storage layers across Self-Managed environments, and how components like Operate and Tasklist interact with them."
---

Camunda Self-Managed environments use a layered storage design that separates workflow execution data from data used by web applications and APIs. This separation improves scalability, data consistency, and flexibility across database technologies.

## How primary and secondary storage work together

Camunda’s data model is divided into two complementary layers:

| Layer                 | Purpose                                                                                        | Typical technologies              | Used by                               |
| --------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------- |
| **Primary storage**   | Persists real-time workflow execution state managed by Zeebe.                                  | RocksDB (embedded in Zeebe)       | Zeebe broker                          |
| **Secondary storage** | Stores exported workflow, decision, and task data for querying, visualization, and API access. | Elasticsearch, H2, or other RDBMS | Operate, Tasklist, Identity, REST API |

:::note
Primary and secondary storage are **not redundant copies** of one another. The secondary layer is a downstream projection of workflow data, optimized for analytics, UI queries, and human-task interaction.
:::

The **RDBMS exporter** or **Elasticsearch exporter** transfers data from Zeebe (primary) to the secondary database, depending on configuration.

## Why the secondary layer matters

- **Query performance:** Separating analytical queries from workflow execution prevents load on the Zeebe broker.
- **Extensibility:** Different storage technologies can be swapped or scaled independently.
- **Reliability:** Secondary storage can be backed up and restored separately, ensuring recovery flexibility.

## Supported databases

Camunda currently supports the following secondary storage options:

| Database type                                 | Supported in                | Notes                                                               |
| --------------------------------------------- | --------------------------- | ------------------------------------------------------------------- |
| **Elasticsearch**                             | General availability        | Default in most existing installations.                             |
| **H2**                                        | 8.9-alpha1+                 | Lightweight in-memory or file-based option, useful for development. |
| **PostgreSQL, MariaDB, Oracle, MySQL, MSSQL** | Planned / under development | To be supported as part of broader RDBMS rollout.                   |

<!-- For detailed configuration of each database type, see the [database configuration guide](/self-managed/concepts/databases/relational-db/configuration.md). -->

## How data flows between layers

1. The Zeebe broker executes workflow instances and writes state to **primary storage (RocksDB)**.
2. The **exporter** streams workflow events to the configured **secondary storage**.
3. Applications like Operate and Tasklist read from secondary storage to display running processes, decisions, and tasks.

```mermaid
flowchart LR
    A[Zeebe broker (Primary storage: RocksDB)] --> B[Exporter (RDBMS or Elasticsearch)]
    B --> C[Secondary storage (RDBMS / Elasticsearch / H2)]
    C --> D[Operate / Tasklist / REST API]
```

## Choosing between Elasticsearch and RDBMS

| Scenario                      | Recommended backend              | Reason                                                 |
| ----------------------------- | -------------------------------- | ------------------------------------------------------ |
| Local development and testing | H2                               | Minimal setup, runs in memory, fast start.             |
| Production environments       | Elasticsearch or supported RDBMS | Scalable, persistent, designed for concurrent queries. |
| Debugging / troubleshooting   | H2 or PostgreSQL                 | Easier inspection of tables and records.               |

:::warning
Camunda 8 Run uses H2 only for **testing and development** in version 8.9-alpha1.  
Operate and Tasklist require RDBMS support planned for 8.9-alpha3 and later.
:::

## Configuration overview

To select the storage backend, configure the `data.secondary-storage` section in your `application.yaml`:

```yaml
data:
  secondary-storage:
    type: rdbms
    rdbms:
      url: jdbc:h2:mem:camunda
      username: sa
      password:
```

For Elasticsearch:

```yaml
data:
  secondary-storage:
    type: elasticsearch
    elasticsearch:
      url: http://localhost:9200/
```

## Next steps

<!-- - Learn how to [configure a relational database](/self-managed/concepts/databases/relational-db/configuration.md). -->

- Explore the [Camunda 8 Run quickstart](/self-managed/setup/developers/c8run.md) for local testing with H2.
- Review [backup and restore for RDBMS](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
