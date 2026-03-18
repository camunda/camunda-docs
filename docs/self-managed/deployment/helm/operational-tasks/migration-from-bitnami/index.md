---
id: index
sidebar_label: Migration
title: Migrate from Bitnami subcharts
description: "Migrate your Camunda 8 Self-Managed infrastructure from Bitnami subcharts to production-grade alternatives such as Kubernetes operators or managed services."
---

import DocCardList from '@theme/DocCardList';

This section provides guidance for migrating your Camunda 8 Self-Managed infrastructure components from [Bitnami subcharts](/self-managed/deployment/helm/chart-parameters.md#bitnami-subcharts) to production-grade alternatives.

## Why migrate?

Bitnami subcharts (PostgreSQL, Elasticsearch, Keycloak) provided with the Camunda Helm chart are convenient for development and testing. However, for production environments, Camunda [recommends](/self-managed/deployment/helm/chart-parameters.md#bitnami-subcharts) using managed services or [operator-based deployments](/self-managed/deployment/helm/configure/operator-based-infrastructure.md):

- **End of open-source Bitnami images**: Bitnami has [archived open-source container images](https://github.com/bitnami/containers/issues/83267), requiring a transition to alternatives.
- **Production readiness**: Operators and managed services offer automated failover, backup, monitoring, and security patching.
- **Vendor support**: Operators and managed services offer dedicated support channels from infrastructure vendors (Elastic, CloudNativePG, Keycloak, AWS, Azure, GCP).
- **Long-term maintainability**: Decoupling infrastructure lifecycle from the Camunda Helm chart ensures independent upgrade paths.

## What gets migrated?

The migration covers all Bitnami-managed infrastructure components deployed as part of the Camunda Helm chart:

| Source (Bitnami subchart)        | Data                                           | Migration method                          |
| -------------------------------- | ---------------------------------------------- | ----------------------------------------- |
| Bitnami PostgreSQL (Identity)    | User data and authorizations                   | `pg_dump` / `pg_restore`                  |
| Bitnami PostgreSQL (Keycloak)    | Realms, users, and clients                     | `pg_dump` / `pg_restore`                  |
| Bitnami PostgreSQL (Web Modeler) | Projects and diagrams                          | `pg_dump` / `pg_restore`                  |
| Bitnami Elasticsearch            | Zeebe, Operate, Tasklist, and Optimize indices | Reindex from remote (`_reindex` API)      |
| Bitnami Keycloak (StatefulSet)   | Migrated via PostgreSQL data                   | Keycloak Operator CR replaces StatefulSet |

:::info Camunda core components are not affected
The Camunda application components themselves (Zeebe, Operate, Tasklist, Optimize, Connectors, Identity, and Web Modeler) are not migrated; they're reconfigured via a Helm upgrade to use the new infrastructure backends. Your process instances, decisions, and forms remain intact.
:::

## Migration rationale

The migration follows a five-phase approach designed to minimize downtime:

| Step  | Phase           | Downtime                                       | Outcome                                                                              |
| ----- | --------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| **1** | Deploy targets  | No planned downtime                            | Install operators and create the target infrastructure alongside Bitnami.            |
| **2** | Initial backup  | No planned downtime                            | Back up data while the application is still running.                                 |
| **3** | Cutover         | **Maintenance window**<br />Typically 5–30 min | Freeze traffic, take a final backup, restore data, run the Helm upgrade, and resume. |
| **4** | Validate        | No planned downtime                            | Verify that all components are healthy on the new infrastructure.                    |
| **5** | Cleanup Bitnami | No planned downtime                            | Remove old Bitnami StatefulSets, PVCs, and migration artifacts.                      |

### Downtime estimation

| Elasticsearch data volume | Typical downtime |
| ------------------------- | ---------------- |
| < 1 GB                    | ~5 min           |
| 1–10 GB                   | ~10–15 min       |
| 10–50 GB                  | ~15–30 min       |
| > 50 GB                   | 30+ min          |

The main downtime driver is the PostgreSQL restore (`pg_restore`) and Elasticsearch reindex duration.

## Choose your migration target

Depending on your infrastructure capabilities and organizational requirements, choose one of the following migration paths:

Use this quick rule of thumb before selecting a guide:

- If your SLA does not allow a maintenance window, choose **zero-downtime migration**.
- If you want to keep infrastructure in-cluster with operator-managed lifecycle, choose **Kubernetes operators**.
- If you want PostgreSQL and Elasticsearch operated by your cloud provider, choose **managed services**.
- f you run on VMs, bare metal, or another topology outside these supported patterns, choose **manual deployment**.

| Best for                                                                                                            | Recommended path                                                                   | Guide                                                           |
| ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Teams running Kubernetes who want production-grade, self-managed infrastructure with operator lifecycle management. | **Kubernetes operators** (CloudNativePG, ECK, Keycloak Operator)                   | [Migrate to Kubernetes operators](./bitnami-to-operators.md)    |
| Teams using cloud providers who prefer fully managed infrastructure with minimal operational overhead.              | **Managed services** (AWS RDS, Elastic Cloud, Azure Database for PostgreSQL, etc.) | [Migrate to managed services](./bitnami-to-managed-services.md) |
| Teams who cannot use operators or managed services, or require full control over infrastructure deployment.         | **Manual deployment** (VMs, bare-metal, Docker Compose)                            | [Advanced alternatives](./alternatives.md)                      |
| Teams with strict SLA requirements who cannot afford any maintenance window.                                        | **Zero-downtime migration** (logical replication, CCR)                             | [Zero-downtime migration](./zero-downtime.md)                   |

## Prerequisites (all paths)

Regardless of your chosen migration target, ensure the following:

- A running Camunda 8 installation using the Helm chart with **Bitnami subcharts enabled**
- `kubectl` configured and pointing to your cluster
- `helm` v3 with the `camunda/camunda-platform` repository added
- Sufficient cluster resources to temporarily run both old and new infrastructure side-by-side
- A tested backup of your current installation

:::important Plan authentication and service access up front
All migration paths require an explicit decision for authentication and connectivity:

- If you keep **Keycloak**, plan for a Keycloak Operator deployment, and configure the hostname with the full external URL, for example `https://your-domain.example.com/auth`.
- If you replace Keycloak with an [external OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md), complete that design before cutting over because Identity configuration changes are part of the migration.
- If your PostgreSQL or Elasticsearch access depends on cloud-specific IAM authentication such as AWS IRSA, the provided migration jobs are not sufficient, and you need a custom migration workflow.
  :::

:::warning Test in staging first
Always perform a full migration dry run on a non-production environment before migrating production. The migration scripts support a `--dry-run` flag to preview actions without making changes.
:::

## Migration guides

<DocCardList />
