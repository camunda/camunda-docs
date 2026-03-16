---
id: index
sidebar_label: Migration
title: Migrate from Bitnami subcharts
description: "Migrate your Camunda 8 Self-Managed infrastructure from Bitnami subcharts to production-grade alternatives such as Kubernetes operators or managed services."
---

import DocCardList from '@theme/DocCardList';

This section provides comprehensive guidance for migrating your Camunda 8 Self-Managed infrastructure components from [Bitnami subcharts](/self-managed/deployment/helm/chart-parameters.md#bitnami-subcharts) to production-grade alternatives.

## Why migrate?

Bitnami subcharts (PostgreSQL, Elasticsearch, Keycloak) provided with the Camunda Helm chart are convenient for development and testing. However, for production environments, Camunda [recommends](/self-managed/deployment/helm/chart-parameters.md#bitnami-subcharts) using managed services or [operator-based deployments](/self-managed/deployment/helm/configure/operator-based-infrastructure.md):

- **End of open-source Bitnami images**: Bitnami has [archived open-source container images](https://github.com/bitnami/containers/issues/83267), requiring a transition to alternatives.
- **Production readiness**: Operators and managed services offer automated failover, backup, monitoring, and security patching.
- **Vendor support**: Dedicated support channels from infrastructure vendors (Elastic, CloudNativePG, Keycloak, AWS, Azure, GCP).
- **Long-term maintainability**: Decoupling infrastructure lifecycle from the Camunda Helm chart ensures independent upgrade paths.

## What gets migrated?

The migration covers all Bitnami-managed infrastructure components deployed as part of the Camunda Helm chart:

| Source (Bitnami subchart)        | Data                                       | Migration method                          |
| -------------------------------- | ------------------------------------------ | ----------------------------------------- |
| Bitnami PostgreSQL (Identity)    | User data, authorizations                  | `pg_dump` / `pg_restore`                  |
| Bitnami PostgreSQL (Keycloak)    | Realms, users, clients                     | `pg_dump` / `pg_restore`                  |
| Bitnami PostgreSQL (Web Modeler) | Projects, diagrams                         | `pg_dump` / `pg_restore`                  |
| Bitnami Elasticsearch            | Zeebe, Operate, Tasklist, Optimize indices | Reindex from remote (`_reindex` API)      |
| Bitnami Keycloak (StatefulSet)   | Migrated via PostgreSQL data               | Keycloak Operator CR replaces StatefulSet |

:::info Camunda core components are not affected
The Camunda application components themselves (Zeebe, Operate, Tasklist, Optimize, Connectors, Identity, Web Modeler) are not migrated — they are reconfigured via a Helm upgrade to use the new infrastructure backends. Your process instances, decisions, and forms remain intact.
:::

## Migration architecture

The migration follows a five-phase approach designed to minimize downtime:

```
┌──────────────────────────────────────────────────────────────────────┐
│                        Migration Phases                              │
│                                                                      │
│  Phase 1 ✦ Deploy Targets     ─── no downtime ──────────────────── │
│    Install operators + create target clusters alongside Bitnami      │
│                                                                      │
│  Phase 2 ✦ Initial Backup     ─── no downtime ──────────────────── │
│    Backup all data while the application is still running            │
│                                                                      │
│  Phase 3 ✦ Cutover            ─── DOWNTIME (5-30 min) ──────────── │
│    Freeze → Final backup → Restore → Helm upgrade → Unfreeze        │
│                                                                      │
│  Phase 4 ✦ Validate           ─── no downtime ──────────────────── │
│    Verify all components are healthy on the new infrastructure       │
│                                                                      │
│  Phase 5 ✦ Cleanup Bitnami    ─── no downtime ──────────────────── │
│    Remove old Bitnami StatefulSets, PVCs, and migration artifacts    │
└──────────────────────────────────────────────────────────────────────┘
```

### Downtime estimation

| Data volume | Estimated downtime |
| ----------- | ------------------ |
| < 1 GB      | ~5 minutes         |
| 1–10 GB     | ~10–15 minutes     |
| 10–50 GB    | ~15–30 minutes     |
| > 50 GB     | 30+ minutes        |

The main downtime driver is the PostgreSQL restore (`pg_restore`) and Elasticsearch reindex duration.

## Choose your migration target

Depending on your infrastructure capabilities and organizational requirements, choose one of the following migration paths:

Use this quick rule of thumb before selecting a guide:

- Choose **zero-downtime migration** if your SLA does not allow a maintenance window.
- Choose **Kubernetes operators** if you want to keep infrastructure in-cluster with operator-managed lifecycle.
- Choose **managed services** if you want PostgreSQL and Elasticsearch/OpenSearch operated by your cloud provider.
- Choose **manual deployment** if you run on VMs, bare metal, or another topology outside these supported patterns.

| Target                                                                                 | Best for                                                                                                            | Guide                                                           |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Kubernetes operators** (CloudNativePG, ECK, Keycloak Operator)                       | Teams running Kubernetes who want production-grade, self-managed infrastructure with operator lifecycle management. | [Migrate to Kubernetes operators](./bitnami-to-operators.md)    |
| **Managed services** (AWS RDS, Amazon OpenSearch, Azure Database for PostgreSQL, etc.) | Teams using cloud providers who prefer fully managed infrastructure with minimal operational overhead.              | [Migrate to managed services](./bitnami-to-managed-services.md) |
| **Manual deployment** (VMs, bare-metal, Docker Compose)                                | Teams who cannot use operators or managed services, or require full control over infrastructure deployment.         | [Advanced alternatives](./alternatives.md)                      |
| **Zero-downtime migration** (logical replication, CCR)                                 | Teams with strict SLA requirements who cannot afford any maintenance window.                                        | [Zero-downtime migration](./zero-downtime.md)                   |

## Prerequisites (all paths)

Regardless of your chosen migration target, ensure the following:

- A running Camunda 8 installation using the Helm chart with **Bitnami subcharts enabled**
- `kubectl` configured and pointing to your cluster
- `helm` v3 with the `camunda/camunda-platform` repository added
- Sufficient cluster resources to temporarily run both old and new infrastructure side-by-side
- A tested backup of your current installation

:::important Plan authentication and service access up front
All migration paths require an explicit decision for authentication and connectivity:

- If you keep **Keycloak**, plan for a Keycloak Operator deployment and configure the hostname with the full external URL, for example `https://your-domain.example.com/auth`.
- If you replace Keycloak with an [external OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md), complete that design before cutover because Identity configuration changes are part of the migration.
- If your PostgreSQL or Elasticsearch/OpenSearch access depends on cloud-specific IAM authentication such as AWS IRSA, the provided migration jobs are not sufficient and you need a custom migration workflow.
  :::

:::caution Test in staging first
Always perform a full migration dry run on a non-production environment before migrating production. The migration scripts support a `--dry-run` flag to preview actions without making changes.
:::

## Migration guides

<DocCardList />
