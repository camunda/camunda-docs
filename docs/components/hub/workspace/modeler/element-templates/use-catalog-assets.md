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

## Find outdated assets in a diagram

When an element references a template version that isn't the latest one, Camunda Hub flags it in two places in the modeler:

- The problems panel reports `Element has updated template available.` as an information-level hint. Select the hint to focus the affected element on the canvas.
- The properties panel of the focused element shows an **Update available** dropdown. It reports the version you can move to, for example `A new version of the template is available: 3`, and offers the **Update** and **Unlink** actions.

Select **Update** to apply the latest version of the template to the element. The hint is reported once per affected element, and an element that already uses the latest version produces no hint.

This signal covers every element template available to your diagram, whether it comes from the catalog or from your project.

## Review catalog updates for a project

The project page collects the same information for a whole project, so you don't have to open each diagram to find outdated assets.

To review the catalog assets a project uses:

1. Open the project in your workspace.
2. In the right sidebar of the project page, find the **Catalog updates** tile.

The tile lists only the catalog assets that need attention — assets whose status is **Update available** or **Deprecated**. Assets that are up to date aren't listed. For each asset you see its name and status, followed by links to the diagrams in the project that use it. An asset used in more than two diagrams shows a **+N more files** control that expands the full list.

Use the filter in the tile header to narrow the list to **All**, **Update available**, or **Deprecated**. Assets load five at a time, a **Showing X of Y** counter tracks how many are listed against the total, and **Load N more assets** appends the next batch.

When the project has nothing to act on, including when it uses no catalog assets at all, the tile shows `All catalog assets in this project are up to date.`

The tile is visible to any project member with read access, so you don't need catalog administrator permissions to see it. Updating a template still happens in the diagram — the tile points you to the diagrams that need the change.

## Next steps

- Learn more about [element templates](/components/hub/workspace/modeler/element-templates/using-templates.md).
- For CoE members: Learn how to [manage the catalog](/components/hub/organization/manage-catalog/index.md) and [track catalog asset usage](/components/hub/organization/manage-catalog/track-asset-usage.md) across your organization.
