---
id: index
title: Install Camunda with Helm
sidebar_label: Install
description: Learn how to install Camunda 8 Self-Managed on Kubernetes using Helm chart.
---

Camunda 8 Self-Managed can be installed on Kubernetes using Helm charts. Choose the installation path that best matches your use case:

## Choose your installation path

- **Testing and evaluation**: [Quick developer install](./quick-install)
  Secondary storage: Document-store (ES/OS)
  Complexity: Low
  Best for: Local development, POCs, learning

- **Production**: [Production install](./production)
  Secondary storage: Elasticsearch/OpenSearch or RDBMS
  Complexity: High
  Best for: Production deployments, OIDC, HA, monitoring, and choosing your database option within one install flow

:::tip Decision criteria

- **Don't have a database yet?** Start with [quick developer install](./quick-install) to evaluate Camunda with Elasticsearch/OpenSearch.
- **Need to deploy databases and OIDC provider on Kubernetes?** See [deploy required dependencies](/self-managed/deployment/helm/configure/operator-based-infrastructure.md) to set up PostgreSQL, Elasticsearch, and Keycloak using official Kubernetes operators.
- **Planning to use RDBMS?** Follow [production install](./production) and choose the RDBMS option in the database section. Use [configure RDBMS](/self-managed/deployment/helm/configure/database/rdbms.md) as the canonical configuration reference, and [RDBMS example deployment](./helm-with-rdbms) if you want a focused walkthrough.
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
