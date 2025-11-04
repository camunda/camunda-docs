---
id: index
title: "Secondary storage"
description: "Learn how secondary storage works in Camunda Self-Managed environments, how it interacts with the Zeebe engine, and how to configure or manage it effectively."
---

Camunda uses a layered storage model that separates workflow execution data from data used by web applications and APIs. This section explains how secondary storage works, how it connects to the Zeebe engine, and how to configure or maintain it in Self-Managed environments.

## How secondary storage fits into Camunda

Camunda’s data model consists of two complementary layers:

| Layer                 | Purpose                                                                                        | Typical technologies        | Used by                               |
| --------------------- | ---------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------- |
| **Primary storage**   | Persists real-time workflow execution state managed by Zeebe.                                  | RocksDB (embedded in Zeebe) | Zeebe broker                          |
| **Secondary storage** | Stores exported workflow, decision, and task data for querying, visualization, and API access. | Elasticsearch, H2, or RDBMS | Operate, Tasklist, Identity, REST API |

:::note
Secondary storage is not a duplicate of primary data. It is a projection optimized for search, analytics, and human-task interaction.
:::

## Why it matters

- **Performance**: Offloads analytical and API queries from the Zeebe engine.
- **Flexibility**: Supports multiple backend technologies, such as Elasticsearch or relational databases.
- **Resilience**: Can be backed up and scaled independently from the workflow engine.

## Supported storage options

Camunda supports several secondary storage backends, depending on the version and use case:

| Database type                         | Availability         | Use case                                               |
| ------------------------------------- | -------------------- | ------------------------------------------------------ |
| **Elasticsearch**                     | General availability | Default in most production installations.              |
| **H2**                                | 8.9-alpha1+          | Lightweight option for local testing or Camunda 8 Run. |
| **RDBMS** (PostgreSQL, MariaDB, etc.) | In development       | For future enterprise-grade flexibility.               |

## Data flow overview

```mermaid
flowchart LR
    A[Zeebe broker<br>(Primary storage: RocksDB)] --> B[Exporter<br>(RDBMS or Elasticsearch)]
    B --> C[Secondary storage<br>(RDBMS / Elasticsearch / H2)]
    C --> D[Operate / Tasklist / REST API]
```

The Zeebe broker executes workflow instances and stores state in **primary storage**.

The **exporter** streams workflow and task data to **secondary storage**.

Applications like **Operate**, **Tasklist**, and the **REST API** read from secondary storage.

## When to use or disable secondary storage

- **Use secondary storage** in nearly all production environments to enable monitoring, analytics, querying, and human-task management through Operate, Tasklist, and other applications.
- **Disable secondary storage** only for limited scenarios, such as lightweight development environments, specialized technical use cases, or resource-constrained deployments.

:::warning
Disabling secondary storage removes key Camunda 8 capabilities, including Operate, Tasklist, and search-based REST endpoints. This setup is suitable only for testing or minimal engine-only operation.
:::

## In this section

- [Configure secondary storage](./configuring-secondary-storage.md)  
  Learn how to configure secondary storage in Self-Managed environments using Helm, Docker, or manual deployment.
- [Run without secondary storage](./no-secondary-storage.md)  
  Understand how to run Zeebe clusters with only the engine and primary storage components.
- [Manage secondary storage data](./managing-secondary-storage.md)  
  Review best practices for data management, backups, and monitoring to ensure integrity and performance.

**Next:** [Configure secondary storage →](./configuring-secondary-storage.md)
