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
| **Testing & evaluation**  | [Quick developer install](./quick-install)        | Embedded H2 (single-broker only)               | Low        | Local development, POCs, learning                 |
| **Production with RDBMS** | [Install with RDBMS](./helm-with-rdbms) | PostgreSQL, Oracle, MariaDB, MySQL, SQL Server | Medium     | RDBMS-first organizations, no ES/OS license       |
| **High-scale production** | [Install for production](./production)  | Elasticsearch/OpenSearch or RDBMS              | High       | High-throughput, multi-team, OIDC, HA, monitoring |

:::tip Decision criteria

- **Don't have a database yet?** Start with [developer quick install](./quick-install) to evaluate Camunda quickly with embedded H2 in a single-broker setup.
- **Need to deploy databases and OIDC provider on Kubernetes?** See [deploy required dependencies](/self-managed/deployment/helm/configure/operator-based-infrastructure.md) to set up PostgreSQL, Elasticsearch, and Keycloak using official Kubernetes operators.
- **Planning to use RDBMS?** Follow [install with RDBMS](./helm-with-rdbms).
- **Ready for production?** See [production install](./production) for enterprise-grade security, authentication, multi-namespace deployments, and operational hardening. Both document-store (Elasticsearch/OpenSearch) and RDBMS backends are valid secondary storage choices, depending on your infrastructure and requirements.
 
 :::

## Installation guides

- **[Quick developer install with Helm](./quick-install)**:  
  Get up and running with default Helm chart values. Ideal for testing, evaluation, or early development.

- **[Production install](./production)**:  
  Deploy Camunda 8 in a secure, production-ready Kubernetes environment with TLS, OIDC authentication, multi-namespace deployments, and enterprise monitoring. You can choose Elasticsearch/OpenSearch or RDBMS for secondary storage within this guide based on your infrastructure and requirements.

- **[Deploy required dependencies](/self-managed/deployment/helm/configure/operator-based-infrastructure.md)**:  
  If managed databases or an external OIDC provider are not available in your organization, deploy PostgreSQL, Elasticsearch, and Keycloak on Kubernetes using official operators.

## Supporting references

- **[RDBMS example deployment](./helm-with-rdbms)**:
  A focused walkthrough for teams choosing RDBMS as the secondary storage option within the production Helm installation flow.
