---
id: index
title: Install Camunda with Helm
sidebar_label: Install
description: Learn how to install Camunda 8 Self-Managed on Kubernetes using Helm chart.
---

Camunda 8 Self-Managed can be installed on Kubernetes using Helm charts. Choose the installation path that best matches your use case:

## Choose your installation path

| Use case                  | Installation guide                      | Secondary storage                              | Complexity | Best for                                          |
| ------------------------- | --------------------------------------- | ---------------------------------------------- | ---------- | ------------------------------------------------- |
| **Testing & evaluation**  | [Quick install](./quick-install)        | Document store (Elasticsearch/OpenSearch)      | Low        | Local development, POCs, learning                 |
| **Production with RDBMS** | [Install with RDBMS](./helm-with-rdbms) | PostgreSQL, Oracle, MariaDB, MySQL, SQL Server | Medium     | RDBMS-first organizations, no ES/OS license       |
| **High-scale production** | [Install for production](./production)  | Elasticsearch/OpenSearch or RDBMS              | High       | High-throughput, multi-team, OIDC, HA, monitoring |

:::tip Decision criteria

- **Need the fastest evaluation path?** Start with [quick install](./quick-install) to evaluate Camunda with document-store secondary storage (Elasticsearch/OpenSearch).
- **Planning to use RDBMS?** Follow [install with RDBMS](./helm-with-rdbms) for step-by-step instructions, JDBC driver management, and schema setup guidance.
- **Ready for production?** See [install for production](./production) for enterprise-grade security, authentication, multi-namespace deployments, and operational hardening. Both document-store (Elasticsearch/OpenSearch) and RDBMS backends are valid secondary storage choices, depending on your infrastructure and requirements.
  :::

## Installation guides

- **[Quick install with Helm](./quick-install)**:  
  Get up and running with default Helm chart values. Ideal for testing, evaluation, or early development.

- **[Install with RDBMS as secondary storage](./helm-with-rdbms)**:  
  Deploy Camunda 8 using an external relational database (PostgreSQL, Oracle, MariaDB, etc.) as your secondary storage backend. Includes step-by-step instructions, JDBC driver setup, and configuration examples.

- **[Install for production](./production)**:  
  Deploy Camunda 8 in a secure, production-ready Kubernetes environment with TLS, OIDC authentication, multi-namespace deployments, and enterprise monitoring. Choose either document-store (Elasticsearch/OpenSearch) or RDBMS secondary storage based on your infrastructure and requirements.
