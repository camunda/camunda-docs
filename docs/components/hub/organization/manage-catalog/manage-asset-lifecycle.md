---
id: manage-asset-lifecycle
title: Manage the asset lifecycle
sidebar_label: Manage the asset lifecycle
description: "Unpublish and delete Catalog assets as a Center of Excellence to drive safe migrations for delivery teams."
keywords:
  [catalog, element templates, hub, lifecycle, unpublish, deprecate, delete]
---

As a Center of Excellence (CoE), you control which element templates delivery teams can discover and apply through the Catalog. Over time you will retire assets, replace them with successors, or remove them entirely. This guide explains the lifecycle states the Catalog provides and when to use each one.

Before you start, make sure you have [set up the Catalog](/components/hub/organization/manage-catalog/getting-started.md) and can submit assets through your CI/CD pipeline.

## How delivery teams see asset versions

Delivery teams (Web Modeler users) only ever see the **latest published version** of an asset in the Catalog. Older versions are not offered for new diagrams, and unpublished assets are not discoverable at all. Diagrams that already reference a template keep working, but when an asset is unpublished its template is also deprecated, so those diagrams show a deprecation hint that prompts teams to migrate (see [Unpublish an asset](#unpublish-an-asset)).

## Unpublish an asset

When your CI/CD pipeline submits assets to the Catalog, the submission represents the **full desired state**. Any asset that **already exists in Hub but is not included in the submission** is automatically unpublished. To unpublish an asset, remove its directory from the repository you sync from and run the pipeline again.

Unpublishing an asset also **deprecates** its element template. Deprecation prevents future use while keeping existing uses working: the template is no longer offered when applying templates or creating elements, and diagrams that already reference it show a [deprecation hint](/components/modeler/element-templates/template-metadata.md#deprecating-a-template-deprecated) in the modeler. This gives delivery teams a clear signal to migrate.

Unpublishing an asset means:

- **For delivery teams** (Web Modeler users): The asset is no longer discoverable in the Catalog and cannot be applied to new diagrams. Diagrams that already use the template continue to work, but show a deprecation hint prompting the team to migrate to a newer version or a different template.
- **For CoE members** (organization administrators): The asset stays visible so the CoE can track its remaining usage — which diagrams still reference the template — and drive the migration of those diagrams to a newer version or a different template before the asset is removed entirely.

:::info
Unpublishing is a Catalog-level state that indicates the asset is no longer part of the current submission. Use it when an asset should no longer be offered to delivery teams — for example, when you replace a connector with a successor and want to drive migration off the old one. Because unpublishing automatically deprecates the underlying element template, you do not need to set the `deprecated` property in the template yourself to flag it as outdated; removing the asset from the submission is enough.
:::

## Delete an asset

To permanently remove an asset from the Catalog, use the Camunda Hub API delete endpoint:

```
DELETE <camunda-hub-api-base-url>/api/v2/catalog/assets/{assetKey}
```

For the full request and response schema, see the **Delete a catalog asset** reference for [SaaS](/apis-tools/hub-api-saas/specifications/delete-catalog-asset.api.mdx) and [Self-Managed](/apis-tools/hub-api-sm/specifications/delete-catalog-asset.api.mdx).

The token must have the `delete` permission. Deleting an asset removes it and all of its versions entirely: CoE members can no longer browse it, and its element template can no longer be resolved in diagrams. Values already configured on diagram elements remain in the BPMN file, but the template definition (labels, groupings, and validation) is no longer applied — the element is shown as a [missing template](/components/hub/workspace/modeler/element-templates/using-templates.md#missing-templates).

:::caution
Deletion is irreversible. Use it to correct mistakes or remove assets that should never have been published. For assets you want to phase out, prefer unpublishing so that the template is deprecated and delivery teams have a clear migration path.
:::

## Next steps

- [Get started with the Catalog](/components/hub/organization/manage-catalog/getting-started.md) — set up the repository and CI/CD pipeline.
- [Sync assets from multiple repositories](/components/hub/organization/manage-catalog/sync-multiple-repositories.md) — consolidate templates before syncing.
- [Use Catalog assets in Hub](/components/hub/workspace/modeler/element-templates/use-catalog-assets.md) — how delivery teams apply published assets.
