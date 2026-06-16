---
id: migrate-from-web-modeler-to-hub-api
title: Migrate from Web Modeler to the Camunda Hub API
description: "Learn how to migrate from Web Modeler API v1 to the new Camunda Hub API v2 to manage Camunda Hub resources."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

:::warning Deprecation notice
Web Modeler API v1 is deprecated in Camunda 8.10 and will be removed in 8.12. Migrate to [Camunda Hub API v2](/apis-tools/hub-api-sm/overview.md) before upgrading to 8.12.
:::

## About

Web Modeler API v1 was the REST API for Web Modeler, a standalone product for modeling and managing process diagrams. It exposed resources like projects, folders, files, and collaborators as they existed within Web Modeler.

[Camunda Hub API v2](/apis-tools/hub-api-sm/overview.md) is the successor API for the broader Camunda Hub platform. Camunda Hub unifies organizational management, workspace governance, and process modeling into a single platform. As a result, the conceptual model and architecture of the API have changed.

## General changes

The following sections cover changes that apply across the entire API, regardless of which resource you're working with. Review these before making any endpoint-specific changes.

### Base URLs

The base URL has changed for both SaaS and Self-Managed deployments. Update any hardcoded URLs or environment variables in your integration.

| Environment  | Web Modeler API v1                        | Camunda Hub API v2                    |
| ------------ | ----------------------------------------- | ------------------------------------- |
| SaaS         | `https://modeler.cloud.camunda.io/api/v1` | `https://hub.cloud.camunda.io/api/v2` |
| Self-Managed | `http://localhost:8070/api/v1`            | `http://localhost:8088/api/v2`        |

In Camunda 8 Self-Managed, the URLs depend on your configuration. The URLs and ports provided in this table are examples based on a [no-domain Helm deployment to a local kind cluster](/self-managed/deployment/helm/cloud-providers/kind.md#no-domain-mode-deployment).

### Authentication

See the [Camunda Hub API authentication guide](/apis-tools/hub-api-sm/authentication.md) for setup instructions.

### Error responses

In v2, all error responses use the [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) `ProblemDetail` format with `Content-Type: application/problem+json`.

```json
{
  "type": "https://docs.camunda.io/api/v2.0/problem-types/bad-request",
  "title": "Bad Request",
  "status": 400,
  "detail": "Request property [name] must not be blank",
  "instance": "/v2/files"
}
```

### Pagination

In Web Modeler API v1, you used two fields to paginate items in a response:

- `page` specified the page to return.
- `size` specified the number of items per page.

For example:

```json
{
  "page": 2,
  "size": 20
}
```

This request skips the first _page_ of 20 items (indexes 0–19) and returns the second page of 20 items (indexes 20–39). If there aren't enough items to fill the second page, you receive all remaining items.

In Camunda Hub API v2, you use a `page` object with two fields:

- `page.from` specifies the offset, the item index to start from.
- `page.limit` limits the number of items returned.

For example:

```json
{
  "page": {
    "from": 20,
    "limit": 20
  }
}
```

Instead of specifying the number of pages to skip, you specify the index to start _from_ (20) and the maximum number, or _limit_, of items to return (20). This request returns the items at indexes 20–39. As in v1, if there are fewer items than the limit, you receive all remaining items.

In addition to the different pagination model, the default page size has changed. In v1, the default page size was 10. In v2, the default limit is 100.

### Projects

In v1, _projects_ were the top-level container for files and folders. In v2, _workspaces_ are a new organizational level above projects. Files still belong to _projects_, which now live inside a workspace. You can read more in the [Camunda Hub workspace documentation](/components/hub/workspace/index.md).

### Key fields

In v1, resources were identified by `Id` fields. In v2, resources are identified by `Key` fields. For example, `folderId` is now `folderKey`. Despite the name change, the _values_ of these identifiers are the same. For example, you can use a `folderId` obtained from Web Modeler API v1 as a `folderKey` in Camunda Hub API v2.

## Files API

The files API in v2 renames fields and includes minor implementation changes in every endpoint.

### Endpoint mapping

All v1 files endpoints have a direct v2 equivalent:

| Operation     | Web Modeler API v1          | Camunda Hub API v2           |
| ------------- | --------------------------- | ---------------------------- |
| Create a file | `POST /v1/files`            | `POST /v2/files`             |
| Get a file    | `GET /v1/files/{fileId}`    | `GET /v2/files/{fileKey}`    |
| Update a file | `PATCH /v1/files/{fileId}`  | `PATCH /v2/files/{fileKey}`  |
| Delete a file | `DELETE /v1/files/{fileId}` | `DELETE /v2/files/{fileKey}` |
| Search files  | `POST /v1/files/search`     | `POST /v2/files/search`      |

### Create a file

| Web Modeler API v1 | Camunda Hub API v2 | Notes                                                                                               |
| ------------------ | ------------------ | --------------------------------------------------------------------------------------------------- |
| `projectId`        | `projectKey`       | Renamed and now required. This refers to a project within a Camunda Hub workspace.                  |
| `folderId`         | `folderKey`        | Renamed.                                                                                            |
| `fileType`         | `type`             | Renamed. `connector_template` is no longer supported. `element_template` is now `element-template`. |

### Get a file

The v1 response returned a nested structure, with `metadata` and `content` as separate top-level fields. The v2 response is a flat object.

### Update a file

| Web Modeler API v1 | Camunda Hub API v2 | Notes                                                                                                                                                    |
| ------------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `folderId`         | `folderKey`        | Renamed.                                                                                                                                                 |
| `projectId`        | `projectKey`       | Renamed. Use to move files between projects within a Camunda Hub workspace.                                                                              |
| `revision`         | `revision`         | Now required. Fetch the current revision from a get or create response, and include it in your update request to prevent overwriting concurrent changes. |

### Search files

| Web Modeler API v1 | Camunda Hub API v2           | Notes                                                                 |
| ------------------ | ---------------------------- | --------------------------------------------------------------------- |
| `filter`           | `filter`                     | Now supports advanced operators, including `$eq`, `$in`, and `$like`. |
| `total` (response) | `page.totalItems` (response) | Moved into the `page` response object.                                |

`content` is `null` on all items in the search response. Fetch individual files to retrieve content.

### File response fields

Only changed fields are listed:

| v1 field        | v2 field        | Notes                                                       |
| --------------- | --------------- | ----------------------------------------------------------- |
| `id`            | `fileKey`       | Renamed.                                                    |
| `projectId`     | `projectKey`    | Renamed.                                                    |
| `folderId`      | `folderKey`     | Renamed.                                                    |
| `canonicalPath` | `canonicalPath` | In v1, `canonicalPath` was an object. In v2, it's a string. |
