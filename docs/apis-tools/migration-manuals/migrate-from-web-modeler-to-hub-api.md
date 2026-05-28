---
id: migrate-from-web-modeler-to-hub-api
title: Migrate from Web Modeler to the Camunda Hub API
description: "Learn how to migrate from Web Modeler API v1 to the new Camunda Hub API v2 to manage Camunda Hub resources."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

:::warning Deprecation notice
The Web Modeler API v1 is deprecated in Camunda 8.10 and will be removed in 8.12. Migrate to the [Camunda Hub REST API v2](/apis-tools/hub-api-rest/overview.md) before upgrading to 8.12.
:::

## About

The Web Modeler API v1 was the REST API for Web Modeler, a standalone product for modeling and managing process diagrams. It exposed resources like projects, folders, files, and collaborators as they existed within Web Modeler.

The [Camunda Hub REST API v2](/apis-tools/hub-api-rest/overview.md) is the successor API for the broader Camunda Hub platform. Camunda Hub unifies organizational management, workspace governance, and process modeling into a single platform. As a result, the conceptual model and architecture of the API have changed:

- In v1, _projects_ were the top-level container for files and folders. In v2, that concept is renamed to _workspaces_ — what was a project in v1 is now a workspace. Within a workspace, you can also create _projects_, a new organizational unit for grouping related files. Workspaces are managed by your organization's center of excellence team. You can read more about workspaces in the [Camunda Hub workspace documentation](/components/hub/workspace/index.md).
- In v1, resources were identified by `id` fields. In v2, resources are identified by `key` fields (Examples include `fileKey`, `workspaceKey`, and `folderKey`).
- Update operations in v2 require a `revision` field. Fetch the current revision from a get or create response and include it in your update request to prevent overwriting concurrent changes.
- All error responses in v2 use the [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) `ProblemDetail` format instead of ad-hoc error objects.

## General changes

The following sections cover changes that apply across the entire API, regardless of which resource you're working with. Review these before making any endpoint-specific changes.

### Terminology

Several core concepts have been renamed or reorganized between v1 and v2. Use this table to map v1 terms to their v2 equivalents before updating your code.

| Web Modeler API v1     | Camunda Hub API v2                                                        | Notes                                                                                                                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Project                | [Workspace](/components/hub/workspace/index.md)                           | The top-level container, renamed. What was a project in v1 is now a workspace in v2. Workspaces are provisioned by organization administrators rather than created by any user. Files reference a `workspaceKey` instead of a `projectId`. |
| Folder                 | Folder                                                                    | Unchanged concept. Folder references use `folderKey` instead of `folderId`.                                                                                                                                                                |
| `id` (on any resource) | `<resource>Key` (for example, `fileKey`, `workspaceKey`, and `folderKey`) | Identifiers are now named with a `Key` suffix. The underlying values remain stable UUIDs; only the field name has changed.                                                                                                                 |

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

| Web Modeler API v1 | Camunda Hub API v2 | Notes                                                                                                     |
| ------------------ | ------------------ | --------------------------------------------------------------------------------------------------------- |
| `projectId`        | `workspaceKey`     | Renamed. Now required. References a [workspace](/components/hub/workspace/index.md) instead of a project. |
| `folderId`         | `folderKey`        | Renamed.                                                                                                  |
| `fileType`         | `type`             | Renamed. `connector_template` is no longer supported. `element_template` is now `element-template`.       |

On success, this endpoint now returns `201 Created`. Web Modeler API v1 returned `200 OK`.

### Get a file

The v1 response returned a nested structure, with `metadata` and `content` as separate top-level fields. The v2 response is a flat object.

### Update a file

| Web Modeler API v1    | Camunda Hub API v2    | Notes                                                                  |
| --------------------- | --------------------- | ---------------------------------------------------------------------- |
| `folderId`            | `folderKey`           | Renamed.                                                               |
| `projectId`           | —                     | Removed. Moving files between workspaces is not supported via the API. |
| `revision` (optional) | `revision` (required) | Now required.                                                          |

`409 Conflict` and `403 Forbidden` existed in v1 and are unchanged. Adds `401 Unauthorized`.

### Delete a file

| Web Modeler API v1        | Camunda Hub API v2         | Notes    |
| ------------------------- | -------------------------- | -------- |
| `fileId` (path parameter) | `fileKey` (path parameter) | Renamed. |

Adds `403 Forbidden`. Returns `204 No Content` on success, `404 Not Found` if the file does not exist.

### Search files

[Search files](/apis-tools/hub-api-rest/specifications/search-files.api.mdx) is also a `POST` endpoint in v1, but the request and response structures have changed significantly.

| Web Modeler API v1                   | Camunda Hub API v2                              | Notes                                                                          |
| ------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------ |
| `filter` (FileMetadataDto object)    | `filter` (structured filter object)             | v2 filter supports advanced operators (`$eq`, `$in`, `$like`, etc.) per field. |
| `page` (integer, 0-indexed)          | `page` (object)                                 | v2 uses an object supporting both offset-based and cursor-based pagination.    |
| `size` (integer, default 10, max 50) | `page.limit` (integer, default 100, max 10,000) | Default and maximum page size increased.                                       |
| `total` (response)                   | `page.totalItems` (response)                    | Moved into the `page` response object.                                         |

`content` is `null` on all items in the search response. Fetch individual files to retrieve content. Adds `403 Forbidden`. Removes `404 Not Found`.

### File response fields

Only changed fields are listed. See the [API reference](/apis-tools/hub-api-rest/specifications/get-file.api.mdx) for the full schema.

| v1 field    | v2 field       | Notes                                                                                                           |
| ----------- | -------------- | --------------------------------------------------------------------------------------------------------------- |
| `id`        | `fileKey`      | Renamed.                                                                                                        |
| `projectId` | `workspaceKey` | Renamed; references a workspace.                                                                                |
| `folderId`  | `folderKey`    | Renamed.                                                                                                        |
| `type`      | `type`         | Unchanged in the response. Note: the v1 _request_ field was named `fileType`; the response already used `type`. |
