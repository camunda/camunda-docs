---
id: prepare-for-admin-upgrade
title: "Prepare for upgrade"
description: "Prepare for an upgrade to Camunda 8.8 Self-Managed – Administrator guide."
---

This guide is a starting point to get high level overview of preparation for an upgrade to Camunda 8.8 Self-Managed: assess your infrastructure, review operational changes, and choose an upgrade strategy appropriate for your environment.

## Step 1: Evaluate your current setup

Check your current setup and make sure you are ready to upgrade.

| Area                         | Description and actions                                                                                                                                   |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda version              | Direct upgrades are only supported from 8.7.x to 8.8.x. You must upgrade all Camunda applications to it latest 8.7.x patch before upgrading to 8.8.       |
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
</tr>
<tr>
    <td>Orchestration Cluster</td>
    <td>Zeebe, Operate, Tasklist, and Identity are consolidated into a single Orchestration cluster.</td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>Tasklist UI mode</td>
    <td><p>Tasklist UI supports two modes: V1 (that uses the deprecated Tasklist API) and V2 (that uses the Orchestration Cluster API).
    </p><p><ul><li><p>Tasklist UI in V1 API mode is available as a configuration option, which allows you to access legacy features during the transition.</p></li><li><p>We recommend planning your migration to the V2 API to take advantage of all the latest features.</p></li><li><p>To learn more about the differences between the V1 and V2 modes, see the <a href="../../../../components/tasklist/api-versions">Tasklist API versions documentation</a>.</p></li></ul></p></td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>Optimize</td>
    <td>Performs a startup data migration that requires downtime during startup data migration. You must plan a maintenance window.</td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>Identity</td>
    <td>HTTP port of the application changed from 8080 to 8084. If you have restrictive network policies, please verify that the port is whitelisted.</td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>Orchestration Cluster API</td>
    <td><p>Introduced a new unified REST API for an Orchestration cluster.</p><p>
    <ul><li>Operate and Tasklist (V1) APIs are deprecated and should be replaced by the Orchestration Cluster API.</li>
    <li><p>For more information, see the blog post [upcoming API Changes in Camunda 8](https://camunda.com/blog/2024/12/api-changes-in-camunda-8-a-unified-and-streamlined-experience/).</p></li></ul></p></td>
    <td><span className="label-highlight yellow">Medium</span></td>
</tr>
<tr>
    <td>Data and exporters</td>
    <td><p>Introduced unified exporter architecture and unified data schema.</p><p><ul><li>May require prefix migration depending on the configuration. See <a href="../../../components/components-upgrade/870-to-880#prefix-migration">prefix migration</a> in the components update section.</li><li><p>Dedicated data retention configurations per application (Zeebe, Tasklist, Operate) are no longer supported.</p></li><li><p>Requires a data migration. See <a href="../../../components/components-upgrade/870-to-880#data-migration">data migration</a> in the components update section.</p></li></ul></p></td>
    <td><span className="label-highlight yellow">Medium</span></td>
</tr>
<tr>
    <td>Unified components configuration</td>
    <td><p>Introduced a new unified configuration with a shared YAML schema across Orchestration cluster components.</p><p>To learn more, see [Camunda 8.8 property changes](../../components/orchestration-cluster/core-settings/configuration/configuration-mapping.md).</p></td>
    <td><span className="label-highlight red">Breaking changes</span></td>    
</tr>
<tr>
    <td>Elasticsearch/OpenSearch: shared-only</td>
    <td>Dedicated Elasticsearch or OpenSearch clusters per application are no longer supported. All Orchestration components must use a single, shared cluster.</td>
    <td><span className="label-highlight red">Breaking changes</span></td>
</tr>
<tr>
    <td>Zeebe Gateway</td>
    <td>Tenant-providing interceptors are not supported and should be replaced with built-in [tenant management](/components/identity/tenant.md).</td>
    <td><span className="label-highlight red">Breaking changes</span></td>
</tr>
<tr>
    <td>Zeebe Java Client/Spring SDK &lt;=8.7.15 with REST API enabled</td>
    <td><p>See [Orchestration Cluster: Zeebe Java Client &lt;=8.7.15 with REST API enabled is incompatible with 8.8](../../../reference/announcements-release-notes/880/880-announcements.md#orchestration-cluster-zeebe-java-client-8715-with-rest-api-enabled)</p></td>
    <td><span className="label-highlight red">Breaking changes</span></td>
</tr>
</table>

### Identity, authentication, and authorization

Orchestration Cluster [Identity](/components/identity/identity-introduction.md) handles authentication and authorization for Orchestration Cluster components and resources.

The following table provides a high-level overview of the impact of these changes:

<table className="table-callout">
<tr>
    <td>Tasklist UI mode</td>
    <td><p>Tasklist UI supports two modes: V1 (that uses the deprecated Tasklist API) and V2 (that uses the Orchestration Cluster API). 
    </p><p><ul><li><p>Tasklist UI in V1 API mode is available as a configuration option, which allows you to access legacy features during the transition.</p></li><li><p>We recommend planning your migration to the V2 API to take advantage of all the latest features.</p></li><li><p>To learn more about the differences between the V1 and V2 modes, see the <a href="../../../../components/tasklist/api-versions">Tasklist API versions documentation</a>.</p></li></ul></p></td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>Optimize</td>
    <td>Performs a startup data migration that requires downtime during startup data migration. You must plan a maintenance window.</td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>Identity, authentication, and authorization</td>
    <td colspan="2"><p>Orchestration Cluster provides Identity and Access Management (IAM) inside a cluster.</p><p>To learn more, see [Identity, authentication, and authorization](#identity-authentication-and-authorization) below.</p></td>    
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
    <td><p>The new [authorization](/components/concepts/access-control/authorizations.md) model introduces fine-grained access control for Orchestration Cluster resources, replacing the previous model.</p><ul><li><p>Camunda provides the Identity migration application to help migrate data from 8.7 to 8.8.</p></li><li><p>Helm charts run Identity migration application as part of the upgrade process.</p></li><li><p>If you are using custom deployment, please review Helm Charts Migration Jobs for reference.</p></li></ul></td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>User groups, roles, tenants, and mapping rules</td>
    <td>This is now managed within [Orchestration Cluster Identity](/components/identity/identity-introduction.md), replacing the previous Management Identity setup.<ul><li><p>Camunda provides the Identity migration application to help migrate data from 8.7 to 8.8.</p></li><li><p>Helm charts run Identity migration application as part of the upgrade process.</p></li><li><p>If you are using a custom deployment, review Helm Charts Migration Jobs for reference.</p></li></ul></td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>User task authorizations</td>
    <td><p>The Tasklist V1 API supports [User task access restrictions](/components/tasklist/user-task-access-restrictions.md).</p><p>After switching to the Tasklist V2 API, user task access restrictions do not apply.</p></td>
    <td><span className="label-highlight yellow">Medium</span></td>
</tr>
<tr>
    <td>Identity via Keycloak</td>
    <td><p>If managing Keycloak internally, you must verify the required database schema updates.</p><p>Confirm supported Keycloak versions in the [environment matrix](../../../reference/supported-environments.md).</p></td>
    <td><span className="label-highlight orange">High</span></td>
</tr>
<tr>
    <td>User storage in Elasticsearch/OpenSearch for Operate or Tasklist</td>
    <td>This is no longer supported.<ul><li><p>You must transition to using [Basic Authentication](/self-managed/concepts/authentication/authentication-to-orchestration-cluster.md#basic-authentication) and recreate users in Orchestration Cluster Identity.</p></li><li><p>See the documentation for [Tasklist authentication](/versioned_docs/version-8.7/self-managed/tasklist-deployment/tasklist-authentication.md) and [Operate authentication](/versioned_docs/version-8.7/self-managed/operate-deployment/operate-authentication.md).</p></li></ul></td>
    <td><span className="label-highlight red">Breaking changes</span></td>
</tr>
<tr>
    <td>LDAP authentication for Operate or Tasklist</td>
    <td><p>This is no longer supported.</p><p>You must transition to use [OIDC or Basic Authentication](/self-managed/concepts/authentication/authentication-to-orchestration-cluster.md).</p></td>
    <td><span className="label-highlight red">Breaking changes</span></td>
</tr>
</table>

:::info
Learn more about the Identity 8.8 changes in the [Identity section of what's new in Camunda 8.8](/reference/announcements-release-notes/880/whats-new-in-88.md#identity).
:::

## Step 3. Check infrastructure compatibility

Check and verify your infrastructure compatibility for Camunda 8.8.

| Area                     | 8.8 requirement                               | Action                                                                                                                                                          |
| :----------------------- | :-------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Elasticsearch/OpenSearch | Elasticsearch ≥ 8.16 (OpenSearch TBD).        | Upgrade the cluster to the new version. Check the [supported environments](../../../reference/supported-environments.md) matrix to confirm the minimum version. |
| CPU/Memory               | Consolidated Zeebe StatefulSet shares limits. | Measure current usage. Test with a load generator.                                                                                                              |
| Storage                  | Same or higher IOPS as 8.7.                   | Check there is required space for temporary migration file.                                                                                                     |

:::caution Plan a performance test
You should run a load test that simulates real production traffic, as component consolidation changes resource consumption. See the [sizing guidelines](../../../reference/supported-environments.md#sizing) and [benchmarking recommendations](../../../reference/supported-environments.md#sizing) to determine appropriate cluster sizing before you upgrade your production environment.
:::

## Next steps

Once you have confirmed you are ready to upgrade and taken any actions required, proceed to the upgrade.

<p><a href="../run-admin-upgrade" class="link-arrow">Perform an upgrade</a></p>

:::tip
For more information, see the [component upgrade guide](/self-managed/components/components-upgrade/introduction.md) and version-specific documentation.
:::

:::info Useful resources

- [Supported environments](../../../reference/supported-environments.md#component-version-matrix)
- [8.8 release notes](../../../reference/announcements-release-notes/880/880-release-notes.md)
- [Helm chart 8.7 to 8.8 technical details](../../deployment/helm/upgrade/helm-870-880.md)
- [Component upgrade guide](../../components/components-upgrade/870-to-880.md)

:::
