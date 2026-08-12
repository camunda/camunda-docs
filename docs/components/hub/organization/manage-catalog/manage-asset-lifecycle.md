---
id: manage-asset-lifecycle
title: Manage the asset lifecycle
description: "Unpublish and delete catalog assets as a center of excellence to drive safe migrations for delivery teams."
keywords:
  [catalog, element templates, hub, lifecycle, unpublish, deprecate, delete]
---

Unpublish and delete catalog assets to drive safe migrations for delivery teams.

## Prerequisites

Before you start, make sure you have [set up the catalog](/components/hub/organization/manage-catalog/getting-started.md) and can submit assets through your CI/CD pipeline.

## How delivery teams see asset versions

As a center of excellence, you control which element templates delivery teams can discover and apply through the catalog. Over time you will update assets, replace them with successors, or remove them entirely. When you do, this affects how delivery teams see and use the assets.

### Browsing assets

When browsing the catalog, your delivery teams only see the **latest published version** of an asset. Older versions are not offered for new diagrams, and unpublished and deleted assets are not discoverable at all.

### Used assets

Diagrams that already reference a template continue to work with [unpublished assets](#unpublish-an-asset), but when an asset is unpublished, its template is also [deprecated](/components/modeler/element-templates/template-metadata.md#deprecating-a-template-deprecated), so those diagrams show a deprecation hint that prompts teams to migrate.

[Deleted assets](#delete-an-asset) used in diagrams are displayed as [missing templates](/components/hub/workspace/modeler/element-templates/using-templates.md#missing-templates) and can't be resolved.

## Unpublish an asset

When your CI/CD pipeline submits assets, the submission represents the _full desired state_ of the catalog. Any asset that already exists in Camunda Hub but is not included in the submission is automatically unpublished. Therefore, to unpublish an asset, remove its directory from the asset repository, and run the sync pipeline again.

Unpublishing an asset also _deprecates_ its element template. Deprecated templates continue to work in existing diagrams, but are no longer offered when applying templates or creating elements.

Diagrams that reference deprecated templates show a [deprecation hint](/components/modeler/element-templates/template-metadata.md#deprecating-a-template-deprecated) in the modeler. This gives delivery teams a clear signal to migrate.

For the center of excellence, responsible for managing the catalog, the asset remains visible, so you can:

- Track which diagrams still reference the template.
- Encourage the migration of those diagrams to a newer version or a different template before the asset is removed entirely.

:::note
Unpublishing is a catalog-level state that indicates the asset is no longer part of the current submission. Use it when an asset should no longer be offered to delivery teams—for example, when you replace a connector with a successor and want to drive migration off the old one.

Because unpublishing automatically deprecates the underlying element template, you don't need to manually set the `deprecated` property in the template to flag it as outdated; removing the asset from the submission is enough.
:::

## Republishing an unpublished asset

To republish an unpublished asset:

- Add the asset's directory back to the repository.
- [Increment the element template's version](./getting-started.md#version-your-element-templates).

If you don't increment the element template's version, you'll receive a `400` response.

## Delete an asset

To permanently remove an asset from the catalog, use the Camunda Hub API delete endpoint:

```
DELETE <camunda-hub-api-base-url>/api/v2/catalog/assets/{assetKey}
```

For the full request and response schema, see the **Delete a catalog asset** reference for [SaaS](/apis-tools/hub-api-saas/specifications/delete-catalog-asset.api.mdx) or [Self-Managed](/apis-tools/hub-api-sm/specifications/delete-catalog-asset.api.mdx). Your API token must have the Web Modeler API `delete` permission.

Deleting an asset removes it and all of its versions entirely:

- Center of excellence and delivery teams can no longer find it while browsing the catalog.
- Its element template can no longer be resolved in diagrams.

Values already configured on diagram elements remain in the BPMN file, but the template definition—including labels, groupings, and validation—is no longer applied. The element is shown as a [missing template](/components/hub/workspace/modeler/element-templates/using-templates.md#missing-templates).

:::warning
Deletion is irreversible. Use it to correct mistakes or remove assets that should never have been published. To phase out assets, prefer unpublishing so the template is deprecated and delivery teams have a clear migration path.
:::

## Next steps

- [Get started with the catalog](/components/hub/organization/manage-catalog/getting-started.md) — set up the repository and CI/CD pipeline.
- [Sync assets from multiple repositories](/components/hub/organization/manage-catalog/sync-multiple-repositories.md) — consolidate templates before syncing.
- [Use catalog assets in Hub](/components/hub/workspace/modeler/element-templates/use-catalog-assets.md) — learn how delivery teams apply published assets.
