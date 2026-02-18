---
id: index
sidebar_label: Component upgrade
title: Upgrade Camunda components
description: Upgrade individual Camunda 8 components when moving from version 8.8 to 8.9.
---

import ZeebeGrid from '../../../components/zeebe/react-components/\_zeebe-card';
import { mainUpgradeCard } from './react-components/\_card-data';

<!--
TODO (8.9):
- Update linked component upgrade guides as 8.9 content becomes available.
- Remove or add component links based on confirmed 8.8 → 8.9 changes.
-->

:::note
This section is a work in progress for Camunda 8.9 and will be updated as upgrade requirements are finalized.
:::

Upgrade individual Camunda 8 components when moving from version 8.8 to 8.9. Component-level steps may be required depending on which Camunda components you use and how your environment is configured.

:::important
Component-level changes are part of the overall upgrade process.

Follow the upgrade path for your deployment method and apply component-level steps when required by your configuration.
See [Upgrade Camunda 8](../index.md).
:::

## When component-level changes apply

Additional steps may be required if your deployment:

- Uses non-default or customized component configuration
- Manages components outside the standard Helm or Manual upgrade flow
- Is affected by component-specific changes introduced in Camunda 8.9.

For release context, see:

- [What’s new in Camunda 8.8](/reference/announcements-release-notes/890/whats-new-in-89.md)
- [8.9 release notes](/reference/announcements-release-notes/890/890-release-notes.md).

## Upgrade components from 8.8 to 8.9

This section links to component-level guidance for the 8.8 to 8.9 upgrade.

<p><a href="./880-to-890" class="link-arrow">Upgrade Camunda components from 8.8 to 8.9</a></p>

## Component-specific guidance

Some components require additional, targeted steps depending on how they are deployed.

### Database

Follow database-specific guidance if your Camunda upgrade includes changes to the underlying data store.

<!--
TODO (8.9):
Link database-specific upgrade guides here only if relevant for 8.8 → 8.9.
-->

### Identity provider

Follow identity-provider–specific guidance if your setup requires separate upgrade or compatibility steps.

<!--
TODO (8.9):
Link Keycloak or other IdP guidance here only if relevant for 8.8 → 8.9.
-->
