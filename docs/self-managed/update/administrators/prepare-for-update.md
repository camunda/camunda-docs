---
id: prepare-for-admin-update
title: "Prepare and plan an update"
description: "Prepare and plan update to Camunda 8.8 Self-Managed - Administrator guide."
---

A successful Camunda 8.8 update requires thorough planning. This guide helps you assess your infrastructure, understand operational requirements, and choose the right update strategy for your environment.

## Step 1 — Identify your update path

:::tip Chart version mapping
Camunda 8.8 corresponds to Helm chart **13.x**.  
If your current chart is **12.x**, plan to jump directly to the **latest patch** of 13.x (for example, 13.0.1 rather than 13.0.0).  [oai_citation:7‡docs.camunda.io](https://docs.camunda.io/docs/next/self-managed/installation-methods/helm/upgrade/upgrade-hc-870-880/)
:::

- **Check current version.** Direct updates are supported from 8.7.x to 8.8.x. Upgrade to the latest 8.7 patch **before** moving to 8.8.  
- **Update all orchestration components together.** Zeebe, Operate, Tasklist, and Identity must run the same version.  
- **Review customizations.** List non-default Helm values, ingress rules, external Elasticsearch/OpenSearch setups, and extra exporters.

:::info Links
- [Supported environments](../../../reference/supported-environments.md#component-version-matrix)  
- [8.8 release notes](../../../reference/announcements-release-notes/880/880-release-notes.md)  
- [Helm Chart 8.7 → 8.8 technical details](../../operational-guides/update-guide/870-to-880.md)
:::

## Step 2 - Assess Camunda platform changes

Review changes between versions 8.7 and 8.8.

### Architectural highlights

| Change | Impact |
|--------|--------|
| **Single Orchestration container** (Zeebe, Operate, Tasklist, Identity) | Fewer pods, simplified scaling, unified config |
| **Streamlined Helm chart** | Fewer templates, new values file structure |
| **Unified configuration** | One YAML schema across components |

### Authentication & authorization

- **Cluster-level permissions** replace component-specific roles.  
- **LDAP authentication removed** for Operate and Tasklist.  
- Use **Identity + OIDC** (Keycloak 25/26 or corporate IdP).  
- A migration tool copies entities from management Identity to orchestration Identity.

### Component notes

**Optimize**  
- Requires downtime during data migration at start-up.  
- Plan a maintenance window.

**Identity (Keycloak)**  
- Verify Keycloak database schema updates if you run Keycloak internally.  
- Confirm supported Keycloak versions in the environment matrix.

**Migration jobs** – 8.8 automatically runs two Helm jobs (`identity-migration`, `process-application-migration`).  
  Monitor their logs and wait until they report **Completed** before scaling down old pods.  [oai_citation:10‡docs.camunda.io](../../operational-guides/update-guide/870-to-880.md)

## Step 3 — Check infrastructure compatibility

| Area | 8.8 requirement | Action |
|------|-----------------|--------|
| Elasticsearch / OpenSearch | Elasticsearch ≥ 8.16 (OpenSearch TBD) | Upgrade cluster or create new instance |
| CPU / Memory | Consolidated Zeebe StatefulSet shares limits | Measure current usage; test with load generator |
| Storage | Same or higher IOPS as 8.7 | Check space for temporary migration files |

:::warning Plan a performance test
Resource utilization shifts when components consolidate. Run a load test that mirrors production traffic to validate sizing **before** updating production.
:::

## Step 4 — Create an update timeline

| Phase | Typical duration | Downtime |
|-------|------------------|----------|
| Pre-update prep | 1–2 weeks | No |
| Cluster update | 1–4 hours | Depends on data migration size |
| Validation & optimization | 1–2 days | No |

Document backup and rollback steps for each phase.

## Next steps

1. Review the plan with operations, security, and application teams.  
2. Schedule the maintenance window and notify stakeholders.  
3. Continue with the [Run the update](./run-update.md) guide.

For additional guidance, consult the existing [update guide introduction](/self-managed/operational-guides/update-guide/introduction.md) and version-specific update documentation.
