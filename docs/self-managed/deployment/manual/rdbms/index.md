---
id: index
sidebar_label: Manual installation with RDBMS
title: Manual installation with RDBMS
description: Install Camunda 8 manually on VMs or bare metal with RDBMS as secondary storage.
---

Install Camunda 8 Self-Managed manually on a VM, bare-metal server, or standalone Java runtime while using a relational database (RDBMS) as **secondary storage**.

:::caution
Manual installation is **not** supported for Kubernetes. If you run on Kubernetes, use the [Helm charts](/self-managed/deployment/helm/index.md).
:::

:::caution
RDBMS is the **only** supported secondary storage in this setup. There is no Elasticsearch/OpenSearch fallback and no mixed storage modes.
:::

## Supported installation targets

- VM-based deployments
- Bare-metal installations
- Standalone Java application deployments

## Prerequisites

- **Supported RDBMS**: PostgreSQL, MariaDB, Oracle, and MySQL (see [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)).
- **JDBC drivers**: PostgreSQL, MariaDB, SQL Server, and H2 are bundled. Oracle and MySQL must be user-supplied. See [RDBMS configuration](/self-managed/deployment/manual/rdbms/configuration.md).
- **Schemas and scripts**: Use the bundled SQL or Liquibase scripts for schema creation and upgrades. See [Access SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md).

## When to choose manual installation

Choose manual installation when you run Camunda 8 on **VMs, bare metal, or a standalone Java runtime** and need full control over the operating system, networking, and lifecycle management.

If you run on Kubernetes, use [Helm charts](/self-managed/deployment/helm/index.md). For local development or evaluation, consider [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md).

## Component coverage

All core components are supported with RDBMS secondary storage:

- Zeebe (workflow engine)
- Operate (instance monitoring)
- Tasklist (user task management)
- Orchestration Cluster Identity

## Limitations and constraints

- **Optimize is not supported** when the Orchestration Cluster uses RDBMS secondary storage.
- The **v1 REST API** is not available with RDBMS secondary storage.
- **No data migration** is supported between Elasticsearch/OpenSearch and RDBMS secondary storage. Create a new cluster with your preferred secondary storage type.

## Get started

1. Review the [production architecture](/self-managed/deployment/manual/rdbms/rdbms-production-architecture.md) for sizing and topology guidance.
2. Configure drivers, connection details, and schema management in [RDBMS configuration for manual installations](/self-managed/deployment/manual/rdbms/configuration.md).
3. Download SQL/Liquibase scripts as needed: [Access SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md).

## Related documentation

- [Secondary storage architecture](/self-managed/concepts/secondary-storage/index.md)
- [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)
- [Manual installation overview](/self-managed/deployment/manual/install.md)
