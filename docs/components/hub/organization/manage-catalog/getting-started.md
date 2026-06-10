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
- Client credentials with **Web Modeler API** permissions to access the Hub Catalog API. The credentials must include the **`create`** and **`update`** permissions, which the ingestion endpoint requires. See [Web Modeler API authentication](/apis-tools/web-modeler-api/authentication.md) for setup instructions.
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
Always increment the `version` field when you change an element template's content. The Catalog API validates the whole submission as a single transaction: if any asset fails validation, **no** changes are applied (see [Step 2](#step-2-connect-the-repository-to-hub)).
:::

## Step 2: Connect the repository to Hub

This is the core of the setup. Add a CI/CD job to your repository that authenticates with Camunda 8 and submits the current set of element templates to the Hub Catalog API whenever the repository changes.

:::tip
Camunda provides an [example collection repository](https://github.com/camunda/catalog-collection-example) with a ready-to-use GitHub Actions workflow and sample assets you can use as a starting point.
:::

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
