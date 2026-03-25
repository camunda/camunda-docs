---
id: index
sidebar_label: Migration
title: Migrate from Bitnami subcharts
description: "Migrate your Camunda 8 Self-Managed infrastructure from Bitnami subcharts to production-grade alternatives such as Kubernetes operators or managed services."
---

import DocCardList from '@theme/DocCardList';
import CommonPrerequisites from './\_partials/\_common-prerequisites.md'

This section provides guidance for migrating your Camunda 8 Self-Managed infrastructure components from [Bitnami subcharts](/self-managed/deployment/helm/chart-parameters.md#bitnami-subcharts) to production-grade alternatives.

:::note Target audience
This guide is for customers running Camunda 8 with Bitnami subcharts enabled. If your installation already uses external databases, managed services, or operator-managed infrastructure, you do not need to follow this migration.
:::

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
| Bitnami Keycloak (StatefulSet)   | Realms, users, and clients (via PostgreSQL)    | Keycloak Operator CR replaces StatefulSet |

:::info Camunda core components are not affected
The Camunda application components themselves (Zeebe, Operate, Tasklist, Optimize, Connectors, Identity, and Web Modeler) are not migrated; they're reconfigured via a Helm upgrade to use the new infrastructure backends. Your process instances, decisions, and forms remain intact.
:::

## Migration phases

The migration follows a five-phase approach designed to minimize downtime:

| Phase              | Downtime                                       | Outcome                                                                              |
| ------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1. Deploy targets  | No planned downtime                            | Install operators and create the target infrastructure alongside Bitnami.            |
| 2. Initial backup  | No planned downtime                            | Back up data while the application is still running.                                 |
| 3. Cutover         | **Maintenance window**<br />Typically 5–30 min | Freeze traffic, take a final backup, restore data, run the Helm upgrade, and resume. |
| 4. Validate        | No planned downtime                            | Verify that all components are healthy on the new infrastructure.                    |
| 5. Cleanup Bitnami | No planned downtime                            | Remove old Bitnami StatefulSets, PVCs, and migration artifacts.                      |

### Downtime estimation

| Elasticsearch data volume | Typical downtime |
| ------------------------- | ---------------- |
| < 1 GB                    | ~5 min           |
| 1–10 GB                   | ~10–15 min       |
| 10–50 GB                  | ~15–30 min       |
| > 50 GB                   | 30+ min          |

The main downtime driver is the PostgreSQL restore (`pg_restore`) and Elasticsearch reindex duration.

## Precautions (all paths) {#precautions}

Regardless of the migration path you choose, review the following precautions **before starting** the migration.

<details>
<summary>General precautions</summary>

- **Test in staging first:** Run the full migration in a non-production environment before migrating production.
- **Schedule a maintenance window:** All migration paths (except zero-downtime) require a downtime window during cutover.
- **Check cluster capacity:** During the migration, both old and new infrastructure run simultaneously, requiring additional CPU, memory, and storage.
- **Backup your Helm values:** Consider a manual backup before starting: `helm get values camunda -n camunda > backup-values.yaml`.
- **DNS TTL:** If using a domain for Keycloak, ensure DNS TTL is low before cutover to minimize propagation delay.
- **Keycloak OIDC impact:** Keycloak is the OIDC provider for all Camunda components (and possibly external applications). Migrating Keycloak changes the underlying service. If you use a DNS CNAME for Keycloak, plan to update the DNS target to the new Keycloak service after cutover. If external applications share the same Keycloak realm, coordinate the DNS switch with their teams.
- **Session impact:** The database migration preserves all persistent data (realms, users, clients, signing keys, and refresh tokens). Since Keycloak 25+, user sessions are persisted in the database and survive the switch. In-flight authentication flows (login pages in progress) and pending action tokens (password reset links) are lost; users simply need to retry. This is inherent to the downtime window and has no lasting effect.

</details>

## Choose your migration target

Depending on your infrastructure capabilities and organizational requirements, choose one of the following migration paths:

| Scenario                                                                                                 | Recommended path                                                                   | Guide                                                           |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| You want production-grade, self-managed infrastructure in Kubernetes with operator lifecycle management. | **Kubernetes operators** (CloudNativePG, ECK, Keycloak Operator)                   | [Migrate to Kubernetes operators](./bitnami-to-operators.md)    |
| You prefer fully managed infrastructure from your cloud provider with minimal operational overhead.      | **Managed services** (AWS RDS, Elastic Cloud, Azure Database for PostgreSQL, etc.) | [Migrate to managed services](./bitnami-to-managed-services.md) |
| You cannot use operators or managed services, or require full control (VMs, bare-metal, Docker Compose). | **Manual deployment**                                                              | [Advanced alternatives](./alternatives.md)                      |
| Your SLA does not allow any maintenance window.                                                          | **Zero-downtime migration** (logical replication, CCR)                             | [Zero-downtime migration](./zero-downtime.md)                   |

## Prerequisites (all paths)

Regardless of your chosen migration target, ensure the following:

<CommonPrerequisites />

:::important Plan authentication and service access up front
All migration paths require an explicit decision for authentication and connectivity:

- If you keep **Keycloak**, plan for a Keycloak Operator deployment, and configure the hostname with the full external URL, for example `https://your-domain.example.com/auth`.
- If you replace Keycloak with an [external OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md), complete that design before cutting over because Identity configuration changes are part of the migration.
- If your PostgreSQL or Elasticsearch access depends on cloud-specific IAM authentication such as AWS IRSA, the provided migration jobs are not sufficient, and you need a custom migration workflow.
  :::

## Migration guides

<DocCardList />

## Advanced usage

### Migration hooks {#migration-hooks}

The migration scripts support **hooks** — custom shell scripts that run before or after each migration phase. Place executable scripts in the `hooks/` directory of the migration repository:

| Hook               | Trigger                                 |
| ------------------ | --------------------------------------- |
| `pre-phase-1.sh`   | Before deploying target infrastructure  |
| `post-phase-1.sh`  | After target infrastructure is deployed |
| `pre-phase-2.sh`   | Before initial backup                   |
| `post-phase-2.sh`  | After initial backup                    |
| `pre-phase-3.sh`   | Before cutover (before freeze)          |
| `post-phase-3.sh`  | After cutover is complete               |
| `pre-phase-4.sh`   | Before validation                       |
| `post-phase-4.sh`  | After validation                        |
| `pre-phase-5.sh`   | Before Bitnami cleanup                  |
| `post-phase-5.sh`  | After Bitnami cleanup                   |
| `pre-rollback.sh`  | Before rollback                         |
| `post-rollback.sh` | After rollback                          |

For example, send a Slack notification before cutover:

```bash
#!/bin/bash
# hooks/pre-phase-3.sh
curl -X POST "$SLACK_WEBHOOK" \
  -H 'Content-Type: application/json' \
  -d '{"text":"⚠️ Camunda migration cutover starting — downtime expected"}'
```

:::note
Hook scripts are sourced (not forked), so they have access to all library functions and variables. A failing hook aborts the migration (due to `set -e`). Add `|| true` to make a hook best-effort.
:::

Typical hook use cases:

- Pause external consumers before Phase 3 and resume them after validation.
- Send change-management or on-call notifications at the start and end of cutover.
- Run smoke tests after Phase 3 or Phase 4, and fail the migration if a critical endpoint is unavailable.
- Update DNS or Ingress records for Keycloak after the new service becomes active.
