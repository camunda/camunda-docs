---
id: manage-catalog
title: Manage the catalog
description: "Establish a Git repository with catalog assets, upload the assets in a CI/CD pipeline, and make them available across your organization."
---

The Catalog in Camunda Hub lets a Center of Excellence (CoE) publish reusable automation assets from a git repository so that delivery teams can discover and apply them when modeling.

## About the Catalog

Catalog assets live in your own git repository and are uploaded to Camunda Hub through a CI/CD pipeline that calls the Hub Catalog API. In Hub:

- A **Center of Excellence (CoE)** curates the assets and manages their lifecycle (publishing and unpublishing) for the organization.
- **Delivery teams** discover the published assets and apply them when they model business processes.

These are organizational roles, not Camunda concepts. In Camunda Hub, they map to [organization roles](/components/hub/organization/manage-members/manage-users.md):

- The **CoE** corresponds to organization **administrators** (the **Admin** or **Owner** role), who set up the CI/CD sync and manage the Catalog.
- **Delivery teams** correspond to regular **users** with the **Modeler** role, who consume Catalog assets in Web Modeler.

The git repository remains the source of truth: Hub does not host authoring. A submission represents the complete desired state of the Catalog — assets present in the submission are published or updated, and assets absent from it are unpublished.

## Supported asset types

In 8.10, the Catalog supports a single asset type:

- **Element templates** — a `.json` element template descriptor plus an accompanying `README.md` that supplies metadata (category, tags) and a description.

An asset does not bundle the resources a template references (task forms, called processes, job workers). Those are deployed separately to your Orchestration Clusters through your existing tooling. Other asset types (for example, blueprints or process bundles) are not supported in 8.10.

## In this section

- **[Get started with the Catalog](/components/hub/organization/manage-catalog/getting-started.md)** — set up a collection repository, configure CI/CD, and sync element templates to Hub.
- **[Use Catalog assets in Hub](/components/hub/organization/manage-catalog/catalog-usage.md)** — discover assets in the Catalog and Canvas, and manage published assets as a CoE.
