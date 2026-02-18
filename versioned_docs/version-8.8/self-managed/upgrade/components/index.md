---
id: index
sidebar_label: Component upgrade
title: Upgrade Camunda components
description: Upgrade individual Camunda 8 components when moving from version 8.7 to 8.8.
---

import ZeebeGrid from '../../../components/zeebe/react-components/\_zeebe-card';
import { mainUpgradeCard } from './react-components/\_card-data';

Upgrade individual Camunda 8 components when moving from version 8.7 to 8.8.

## About

Component-level steps may be required depending on which components you use and how your environment is configured.

:::caution
Component-level changes are part of the overall upgrade process. Follow the upgrade path for your deployment method and only apply component-level steps when required by your configuration.
See [Upgrade to Camunda 8](../index.md).
:::

## When component-level changes apply

Additional steps may be required if your deployment:

- Uses non-default or customized component configuration
- Manages components outside the standard Helm or Manual upgrade flow
- Is affected by component-specific changes introduced in Camunda 8.8.

:::info
For release context, see:

- [What’s new in Camunda 8.8](/reference/announcements-release-notes/880/whats-new-in-88.md)
- [8.8 release notes](/reference/announcements-release-notes/880/880-release-notes.md).

:::

## Upgrade components from 8.7 to 8.8

Camunda 8.8 introduces component-level changes that may require manual action, including:

- Orchestration Cluster Identity migration
- Data and exporter behavior changes
- Elasticsearch and OpenSearch configuration considerations
- Authorization and web application permission changes
- Web Modeler cluster configuration updates

<p><a href="./870-to-880" class="link-arrow">Upgrade Camunda components from 8.7 to 8.8</a></p>

## Component-specific guidance

Some components require additional, targeted steps depending on how they are deployed.

### Optimize

Review these guides to migrate Optimize data, apply required configuration changes, and verify supported environments.

<p><a href="./optimize" class="link-arrow">Upgrade Optimize from 8.7 to 8.8</a></p>

### Database

**Elasticsearch**: This applies if your Camunda deployment includes an Elasticsearch version upgrade as part of the Camunda 8.7 to 8.8 transition.

<p><a href="./database/changes-in-elasticsearch-8" class="link-arrow">Elasticsearch 7 to 8 compatibility changes for Camunda</a></p>

### Keycloak

Upgrade Keycloak while preserving existing data and access to Camunda components.

<p><a href="./keycloak/keycloak-compatibility" class="link-arrow">Keycloak compatibility considerations for Camunda</a></p>

### Importer

The Importer is required only for certain migrations from Camunda 8.7 or earlier. Review this guide to understand when and how to enable it temporarily.

<p><a href="./importer" class="link-arrow">Importer</a></p>
