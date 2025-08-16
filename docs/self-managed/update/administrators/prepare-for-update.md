---
id: prepare-for-admin-upgrade
title: "Prepare for upgrade"
description: "Prepare for an upgrade to Camunda 8.8 Self-Managed – Administrator guide."
---

import DocCardList from '@theme/DocCardList';

# Prepare for an upgrade

A successful upgrade to Camunda 8.8 requires careful preparation. This guide helps you evaluate your infrastructure, understand operational changes, and choose the best upgrade strategy for your environment.

## Step 1. Evaluate your current setup

<table className="table-callout">
<tr>
    <td style={{minWidth: "30%"}}>**Area**</td>
    <td>**Details**</td>
</tr>
<tr>
    <td>Platform version</td>
    <td>Direct updates are supported from 8.7.x to 8.8.x. Upgrade to the latest 8.7 patch before moving to 8.8.</td>
</tr>
<tr>
    <td>Component version alignment</td>
    <td>Orchestration components like Zeebe, Operate, Tasklist, and Identity must run the same version.</td>
</tr>
<tr>
    <td>Configuration customizations</td>
    <td>Identify non-default parameters and values in configuration files, Ingress rules, external Elasticsearch/OpenSearch configurations, and custom exporters.</td>
</tr>
</table>

## Step 2. Assess Camunda platform changes

Review the platform-level changes between versions 8.7 and 8.8. For a high-level overview, see this guide:

<DocCardList items={[
{type: 'link', href: '/docs/next/components/whats-new-in-88/', label: 'What is new in Camunda 8.8', docId: 'components/whats-new-in-88'},
]} />

Understanding these highlights will help you plan your upgrade and anticipate operational impacts.

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
    <td>Requires temporary rebalancing of indices/storage.<br/> 
    Dedicated data retention configurations per application (Zeebe, Tasklist, Operate) are not supported anymore.<br/>
    If Taskist data are present, an additional data migration is required - process application migration utilities are offered for this.</td>
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
    <td></td>
    <td>See [Identity, authentication, and authorization](#identity-authentication-and-authorization) below.</td>
</tr>
</table>

### Identity, authentication, and authorization

The new Orchestration Cluster [Identity](/components/identity/identity-introduction.md) handles authentication and authorization for all Orchestration Cluster components and its resources.

Learn more about all Identity 8.8 changes [here](../../../components/whats-new-in-88.md#identity-authentication-and-authorization-identity). Below is a high-level overview of the impact of these changes:

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
    <td>[User task access restrictions](/components/concepts/access-control/user-task-access-restrictions.md) only apply to the Tasklist v1 API. After switching to the v2 API with Tasklist, user task access restrictions do not apply.</td>
</tr>
<tr>
    <td>Identity via Keycloak</td>
    <td><span className="label-highlight orange">Medium</span></td>
    <td>If managing Keycloak internally, verify required database schema updates. Confirm supported Keycloak versions in the [environment matrix](../../../reference/supported-environments.md).</td>
</tr>
<tr>
    <td>User storage in Elasticsearch/OpenSearch for Operate or Tasklist</td>
    <td><span className="label-highlight red">Breaking changes</span></td>
    <td>Not supported anymore. You must transition to the Basic authentication and re-create users in the Orchestration Cluster Identity.</td>
</tr>
<tr>
    <td>LDAP authentication for Operate or Tasklist</td>
    <td><span className="label-highlight red">Breaking changes</span></td>
    <td>Not supported anymore. You must transition to OIDC or Basic Authentication.</td>
</tr>
</table>

## Step 3. Check infrastructure compatibility

<table className="table-callout">
<tr>
    <td>**Area**</td>
    <td>**8.8 requirement**</td>
    <td>**Action**</td>
</tr>
<tr>
    <td>Elasticsearch / OpenSearch</td>
    <td>Elasticsearch ≥ 8.16 (OpenSearch TBD)</td>
    <td>Upgrade the cluster to the new version</td>
</tr>
<tr>
    <td>CPU / Memory</td>
    <td>Consolidated Zeebe StatefulSet shares limits</td>
    <td>Measure current usage; test with load generator</td>
</tr>
<tr>
    <td>Storage</td>
    <td>Same or higher IOPS as 8.7</td>
    <td>Check space for temporary migration files</td>
</tr>
</table>

:::warning Plan a performance test
Because component consolidation will change resource consumption, run a load test that simulates real production traffic. This ensures your cluster sizing is appropriate **before** you update the production environment.
:::

## Step 4. Create an upgrade timeline

<table className="table-callout">
<tr>
    <td>**Phase**</td>
    <td>**Typical duration**</td>
    <td>**Downtime**</td>
</tr>
<tr>
    <td>Pre-upgrade preparation</td>
    <td>1–2 weeks</td>
    <td>No</td>
</tr>
<tr>
    <td>Cluster update</td>
    <td>1–4 hours</td>
    <td>Depends on data migration size</td>
</tr>
<tr>
    <td>Validation and tuning</td>
    <td>1–2 days</td>
    <td>No</td>
</tr>
</table>

We advise to document backup and rollback procedures for each phase.

## Next steps

1. Review the plan with operations, security, and development teams.
2. Schedule the maintenance window and notify all stakeholders.
3. Continue with the [Run the upgrade](./run-update.md) guide.

For more background, see the [guide with introduction to component-based updates](/self-managed/components/components-upgrade/introduction.md) and version-specific documentation.

:::info Links

- [Supported environments](../../../reference/supported-environments.md#component-version-matrix)
- [8.8 release notes](../../../reference/announcements-release-notes/880/880-release-notes.md)
- [Helm chart 8.7 to 8.8 technical details](../../installation-methods/helm/upgrade/helm-870-880.md)
- [Camunda components update details](../../components/components-upgrade/870-to-880.md)

:::
