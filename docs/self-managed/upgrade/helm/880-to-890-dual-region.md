---
id: 880-to-890-dual-region
sidebar_label: Dual-region upgrade
title: Upgrade a dual-region deployment from 8.8 to 8.9 using Helm
description: "Additional considerations when upgrading a dual-region Camunda 8 Self-Managed deployment from version 8.8 to 8.9."
toc_max_heading_level: 3
---

<!--
TODO (8.9):
- Replace the 8.7 -> 8.8 dual-region content with confirmed 8.8 -> 8.9 dual-region requirements.
- Keep this guide action-oriented. Link to release notes for context instead of repeating them here.
- Before publishing, remove sections/tables that are not needed for the 8.8 -> 8.9 upgrade.
-->

:::note
This page is a work in progress for Camunda 8.9 and will be updated as upgrade requirements are finalized.
:::

Upgrading a Helm-based dual-region Camunda 8 Self-Managed deployment from 8.8 to 8.9 may require additional configuration beyond the standard Helm upgrade.

Start with the [Upgrade from 8.8 to 8.9](./880-to-890.md) guide, which covers the baseline Helm upgrade steps. Use this guide to address dual-region–specific requirements.

If your deployment requires component-specific upgrade steps, also review the [component upgrade guide](../components/880-to-890.md).

:::info
Dual-region deployments, as described in [Dual-region setup](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md), may require manual exporter configuration.
:::

## Required configuration changes

Review the dual-region–specific changes below and apply any actions that are required for your setup.

| Configuration area | Action required | Notes |
| ------------------ | --------------- | ----- |
|                    |                 |       |
|                    |                 |       |

<!--
TODO (8.9):
Populate this table with confirmed dual-region changes for 8.9 only.
Examples might include: exporters, authentication defaults, gateway/env var changes, migration job settings, or operational sequencing.
-->

## Reference configuration (if applicable)

<!--
Use this section only if the 8.8 → 8.9 upgrade requires
dual-region–specific configuration changes that benefit from examples.
Remove this section before publishing if not needed.
-->

```yaml
# Add reference configuration here if required.
```

## Multi-region specific considerations

Dual-region setups vary. The following scenarios may affect how you run the upgrade.

<!--
TODO (8.9):
Add only confirmed considerations for 8.8 -> 8.9 (for example: migration sequencing, shared vs separate secondary storage, operational coordination).
Remove this section before publishing if no 8.9-specific considerations apply.
-->

## After the upgrade

<!--
TODO (8.9):
Document any post-upgrade steps that are specific to dual-region deployments in 8.9.
If no steps apply, remove this section before publishing.
-->

Review the updated [dual-region operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md).
