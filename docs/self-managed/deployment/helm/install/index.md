---
id: index
title: Install Camunda with Helm
sidebar_label: Install
description: Install Camunda 8 Self-Managed on Kubernetes using Helm charts for development, evaluation, or production environments.
---

Install Camunda 8 Self-Managed on Kubernetes using Helm charts. Two decisions shape the installation: the topology you deploy, and the secondary storage backend you use.

## Choose your topology

A Camunda 8.10 deployment is one or more Helm releases, and each release declares its role with `global.topology.mode`. For the release roles and the reasoning behind them, see [Camunda 8.10 deployment topology](/self-managed/reference-architecture/deployment-topology.md).

| Use case                                        | Topology                                                   | Installation guide                                                              |
| ----------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Testing, evaluation, local development          | One `combined` release                                     | [Quick install](./quick-install.md)                                             |
| New production deployment, one cluster          | One `hub` release, one `orchestration` release             | [Install the deployment topology](./topology/index.md)                          |
| New production deployment, tenants or analytics | The same, plus one `optimize` release per Physical Tenant  | [Configure Physical Tenants across releases](./topology/physical-tenants.md)    |
| Several Orchestration Clusters, one Hub         | One `hub` release, one `orchestration` release per cluster | [Install an Orchestration Cluster release](./topology/orchestration-release.md) |
| Existing single-release production deployment   | One `combined` release                                     | [Install for production](./production/index.md)                                 |

For a new production deployment, the split topology is the baseline. A `combined` release remains supported, remains the chart default, and is the right choice for evaluation, proofs of concept, and 8.9 compatibility.

## Choose your secondary storage

This decision is independent of your topology. Both apply to every release that runs an Orchestration Cluster.

| Backend                     | Guide                                                                                                                          | Best for                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| Elasticsearch or OpenSearch | [Using external Elasticsearch](/self-managed/deployment/helm/configure/database/elasticsearch/using-external-elasticsearch.md) | High throughput, and any deployment that uses Optimize |
| Relational database         | [Install with RDBMS](./helm-with-rdbms.md)                                                                                     | Organizations that standardize on relational databases |
| Embedded H2                 | [Quick install](./quick-install.md)                                                                                            | Evaluation only. Single broker, not for production     |

:::warning
Optimize requires Elasticsearch or OpenSearch and can't read from a relational database. An Orchestration Cluster on RDBMS secondary storage can't be analyzed with Optimize.
:::

For the trade-offs between backends, see [secondary storage architecture](/self-managed/reference-architecture/reference-architecture.md#secondary-storage-architecture).

## Before you install

Camunda 8.10 bundles no Elasticsearch, PostgreSQL, or Keycloak subcharts, and requires the Helm v4 CLI.

- Provision your databases, secondary storage, and identity provider first. See [deploy required dependencies](/self-managed/deployment/helm/configure/operator-based-infrastructure.md).
- Switch to the Helm v4 CLI. See [move from the Helm v3 CLI to v4](/self-managed/deployment/helm/operational-tasks/moving-helm-v3-to-v4.md).
- Decide which settings belong in `values.yaml` and which belong in a component's `extraConfiguration`. See [Helm and application configuration responsibilities](/self-managed/deployment/helm/configure/configuration-responsibilities.md).

## Upgrading instead of installing

To move an existing deployment to 8.10, see [upgrade Camunda 8.9 to 8.10 using Helm](/self-managed/upgrade/helm/890-to-8100.md). Upgrade in place first; adopting the split topology is a separate step, covered in [move from a combined release to the split topology](/self-managed/upgrade/helm/combined-to-split-topology.md).
