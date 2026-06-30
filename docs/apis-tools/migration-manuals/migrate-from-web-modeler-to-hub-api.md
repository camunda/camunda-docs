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

## Deprecation timeline

| Version  | Action                                                                                                                                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **8.10** | Camunda Hub API v2 ships alongside Web Modeler API v1. Web Modeler API v1 is marked as **deprecated**, and all responses include `Deprecation`, `Sunset`, and `Link` HTTP headers. The v1 OpenAPI spec is marked `deprecated: true`. |
| **8.11** | Web Modeler API v1 remains available but is not extended. No new features are added to deprecated endpoints.                                                                                                                         |
| **8.12** | Web Modeler API v1 endpoints are removed. Applications still using v1 receive `404`.                                                                                                                                                 |

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

In Web Modeler API v1, error responses used a custom format:

```json title="Web Modeler API v1"
{
  "message": "File not found",
  "status": 404
}
```

In Camunda Hub API v2, all error responses use the [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) "problem detail" format with `Content-Type: application/problem+json`:

```json title="Camunda Hub API v2"
{
  "type": "about:blank",
  "title": "Not Found",
  "status": 404,
  "detail": "File with key 'abc-123' not found.",
  "instance": "/api/v2/files/abc-123"
}
```

This format includes the following fields:

| Field      | Description                                              |
| ---------- | -------------------------------------------------------- |
| `type`     | URI identifying the problem type (usually `about:blank`) |
| `title`    | Short human-readable summary                             |
| `status`   | HTTP status code                                         |
| `detail`   | Explanation with actionable guidance                     |
| `instance` | URI of the request that caused the error                 |

Validation errors include an additional `violations` array:

```json title="Camunda Hub API v2"
{
  "type": "about:blank",
  "title": "Bad Request",
  "status": 400,
  "detail": "Validation failed for request body.",
  "instance": "/api/v2/files",
  "violations": [{ "field": "name", "message": "must not be blank" }]
}
```

### Pagination

Offset pagination in Camunda Hub API v2 is different from Web Modeler API v1. Additionally, v2 introduces cursor pagination.

#### Offset pagination

In Web Modeler API v1, you used two fields to paginate items in a response:

- `page` specified the page to return.
- `size` specified the number of items per page.

For example:

```json title="Web Modeler API v1"
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

```json title="Camunda Hub API v2"
{
  "page": {
    "from": 20,
    "limit": 20
  }
}
```

Instead of specifying the number of pages to skip, you specify the index to start _from_ (20) and the maximum number, or _limit_, of items to return (20). This request returns the items at indexes 20–39. As in v1, if there are fewer items than the limit, you receive all remaining items.

In addition to the different pagination model, the default page size has changed. In v1, the default page size was 10. In v2, the default limit is 100.

#### Cursor pagination

In addition to offset pagination, Camunda Hub API v2 offers cursor pagination. With cursor pagination, you use a `page` object with two fields:

- `page.after` specifies the cursor to start from. You receive this from a prior response.
- `page.limit` limits the number of items returned.

```json title="Camunda Hub API v2"
{
  "page": {
    "after": "{endCursor from previous response}",
    "limit": 20
  }
}
```

With cursor pagination, you specify the _cursor_ to start from and the maximum number, or _limit_, of items to return (20). This request returns the next 20 items after the cursor. If there are fewer items than the limit, you receive all remaining items.

#### Paginated responses

Paginated responses in Camunda Hub API v2 have the following changes:

| Web Modeler API v1 | Camunda Hub API v2       | Notes                                                         |
| ------------------ | ------------------------ | ------------------------------------------------------------- |
| `page`             | -                        | Removed                                                       |
| `size`             | -                        | Removed                                                       |
| `total`            | `page.totalItems`        | Moved into the `page` object                                  |
| -                  | `page.hasMoreTotalItems` | New field                                                     |
| -                  | `page.startCursor`       | New field. Start cursor for [pagination](#cursor-pagination). |
| -                  | `page.endCursor`         | New field. End cursor for [pagination](#cursor-pagination).   |

### Projects renamed to workspaces

In Web Modeler API v1, _projects_ were the top-level container for files and folders:

```
Organization
└─ Project        # top-level container
   ├─ Folder
   │   ├─ File
   │   └─ Folder  # nested
   └─ File        # root-level

