---
id: catalog-usage
title: Use Catalog assets in Hub
sidebar_label: Use Catalog assets
description: "Discover and apply published Catalog assets in the Hub Catalog and Canvas, and manage assets as a Center of Excellence."
---

Once your Center of Excellence (CoE) has [synced element templates to the Catalog](/components/hub/organization/manage-catalog/getting-started.md), delivery teams discover and apply them while modeling, and the CoE manages their lifecycle.

:::note
The Catalog browsing, Canvas, and CoE management experiences describe the planned 8.10 behavior. The user interface is still being built out, so exact labels and screens may differ from this guide.
:::

## Discover assets in the Catalog

Delivery team members browse the Catalog in Hub to find approved, ready-to-use element templates. For each asset, the Catalog shows its name, short description, category, tags, latest version, and icon.

You can narrow the list to find the right asset:

- **Free-text search** matches against the asset name, short description, category name, and tag names (case-insensitive).
- **Filter by category** to scope the list to a single area (for example, _Connectors_ or _Human Tasks_).
- **Filter by tags** to combine related assets across categories.
- **Sort** by name, creation date, or last updated date.

Assets that were recently added or updated are highlighted so teams can spot new templates at a glance. Only published assets appear in the Catalog — unpublished assets are never shown to delivery teams.

## Apply assets in Canvas

To use a Catalog asset while modeling:

1. Open a BPMN diagram in the Hub modeler (Canvas).
2. Select an element and apply a published element template from the Catalog.
3. Configure the element through the properties panel as defined by the template.

When the CoE publishes a newer version of a template you already use, Hub offers an **update** path on elements that reference the older version, so you can move to the latest version on your terms.

## Manage the Catalog as a Center of Excellence

The CoE curates the Catalog by controlling which assets delivery teams can discover and apply. Lifecycle management happens through the git collection repository and the [ingestion API](/components/hub/organization/manage-catalog/getting-started.md#step-2-set-up-cicd-to-sync-assets) — each submission is the full desired state of the Catalog.

### Unpublished assets

An asset is **unpublished** when it exists in Hub but is no longer part of the latest submission.

- **Delivery teams** (Web Modeler users) can no longer discover the asset in the Catalog or apply it to **new** diagrams. Diagrams that already use the template are unaffected and keep working — the template properties remain on the existing elements. There is **no** in-diagram notification that the asset was unpublished.
- **CoE members** (organization administrators) can still view unpublished assets along with their usage — for example, which diagrams still reference the template — to plan a migration.

:::info
Unpublishing is distinct from element template **deprecation**. Deprecation is a property inside the element template file; unpublishing is a Catalog-level state that reflects the asset's absence from the current submission.
:::

### Deleting assets

Deleting an asset removes it from the Catalog entirely: CoE members can no longer view it, and its properties are no longer accessible in diagrams that referenced it. Deletion is performed through the public API and is not exposed in the Hub UI in 8.10.

:::caution
Deletion is irreversible. Use it only to correct mistakes or remove assets that should never have been published. To phase out an asset while giving delivery teams a migration path, prefer unpublishing or deprecation.
:::

## Next steps

- [Get started with the Catalog](/components/hub/organization/manage-catalog/getting-started.md) — set up the git collection repository and CI/CD sync.
- Learn more about [element templates](/components/hub/workspace/modeler/element-templates/using-templates.md).
