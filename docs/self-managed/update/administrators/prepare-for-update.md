---
id: prepare-for-admin-upgrade
title: "Prepare for upgrade"
description: "Prepare for an upgrade to Camunda 8.8 Self-Managed – Administrator guide."
---

This guide is a starting point to get high level overview of preparation for an upgrade to Camunda 8.8: assess your infrastructure, review operational changes, and choose an upgrade strategy appropriate for your environment.

## Step 1: Evaluate your current setup

| Area                         | Details                                                                                                                                                   |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda version              | Direct upgrades are only supported from 8.7.x to 8.8.x. You must upgrade to the latest 8.7 patch before upgrading to 8.8.                                 |
| Component version alignment  | Orchestration components such as Zeebe, Operate, Tasklist, and Identity must run the same version.                                                        |
| Configuration customizations | Identify non-default parameters and values in configuration files, ingress rules, external Elasticsearch/OpenSearch configurations, and custom exporters. |

## Step 2: Assess Camunda 8.8 changes and impact

Review and make sure you understand the platform-level changes between Camunda 8.7 and 8.8. Understanding these highlights helps you plan your upgrade and anticipate operational impacts.

:::tip
Start with the high-level overview [what's new in Camunda 8.8](/components/whats-new-in-88.md).
:::

<table className="table-callout">
<tr>
    <td style={{minWidth: "152px"}}>**Area**</td>
    <td style={{minWidth: "152px"}}>**What's changed**</td>
    <td style={{width: "160px"}}>**Impact**</td>
</tr>
<tr>
    <td>Orchestration Cluster</td>
    <td>Zeebe, Operate, Tasklist, and Identity are consolidated into a single Orchestration cluster.</td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>Orchestration Cluster API</td>
    <td><p>Introduced a new unified REST API for an Orchestration cluster.</p><p><ul><li>Operate and Tasklist (V1) APIs are deprecated and should be replaced by the Orchestration Cluster API.</li><li><p>For more information, see the blog post [upcoming API Changes in Camunda 8](https://camunda.com/blog/2024/12/api-changes-in-camunda-8-a-unified-and-streamlined-experience/).</p></li></ul></p></td>
    <td><span className="label-highlight yellow">Medium</span></td>
</tr>
<tr>
    <td>Data and exporters</td>
    <td><p>Introduced unified exporter architecture and unified data schema.</p><p><ul><li>Requires temporary rebalancing of indices/storage.</li><li><p>Dedicated data retention configurations per application (Zeebe, Tasklist, Operate) are no longer supported.</p></li><li><p>If Tasklist data is present, an additional data migration is required - process application migration utilities are offered for this.</p></li></ul></p></td>
    <td><span className="label-highlight yellow">Medium</span></td>
</tr>
<tr>
    <td>Unified components configuration</td>
    <td>Introduced a new unified configuration with a shared YAML schema across Orchestration cluster components.</td>
    <td><span className="label-highlight red">Breaking changes</span></td>    
</tr>
<tr>
    <td>Optimize</td>
    <td>Performs a startup data migration that requires downtime during startup data migration. You need to plan a maintenance window.</td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>Identity, authentication, and authorization</td>
    <td colspan="2">Orchestration Cluster provides Identity and Access Management (IAM) inside a cluster. See [Identity, authentication, and authorization](#identity-authentication-and-authorization) below.</td>    
</tr>
</table>

### Identity, authentication, and authorization

Orchestration Cluster [Identity](/components/identity/identity-introduction.md) handles authentication and authorization for Orchestration Cluster components and resources.

The following table provides a high-level overview of the impact of these changes:

<table className="table-callout">
<tr>
    <td style={{minWidth: "30%"}}>**Area**</td>
    <td>**Description**</td>
    <td style={{width: "160px"}}>**Impact**</td>
</tr>
<tr>
    <td>Access control and permissions</td>
    <td>The new [authorization](/components/concepts/access-control/authorizations.md) model introduces fine-grained access control for Orchestration Cluster resources, replacing the previous model. Run the Identity migration scripts during the upgrade to migrate authorizations.</td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>User groups, roles, tenants, and mapping rules</td>
    <td>Now managed within [Orchestration Cluster Identity](/components/identity/identity-introduction.md), replacing the previous Management Identity setup. Run the Identity migration scripts during the upgrade to migrate entities.</td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>User task authorizations</td>
    <td><span className="label-highlight orange">Medium</span></td>
    <td>Tasklist v1 API support [User task access restrictions](/components/tasklist/user-task-access-restrictions.md). After switching to the Tasklist v2 API, user task access restrictions do not apply.</td>
</tr>
<tr>
    <td>Identity via Keycloak</td>
    <td><span className="label-highlight red">High</span></td>
    <td>If managing Keycloak internally, verify required database schema updates. Confirm supported Keycloak versions in the [environment matrix](../../../reference/supported-environments.md).</td>
    <td><span className="label-highlight yellow">Medium</span></td>
</tr>
<tr>
    <td>User storage in Elasticsearch/OpenSearch for Operate or Tasklist</td>
    <td>No longer supported. You must transition to using Basic authentication and re-create users in Orchestration Cluster Identity.</td>
    <td><span className="label-highlight red">Breaking changes</span></td>
</tr>
<tr>
    <td>LDAP authentication for Operate or Tasklist</td>
    <td>No longer supported. You must transition to OIDC or Basic Authentication.</td>
    <td><span className="label-highlight red">Breaking changes</span></td>
</tr>
</table>

:::info
Learn more about all Identity 8.8 changes in the [Identity section of what's new in Camunda 8.8](/components/whats-new-in-88.md#identity).
:::

## Step 3. Check infrastructure compatibility

Check and verify your infrastructure compatibility for Camunda 8.8.

| Area                     | 8.8 requirement                               | Action                                          |
| :----------------------- | :-------------------------------------------- | :---------------------------------------------- |
| Elasticsearch/OpenSearch | Elasticsearch ≥ 8.16 (OpenSearch TBD).        | Upgrade the cluster to the new version.         |
| CPU/Memory               | Consolidated Zeebe StatefulSet shares limits. | Measure current usage; test with load generator |
| Storage                  | Same or higher IOPS as 8.7.                   | Check space for temporary migration file.       |

:::info Plan a performance test
You should run a load test that simulates real production traffic, as component consolidation changes resource consumption. This ensures your cluster sizing is appropriate **before** you upgrade your production environment.
:::

## Next steps

Continue to the [perform an upgrade](./run-update.md) guide.

:::tip
For more background, see the [component upgrade guide](/self-managed/components/components-upgrade/introduction.md) and version-specific documentation.
:::

:::info Useful resources

- [Supported environments](../../../reference/supported-environments.md#component-version-matrix)
- [8.8 release notes](../../../reference/announcements-release-notes/880/880-release-notes.md)
- [Helm chart 8.7 to 8.8 technical details](../../installation-methods/helm/upgrade/helm-870-880.md)
- [Component upgrade guide](../../components/components-upgrade/870-to-880.md)

:::
