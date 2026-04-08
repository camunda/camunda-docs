---
id: index
title: Install Camunda with Helm
sidebar_label: Install
description: Install Camunda 8 Self-Managed on Kubernetes using Helm charts for development, evaluation, or production environments.
---

Install Camunda 8 Self-Managed on Kubernetes using Helm charts. Choose the path that matches your environment and requirements.

## Choose your installation path

| Use case                  | Installation guide                      | Secondary storage                              | Complexity | Best for                                          |
| ------------------------- | --------------------------------------- | ---------------------------------------------- | ---------- | ------------------------------------------------- |
| **Testing & evaluation**  | [Quick install](./quick-install)        | Embedded H2 (single-broker only)               | Low        | Local development, POCs, learning                 |
| **Production with RDBMS** | [Install with RDBMS](./helm-with-rdbms) | PostgreSQL, Oracle, MariaDB, MySQL, SQL Server | Medium     | RDBMS-first organizations, no ES/OS license       |
| **High-scale production** | [Install for production](./production)  | Elasticsearch/OpenSearch or RDBMS              | High       | High-throughput, multi-team, OIDC, HA, monitoring |

:::tip Decision criteria

- Use **quick install** if you want to evaluate quickly without external dependencies.
- Use **install with RDBMS** if your organization standardizes on relational databases.
- Use **production install** if you need security, scalability, and operational features.
- If you don’t have required infrastructure, see [deploy required dependencies](/self-managed/deployment/helm/configure/operator-based-infrastructure.md).
  :::

## Installation guides

- **[Quick install](./quick-install)**:
  Deploy a single-broker Orchestration Cluster with embedded H2 secondary storage. Best for testing and early development.

- **[Install with RDBMS](./helm-with-rdbms)**:
  Configure Camunda to use a relational database for secondary storage, including schema setup and JDBC driver configuration.

- **[Production install](./production)**:
  Deploy a production-ready environment with TLS, OIDC authentication, multi-namespace support, and monitoring. Supports both Elasticsearch/OpenSearch and RDBMS backends.

- **[Deploy required dependencies](/self-managed/deployment/helm/configure/operator-based-infrastructure.md)**:
  Deploy PostgreSQL (management components), Elasticsearch/OpenSearch (secondary storage), and Keycloak on Kubernetes using official operators when managed services are not available.
