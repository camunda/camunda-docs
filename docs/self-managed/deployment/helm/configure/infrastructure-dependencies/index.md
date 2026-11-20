---
id: index
sidebar_label: Infrastructure dependencies
title: Infrastructure dependencies
description: Learn which infrastructure dependencies Camunda 8 Self-Managed needs, who is responsible for each one, and where to find the guidance.
---

Camunda 8 Self-Managed needs infrastructure that Camunda does not build or operate. This page lists these infrastructure dependencies and links to the support and upgrade guidance for each one.

:::caution Draft: pending product management review
<!-- TODO(PM): Review the support, patching, and image statements on this page and on each component page, then remove this notice. -->

The statements on these pages come from existing Camunda documentation and reference architectures. Product management has not yet approved them. Statements about service-level agreements (SLAs), image patching, and vulnerability handling are open.
:::

## Understand the support scope

PostgreSQL, Elasticsearch, OpenSearch, and Keycloak are external dependencies. They are not Camunda products, regardless of how you deploy them. Camunda supports the integration and configuration of these components with the Camunda Helm chart. Camunda does not provide operational support for the components themselves. For details, see [deploy required dependencies with Kubernetes operators](/self-managed/deployment/helm/configure/operator-based-infrastructure.md).

As of Camunda 8.10 (Helm chart `15.x`), the Helm chart no longer bundles Bitnami subcharts for these components. You provide each component through a managed service or a Kubernetes operator.

The policy is different for each component. Use the component page for the policy that applies to you.

## Find the guidance for each component

| Component     | Used by                                                                 | Deployment options in the reference architectures | Guidance                                                                                                                                                    |
| ------------- | ----------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PostgreSQL    | Management Identity, Camunda Hub, Keycloak, and RDBMS secondary storage | CloudNativePG operator, Amazon Aurora PostgreSQL  | [PostgreSQL support and upgrades](/self-managed/deployment/helm/configure/infrastructure-dependencies/postgresql-support-and-upgrades.md)                   |
| Elasticsearch | Orchestration Cluster secondary storage, Optimize                       | Elastic Cloud on Kubernetes (ECK) operator        | [Elasticsearch support and upgrades](/self-managed/deployment/helm/configure/infrastructure-dependencies/elasticsearch-support-and-upgrades.md)             |
| OpenSearch    | Orchestration Cluster secondary storage, Optimize                       | Amazon OpenSearch Service                         | [OpenSearch support and upgrades](/self-managed/deployment/helm/configure/infrastructure-dependencies/opensearch-support-and-upgrades.md)                   |
| Keycloak      | Management Identity                                                     | Keycloak Operator                                 | [Keycloak support, security fixes, and upgrades](/self-managed/deployment/helm/configure/authentication-and-authorization/keycloak-support-and-upgrades.md) |

For the versions that Camunda supports, see [supported environments](/reference/supported-environments.md).
