---
id: sync-multiple-repositories
title: Sync assets from multiple repositories
sidebar_label: Sync assets from multiple repositories
description: "Consolidate element templates spread across several repositories into a single collection repository before syncing to the Hub catalog."
keywords: [catalog, element templates, hub, monorepo, multiple repositories]
---

The catalog syncs from a **single repository**. If your element templates already live together in one repository (for example, a monorepo), sync from it directly as described in [Get started with the catalog](/components/hub/organization/manage-catalog/getting-started.md) — you do not need this guide.

If your element templates are spread across several repositories, add a step that consolidates them into the single repository you sync from.

## Consolidate templates into a collection repository

A common pattern is a CI/CD job in each source repository that copies its element templates and READMEs into a dedicated collection repository whenever a new version is created. The collection repository is the single source the catalog syncs from.

```yaml
# Example: GitHub Actions workflow in a source repository
name: Push templates to collection repo

on:
  push:
    branches: [main]

jobs:
  push-to-collection:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout source repository
        uses: actions/checkout@v4

      - name: Push element templates to collection repo
        run: |
          git clone https://x-access-token:${{ secrets.COLLECTION_REPO_TOKEN }}@github.com/your-org/catalog-collection.git
          cp -r element-templates/payment-connector catalog-collection/payment-connector
          cd catalog-collection
          git add .
          git commit -m "Update payment-connector templates"
          git push
```

The collection repository then syncs to Hub exactly as described in [Step 2 of the getting started guide](/components/hub/organization/manage-catalog/getting-started.md#step-2-connect-the-repository-to-hub).

## Next steps

- [Get started with the catalog](/components/hub/organization/manage-catalog/getting-started.md) — set up the repository and CI/CD pipeline.
- [Manage the asset lifecycle](/components/hub/organization/manage-catalog/manage-asset-lifecycle.md) — unpublish and delete catalog assets.
