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

- Set up a collection repository that aggregates element templates from your project repositories.
- Configure CI/CD pipelines to sync assets to the Hub Catalog.
- Verify that published assets appear in the Catalog for delivery teams to use.

## Prerequisites

- A Camunda 8 account with an active organization ([SaaS](https://signup.camunda.com/) or [Self-Managed](/self-managed/about-self-managed.md)).
- Client credentials with **Web Modeler API** permissions to access the Hub Catalog API. The credentials must include the **`create`** and **`update`** permissions, which the ingestion endpoint requires. See [Web Modeler API authentication](/apis-tools/web-modeler-api/authentication.md) for setup instructions.
- A git repository where your element templates are stored (for example, on GitHub, GitLab, or Bitbucket).
- A CI/CD pipeline configured for that repository (for example, GitHub Actions, GitLab CI, or Azure Pipelines).

## Understand the Catalog workflow

The Catalog connects your CoE's git-based development workflow to Hub:

1. Your CoE maintains element templates across one or more **project repositories**, each containing implementation details like job workers, BPMN processes, forms, and DMN decisions.
2. Element templates from all project repositories are pushed into a single **collection repository** via CI/CD.
3. When the collection repository is updated, a CI/CD pipeline calls the Hub Catalog API to submit the current state of all element templates.
4. Hub compares the submitted assets against its internal state and publishes new or updated versions automatically.
5. Delivery team members discover and apply the latest approved templates from the Catalog when modeling in Hub.

:::note
The Catalog supports a **single repository** as its source. If your CoE manages element templates across multiple project repositories, you must consolidate them into one collection repository before syncing to Hub.
:::

## Step 1: Set up a collection repository

Because the Catalog accepts a single repository as its source, set up a dedicated **collection repository** that aggregates element templates from all your project repositories.

### Project repositories

Your CoE likely maintains multiple project repositories, each containing the full implementation for a solution — including job workers, BPMN processes, forms, DMN decisions, and element templates. These repositories remain the source of truth for development.

To feed the Catalog, configure CI/CD in each project repository to copy its element templates (and their README files) into the collection repository whenever a new version is created (for example, on a tag, release, or push to `main`).

### Collection repository

The collection repository contains **only** element templates and their accompanying README files — no implementation details. Each asset is grouped in its own directory:

```
catalog-collection/
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

- **README.md**: A Markdown file with metadata in the frontmatter and a description in the body. The frontmatter references the single element template file and provides structured attributes like category and tags.
- **Element template file** (`.json`): The element template descriptor. The `id` and `version` fields in this file are authoritative for the asset's identity and version in the Catalog.

### Define the asset README

The README serves as the asset's metadata file. Hub detects an asset by the presence of a README with valid frontmatter:

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

Apply this template to a service task to configure a payment operation.
```

The Markdown content below the frontmatter is displayed as the asset description when browsing the Catalog in Hub.

:::info
All files referenced in the metadata (such as the element template) must be included in the API submission. If a referenced file is missing, the submission fails.
:::

### Version your element templates

The Catalog uses the `id` and `version` fields inside your element template JSON to track versions:

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

- If the template **content is identical** to the latest stored version, the asset is left unchanged (no new version is created).
- If the template **content has changed** and the `version` field has been **bumped**, a new version is published and becomes the new latest version.
- If the template **content has changed** but the `version` field is **unchanged**, the **entire submission is rejected** with a `400 Bad Request` — bump the version number first.

In addition, every `id` in a single submission must be unique. If two templates share the same `id`, the submission is rejected with a `400 Bad Request`.

:::caution
Always increment the `version` field when you change an element template's content. The Catalog API validates the whole submission as a single transaction: if any asset fails validation, **no** changes are applied (see [Step 2](#stage-2-sync-the-collection-repository-to-hub)).
:::

## Step 2: Set up CI/CD to sync assets

The CI/CD setup has two stages:

1. **Project repository → Collection repository**: Each project repository pushes its element templates and READMEs into the collection repository.
2. **Collection repository → Hub**: The collection repository submits all assets to the Hub Catalog API.

:::tip
Camunda provides an [example collection repository](https://github.com/camunda/catalog-collection-example) with a ready-to-use GitHub Actions workflow and sample assets you can use as a starting point.
:::

### Stage 1: Push element templates to the collection repository

In each project repository, add a CI/CD job that copies the element template and its README into the collection repository when a new version is created.

```yaml
# Example: GitHub Actions workflow in a project repository
name: Push templates to collection repo

on:
  push:
    branches: [main]

jobs:
  push-to-collection:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout project repository
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

### Stage 2: Sync the collection repository to Hub

In the collection repository, add a CI/CD job that authenticates with Camunda 8 and submits all assets to the Hub Catalog API whenever the repository is updated.

The job calls a single ingestion endpoint:

```
PUT <web-modeler-api-base-url>/v2/catalog/assets/ingestion
```

The request body is `multipart/form-data` and represents the **complete desired state** of your Catalog. For each asset, the request includes two parts:

- a `template` part containing the element template `.json` file, and
- a `readme` part containing the `README.md` file.

Each `README.md` is paired with the template it references through the `template:` value in its frontmatter, resolved relative to the README's directory. Because the submission is the full desired state, Hub **unpublishes** any asset that exists in the Catalog but is absent from the submission (see [Step 3](#step-3-handle-asset-lifecycle)).

**1. Configure CI/CD secrets**

Store your client credentials as secrets in your CI/CD system. For GitHub Actions, add them under **Settings > Secrets and variables > Actions**:

| Secret                          | Description                                                          |
| ------------------------------- | -------------------------------------------------------------------- |
| `CAMUNDA_CONSOLE_CLIENT_ID`     | Client ID of the credentials with `create` and `update` permissions. |
| `CAMUNDA_CONSOLE_CLIENT_SECRET` | Client secret (shown only once at creation).                         |

See [Web Modeler API authentication](/apis-tools/web-modeler-api/authentication.md) for how to create credentials and obtain a token in each environment.

**2. Add the GitHub Actions workflow**

The endpoint base URL and the token issuer differ between SaaS and Self-Managed:

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

```yaml
name: Sync Catalog to Hub

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  CAMUNDA_OAUTH_URL: https://login.cloud.camunda.io/oauth/token
  CAMUNDA_OAUTH_AUDIENCE: api.cloud.camunda.io
  CAMUNDA_CATALOG_BASE_URL: https://modeler.cloud.camunda.io/api/v2

jobs:
  sync-catalog:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Sync element templates to Hub Catalog
        env:
          CAMUNDA_CONSOLE_CLIENT_ID: ${{ secrets.CAMUNDA_CONSOLE_CLIENT_ID }}
          CAMUNDA_CONSOLE_CLIENT_SECRET: ${{ secrets.CAMUNDA_CONSOLE_CLIENT_SECRET }}
        run: bash scripts/sync-to-hub.sh
```

</TabItem>

<TabItem value='self-managed'>

In Self-Managed, tokens are issued by your [Management Identity](/self-managed/components/management-identity/authentication.md) instance instead of the Camunda SaaS login, there is no `audience`, and the Web Modeler API is served from your own installation (default `http://localhost:8070`). Adjust the URLs to match your installation.

```yaml
name: Sync Catalog to Hub

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  CAMUNDA_OAUTH_URL: http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token
  CAMUNDA_CATALOG_BASE_URL: http://localhost:8070/api/v2

jobs:
  sync-catalog:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Sync element templates to Hub Catalog
        env:
          CAMUNDA_CONSOLE_CLIENT_ID: ${{ secrets.CAMUNDA_CONSOLE_CLIENT_ID }}
          CAMUNDA_CONSOLE_CLIENT_SECRET: ${{ secrets.CAMUNDA_CONSOLE_CLIENT_SECRET }}
        run: bash scripts/sync-to-hub.sh
```

</TabItem>
</Tabs>

The `sync-to-hub.sh` script obtains an access token, discovers all asset directories (each containing a `README.md` and a `.json` template), builds the multipart request, and submits it to the ingestion endpoint. See the [example collection repository](https://github.com/camunda/catalog-collection-example) for the full script.

### What the API returns

A successful ingestion returns **`204 No Content`** with an empty body — there is no per-asset report. Use the HTTP status in your CI/CD pipeline to decide whether the sync succeeded.

If the submission is invalid, the request fails and **no** changes are applied (the ingestion is rolled back as a whole):

| Status             | Meaning                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `204 No Content`   | Ingestion succeeded. New and updated assets are published; assets absent from the submission are unpublished.                 |
| `400 Bad Request`  | Validation failed — for example, invalid template JSON, changed content without a version bump, or a duplicate template `id`. |
| `401 Unauthorized` | No valid access token was provided.                                                                                           |
| `404 Not Found`    | The token is missing the required `create`/`update` permissions.                                                              |

## Step 3: Handle asset lifecycle

### Unpublished assets

When you submit assets to the Catalog, any asset that **already exists in Hub but is not included in the submission** is automatically unpublished.

Unpublishing an asset means:

- **For delivery teams** (Web Modeler users): The asset no longer appears in the Catalog and cannot be applied to **new** diagrams. Diagrams that already use the template are unaffected and keep their properties — there is **no** in-diagram notification that the asset was unpublished.
- **For CoE members** (organization administrators): The asset remains visible (for example, in a dedicated view) along with its usage information, such as which diagrams still reference the template.

:::info
Unpublishing is different from deprecation. Deprecation is a property within the element template file itself. Unpublishing is a Catalog-level state that indicates the asset is no longer part of the current submission.
:::

### Deleting assets

To permanently remove an asset from the Catalog, use the delete API. Deleting an asset removes it entirely — CoE members can no longer browse it, and element template properties are no longer accessible in diagrams.

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
