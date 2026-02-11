---
id: prepare-for-upgrade
sidebar_label: Prepare for upgrade
title: Prepare for upgrade
description: Prepare your Camunda 8.7 Self-Managed environment for an upgrade to 8.8 by reviewing eligibility, architectural changes, and infrastructure requirements.
---

Prepare your Self-Managed environment for an upgrade to Camunda 8.8. Use this guide to confirm upgrade eligibility, understand platform-level changes, and identify actions you may need to take before running an upgrade.

## Evaluate your current environment

Before upgrading, verify that your current installation meets the minimum requirements.

| Area                | What to check                                                                                                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda version     | Direct upgrades to 8.8 are supported only from the latest 8.7.x patch. If you are running an earlier version, first upgrade to 8.7. See [Upgrading from an earlier version](/self-managed/upgrade/index.md#upgrading-from-an-earlier-version). |
| Environment support | Ensure your platform and dependencies are supported in 8.8. See [Supported environments](/reference/supported-environments.md).                                                                                                                |
| Customizations      | Identify non-default values in Helm values, application YAML files, Ingress configuration, exporters, and Elasticsearch/OpenSearch setup.                                                                                                      |

## Review platform changes in Camunda 8.8

Camunda 8.8 introduces architectural and behavioral changes that may require configuration updates, data migration, or operational planning. Review the following areas to understand their impact on your environment.

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
    <td><p>Tasklist UI supports two modes: V1 (deprecated Tasklist API) and V2 (Orchestration Cluster API). V1 remains available as a temporary option for legacy features. Migration to V2 is recommended to access current and future functionality.</p><p>For more information, see <a href="../../../components/tasklist/api-versions">Tasklist API versions</a>.</p></td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>Optimize</td>
    <td>Performs a startup data migration that requires downtime during startup data migration. You must plan a maintenance window.</td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>Identity</td>
    <td>The HTTP port of the identity pod changed from 8080 to 8084. If you have restrictive network policies, verify that the port is whitelisted.</td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>Orchestration Cluster API</td>
    <td><p>Introduced a new unified REST API for an Orchestration cluster. Operate and Tasklist (V1) APIs are deprecated and should be replaced by the Orchestration Cluster API.</p><p>For more information, see the blog post [Upcoming API Changes in Camunda 8](https://camunda.com/blog/2024/12/api-changes-in-camunda-8-a-unified-and-streamlined-experience/).</p></td>
    <td><span className="label-highlight yellow">Medium</span></td>
</tr>
<tr>
    <td>Data and exporters</td>
    <td><p>Introduced a unified exporter architecture and data schema. Depending on your configuration, this may require prefix migration. Dedicated data retention settings per component are no longer supported. A data migration is required. </p><p>For more information, see <a href="../components/870-to-880#prefix-migration">prefix migration</a> and <a href="../components/870-to-880#data-migration">data migration</a>.</p></td>
    <td><span className="label-highlight yellow">Medium</span></td>
</tr>
<tr>
    <td>Unified components configuration</td>
    <td><p>Introduced a new unified configuration with a shared YAML schema across Orchestration cluster components.</p><p>For more information, see [Property changes in Camunda 8.8](/self-managed/components/orchestration-cluster/core-settings/configuration/configuration-mapping.md).</p></td>
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
    <td><p>These clients are incompatible with 8.8 when REST API support is enabled.</p><p>For more information, see [Orchestration Cluster: Zeebe Java Client &lt;=8.7.15 with REST API enabled is incompatible with 8.8](/reference/announcements-release-notes/880/880-announcements.md#orchestration-cluster-zeebe-java-client-8715-with-rest-api-enabled)</p></td>
    <td><span className="label-highlight red">Breaking changes</span></td>
</tr>
</table>

For a complete list of changes, see [What’s new in Camunda 8.8](/reference/announcements-release-notes/880/whats-new-in-88.md).

### Identity, authentication, and authorization

Orchestration Cluster [Identity](/components/identity/identity-introduction.md) handles authentication and authorization for Orchestration Cluster components and resources. Orchestration Cluster provides Identity and Access Management (IAM) inside a cluster.

#### Authorization changes and migration

Camunda 8.8 introduces a new authorization model for Orchestration Cluster resources.

- Existing authorization data must be migrated from 8.7 to 8.8.
- Camunda provides an Identity migration application to perform this migration.
- Helm-based upgrades run the migration automatically as part of the upgrade process.
- For custom deployments, review the Helm migration jobs as a reference for running the migration manually.

For more information, see [Orchestration Cluster authorization](/components/concepts/access-control/authorizations.md)

:::warning RBA migration impact
If you use Resource-Based Authorization (RBA) and have users assigned to roles with `zeebe-api:write` permissions (including the default Zeebe role), users may receive wildcard permissions after migration.

While a user remains a member of such a role, access in Tasklist and Operate will not be restricted to specific resources.
:::

#### User management and authentication changes

<table className="table-callout">
<tr>
    <td style={{minWidth: "30%"}}>**Area**</td>
    <td>**Description**</td>
    <td style={{width: "160px"}}>**Impact**</td>
</tr>
<tr>
    <td>User groups, roles, tenants, and mapping rules</td>
    <td>Management moves to Orchestration Cluster Identity, replacing Management Identity. Existing data must be migrated.</td>
    <td><span className="label-highlight">Low</span></td>
</tr>
<tr>
    <td>User task authorizations</td>
    <td><p>The Tasklist V1 API supports [User task access restrictions](/components/tasklist/user-task-access-restrictions.md). These restrictions do not apply when using the Tasklist V2 API.</p></td>
    <td><span className="label-highlight yellow">Medium</span></td>
</tr>
<tr>
    <td>Identity via Keycloak</td>
    <td><p>If you manage Keycloak internally, verify required database schema updates and confirm supported versions in [supported environments](/reference/supported-environments.md).</p></td>
    <td><span className="label-highlight orange">High</span></td>
</tr>
<tr>
    <td>User storage in Elasticsearch/OpenSearch for Operate or Tasklist</td>
    <td><p>This is no longer supported. You must transition to using [Basic Authentication](/self-managed/concepts/authentication/authentication-to-orchestration-cluster.md#basic-authentication) and recreate users in Orchestration Cluster Identity.</p><p>For more information, see [Tasklist authentication](/versioned_docs/version-8.7/self-managed/tasklist-deployment/tasklist-authentication.md) and [Operate authentication](/versioned_docs/version-8.7/self-managed/operate-deployment/operate-authentication.md).</p></td>
    <td><span className="label-highlight red">Breaking changes</span></td>
</tr>
<tr>
    <td>LDAP authentication for Operate or Tasklist</td>
    <td><p>This is no longer supported. You must transition to [OIDC or Basic Authentication](/self-managed/concepts/authentication/authentication-to-orchestration-cluster.md).</p></td>
    <td><span className="label-highlight red">Breaking changes</span></td>
</tr>
</table>

For more information about the Identity 8.8 changes, see [Identity, authentication, and authorization](/reference/announcements-release-notes/880/whats-new-in-88.md#identity) in what's new in Camunda 8.8.

## Verify infrastructure compatibility

Check your infrastructure and data services before upgrading.

| Area                     | 8.8 requirement                               | Action                                                                                                                                                  |
| :----------------------- | :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Elasticsearch/OpenSearch | Elasticsearch 8.16+, OpenSearch 2.17+.        | Upgrade the cluster to the new version. Check the [supported environments](/reference/supported-environments.md) matrix to confirm the minimum version. |
| CPU/Memory               | Consolidated Zeebe StatefulSet shares limits. | Measure current usage. Test with a load generator.                                                                                                      |
| Storage                  | Same or higher IOPS as 8.7.                   | Check there is required space for temporary migration file.                                                                                             |

:::caution Plan a performance test
Component consolidation in 8.8 changes resource consumption patterns. Before upgrading production, run a load test that simulates real traffic and validate CPU, memory, and storage behavior.

See the [sizing and benchmarking recommendations](/reference/supported-environments.md#sizing).
:::

## Next steps

Once you have completed all preparation steps and confirmed your environment is ready, proceed with the upgrade method that matches your deployment:

- [Upgrade Helm chart](/self-managed/upgrade/helm/index.md)
- [Manual upgrade](/self-managed/upgrade/manual/index.md)

:::tip
For more information on component-specific changes, see the [component upgrade guide](/self-managed/upgrade/components/index.md) and version-specific documentation.
:::
