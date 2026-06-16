---
id: manage-asset-lifecycle
title: Manage the asset lifecycle
sidebar_label: Manage the asset lifecycle
description: "Unpublish, deprecate, and delete Catalog assets as a Center of Excellence to drive safe migrations for delivery teams."
keywords:
  [catalog, element templates, hub, lifecycle, unpublish, deprecate, delete]
---

As a Center of Excellence (CoE), you control which element templates delivery teams can discover and apply through the Catalog. Over time you will retire assets, replace them with successors, or remove them entirely. This guide explains the lifecycle states the Catalog provides and when to use each one.

Before you start, make sure you have [set up the Catalog](/components/hub/organization/manage-catalog/getting-started.md) and can submit assets through your CI/CD pipeline.

## How delivery teams see asset versions

Delivery teams (Web Modeler users) only ever see the **latest published version** of an asset in the Catalog. Older versions are not offered for new diagrams, and unpublished assets are not discoverable at all. Diagrams that already reference a template keep working — the change only affects what teams can newly apply.

## Unpublish an asset

When your CI/CD pipeline submits assets to the Catalog, the submission represents the **full desired state**. Any asset that **already exists in Hub but is not included in the submission** is automatically unpublished. To unpublish an asset, remove its directory from the repository you sync from and run the pipeline again.

Unpublishing an asset means:

- **For delivery teams** (Web Modeler users): The asset is no longer discoverable in the Catalog and cannot be applied to new diagrams. Projects that already use the template continue to work as before.
- **For CoE members** (organization administrators): The asset stays visible so the CoE can track its remaining usage — which diagrams still reference the template — and drive the migration of those diagrams to a newer version or a different template before the asset is removed entirely.

:::info
Unpublishing is different from deprecation:

- **Unpublishing** is a Catalog-level state that indicates the asset is no longer part of the current submission. Use it when an asset should no longer be offered to delivery teams — for example, when you replace a connector with a successor and want to drive migration off the old one.
- **Deprecation** is a property within the element template file itself that flags a template as outdated while keeping it available. Use it to signal "still works, but prefer the alternative" without removing the asset from the Catalog.

:::

## Delete an asset

To permanently remove an asset from the Catalog, use the Camunda Hub API delete endpoint:

```
DELETE <camunda-hub-api-base-url>/api/v2/catalog/assets/{assetKey}
```

The token must have the `delete` permission. Deleting an asset removes it and all of its versions entirely: CoE members can no longer browse it, and its element template can no longer be resolved in diagrams. Values already configured on diagram elements remain in the BPMN file, but the template definition (labels, groupings, and validation) is no longer applied — the element is shown as a [missing template](/components/hub/workspace/modeler/element-templates/using-templates.md#missing-templates).

:::caution
Deletion is irreversible. Use it to correct mistakes or remove assets that should never have been published. For assets you want to phase out, prefer unpublishing or deprecation so that delivery teams have a clear migration path.
:::

## Next steps

- [Get started with the Catalog](/components/hub/organization/manage-catalog/getting-started.md) — set up the repository and CI/CD pipeline.
- [Sync assets from multiple repositories](/components/hub/organization/manage-catalog/sync-multiple-repositories.md) — consolidate templates before syncing.
- [Use Catalog assets in Hub](/components/hub/workspace/modeler/element-templates/use-catalog-assets.md) — how delivery teams apply published assets.
