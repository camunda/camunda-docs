---
id: index
title: Install Camunda with Helm
sidebar_label: Install
description: Learn how to install Camunda 8 Self-Managed on Kubernetes using Helm chart.
---

Camunda 8 Self-Managed can be installed on Kubernetes using Helm charts. Choose the installation path that best matches your use case:

## Choose your installation path

| Use case                  | Installation guide                      | Secondary storage                              | Complexity | Best for                                     |
| ------------------------- | --------------------------------------- | ---------------------------------------------- | ---------- | -------------------------------------------- |
| **Testing & evaluation**  | [Quick install](./quick-install)        | Elasticsearch/OpenSearch                       | Low        | Local development, POCs, learning            |
| **Production with RDBMS** | [Install with RDBMS](./helm-with-rdbms) | PostgreSQL, Oracle, MariaDB, MySQL, SQL Server | Medium     | RDBMS-first organizations, no ES/OS license  |
| **Enterprise production** | [Install for production](./production)  | Elasticsearch/OpenSearch                       | High       | Multi-team deployments, OIDC, HA, monitoring |

:::tip Decision criteria

- **Don't have a database yet?** Start with [quick install](./quick-install) to evaluate Camunda.
- **Must use RDBMS instead of Elasticsearch/OpenSearch?** Follow [install with RDBMS](./helm-with-rdbms). This includes JDBC driver management and schema setup guidance.
- **Need enterprise-grade security, auth, and multi-namespace setup?** Use [install for production](./production) with Elasticsearch/OpenSearch as the secondary datastore.
  - Note: [RDBMS can also be used in production](./helm-with-rdbms) as an alternative to Elasticsearch/OpenSearch.
    :::

## Installation guides

- **[Quick install with Helm](./quick-install)**:  
  Get up and running with default Helm chart values. Ideal for testing, evaluation, or early development with Elasticsearch/OpenSearch.

- **[Install with RDBMS as secondary storage](./helm-with-rdbms)**:  
  Deploy Camunda 8 using an external relational database (PostgreSQL, Oracle, MariaDB, etc.) instead of Elasticsearch or OpenSearch. Includes step-by-step instructions, JDBC driver setup, and configuration examples.

- **[Install for production](./production)**:  
  Deploy Camunda 8 in a secure, production-ready Kubernetes environment with TLS, OIDC authentication, multi-namespace deployments, and enterprise monitoring. Uses Elasticsearch/OpenSearch for the secondary datastore by default (RDBMS can be used as an alternative).
