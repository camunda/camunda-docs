---
id: index
sidebar_label: Component upgrade
title: Upgrade Camunda components
description: Upgrade individual Camunda 8 components when moving from version 8.9 to 8.10.
---

import ZeebeGrid from '../../../components/zeebe/react-components/\_zeebe-card';
import { mainUpgradeCard } from './react-components/\_card-data';

:::note

<!--- TODO: Remove this for the release --->

This section is a work in progress for Camunda 8.10 and will be updated as upgrade requirements are finalized.
:::

Upgrade individual Camunda 8 components when moving from version 8.9 to 8.10.

## About

Component-level steps may be required depending on which Camunda components you use and how your environment is configured.

:::caution
Component-level changes are part of the overall [upgrade process](../index.md). Follow the upgrade path for your deployment method and apply component-level steps when required by your configuration.
:::

## When component-level changes apply

Additional steps may be required if your deployment:

- Uses non-default or customized component configuration
- Manages components outside the standard Helm or Manual upgrade flow
- Is affected by component-specific changes introduced in Camunda 8.10.

:::info

For release context, see:

- [What’s new in Camunda 8.10](/reference/announcements-release-notes/8100/whats-new-in-810.md)
- [8.10 release notes](/reference/announcements-release-notes/8100/8100-release-notes.md).

:::

## Upgrade components from 8.9 to 8.10

This section links to component-level guidance for the 8.9 to 8.10 upgrade.

<p class="link-arrow">[Upgrade Camunda components from 8.9 to 8.10](890-to-8100.md)</p>
