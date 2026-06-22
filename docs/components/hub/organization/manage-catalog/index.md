---
id: manage-catalog
title: Manage the catalog
description: "Establish a Git repository with catalog assets, upload the assets in a CI/CD pipeline, and make them available across your organization."
---

The catalog in Camunda Hub lets a center of excellence (CoE) publish reusable automation assets from a Git repository so that delivery teams can discover and apply them when modeling.

## About the catalog

catalog assets live in your own Git repository and are uploaded to Camunda Hub through a CI/CD pipeline that calls the Hub catalog API. In Hub:

- A **center of excellence (CoE)** curates the assets and manages their lifecycle (publishing and unpublishing) for the organization.
- **Delivery teams** discover the published assets and apply them when they model business processes.

These are organizational roles, not Camunda concepts. In Camunda Hub, they map to [organization roles](/components/hub/organization/manage-members/manage-users.md):

- The **CoE** corresponds to organization **administrators** (the **Admin** or **Owner** role), who set up the CI/CD sync and manage the catalog.
- **Delivery teams** correspond to regular **users** with the **Modeler** role, who consume catalog assets in Web Modeler.

The Git repository remains the source of truth: Hub does not host authoring. A submission represents the complete desired state of the catalog — assets present in the submission are published or updated, and assets absent from it are unpublished.

## Supported asset types

In 8.10, the catalog supports a single asset type:

- **Element templates** — a `.json` element template descriptor plus an accompanying `README.md` that supplies metadata (category, tags) and a description.

An asset does not bundle the resources a template references (task forms, called processes, job workers). Those are deployed separately to your Orchestration Clusters through your existing tooling. Other asset types (for example, blueprints or process bundles) are not supported in 8.10.

## In this section

- **[Get started with the catalog](/components/hub/organization/manage-catalog/getting-started.md)** — set up a repository, configure CI/CD, and sync element templates to Hub.
- **[Manage the asset lifecycle](/components/hub/organization/manage-catalog/manage-asset-lifecycle.md)** — unpublish and delete catalog assets as a CoE.
- **[Sync assets from multiple repositories](/components/hub/organization/manage-catalog/sync-multiple-repositories.md)** — consolidate templates spread across several repositories before syncing.

Delivery teams looking to consume published assets while modeling should see [Use catalog assets in Hub](/components/hub/workspace/modeler/element-templates/use-catalog-assets.md).
