---
id: migrate-from-web-modeler-to-hub-api
title: Migrate from Web Modeler to the Camunda Hub API
description: "Learn how to migrate from Web Modeler API v1 to the new Camunda Hub API v2 to manage Camunda Hub resources."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

:::warning Deprecation notice
The Web Modeler API v1 is deprecated in Camunda 8.10 and will be removed in 8.12. Migrate to the [Camunda Hub API v2](/apis-tools/hub-api-rest/overview.md) before upgrading to 8.12.
:::

## About

The Web Modeler API v1 is the REST API for Web Modeler, a standalone product for modeling and managing process diagrams. It exposed resources like projects, folders, files, and collaborators as they existed within Web Modeler.

The [Camunda Hub API v2](/apis-tools/hub-api-rest/overview.md) is the successor API for the broader Camunda Hub platform. Camunda Hub unifies organizational management, workspace governance, and process modeling into a single platform. As a result, the conceptual model and architecture of the API have changed:

- In v1, _projects_ were the top-level container for files and folders. In v2, _workspaces_ are a new organizational level above projects. Files still belong to _projects_, which now live inside a workspace. You can read more in the [Camunda Hub workspace documentation](/components/hub/workspace/index.md).
- In v1, resources were identified by `id` fields. In v2, resources are identified by `key` fields (Examples include `fileKey`, `projectKey`, and `folderKey`).
- Update operations in v2 require a `revision` field. Fetch the current revision from a get or create response and include it in your update request to prevent overwriting concurrent changes.
- All error responses in v2 use the [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) `ProblemDetail` format instead of ad-hoc error objects.

## General changes

The following sections cover changes that apply across the entire API, regardless of which resource you're working with. Review these before making any endpoint-specific changes.

### Terminology

Several core concepts have been renamed or reorganized between v1 and v2. Use this table to map v1 terms to their v2 equivalents before updating your code.

| Web Modeler API v1 | Camunda Hub API v2                                                                                                        | Notes                                                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project            | [Workspace](/components/hub/workspace/index.md) + [Project](/components/hub/workspace/manage-projects/manage-projects.md) | v2 introduces workspaces as a new level above projects. v1 projects map to v2 projects; workspaces are a new grouping above them. Files still use `projectKey`. |
| `<resource>Id`     | `<resource>Key`                                                                                                           | Identifiers are now named with a `Key` suffix. For example, `folderKey` instead of `folderId`. The underlying values have not changed, only the names.          |

### Base URLs

The base URL has changed for both SaaS and Self-Managed deployments. Update any hardcoded URLs or environment variables in your integration.

| Environment  | Web Modeler API v1                        | Camunda Hub API v2                    |
| ------------ | ----------------------------------------- | ------------------------------------- |
| SaaS         | `https://modeler.cloud.camunda.io/api/v1` | `https://hub.cloud.camunda.io/api/v2` |
| Self-Managed | `http://localhost:8070/api/v1`            | `http://localhost:8088/api/v2`        |

### Authentication

See the [Camunda Hub API authentication guide](/apis-tools/hub-api-rest/authentication.md) for setup instructions.

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

On success, this endpoint now returns `201 Created`. Web Modeler API v1 returned `200 OK`.

### Get a file

The v1 response returned a nested structure, with `metadata` and `content` as separate top-level fields. The v2 response is a flat object.

### Update a file

| Web Modeler API v1 | Camunda Hub API v2 | Notes                                                           |
| ------------------ | ------------------ | --------------------------------------------------------------- |
| `folderId`         | `folderKey`        | Renamed.                                                        |
| `projectId`        | `projectKey`       | Renamed. Use to move files between projects within a workspace. |
| `revision`         | `revision`         | Now required.                                                   |

### Search files

The request and response structures for the [search files endpoint](/apis-tools/hub-api-rest/specifications/search-files.api.mdx) have changed significantly.

| Web Modeler API v1 | Camunda Hub API v2           | Notes                                                                                 |
| ------------------ | ---------------------------- | ------------------------------------------------------------------------------------- |
| `filter`           | `filter`                     | Now supports advanced operators, including `$eq`, `$in`, and `$like`, for each field. |
| `total` (response) | `page.totalItems` (response) | Moved into the `page` response object.                                                |

In v1, `page` specified the page to return, and `size` specified the number of items per page. In v2, `page` is an object supporting limit/offset pagination:

- `page.from` specifies the offset, the item index to start searching from.
-

|
| `size` | `page.limit` | Default and maximum page size increased. (integer, default 100, max 10,000) |

`content` is `null` on all items in the search response. Fetch individual files to retrieve content. Adds `403 Forbidden`. Removes `404 Not Found`.

### File response fields

Only changed fields are listed. See the [API reference](/apis-tools/hub-api-rest/specifications/get-file.api.mdx) for the full schema.

| v1 field    | v2 field     | Notes                                                                                                           |
| ----------- | ------------ | --------------------------------------------------------------------------------------------------------------- |
| `id`        | `fileKey`    | Renamed.                                                                                                        |
| `projectId` | `projectKey` | Renamed.                                                                                                        |
| `folderId`  | `folderKey`  | Renamed.                                                                                                        |
| `type`      | `type`       | Unchanged in the response. Note: the v1 _request_ field was named `fileType`; the response already used `type`. |
