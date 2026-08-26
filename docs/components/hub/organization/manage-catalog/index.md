---
id: manage-catalog
title: Manage the catalog
description: "Manage reusable automation assets in a Git repository, and publish them to Camunda Hub so your delivery teams can discover and apply them when modeling."
---

Manage reusable automation assets in a Git repository, and publish them to Camunda Hub so your delivery teams can discover and apply them when modeling.

## In this section

In this section, you learn how to:

- [Set up a Git repository](/components/hub/organization/manage-catalog/getting-started.md) for storing, approving, and publishing catalog assets.
- [Manage the asset lifecycle](/components/hub/organization/manage-catalog/manage-asset-lifecycle.md), including unpublishing and deleting assets.
- [Consolidate templates](/components/hub/organization/manage-catalog/sync-multiple-repositories.md) from multiple repositories before syncing.

Delivery teams [discover published assets and apply them](/components/hub/workspace/modeler/element-templates/use-catalog-assets.md) when modeling business processes.

:::note
To perform these tasks, you must have an **Admin** or **Owner** role in your organization.
:::

## Supported asset types

In 8.10, the catalog supports a single asset type: **element templates**. This asset contains a JSON [element template descriptor](/components/modeler/element-templates/defining-templates.md) and a `README.md` that supplies metadata and a description.

:::note
A catalog asset does not bundle the resources a template references, for example, task forms, called processes, or job workers. Those are deployed separately to your Orchestration Clusters through your existing tooling. Other asset types, like blueprints and process bundles, are not supported in 8.10.
:::
