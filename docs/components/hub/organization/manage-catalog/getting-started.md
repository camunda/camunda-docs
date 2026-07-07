---
id: getting-started-catalog
title: Get started with the catalog
description: "Set up a reusable asset catalog in Camunda Hub by syncing element templates from your Git repository using CI/CD."
keywords: [catalog, element templates, hub, getting started]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Set up your repository and CI/CD pipelines to publish assets to the Camunda Hub catalog.

## About the catalog workflow

With the following workflow, you can manage and use assets in the Camunda Hub catalog:

1. Store element templates and their metadata in a Git repository.
2. Create a CI/CD pipeline to submit the complete set of element templates to the Camunda Hub catalog API every time the assets change.
3. Camunda Hub compares the submission against its stored state and publishes applicable changes.
4. When modeling in Camunda Hub, delivery teams discover and apply the latest templates from the catalog.

This guide covers steps one and two of this workflow.

## Prerequisites

You need these prerequisites before following the steps in this guide:

- A Camunda 8 [SaaS](https://signup.camunda.com/) or [Self-Managed](/self-managed/about-self-managed.md) account with an active organization.
- A Git repository where you'll store your element templates.
- CI/CD infrastructure for that repository.

This guide assumes you store your catalog assets in a single repository. If you store your assets across several repositories, [consolidate them into one repository](/components/hub/organization/manage-catalog/sync-multiple-repositories.md) before publishing them.

## Use the example repository

To get started, use the [example catalog repository](https://github.com/camunda/catalog-template). It contains:

- Placeholder element templates.
- A ready-to-use [sync script](https://github.com/camunda/catalog-template/blob/main/scripts/sync-catalog.sh).
- A [GitHub Actions workflow](https://github.com/camunda/catalog-template/blob/main/.github/workflows/sync-catalog.yml) that submits the full state on every push to `main`.

The rest of this guide assumes you're using the sync script and GitHub Actions workflow from this example repository.

## Organize your assets

Within your Git repository, each asset is grouped in its own directory. For example:

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

The asset directories don't have to be at the repository root. The [sync script](https://github.com/camunda/catalog-template/blob/main/scripts/sync-catalog.sh) discovers them wherever they are, so you can nest them under a subfolder alongside other content.

Each asset directory contains exactly two files:

- **README.md**: A Markdown file with metadata in the frontmatter and a description in the body. The frontmatter references the element template file and provides optional attributes like category and tags.
- **Element template file**: The [element template descriptor](/components/modeler/element-templates/defining-templates.md). The `id` and `version` fields in this file are authoritative for the asset's identity and version in the catalog. The asset name, short description, and icon are also read from this file.

The sync script only looks at these two files; any other files in the repository are ignored.

:::note
Only the README and element template file are published to the catalog. The asset's implementation—such as the connector code, job workers, or BPMN files—stays in your repository as the source of truth and is deployed to your cluster through your own deployment pipeline. The catalog holds the element template and its description; it does not run or deploy the underlying implementation.
:::

### Define the asset README

The README is the asset's metadata file. Camunda Hub detects an asset by the presence of a README with valid frontmatter:

| Field      | Type            | Required | Description                                                                                                              |
| ---------- | --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `template` | string          | Yes      | File name of the element template in the same directory. If the file is missing, the submission fails.                   |
| `category` | string          | No       | Groups the asset under a single category for filtering in the catalog. If omitted, the asset won't belong to a category. |
| `tags`     | list of strings | No       | Tags used to search and filter assets in the catalog. If omitted, the asset will have no tags.                           |

Other information about the asset, such as its name, short description, and icon are _not_ set in the frontmatter. They come from the `name`, `description`, and `icon` fields of the element template file.

The Markdown content below the frontmatter is displayed as the asset description when browsing the catalog in Hub.

Here's a full example `README.md`:

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

The README supports Markdown text only. Embedded images and videos are not supported at this time.

### Version your element templates

The catalog uses the `id` and `version` fields inside your element template definition to track versions:

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

While `version` is [optional in the element template schema](/components/modeler/element-templates/defining-templates.md#optional-keys), the catalog _requires_ it. A template submitted without a `version` is rejected.

When you submit assets to the catalog API, Camunda Hub compares each submitted template against the latest stored version with the same `id`:

- If the template **content is identical** to the latest stored version, no new version is created. Changes to the README, including the description, category, and tags, are still applied to the asset.
- If the template **content has changed**, and the `version` field is **greater** than the latest stored version, a new version is published as the latest version.
- If the template **content has changed**, but the `version` field is **less than or equal to** the latest stored version, the **entire submission is rejected** with a `400 Bad Request`. The version must always increase. Reusing an older or equal number is not allowed, even if no other asset uses it.

Additionally, every `id` in a single submission must be unique. If two templates share the same `id`, the entire submission is rejected with a `400 Bad Request`.

:::warning
Always increment the `version` when you change an element template's content. The catalog API validates the whole submission as a single transaction. If any asset fails validation, _no_ changes are applied.
:::

### Enforce version increments in CI

Rather than relying on reviewers to catch a missing version bump, validate it automatically before the submission ever reaches the catalog. Add a check to your CI pipeline that compares each changed element template against its previous state and fails the pull request when the content changed but the `version` field did not increase.

The example repository includes a [version-check GitHub Actions workflow](https://github.com/camunda/catalog-template/blob/main/.github/workflows/check-versions.yml) that runs on every pull request, so a template change with a stale `version` is caught before it is merged and synced. You can bypass the check for intentional exceptions by adding the `skip-version-check` label to the pull request.

## Connect the repository to Hub

Use a CI/CD job in your repository to authenticate with the Camunda Hub API and submit the current set of element templates to the catalog whenever the repository changes.

The [job](https://github.com/camunda/catalog-template/blob/main/.github/workflows/sync-catalog.yml) calls a single ingestion endpoint:

```
PUT <camunda-hub-api-base-url>/api/v2/catalog/assets/ingestion
```

The request body is `multipart/form-data` and represents the **complete desired state** of the catalog. For each asset, the request includes two parts:

- `readme`: The `README.md` file.
- `template`: The element template `.json` file

:::tip
For the full request and response schema, see the **Ingest catalog assets** reference for [SaaS](/apis-tools/hub-api-saas/specifications/ingest-catalog-assets.api.mdx) and [Self-Managed](/apis-tools/hub-api-sm/specifications/ingest-catalog-assets.api.mdx).
:::

Because the submission represents the full desired state, Camunda Hub [unpublishes](./manage-asset-lifecycle.md#unpublish-an-asset) any asset that exists in the catalog but is absent from the submission.

### Provide credentials and configuration

Create and store client credentials securely—for example, as CI/CD secrets—and expose them with environment-specific URLs as environment variables. The token issuer and the Camunda Hub API base URL differ between SaaS and Self-Managed:

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

```bash
export CAMUNDA_CONSOLE_CLIENT_ID="<client-id>"
export CAMUNDA_CONSOLE_CLIENT_SECRET="<client-secret>"
export CAMUNDA_OAUTH_URL="https://login.cloud.camunda.io/oauth/token"
export CAMUNDA_CONSOLE_OAUTH_AUDIENCE="api.cloud.camunda.io"
export CAMUNDA_HUB_REST_URL="https://hub.cloud.camunda.io"
```

Follow the [Camunda Hub API authentication guide](/apis-tools/hub-api-saas/authentication.md) to create credentials with the required `create` and `update` permissions.

</TabItem>

<TabItem value='self-managed'>

In Self-Managed, tokens are issued by your [Management Identity](/self-managed/components/management-identity/authentication.md) instance. There is no `audience`, and the Camunda Hub API is served from your own installation. The example URLs below use the local defaults (`http://localhost:8088` for the API). In a Helm/Kubernetes deployment, use the service or ingress host configured for Camunda Hub instead. Adjust all URLs to match your installation:

```bash
export CAMUNDA_CONSOLE_CLIENT_ID="<client-id>"
export CAMUNDA_CONSOLE_CLIENT_SECRET="<client-secret>"
export CAMUNDA_OAUTH_URL="http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token"
export CAMUNDA_HUB_REST_URL="http://localhost:8088"
```

Follow the [Camunda Hub API authentication guide](/apis-tools/hub-api-sm/authentication.md) to create credentials with the required `create` and `update` permissions.

</TabItem>
</Tabs>

### Run the sync

The sync script in the example repository:

1. Obtains an access token.
2. Discovers each [asset directory](#organize-your-assets).
3. Builds the multipart request.
4. Submits the full desired state to the ingestion endpoint.

The included GitHub Actions workflow syncs the catalog on every push to `main`. You can also run it locally from the root of your asset repository:

```bash
bash scripts/sync-catalog.sh
```

A successful ingestion returns `204 No Content`. If the submission is invalid, the request fails with a `4xx` status, and no changes are applied; the ingestion is validated and applied as a single transaction.

For the full list of status codes and error responses, see the **Ingest catalog assets** reference for [SaaS](/apis-tools/hub-api-saas/specifications/ingest-catalog-assets.api.mdx) or [Self-Managed](/apis-tools/hub-api-sm/specifications/ingest-catalog-assets.api.mdx).

## Verify the catalog in Hub

After your CI/CD pipeline runs successfully:

1. Open Camunda Hub, and navigate to your workspace.
2. Browse the catalog to confirm your assets appear with the correct version, description, and tags.
3. Open a BPMN diagram in the modeler, and apply one of the published element templates to a task to verify it works as expected.

When you publish a new version of an asset, an **Update** option is displayed in the modeler on elements that use an older version of the template.

## Next steps

- [Manage the asset lifecycle](/components/hub/organization/manage-catalog/manage-asset-lifecycle.md) — unpublish and delete catalog assets.
- [Sync assets from multiple repositories](/components/hub/organization/manage-catalog/sync-multiple-repositories.md) — consolidate templates from several repositories before syncing.
- [Use catalog assets in Hub](/components/hub/workspace/modeler/element-templates/use-catalog-assets.md) — learn how delivery teams discover and apply published assets while modeling.
