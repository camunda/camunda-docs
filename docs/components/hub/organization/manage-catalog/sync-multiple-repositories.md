---
id: sync-multiple-repositories
title: Sync assets from multiple repositories
description: "Publish element templates to the Hub catalog from several repositories, with each submission scoped to the repository that sends it."
keywords: [catalog, element templates, hub, monorepo, multiple repositories]
---

Publish element templates to the Camunda Hub catalog from more than one repository. Each submission is scoped to a source, so a sync only manages the assets of its own repository.

## How sources work

Every submission to the catalog carries a **source** identifier. The [example repository](https://github.com/camunda/catalog-template) sets the source automatically: the GitHub Actions workflow uses the `owner/repo` name of the repository, and the sync script uses the `owner/repo` name of the `origin` remote for local runs. No configuration is needed to publish from several repositories at the same time.

The source controls which assets a sync manages:

- A sync publishes and updates the submitted assets, and unpublishes only the missing assets of its own source. Assets that other repositories ingested with a different source stay untouched.
- When a submission contains a template `id` that another source published before, the catalog adopts the asset: it moves to the new source and stays published. The last successful sync wins.
- If the adopted template content is unchanged, no version increment is needed. If the content changed, the [version rules](./getting-started.md#version-your-element-templates) apply, and the version must be greater than the latest stored version.

## Migrate from a single repository (8.10)

In 8.10, the catalog syncs from a single repository, and all assets are stored without a source. To split this repository into several project repositories after the upgrade, move each asset to its new repository before you remove it from the old one. This order keeps the asset published in Hub during the whole migration:

1. Create one project repository per team or domain from the [example catalog repository](https://github.com/camunda/catalog-template), or add the current sync script to your existing repositories.
1. Copy the asset directories from the existing repository into each project repository. Do not change the template content or the `version` field.
1. Run the sync in the project repository. The catalog adopts the assets, moves them to the source of the project repository, and keeps them published.
1. Remove the asset directories from the old repository, and run its sync. The sync only unpublishes assets of its own source, so the adopted assets stay published.

:::warning
Do not remove the assets from the old repository before the project repository has synced. If the old repository syncs first, it unpublishes the assets, and their templates are [deprecated](./manage-asset-lifecycle.md#unpublish-an-asset) until the project repository syncs.
:::

To change the content of a template during the move, increment its `version`. A moved template with changed content and a stale version is rejected with a `400 Bad Request`.

## Next steps

- [Get started with the catalog](/components/hub/organization/manage-catalog/getting-started.md) — set up the repository and CI/CD pipeline.
- [Manage the asset lifecycle](/components/hub/organization/manage-catalog/manage-asset-lifecycle.md) — unpublish and delete catalog assets.
