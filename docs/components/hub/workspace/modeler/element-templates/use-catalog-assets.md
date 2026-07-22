---
id: use-catalog-assets
title: Use catalog assets in Hub
sidebar_label: Use catalog assets
description: "Discover and apply published catalog element templates while modeling in Hub."
---

Once your center of excellence (CoE) has [synced element templates to the catalog](/components/hub/organization/manage-catalog/getting-started.md), you can discover and apply them while modeling.

## Discover assets in the catalog

Browse the catalog in Camunda Hub to find approved, ready-to-use element templates. For each asset, you can see its name, short description, category, tags, latest version, and icon. The name, description, and icon come from the element template JSON itself, so what you see in the catalog matches what you see when the template is applied.

You can narrow the list to find the right asset:

- **Free-text search** matches against the asset name, short description, category name, and tag names (case-insensitive).
- **Filter by category** to scope the list to a single area (for example, **Connectors** or **Human Tasks**).
- **Filter by tags** to combine related assets across categories.
- **Sort** by **Newest** or by **Name (A–Z)**.

Assets that were recently added or updated are highlighted so you can spot new templates at a glance. Only published assets appear in the catalog — unpublished assets aren't visible to you.

## Apply assets while modeling

To use a catalog asset while modeling:

1. Open a BPMN diagram in the Hub modeler.
2. Select an element and [apply a published element template](./using-templates.md#applying-templates) from the catalog.
3. Configure the element through the properties panel as defined by the template.

When the CoE publishes a newer version of a template you already use, Hub offers an **update** path on elements that reference the older version, so you can move to the latest version when you're ready.

If the CoE unpublishes an asset you already use, the template is deprecated. Elements that reference it keep working but show a deprecation hint in the properties panel, signaling that you should migrate to a newer version or a different template.

## Next steps

- Learn more about [element templates](/components/hub/workspace/modeler/element-templates/using-templates.md).
- For CoE members: Learn how to [manage the catalog](/components/hub/organization/manage-catalog/index.md).
