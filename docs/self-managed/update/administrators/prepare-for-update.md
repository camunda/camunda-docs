---
id: prepare-for-admin-upgrade
title: "Prepare for upgrade"
description: "Prepare for an upgrade to Camunda 8.8 Self-Managed – Administrator guide."
---

Learn how to prepare for a successful upgrade to Camunda 8.8 by evaluating your infrastructure, understanding operational changes, and choosing the best upgrade strategy for your environment.

## Step 1: Evaluate your current setup

First, you should evaluate your current setup:

| Area                         | Details                                                                                                                                                   |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Platform version             | Direct upgrades are only supported from 8.7.x to 8.8.x. You must upgrade to the latest 8.7 patch before upgrading to 8.8.                                 |
| Component version alignment  | Orchestration components such as Zeebe, Operate, Tasklist, and Identity must run the same version.                                                        |
| Configuration customizations | Identify non-default parameters and values in configuration files, ingress rules, external Elasticsearch/OpenSearch configurations, and custom exporters. |

## Step 2: Assess Camunda 8.8 changes and impact

Review and make sure you understand the platform-level changes between Camunda 8.7 and 8.8. Understanding these highlights helps you plan your upgrade and anticipate operational impacts.

:::tip
Start with the high-level overview [what's new in Camunda 8.8](/reference/announcements-release-notes/880/whats-new-in-88.md).
:::

<table className="table-callout">
<tr>
    <td style={{minWidth: "152px"}}>**Area**</td>
    <td style={{minWidth: "152px"}}>**What's changed**</td>
    <td style={{width: "160px"}}>**Impact**</td>
    <td style={{minWidth: "40%"}}>**Description**</td>
</tr>
<tr>
    <td>Orchestration Cluster</td>
    <td>Zeebe, Operate, Tasklist, and Identity are consolidated into a single Orchestration cluster.</td>
    <td><span className="label-highlight">Low</span></td>
    <td>Unified scaling, fewer components to operate, and a different resource profile for the orchestration runtime.</td>
</tr>
<tr>
    <td>Orchestration Cluster API</td>
    <td>A new unified REST API for an Orchestration cluster.</td>
    <td><span className="label-highlight orange">Medium</span></td>
    <td>Operate and Tasklist (V1) APIs are deprecated and should be replaced by the Orchestration Cluster API.</td>
</tr>
<tr>
    <td>Data and exporters</td>
    <td>Unified exporter architecture and unified data schema.</td>
    <td><span className="label-highlight orange">Medium</span></td>
    <td><p><ul><li>Requires temporary rebalancing of indices/storage.</li><li><p>Dedicated data retention configurations per application (Zeebe, Tasklist, Operate) are no longer supported.</p></li><li><p>If Taskist data is present, an additional data migration is required - process application migration utilities are offered for this.</p></li></ul></p></td>
</tr>
<tr>
    <td>Unified components configuration</td>
    <td>A new unified configuration with a shared YAML schema across Orchestration cluster components.</td>
    <td><span className="label-highlight red">Breaking changes</span></td>
    <td>Replacement of deprecated configuration properties to their successors.
    Specific properties have breaking changes that require adaptation.</td>
</tr>
<tr>
    <td>Optimize</td>
    <td>Performs a startup data migration.</td>
    <td><span className="label-highlight">Low</span></td>
    <td>Requires downtime during startup data migration. You need to plan a maintenance window.</td>
</tr>
<tr>
    <td>Identity, authentication, and authorization</td>
    <td>Orchestration Cluster provides Identity and Access Management (IAM) inside a cluster.</td>
    <td colspan="2">See [Identity, authentication, and authorization](#identity-authentication-and-authorization) below.</td>
</tr>
</table>

### Identity, authentication, and authorization

Orchestration Cluster [Identity](/components/identity/identity-introduction.md) handles authentication and authorization for Orchestration Cluster components and resources.

The following table provides a high-level overview of the impact of these changes:

<table className="table-callout">
<tr>
    <td style={{minWidth: "30%"}}>**Area**</td>
    <td style={{width: "160px"}}>**Impact**</td>
    <td>**Description**</td>
</tr>
<tr>
    <td>Access control and permissions</td>
    <td><span className="label-highlight">Low</span></td>
    <td>The new [authorization](/components/concepts/access-control/authorizations.md) model introduces fine-grained access control for Orchestration Cluster resources, replacing the previous model. Run the Identity migration scripts during the upgrade to migrate authorizations.</td>
</tr>
<tr>
    <td>User groups, roles, tenants, and mapping rules</td>
    <td><span className="label-highlight">Low</span></td>
    <td>Now managed within Orchestration Cluster Identity, replacing the previous Management Identity setup. Run the Identity migration scripts during the upgrade to migrate entities.</td>
</tr>
<tr>
    <td>User task authorizations</td>
    <td><span className="label-highlight orange">Medium</span></td>
    <td>[User task access restrictions](/components/tasklist/user-task-access-restrictions.md) only apply to the Tasklist v1 API. After switching to the v2 API with Tasklist, user task access restrictions do not apply.</td>
</tr>
<tr>
    <td>Identity via Keycloak</td>
    <td><span className="label-highlight orange">Medium</span></td>
    <td>If managing Keycloak internally, verify required database schema updates. Confirm supported Keycloak versions in the [environment matrix](../../../reference/supported-environments.md).</td>
</tr>
<tr>
    <td>User storage in Elasticsearch/OpenSearch for Operate or Tasklist</td>
    <td><span className="label-highlight red">Breaking changes</span></td>
    <td>No longer supported. You must transition to using Basic authentication and re-create users in Orchestration Cluster Identity.</td>
</tr>
<tr>
    <td>LDAP authentication for Operate or Tasklist</td>
    <td><span className="label-highlight red">Breaking changes</span></td>
    <td>No longer supported. You must transition to OIDC or Basic Authentication.</td>
</tr>
</table>

:::info
Learn more about all Identity 8.8 changes in the [Identity section of what's new in Camunda 8.8](/reference/announcements-release-notes/880/whats-new-in-88.md#identity).
:::

## Step 3. Check infrastructure compatibility

Check and verify your infrastructure compatibility for Camunda 8.8.

| Area                     | 8.8 requirement                               | Action                                          |
| :----------------------- | :-------------------------------------------- | :---------------------------------------------- |
| Elasticsearch/OpenSearch | Elasticsearch ≥ 8.16 (OpenSearch TBD).        | Upgrade the cluster to the new version.         |
| CPU/Memory               | Consolidated Zeebe StatefulSet shares limits. | Measure current usage; test with load generator |
| Storage                  | Same or higher IOPS as 8.7.                   | Check space for temporary migration file.       |

:::warning Plan a performance test
You should run a load test that simulates real production traffic, as component consolidation changes resource consumption. This ensures your cluster sizing is appropriate **before** you upgrade your production environment.
:::

## Step 4. Create an upgrade timeline

Create and define the timeline for your upgrade, taking into account the duration of upgrade phases.

| Phase                   | Typical duration | Downtime                       |
| :---------------------- | :--------------- | :----------------------------- |
| Pre-upgrade preparation | 1–2 weeks        | No                             |
| Cluster update          | 1–4 hours        | Depends on data migration size |
| Validation and tuning   | 1–2 days         | No                             |

:::caution
Camunda advises you to document your backup and rollback procedures for each phase.
:::

## Next steps

Once you have completed your preparation plan, continue to:

1. Review your plan with your operations, security, and development teams.
2. Schedule the maintenance window and notify all stakeholders.
3. Continue with the [perform an upgrade](./run-update.md) guide.

:::tip
For more background, see the [component upgrade guide](/self-managed/components/components-upgrade/introduction.md) and version-specific documentation.
:::

:::info Useful resources

- [Supported environments](../../../reference/supported-environments.md#component-version-matrix)
- [8.8 release notes](../../../reference/announcements-release-notes/880/880-release-notes.md)
- [Helm chart 8.7 to 8.8 technical details](../../installation-methods/helm/upgrade/helm-870-880.md)
- [Component upgrade guide](../../components/components-upgrade/870-to-880.md)

:::
