---
id: prepare-for-upgrade
sidebar_label: Prepare for upgrade
title: Prepare for upgrade
description: Prepare your Camunda 8.8 Self-Managed environment for an upgrade to 8.9 by confirming eligibility and completing any required pre-upgrade actions.
---

<!--
TODO (8.9):
Add confirmed pre-upgrade actions for Camunda 8.9.
Remove any unused sections or empty tables before publishing.
-->

:::note
This page is a work in progress for Camunda 8.9 and will be updated as upgrade requirements are finalized.
:::

Prepare your Self-Managed environment for an upgrade to Camunda 8.9. Use this guide to confirm that your deployment is eligible for upgrade and to complete any actions required before running the upgrade.

## Evaluate your current environment

Before upgrading, verify that your current installation meets the minimum requirements.

| Area                | What to check                                                                                                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda version     | Direct upgrades to 8.9 are supported only from the latest 8.8.x patch. If you are running an earlier version, first upgrade to 8.8. See [Upgrading from an earlier version](/self-managed/upgrade/index.md#upgrading-from-an-earlier-version). |
| Environment support | Ensure your platform and dependencies are supported in 8.9. See [Supported environments](/reference/supported-environments.md).                                                                                                                |
| Customizations      | Identify non-default values in Helm values, application YAML files, Ingress configuration, exporters, and Elasticsearch/OpenSearch setup.                                                                                                      |

## Review required pre-upgrade actions for Camunda 8.9

This section lists any actions you must complete before upgrading to Camunda 8.9.

<!--
Add entries here only when a change in 8.9 requires customer action (for example, configuration updates, migrations, or operational planning).
Do not summarize feature changes here. Link to release notes or component docs if context is needed.
-->

<table className="table-callout">
<tr>
    <td style={{minWidth: "152px"}}>**Area**</td>
    <td style={{minWidth: "152px"}}>**What's changed/Action required**</td>
    <td style={{width: "160px"}}>**Impact**</td>
</tr>

</table>

For a complete list of changes, see [What’s new in Camunda 8.9](/reference/announcements-release-notes/890/whats-new-in-89.md).

## Verify infrastructure compatibility

Review your infrastructure to confirm compatibility with Camunda 8.9.

<!--
Populate this table only if Camunda 8.9 introduces new or changed infrastructure requirements.
Remove the table if no infrastructure-related actions apply.
-->

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

Once you have confirmed upgrade eligibility and completed any required preparation steps, proceed with the upgrade method that matches your deployment:

- [Upgrade Helm chart](/self-managed/upgrade/helm/index.md)
- [Manual upgrade](/self-managed/upgrade/manual/index.md)

:::tip
For more information on component-specific changes, see the [component upgrade guide](/self-managed/upgrade/components/index.md) and version-specific documentation.
:::
