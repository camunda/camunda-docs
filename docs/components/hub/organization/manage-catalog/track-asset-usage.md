---
id: track-asset-usage
title: Track catalog asset usage
description: "See which catalog assets are outdated and which workspaces and projects still use an older version, so you can prioritize migrations."
keywords:
  [catalog, element templates, hub, usage, adoption, outdated, governance]
---

See which catalog assets are outdated and which workspaces and projects still use an older version, so you can prioritize migrations.

## Prerequisites

To open the **Asset usage** tab, you must have an **Admin** or **Owner** role in your organization, and your organization must have at least one [published catalog asset](/components/hub/organization/manage-catalog/getting-started.md). Without a published asset, the catalog shows only the setup instructions and no tabs.

## Open the asset usage overview

To review adoption across your organization:

1. From the Camunda Hub home page, select **Catalog**.
2. On the **Organization catalog** page, select the **Asset usage** tab.

The **Browse assets** tab shows the same catalog your delivery teams see. The **Asset usage** tab is visible to organization administrators and owners only, and adds the governance view described here.

## Asset status values

Camunda Hub derives a status for every catalog asset from the versions currently referenced in diagrams. The same four values are used in the usage table, the usage drawer, and the project tile.

| Status               | Meaning                                                                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Up to date**       | The asset is active, and every diagram that references it uses the latest version.                                                                                                                      |
| **Update available** | The asset is active, and at least one diagram references a version older than the latest version.                                                                                                       |
| **Deprecated**       | The asset is [unpublished](/components/hub/organization/manage-catalog/manage-asset-lifecycle.md#unpublish-an-asset) or its latest version is deprecated, and at least one diagram still references it. |
| **Unused**           | No diagram references the asset.                                                                                                                                                                        |

**Deprecated** takes priority over the version comparison. An unpublished asset that is still in use is reported as **Deprecated**, even when some diagrams already use its latest version.

Unpublished assets remain in the usage table even though delivery teams can no longer discover them while browsing, so you keep visibility into the remaining usage you need to migrate away.

## Read the asset usage table

Each row in the **Asset usage** table represents one catalog asset.

| Column           | Description                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| **Asset name**   | The name of the catalog asset.                                                                                 |
| **Status**       | The asset status described in [Asset status values](#asset-status-values).                                     |
| **Workspaces**   | The number of distinct workspaces that use the asset.                                                          |
| **Projects**     | The number of distinct projects that use the asset.                                                            |
| **On latest**    | The number of projects on the latest version, as a ratio of the projects using the asset, for example `3 / 7`. |
| **Last updated** | When the asset was last updated in the catalog.                                                                |

A project counts toward **On latest** only when _every_ usage of the asset within that project is on the latest version. A project with one outdated diagram is not counted, even if its other diagrams are current.

### Filter, search, and sort the table

Use the toolbar above the table to narrow the list:

- **Search catalog assets** matches against the asset name only.
- **Status** opens a checkbox list. Select any combination of **Up to date**, **Update available**, **Deprecated**, and **Unused**. Matching assets for any selected status are shown, and the trigger displays a count badge while a filter is active.
- **Sort by** offers **Name (A–Z)**, **Name (Z–A)**, **Newest**, and **Status**. Sorting by **Status** orders assets by urgency: **Deprecated**, then **Update available**, then **Up to date**, then **Unused**.

No sort is selected on first load, and the table falls back to ordering by name ascending. Changing the search, status filter, sort, or page size returns you to page 1. Table headers aren't sortable, and you can page through results with a page size of 20, 50, or 100.

## Find where an asset is used

Select any row in the **Asset usage** table to open a drawer on the right showing where that asset is used.

The drawer header repeats the asset name as a link to its catalog detail page, shows the asset status, and summarizes the reach of the asset, for example `Used in 7 projects across 3 workspaces.`

Below the header, usage is grouped by the asset version in use. Each version group shows:

- The version number, for example `v3`.
- Either a **Latest** marker or an **Update available** badge. A group for any version other than the latest always means those projects have an update available.
- The number of projects using that version.

Each entry in a group lists the **Project** and the **Workspace** it belongs to, both linking to the corresponding page in Camunda Hub. Select **Load more** to fetch additional entries.

If an asset has no usage, the drawer shows **Not used yet**.

### How permissions affect the results

Because the **Asset usage** tab is limited to organization administrators and owners, the drawer shows every project in your organization that uses the asset, across all workspaces — including workspaces you aren't a member of.

## Drive a migration off an outdated asset

To turn the overview into a prioritized list of work:

1. Open the **Asset usage** tab and set the **Status** filter to **Update available** and **Deprecated** to hide assets that need no action.
2. Select **Status** in **Sort by** to bring the most urgent assets to the top.
3. Compare the **On latest** ratio of each asset to judge how much of the migration is left, and the **Workspaces** and **Projects** counts to judge how many teams a change affects.
4. Select an asset to open the usage drawer, and note the projects grouped under any version other than the latest. Those are the projects that still need to migrate.

You can't update a diagram from the catalog. The migration itself happens in each project, where teams [resolve outdated assets](/components/hub/workspace/modeler/element-templates/use-catalog-assets.md#review-catalog-updates-for-a-project) from the project page or directly in the diagram.

## Next steps

- [Manage the asset lifecycle](/components/hub/organization/manage-catalog/manage-asset-lifecycle.md) — unpublish and delete assets to drive migrations.
- [Use catalog assets in Hub](/components/hub/workspace/modeler/element-templates/use-catalog-assets.md) — see how delivery teams find and resolve outdated assets in their own projects and diagrams.