```

In Camunda Hub API v2, _workspaces_ are a new organizational level above projects:

```
Organization
└─ Workspace         # new top-level container, groups projects
   ├─ Project        # same as v1 project, now inside a workspace
   │  ├─ Folder
   │  │   ├─ File
   │  │   └─ Folder  # nested
   │  └─ File        # root-level
   └─ Project
      └─ File        # root-level
```

In the workspace API, the v1 `projectId` is now called the v2 `workspaceKey`. The same UUID works in both. In files and folders, the v1 `projectId` maps to the v2 `projectKey`.

### Date filters

Web Modeler API v1 supports a custom date precision syntax that encodes a comparison operator, timestamp, and truncation unit into a single string. Camunda Hub API v2 drops this encoding in favor of explicit operators. You compute period boundaries yourself.

The following examples show equivalent date filters in Web Modeler API v1 and Camunda Hub API v2:

| Web Modeler API v1        | Camunda Hub API v2                                                       | Explanation                          |
| ------------------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| `2023-09-20T...Z\|\|/y`   | `{ "$gte": "2023-01-01T00:00:00Z", "$lte": "2023-12-31T23:59:59.999Z" }` | Within year 2023                     |
| `2023-09-20T...Z\|\|/M`   | `{ "$gte": "2023-09-01T00:00:00Z", "$lte": "2023-09-30T23:59:59.999Z" }` | Within September 2023                |
| `>=2023-09-20T...Z\|\|/y` | `{ "$gte": "2023-01-01T00:00:00Z" }`                                     | On or after start of 2023            |
| `<2023-09-20T...Z\|\|/M`  | `{ "$lt": "2023-09-01T00:00:00Z" }`                                      | Before September 2023                |
| `2023-09-20T11:31:20Z`    | `{ "$eq": "2023-09-20T11:31:20Z" }`                                      | Exact match                          |
| `>=2023-09-20T11:31:20Z`  | `{ "$gte": "2023-09-20T11:31:20Z" }`                                     | On or after a specific date and time |

The following date filter operators are available in Camunda Hub API v2:

| Operator | Description                 |
| -------- | --------------------------- |
| `$eq`    | Equals (same as v1 default) |
| `$gt`    | Greater than                |
| `$gte`   | Greater than or equal to    |
| `$lt`    | Less than                   |
| `$lte`   | Less than or equal to       |

### Search filters

Web Modeler API v1 uses equality-only filters, except for dates:

```json title="Web Modeler API v1"
{
  "filter": {
    "name": "my-process",
    "type": "bpmn"
  }
}
```

Camunda Hub API v2 replaces these with an explicit operator set:

```json title="Camunda Hub API v2"
{
  "filter": {
    "name": { "$eq": "my-process" },
    "type": { "$in": ["bpmn"] }
  }
}
```

The following filter operators are available in Camunda Hub API:

| Operator         | Description                             | Example                                                                     |
| ---------------- | --------------------------------------- | --------------------------------------------------------------------------- |
| `$eq`            | Equals (same as v1 default)             | `{ "name": { "$eq": "my-process" } }`                                       |
| `$neq`           | Not equals                              | `{ "type": { "$neq": "dmn" } }`                                             |
| `$gt` / `$gte`   | Greater than / greater than or equal to | `{ "created": { "$gte": "2024-01-01T00:00:00Z" } }`                         |
| `$lt` / `$lte`   | Less than / less than or equal to       | `{ "created": { "$lt": "2024-06-01T00:00:00Z" } }`                          |
| `$like`          | Pattern match (SQL LIKE)                | `{ "name": { "$like": "%order%" } }`                                        |
| `$in` / `$notIn` | In / not in list                        | `{ "type": { "$in": ["bpmn", "form"] } }`                                   |
| `$exists`        | Null check                              | `{ "folderKey": { "$exists": false } }`                                     |
| `$or`            | Logical OR                              | `{ "$or": [{ "type": { "$eq": "bpmn" } }, { "type": { "$eq": "form" } }] }` |

## Dropped endpoints

The following v1 endpoints have no v2 equivalent and are not carried forward:

| Web Modeler API v1                                     | Notes                                                                                    |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `POST /v1/milestones`                                  | Milestones were deprecated in Camunda 8.7. Use the [Versions API](#version-api) instead. |
| `GET /v1/milestones/{milestoneId}`                     | Use the [Versions API](#version-api) instead.                                            |
| `PATCH /v1/milestones/{milestoneId}`                   | Use the [Versions API](#version-api) instead.                                            |
| `DELETE /v1/milestones/{milestoneId}`                  | Use the [Versions API](#version-api) instead.                                            |
| `GET /v1/versions/compare/{version1Id}...{version2Id}` | See [Compare two versions](#compare-two-versions).                                       |

## File API

The following sections cover changes that apply to file API endpoints.

### Endpoint mapping

All file API endpoints have a Camunda Hub API v2 equivalent:

| Operation     | Web Modeler API v1          | Camunda Hub API v2           |
| ------------- | --------------------------- | ---------------------------- |
| Create a file | `POST /v1/files`            | `POST /v2/files`             |
| Get a file    | `GET /v1/files/{fileId}`    | `GET /v2/files/{fileKey}`    |
| Update a file | `PATCH /v1/files/{fileId}`  | `PATCH /v2/files/{fileKey}`  |
| Delete a file | `DELETE /v1/files/{fileId}` | `DELETE /v2/files/{fileKey}` |
| Search files  | `POST /v1/files/search`     | `POST /v2/files/search`      |

### Field mapping {#file-api-field-mapping}

The following fields have changed across all file endpoints:

| Web Modeler API v1 | Camunda Hub API v2 | Application      | Notes                                                                                               |
| ------------------ | ------------------ | ---------------- | --------------------------------------------------------------------------------------------------- |
| `fileType`         | `type`             | Request/response | Renamed. `connector_template` is no longer supported. `element_template` is now `element-template`. |
| `folderId`         | `folderKey`        | Request/response | Renamed                                                                                             |
| `projectId`        | `projectKey`       | Request/response | Renamed                                                                                             |
| -                  | `content`          | Response         | New field                                                                                           |
| `id`               | `fileKey`          | Response         | Renamed                                                                                             |
| `canonicalPath`    | `canonicalPath`    | Response         | In v1, `canonicalPath` was an object. In v2, it's a string.                                         |

### Get a file

The v1 response returned a nested structure, with `metadata` and `content` as separate top-level fields. The v2 response is a flat object.

### Update a file

A `revision` is now required to prevent overwriting concurrent changes. Fetch the current revision from a get or create response, and include it in your update request.

### Search files

In addition to the [general field changes](#file-api-field-mapping), the following request fields have changed:

| Web Modeler API v1       | Camunda Hub API v2  | Notes                                                                                           |
| ------------------------ | ------------------- | ----------------------------------------------------------------------------------------------- |
| `filter`                 | `filter`            | Now uses [advanced operators](#search-filters), including `$eq`, `$in`, and `$like`             |
| `filter.projectId`       | `filter.projectKey` | Renamed                                                                                         |
| `filter.folderId`        | `filter.folderKey`  | Renamed                                                                                         |
| `filter.createdBy.email` | `filter.createdBy`  | In v1, `createdBy` was an object. In v2, it's a string representing the creator's email address |
| `filter.updatedBy.email` | `filter.updatedBy`  | In v1, `updatedBy` was an object. In v2, it's a string representing the updater's email address |
| `sort.direction`         | `sort.order`        | Renamed                                                                                         |

`content` is `null` on all items in the search response. Fetch individual files to retrieve content.

## Folder API

The following sections cover changes that apply to folder API endpoints.

### Endpoint mapping

All folder API endpoints have a Camunda Hub API v2 equivalent:

| Operation       | Web Modeler API v1              | Camunda Hub API v2               |
| --------------- | ------------------------------- | -------------------------------- |
| Create a folder | `POST /v1/folders`              | `POST /v2/folders`               |
| Get a folder    | `GET /v1/folders/{folderId}`    | `GET /v2/folders/{folderKey}`    |
| Update a folder | `PATCH /v1/folders/{folderId}`  | `PATCH /v2/folders/{folderKey}`  |
| Delete a folder | `DELETE /v1/folders/{folderId}` | `DELETE /v2/folders/{folderKey}` |

### Field mapping {#folder-api-field-mapping}

The following fields have changed across all folder endpoints:

| Web Modeler API v1 | Camunda Hub API v2 | Application      | Notes   |
| ------------------ | ------------------ | ---------------- | ------- |
| `parentId`         | `parentFolderKey`  | Request/response | Renamed |
| `projectId`        | `projectKey`       | Request/response | Renamed |
| `id`               | `folderKey`        | Response         | Renamed |

### Get a folder

In Web Modeler API v1, folder data in the response was nested under a `metadata` key:

```json title="Web Modeler API v1"
{
  "metadata": {
    "id": "f-456",
    "name": "processes",
    "projectId": "p-123",
    "parentId": null,
    "created": "...",
    "createdBy": { "name": "...", "email": "..." }
  },
  "content": {
    "folders": [{ "id": "..." }],
    "files": [{ "id": "..." }]
  }
}
```

In Camunda Hub API v2, folder data is nested under a `folder` key:

```json title="Camunda Hub API v2"
{
  "folder": {
    "folderKey": "f-456",
    "name": "processes",
    "projectKey": "p-123",
    "parentFolderKey": null,
    "created": "...",
    "createdBy": { "name": "...", "email": "..." },
    "updated": "...",
    "updatedBy": { "name": "...", "email": "..." }
  },
  "content": {
    "folders": [{ "folderKey": "..." }],
    "files": [{ "fileKey": "..." }]
  }
}
```

## Workspace API

In Web Modeler API v1, you managed projects with the `projects` resource. In Camunda Hub API v2, projects are now called workspaces, and you manage them with the `workspaces` resource. The UUID values are the same. The concept, field names, and API paths have changed.

### Endpoint mapping

All workspace API endpoints have a Camunda Hub API v2 equivalent:

| Operation          | Web Modeler API v1                | Camunda Hub API v2                     |
| ------------------ | --------------------------------- | -------------------------------------- |
| Create a workspace | `POST /v1/projects`               | `POST /v2/workspaces`                  |
| Get a workspace    | `GET /v1/projects/{projectId}`    | `GET /v2/workspaces/{workspaceKey}`    |
| Update a workspace | `PATCH /v1/projects/{projectId}`  | `PATCH /v2/workspaces/{workspaceKey}`  |
| Delete a workspace | `DELETE /v1/projects/{projectId}` | `DELETE /v2/workspaces/{workspaceKey}` |
| Search workspaces  | `POST /v1/projects/search`        | `POST /v2/workspaces/search`           |

### Field mapping {#workspace-api-field-mapping}

The following fields have changed across all workspace endpoints:

| Web Modeler API v1 | Camunda Hub API v2 | Application | Notes                                |
| ------------------ | ------------------ | ----------- | ------------------------------------ |
| `id`               | `workspaceKey`     | Response    | Renamed. Referred to the project ID. |

### Get a workspace

In Web Modeler API v1, project data in the response was nested under a `metadata` key:

```json title="Web Modeler API v1"
{
  "metadata": {
    "id": "p-123",
    "name": "My Project"
  },
  "content": {
    "folders": [{ "id": "f-001", "name": "My Folder" }]
  }
}
```

In Camunda Hub API v2, workspace data is nested under a `workspace` key with `projects` in the `content`:

```json title="Camunda Hub API v2"
{
  "workspace": {
    "workspaceKey": "p-123",
    "name": "My Workspace"
  },
  "content": {
    "projects": [{ "projectKey": "proj-1", "name": "App v1" }]
  }
}
```

### Search workspaces

In addition to the [general field changes](#workspace-api-field-mapping), the following request fields have changed:

| Web Modeler API v1       | Camunda Hub API v2 | Notes                                                                                           |
| ------------------------ | ------------------ | ----------------------------------------------------------------------------------------------- |
| `filter`                 | `filter`           | Now uses [advanced operators](#search-filters), including `$eq`, `$in`, and `$like`             |
| `filter.id`              | -                  | Removed                                                                                         |
| `filter.description`     | -                  | Removed                                                                                         |
| `filter.createdBy.email` | `filter.createdBy` | In v1, `createdBy` was an object. In v2, it's a string representing the creator's email address |
| `filter.updatedBy.email` | `filter.updatedBy` | In v1, `updatedBy` was an object. In v2, it's a string representing the updater's email address |
| `sort.direction`         | `sort.order`       | Renamed                                                                                         |

## Collaborator API

Camunda Hub API v2 makes three important changes to the collaborator API:

- The [path](#endpoint-mapping) is restructured under workspaces.
- The HTTP method for [adding a collaborator](#add-a-collaborator) changes from `PUT` to `POST`.
- The [role enum](#role) is renamed.

### Endpoint mapping

All collaborator API endpoints have a Camunda Hub API v2 equivalent:

| Operation             | Web Modeler API v1                             | Camunda Hub API v2                                           |
| --------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| Add a collaborator    | `PUT /v1/collaborators`                        | `POST /v2/workspaces/{workspaceKey}/collaborators`           |
| Remove a collaborator | `DELETE /v1/collaborators/{projectId}/{email}` | `DELETE /v2/workspaces/{workspaceKey}/collaborators/{email}` |
| Search collaborators  | `POST /v1/collaborators/search`                | `POST /v2/collaborators/search`                              |

### Field mapping {#collaborator-api-field-mapping}

The following fields have changed across all file endpoints:

| Web Modeler API v1 | Camunda Hub API v2 | Application      | Notes                                |
| ------------------ | ------------------ | ---------------- | ------------------------------------ |
| `projectId`        | `workspaceKey`     | Request/response | Renamed. Referred to the project ID. |

### Add a collaborator

`workspaceKey` moves from the request body to the path. The `project_admin` role is renamed to `workspace_admin`.

### Search collaborators

In addition to the [general field changes](#collaborator-api-field-mapping), the following request fields have changed:

| Web Modeler API v1 | Camunda Hub API v2    | Notes                                                                                                   |
| ------------------ | --------------------- | ------------------------------------------------------------------------------------------------------- |
| `filter`           | `filter`              | Now uses [advanced operators](#search-filters), including `$eq`, `$in`, and `$like`                     |
| `filter.projectId` | `filter.workspaceKey` | Renamed. In v2, `filter.workspaceKey` is required — collaborators cannot be searched across workspaces. |
| `sort.direction`   | `sort.order`          | Renamed                                                                                                 |

Here is an example request from v1:

```json title="Web Modeler API v1"
{
  "filter": { "projectId": "p-123", "role": "project_admin" },
  "page": 0,
  "size": 10
}
```

Here is an equivalent request in v2:

```json title="Camunda Hub API v2"
{
  "filter": {
    "workspaceKey": { "$eq": "p-123" },
    "role": { "$eq": "workspace_admin" }
  },
  "page": { "from": 0, "limit": 10 }
}
```

### Role enum

| Web Modeler API v1 | Camunda Hub API v2 | Notes                                  |
| ------------------ | ------------------ | -------------------------------------- |
| `project_admin`    | `workspace_admin`  | Renamed to match workspace terminology |
| `editor`           | `editor`           | Unchanged                              |
| `commenter`        | `commenter`        | Unchanged                              |
| `viewer`           | `viewer`           | Unchanged                              |

## Version API

The following sections cover changes that apply to version API endpoints.

### Endpoint mapping

All version API endpoints have a Camunda Hub API v2 equivalent, except the compare versions endpoint:

| Operation            | Web Modeler API v1                                     | Camunda Hub API v2                           |
| -------------------- | ------------------------------------------------------ | -------------------------------------------- |
| Create a version     | `POST /v1/versions`                                    | `POST /v2/versions`                          |
| Get a version        | `GET /v1/versions/{versionId}`                         | `GET /v2/versions/{versionKey}`              |
| Update a version     | `PATCH /v1/versions/{versionId}`                       | `PATCH /v2/versions/{versionKey}`            |
| Delete a version     | `DELETE /v1/versions/{versionId}`                      | `DELETE /v2/versions/{versionKey}`           |
| Search versions      | `POST /v1/versions/search`                             | `POST /v2/versions/search`                   |
| Restore a version    | `POST /v1/versions/{versionId}/restore`                | `POST /v2/versions/{versionKey}/restoration` |
| Compare two versions | `GET /v1/versions/compare/{version1Id}...{version2Id}` | Does not exist                               |

### Field mapping {#version-api-field-mapping}

The following fields have changed across all file endpoints:

| Web Modeler API v1 | Camunda Hub API v2 | Application      | Notes   |
| ------------------ | ------------------ | ---------------- | ------- |
| `fileId`           | `fileKey`          | Request/response | Renamed |
| `id`               | `versionKey`       | Response         | Renamed |
| `versionId`        | `versionKey`       | Response         | Renamed |

### Get a version

In Web Modeler API v1, version data in the response was nested under a `metadata` key:

```json title="Web Modeler API v1"
{
  "metadata": {
    "id": "ver-123",
    "name": "version"
  },
  "content": "versioned content"
}
```

In Camunda Hub API v2, version data is at the top level of the response body:

```json title="Camunda Hub API v2"
{
  "versionKey": "ver-123",
  "name": "version",
  "content": "versioned content"
}
```

### Search versions

In addition to the [general field changes](#version-api-field-mapping), the following request fields have changed:

| Web Modeler API v1 | Camunda Hub API v2 | Notes                                                                                    |
| ------------------ | ------------------ | ---------------------------------------------------------------------------------------- |
| `filter`           | `filter`           | Now uses [advanced operators](#search-filters), including `$eq`, `$in`, and `$like`      |
| `filter.fileId`    | `filter.fileKey`   | Renamed. In v2, `filter.fileKey` is required — versions cannot be searched across files. |
| `sort.direction`   | `sort.order`       | Renamed                                                                                  |

### Restore a version

In Web Modeler API v1, you used the verb "restore" and passed the `versionId` in the path and the request body:

```json title="Web Modeler API v1"
POST /api/v1/versions/{versionId}/restore
{
  "versionId": {versionId}
}
```

In Camunda Hub API v2, use the noun "restoration" and identify the version to restore using the path parameter:

```json title="Camunda Hub API v2"
POST /api/v2/versions/{versionKey}/restoration
(no body)
```

For element template files, include a `version` integer in the request body to set the target version number in the restored content:

```json title="Camunda Hub API v2"
POST /api/v2/versions/{versionKey}/restoration
{ "version": 2 }
```

### Compare two versions

The compare versions endpoint `GET /versions/compare/{version1Id}...{version2Id}` no longer exists in Camunda Hub API v2.

In Web Modeler API v1, the compare versions endpoint returned a link to a visual comparison between two versions, with `version1Id` as the baseline and `version2Id` as the version being compared.

Instead of making an API request for this link, you can construct it yourself:

1. Get the file and version keys from the search or get version API.
2. Insert the keys into one of the following URL patterns:

| Resource type    | Template URL                                                                     |
| :--------------- | :------------------------------------------------------------------------------- |
| BPMN             | `{baseUrl}/diagrams/{fileKey}/versions/{versionKey1}...{versionKey2}`            |
| Element template | `{baseUrl}/connector-templates/{fileKey}/versions/{versionKey1}...{versionKey2}` |
| Form             | `{baseUrl}/forms/{fileKey}/versions/{versionKey1}...{versionKey2}`               |
| RPA              | `{baseUrl}/rpa-scripts/{fileKey}/versions/{versionKey1}...{versionKey2}`         |

Replace `{baseURL}` with the Web Modeler base URL. The version keys must be for the same file.

## Info API

### Endpoint mapping

The info API endpoint has a Camunda Hub API v2 equivalent:

| Operation | Web Modeler API v1 | Camunda Hub API v2 |
| --------- | ------------------ | ------------------ |
| Get info  | `GET /v1/info`     | `GET /v2/info`     |

### Get info

The following response fields have changed:

| Web Modeler API v1 | Camunda Hub API v2 | Notes   |
| ------------------ | ------------------ | ------- |
| `createPermission` | -                  | Removed |
| `readPermission`   | -                  | Removed |
| `updatePermission` | -                  | Removed |
| `deletePermission` | -                  | Removed |

To determine your permissions, check the scopes configured when your API token was created. If a request lacks the required permission, the API returns `403 Forbidden` with a `ProblemDetail` body explaining which permission is missing.
