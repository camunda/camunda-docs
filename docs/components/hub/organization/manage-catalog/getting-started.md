---
id: getting-started-catalog
title: Get started with the Catalog
sidebar_label: Get started with the Catalog
description: "Set up a reusable asset catalog in Camunda Hub by syncing element templates from your git repository using CI/CD."
keywords: [catalog, element templates, hub, getting started]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<span class="badge badge--intermediate">Intermediate</span>
<span class="badge badge--medium">30 minutes</span>

The Catalog in Camunda Hub lets your Center of Excellence (CoE) publish and manage reusable element templates from a git repository. Delivery teams can then discover and apply these templates directly from the Hub when modeling processes.

In this guide, you will:

- Organize your element templates in a git repository.
- Connect that repository to the Hub Catalog with a CI/CD pipeline.
- Verify that published assets appear in the Catalog for delivery teams to use.

## Prerequisites

- A Camunda 8 account with an active organization ([SaaS](https://signup.camunda.com/) or [Self-Managed](/self-managed/about-self-managed.md)).
- Client credentials with **Camunda Hub API** permissions to access the Catalog ingestion endpoint. The credentials must include the **`create`** and **`update`** permissions, which the ingestion endpoint requires. See the Camunda Hub API authentication guides for [SaaS](/apis-tools/hub-api-saas/authentication.md) and [Self-Managed](/apis-tools/hub-api-sm/authentication.md).
- A git repository where your element templates are stored (for example, on GitHub, GitLab, or Bitbucket).
- A CI/CD pipeline configured for that repository (for example, GitHub Actions, GitLab CI, or Azure Pipelines).

## Understand the Catalog workflow

The Catalog connects a git repository to Hub through a CI/CD pipeline:

1. Element templates and their metadata live in a git repository — this can be an existing monorepo or a dedicated repository.
2. Whenever that repository changes, a CI/CD pipeline submits the current set of element templates to the Hub Catalog API.
3. Hub compares the submission against its stored state and publishes new or updated versions automatically.
4. Delivery teams discover and apply the latest templates from the Catalog when modeling in Hub.

The part you set up is step 2 — the connection between your repository and Hub. The rest of this guide focuses on that.

:::note
The Catalog syncs from a **single repository**. If your element templates already live together in one repository (for example, a monorepo), sync from it directly. If they are spread across several repositories, first consolidate them into one — see [Sync assets from multiple repositories](#sync-assets-from-multiple-repositories).
:::

## Step 1: Organize your assets

Point the Catalog at a single git repository that holds your element templates. This can be an existing repository (such as a monorepo) or a dedicated one. The sync only looks at element templates and their README files; any other files in the repository — job workers, BPMN processes, forms, DMN decisions — are ignored.

Each asset is grouped in its own directory:

```
your-repo/
├── payment-connector/
│   ├── README.md
│   └── payment-connector.json
├── approval-task/
│   ├── README.md
│   └── approval-task.json
└── order-template/
    ├── README.md
    └── order-template.json
```

Each asset directory contains exactly two files:

- **README.md**: A Markdown file with metadata in the frontmatter and a description in the body. The frontmatter references the single element template file (through the `template:` field) and provides optional attributes like category and tags.
- **Element template file** (`.json`): The element template descriptor. The `id` and `version` fields in this file are authoritative for the asset's identity and version in the Catalog, and the asset name, short description, and icon are read from this file as well.

In 8.10, an asset is exactly this pair of files. Assets do not reference any other files (such as separate icon or image files): the icon is embedded in the element template JSON, and any resources the template uses (forms, called processes, job workers) are deployed separately through your existing tooling.

### Define the asset README

The README is the asset's metadata file. Hub detects an asset by the presence of a README with valid frontmatter — a `---`-delimited YAML block followed by a Markdown body. The frontmatter supports the following fields:

| Field      | Type            | Required | Description                                                                                                   |
| ---------- | --------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `template` | string          | Yes      | File name of the element template `.json` in the same directory. The submission fails if the file is missing. |
| `category` | string          | No       | Groups the asset under a single category for filtering in the Catalog. No category if omitted.                |
| `tags`     | list of strings | No       | Tags used to search and filter assets in the Catalog. Empty if omitted.                                       |

The asset's name, short description, and icon are **not** set in the frontmatter — they come from the `name`, `description`, and `icon` fields of the element template JSON.

```markdown
---
template: payment-connector.json
category: Payments
tags:
  - payments
  - connector
---

## Payment Connector

This connector integrates with the company payment gateway.
It handles payment initiation, status checks, and refund processing.

### Usage

Apply this template to a Service task to configure a payment operation.
```

The Markdown content below the frontmatter is displayed as the asset description when browsing the Catalog in Hub.

### Version your element templates

The Catalog uses the `id` and `version` fields inside your element template JSON to track versions. While `version` is [optional in the element template schema](/components/modeler/element-templates/defining-templates.md#optional-keys), the Catalog **requires** it: a template submitted without a `version` is rejected.

```json
{
  "$schema": "https://unpkg.com/@camunda/element-templates-json-schema/resources/schema.json",
  "id": "com.example.payment-connector",
  "name": "Payment Connector",
  "version": 2,
  "appliesTo": ["bpmn:ServiceTask"],
  "properties": []
}
```

When you submit assets to the Catalog API, Hub compares each submitted template against the latest stored version with the same `id`:

- If the template **content is identical** to the latest stored version, no new version is created. Changes to the README (description, category, or tags) are still applied to the asset.
- If the template **content has changed** and the `version` field is **greater** than the latest stored version, a new version is published and becomes the new latest version.
- If the template **content has changed** but the `version` field is **not greater** than the latest stored version (unchanged or lower), the **entire submission is rejected** with a `400 Bad Request` — the version must always increase. Reusing an older or equal number is not allowed even if no other asset uses it.

In addition, every `id` in a single submission must be unique. If two templates share the same `id`, the submission is rejected with a `400 Bad Request`.

:::caution
Always increment the `version` field when you change an element template's content. The Catalog API validates the whole submission as a single transaction: if any asset fails validation, **no** changes are applied (see [Step 2](#step-2-connect-the-repository-to-hub)).
:::

## Step 2: Connect the repository to Hub

This is the core of the setup. Add a CI/CD job to your repository that authenticates with the Camunda Hub API and submits the current set of element templates to the Catalog whenever the repository changes.

The job calls a single ingestion endpoint:

```
PUT <camunda-hub-api-base-url>/api/v2/catalog/assets/ingestion
```

The request body is `multipart/form-data` and represents the **complete desired state** of your Catalog. For each asset, the request includes two parts:

- a `template` part containing the element template `.json` file, and
- a `readme` part containing the `README.md` file.

Each `README.md` is paired with the template named in its `template:` frontmatter. The template must be in the same directory as the README. Because the submission is the full desired state, Hub **unpublishes** any asset that exists in the Catalog but is absent from the submission (see [Step 3](#step-3-handle-asset-lifecycle)).

### Start from the example repository

The fastest way to set up the sync is the example catalog repository. It contains placeholder element templates, a ready-to-use sync script (`scripts/sync-catalog.sh`), and a GitHub Actions workflow that submits the full desired state on every push to `main`. Use it as a template, replace the example assets with your own, and configure the credentials below.

:::note
The example repository will be published by Camunda. _(Repository URL to be added.)_
:::

**1. Provide credentials and configuration**

Store the client credentials securely (for example, as CI/CD secrets) and expose them — together with the environment-specific URLs — as environment variables. The token issuer and the Camunda Hub API base URL differ between SaaS and Self-Managed:

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

```bash
export CAMUNDA_HUB_CLIENT_ID="<client-id>"
export CAMUNDA_HUB_CLIENT_SECRET="<client-secret>"
export CAMUNDA_OAUTH_URL="https://login.cloud.camunda.io/oauth/token"
export CAMUNDA_HUB_OAUTH_AUDIENCE="api.cloud.camunda.io"
export CAMUNDA_HUB_REST_URL="https://hub.cloud.camunda.io"
```

</TabItem>

<TabItem value='self-managed'>

In Self-Managed, tokens are issued by your [Management Identity](/self-managed/components/management-identity/authentication.md) instance instead of the Camunda SaaS login, there is no `audience`, and the Camunda Hub API is served from your own installation (default `http://localhost:8088`). Adjust the URLs to match your installation.

```bash
export CAMUNDA_HUB_CLIENT_ID="<client-id>"
export CAMUNDA_HUB_CLIENT_SECRET="<client-secret>"
export CAMUNDA_OAUTH_URL="http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token"
export CAMUNDA_HUB_REST_URL="http://localhost:8088"
```

</TabItem>
</Tabs>

See the Camunda Hub API authentication guides for [SaaS](/apis-tools/hub-api-saas/authentication.md) and [Self-Managed](/apis-tools/hub-api-sm/authentication.md) for how to create credentials with the required `create` and `update` permissions.

**2. Run the sync**

The sync script in the example repository obtains an access token, discovers each asset directory (a `README.md` plus the `.json` template it references), builds the multipart request, and submits the full desired state to the ingestion endpoint. The included GitHub Actions workflow runs it on every push to `main`; you can also run it locally from the root of your asset repository:

```bash
bash scripts/sync-catalog.sh
```

A successful ingestion returns `204 No Content`. If the submission is invalid, the request fails with a `4xx` status and **no** changes are applied — the ingestion is validated and applied as a single transaction. For the full list of status codes and error responses, see the Camunda Hub API reference _(documentation to be added)_.

## Sync assets from multiple repositories

If your element templates already live together in one repository, skip this section — Step 2 is all you need.

If they are spread across several repositories, add a step that consolidates them into the single repository you sync from. A common pattern is a CI/CD job in each source repository that copies its element templates and READMEs into a dedicated collection repository when a new version is created:

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

The collection repository then syncs to Hub exactly as described in [Step 2](#step-2-connect-the-repository-to-hub).

## Step 3: Handle asset lifecycle

### Unpublished assets

When you submit assets to the Catalog, any asset that **already exists in Hub but is not included in the submission** is automatically unpublished.

Unpublishing an asset means:

- **For delivery teams** (Web Modeler users): The asset is no longer discoverable in the Catalog and cannot be applied to new diagrams. Projects that already use the template continue to work as before.
- **For CoE members** (organization administrators): The asset stays visible so the CoE can track its remaining usage — which diagrams still reference the template — and drive the migration of those diagrams to a newer version or a different template before the asset is removed entirely.

:::info
Unpublishing is different from deprecation:

- **Unpublishing** is a Catalog-level state that indicates the asset is no longer part of the current submission. Use it when an asset should no longer be offered to delivery teams — for example, when you replace a connector with a successor and want to drive migration off the old one.
- **Deprecation** is a property within the element template file itself that flags a template as outdated while keeping it available. Use it to signal "still works, but prefer the alternative" without removing the asset from the Catalog.

:::

### Deleting assets

To permanently remove an asset from the Catalog, use the Camunda Hub API delete endpoint:

```
DELETE <camunda-hub-api-base-url>/api/v2/catalog/assets/{assetKey}
```

The token must have the `delete` permission. Deleting an asset removes it and all of its versions entirely: CoE members can no longer browse it, and its element template can no longer be resolved in diagrams. Values already configured on diagram elements remain in the BPMN file, but the template definition (labels, groupings, and validation) is no longer applied.

:::caution
Deletion is irreversible. Use it to correct mistakes or remove assets that should never have been published. For assets you want to phase out, prefer unpublishing or deprecation so that delivery teams have a clear migration path.
:::

## Step 4: Verify the Catalog in Hub

After your CI/CD pipeline runs successfully:

1. Open **Camunda Hub** and navigate to your workspace.
2. Browse the **Catalog** to confirm your assets appear with the correct version, description, and tags.
3. Open a BPMN diagram in the modeler and apply one of the published element templates to a task to verify it works as expected.

When a new version of an asset is published, delivery team members see an **Update** option on elements that use an older version of the template.

## Next steps

- Learn more about [element templates](/components/hub/workspace/modeler/element-templates/using-templates.md) and how to define them.
- Explore [managing element templates](/components/hub/workspace/modeler/element-templates/manage-element-templates.md) in the modeler.
- Set up additional CI/CD steps in your project repositories to deploy related collateral (job workers, BPMN processes, forms) to your Orchestration Clusters.
