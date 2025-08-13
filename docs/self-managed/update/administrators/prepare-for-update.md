---
id: prepare-for-admin-update
title: "Prepare and plan"
description: "Prepare and plan an update to Camunda 8.8 Self-Managed – Administrator guide."
---

A successful update to Camunda 8.8 requires careful preparation. This guide helps you evaluate your infrastructure, understand operational changes, and choose the best update strategy for your environment.

## Step 1 – Identify your update path

:::tip Chart version mapping
Camunda 8.8 corresponds to Helm chart **13.x**. Plan to upgrade directly to the **latest patch** of 13.x (for example, 13.0.1 instead of 13.0.0).
:::

- **Check your current version.** Direct updates are only supported from 8.7.x to 8.8.x. Upgrade to the latest 8.7 patch **before** moving to 8.8.
- **Update all orchestration components together.** Zeebe, Operate, Tasklist, and Identity must run the same version.
- **Review customizations.** Identify non-default Helm values, Ingress rules, external Elasticsearch/OpenSearch configurations, and custom exporters.

:::info Links

- [Supported environments](../../../reference/supported-environments.md#component-version-matrix)
- [8.8 release notes](../../../reference/announcements-release-notes/880/880-release-notes.md)
- [Helm chart 8.7 → 8.8 technical details](../../installation-methods/helm/upgrade/helm-870-880.md)

:::

## Step 2 – Assess Camunda platform changes

Review the key platform-level changes introduced in Camunda 8.8 compared to 8.7. Understanding these highlights will help you plan your update and anticipate operational impacts.

### Architectural highlights

| Change                                                                  | Impact                                         |
| ----------------------------------------------------------------------- | ---------------------------------------------- |
| **Single orchestration container** (Zeebe, Operate, Tasklist, Identity) | Fewer pods, simplified scaling, unified config |
| **Streamlined Helm chart**                                              | Fewer templates, new values file structure     |
| **Unified configuration**                                               | Shared YAML schema across components           |

### Authentication and authorization

- **Cluster-level permissions** replace component-specific roles.
- **LDAP authentication** has been removed for Operate and Tasklist.
- Use **Identity with OIDC** (Keycloak 25/26 or a corporate IdP).
- A migration tool copies entities from the management Identity to the orchestration Identity.

### Component-specific notes

**Optimize**

- Requires downtime during startup data migration.
- Plan a maintenance window.

**Identity (Keycloak)**

- If managing Keycloak internally, verify required database schema updates.
- Confirm supported Keycloak versions in the [environment matrix](../../../reference/supported-environments.md).

**Migration jobs**  
Camunda 8.8 automatically runs two Helm jobs: `identity-migration` and `process-application-migration`.  
Monitor their logs and wait until they report **Completed** before scaling down old pods.  
[More info](../../installation-methods/helm/upgrade/helm-870-880.md)

## Step 3 – Check infrastructure compatibility

| Area                       | 8.8 requirement                              | Action                                          |
| -------------------------- | -------------------------------------------- | ----------------------------------------------- |
| Elasticsearch / OpenSearch | Elasticsearch ≥ 8.16 (OpenSearch TBD)        | Upgrade the cluster to the new version          |
| CPU / Memory               | Consolidated Zeebe StatefulSet shares limits | Measure current usage; test with load generator |
| Storage                    | Same or higher IOPS as 8.7                   | Check space for temporary migration files       |

:::warning Plan a performance test
Because component consolidation will change resource consumption, run a load test that simulates real production traffic. This ensures your cluster sizing is appropriate **before** you update the production environment.
:::

## Step 4 – Create an update timeline

| Phase                  | Typical duration | Downtime                       |
| ---------------------- | ---------------- | ------------------------------ |
| Pre-update preparation | 1–2 weeks        | No                             |
| Cluster update         | 1–4 hours        | Depends on data migration size |
| Validation and tuning  | 1–2 days         | No                             |

Document backup and rollback procedures for each phase.

## Next steps

1. Review the plan with operations, security, and development teams.
2. Schedule the maintenance window and notify all stakeholders.
3. Continue with the [Run the update](./run-update.md) guide.

For more background, see the [update guide introduction](/self-managed/components/components-upgrade/introduction.md) and version-specific documentation.
