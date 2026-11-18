---
id: track-asset-usage
title: Track catalog asset usage
description: "See how widely your catalog is adopted, which catalog assets are outdated, and which workspaces and projects still use an older version, so you can prioritize migrations."
keywords:
  [
    catalog,
    element templates,
    hub,
    usage,
    adoption,
    outdated,
    retired,
    governance,
  ]
---

See how widely your catalog is adopted, which catalog assets are outdated, and which workspaces and projects still use an older version, so you can prioritize migrations.

## Prerequisites

To open the **Asset usage** tab, you must have an **Org Admin** or **Org Owner** role in your organization, and your organization must have at least one [published catalog asset](/components/hub/organization/manage-catalog/getting-started.md). Without a published asset, the catalog shows only the setup instructions and no tabs.

## Open the asset usage overview

To review adoption across your organization:

1. In Camunda Hub, in the left navigation, select **Catalog**.
2. On the **Organization catalog** page, select the **Asset usage** tab.

The **Browse assets** tab shows the same catalog your delivery teams see. The **Asset usage** tab is visible to organization administrators and owners only and adds the governance view described here.

## Review catalog adoption

Four cards at the top of the **Asset usage** tab summarize catalog adoption across your organization:

| Card                 | What it shows                                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Total assets**     | All assets in your organization's catalog, with the number of [retired](#asset-status-values) assets.                               |
| **Adoption rate**    | The share of assets that at least one project uses, with the number of used and unused assets.                                      |
| **Update available** | The number of used assets where at least one project uses an older version, and the number of projects on an older version.         |
| **Deprecated**       | The number of deprecated or unpublished assets that a project still uses, and the number of projects that need to migrate off them. |

Hover over the information icon on a card to see what it counts. The project counts on **Update available** and **Deprecated** are highlighted when they are above zero, to point you to pending migrations.

The cards always summarize the whole catalog. They don't change when you search or filter the table.

## Asset status values

Camunda Hub derives a status for every catalog asset from the versions currently referenced in diagrams:

| Status               | Meaning                                                                                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Up to date**       | The asset is used in at least one diagram, and every diagram that references it uses the latest version.                                                                                         |
| **Update available** | The asset is used in at least one diagram, and at least one diagram references a version older than the latest version.                                                                          |
| **Deprecated**       | The asset is used in at least one diagram, and it's [unpublished](/components/hub/organization/manage-catalog/manage-asset-lifecycle.md#unpublish-an-asset) or its latest version is deprecated. |
| **Unused**           | The asset is published and not deprecated, but it is not used in any diagram.                                                                                                                    |
| **Retired**          | The asset is unpublished or its latest version is deprecated, and it is not used in any diagram.                                                                                                 |

The same values are used in the usage table and the usage drawer. **Unused** and **Retired** only apply to the organization view, because a project only lists the assets it uses.

:::note
**Deprecated** takes priority over the version comparison. An unpublished asset that is still in use is reported as **Deprecated**, even if some diagrams already use its latest version.

**Deprecated** and **Retired** differ only in whether the asset is still in use. A **Deprecated** asset still needs migrations. A **Retired** asset has none left, so it's a candidate for [deletion](/components/hub/organization/manage-catalog/manage-asset-lifecycle.md) from the catalog.
:::

The cards and status filters use the same definitions. Hover over a status filter to see what it means.

Unpublished assets remain in the usage table even though delivery teams can no longer discover them while browsing, so you keep visibility into the remaining usage you need to migrate away.

## Read the asset usage table

Each row in the **Asset usage** table represents one catalog asset.

| Column           | Description                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| **Asset name**   | The name of the catalog asset.                                                                               |
| **Status**       | The asset status described in [Asset status values](#asset-status-values).                                   |
| **Workspaces**   | The number of distinct workspaces that use the asset.                                                        |
| **Projects**     | The number of distinct projects that use the asset.                                                          |
| **On latest**    | The ratio of projects using the latest version compared to projects using any version. For example, `3 / 7`. |
| **Last updated** | When the asset was last updated in the catalog.                                                              |

A project counts toward **On latest** only when _every_ usage of the asset within that project is on the latest version. A project with one outdated diagram is not counted, even if its other diagrams are current.

### Filter, search, and sort the table

Use the toolbar above the table to narrow the list:

- **Search catalog assets** matches against the asset name only.
- The status filters below the search box are **All**, **Up to date**, **Update available**, **Deprecated**, **Unused**, and **Retired**. Each filter shows how many assets have that status, and the counts follow your search term. Select several statuses to show assets matching any of them. A selected filter shows a check mark. Select **All** to clear the status selection.
- **Clear filters** appears while a search term or status is applied. It resets both and returns focus to the search box.
- **Sort by** offers sorting options:

| Sort option | Description                                                                                                                 |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------- |
| Name (A-Z)  | **(Default)** Order assets by name in ascending order (A-Z)                                                                 |
| Name (Z-A)  | Order assets by name in descending order (Z-A)                                                                              |
| Newest      | Order assets by last updated date, newest first                                                                             |
| Status      | Order assets by urgency: **Deprecated**, then **Update available**, then **Up to date**, then **Unused**, then **Retired**. |

Changing the search, status filter, sort, or page size returns you to page 1. Table headers aren't sortable, and you can page through results with a page size of 20, 50, or 100.

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

Because the **Asset usage** tab is limited to organization administrators and owners, the drawer shows every project in your organization that uses the asset, across all workspaces, including workspaces you aren't a member of.

## Drive a migration off an outdated asset

To turn the overview into a prioritized list of work:

1. Open the **Asset usage** tab and check the **Update available** and **Deprecated** cards to see how many assets and projects are affected.
2. Select the **Update available** and **Deprecated** status filters to hide assets that need no action.
3. Select **Status** in **Sort by** to bring the most urgent assets to the top.
4. Compare the **On latest** ratio of each asset to judge how much of the migration is left, and the **Workspaces** and **Projects** counts to judge how many teams a change affects.
5. Select an asset to open the usage drawer, and note the projects grouped under any version other than the latest. Those are the projects that still need to migrate.

You can't update a diagram from the catalog. The migration itself happens in each project, where teams [resolve outdated assets](/components/hub/workspace/modeler/element-templates/use-catalog-assets.md#review-catalog-updates-for-a-project) from the project page or directly in the diagram.

## Next steps

- [Manage the asset lifecycle](/components/hub/organization/manage-catalog/manage-asset-lifecycle.md) — unpublish and delete assets to drive migrations.
- [Use catalog assets in Hub](/components/hub/workspace/modeler/element-templates/use-catalog-assets.md) — see how delivery teams find and resolve outdated assets in their own projects and diagrams.
