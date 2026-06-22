---
id: use-catalog-assets
title: Use catalog assets in Hub
sidebar_label: Use catalog assets
description: "Discover and apply published catalog element templates while modeling in Hub."
---

Once your Center of Excellence (CoE) has [synced element templates to the catalog](/components/hub/organization/manage-catalog/getting-started.md), delivery teams discover and apply them while modeling.

## Discover assets in the catalog

Delivery team members browse the catalog in Hub to find approved, ready-to-use element templates. For each asset, the catalog shows its name, short description, category, tags, latest version, and icon. The name, description, and icon are read from the element template JSON itself, so what teams see in the catalog matches what they see when the template is applied.

You can narrow the list to find the right asset:

- **Free-text search** matches against the asset name, short description, category name, and tag names (case-insensitive).
- **Filter by category** to scope the list to a single area (for example, _Connectors_ or _Human Tasks_).
- **Filter by tags** to combine related assets across categories.
- **Sort** by name, creation date, or last updated date.

Assets that were recently added or updated are highlighted so teams can spot new templates at a glance. Only published assets appear in the catalog — unpublished assets are hidden from delivery teams.

## Apply assets while modeling

To use a catalog asset while modeling:

1. Open a BPMN diagram in the Hub modeler.
2. Select an element and apply a published element template from the catalog.
3. Configure the element through the properties panel as defined by the template.

When the CoE publishes a newer version of a template you already use, Hub offers an **update** path on elements that reference the older version, so you can move to the latest version on your terms.

If the CoE unpublishes an asset you already use, its template is deprecated: elements that reference it keep working but show a deprecation hint in the properties panel, signaling that you should migrate to a newer version or a different template.

## Next steps

- Learn more about [element templates](/components/hub/workspace/modeler/element-templates/using-templates.md).
- For CoE members: [manage the asset lifecycle](/components/hub/organization/manage-catalog/manage-asset-lifecycle.md) to control which assets delivery teams can discover.
