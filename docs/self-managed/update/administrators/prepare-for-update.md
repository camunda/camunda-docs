---
id: prepare-for-admin-upgrade
title: "Prepare for upgrade"
description: "This guide is a starting point to get high level overview of preparation for an upgrade to Camunda 8.8 Self-Managed: assess your infrastructure, review..."
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
    <td>TBD</td>
    <td>TDB</td>
    <td><span className="label-highlight">Low</span></td>
</tr>
</table>

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
