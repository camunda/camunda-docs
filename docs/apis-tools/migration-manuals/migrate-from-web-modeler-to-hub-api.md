---
id: migrate-from-web-modeler-to-hub-api
title: Migrate from Web Modeler to the Camunda Hub API
description: "Learn how to migrate from Web Modeler API v1 to the new Camunda Hub API v2 to manage Camunda Hub resources."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

:::warning Deprecation notice
Web Modeler API v1 is deprecated in Camunda 8.10 and will be removed in 8.12. Migrate to [Camunda Hub API v2](/apis-tools/hub-api-saas/overview.md) before upgrading to 8.12.
:::

## About this migration

Web Modeler API v1 is the REST API for Web Modeler, a standalone product for modeling and managing process diagrams. It exposes resources like projects, folders, files, and collaborators as they exist within Web Modeler.

[Camunda Hub API v2](/apis-tools/hub-api-saas/overview.md) is the successor API for the broader Camunda Hub platform. Camunda Hub unifies organizational management, workspace governance, and process modeling into a single platform. As a result, the conceptual model and architecture of the API have changed.

:::tip
Camunda Hub API v2 adopts the [Orchestration Cluster API v2](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) conventions. If you're already familiar with the Orchestration Cluster API v2, you will recognize patterns such as the offset-based pagination model, explicit filter operators, and flat response structures used throughout Camunda Hub API v2.
:::

Before migrating, familiarize yourself with the structural and terminology changes introduced in Camunda 8.10.

## Structure and terminology

Camunda 8.10 changes how resources are organized.

Before Camunda 8.10, Web Modeler resources were organized like this:

```
Organization
├─ Project
│  ├─ Process application
│  │   ├─ File
│  │   └─ Folder
│  │      └─ File
│  ├─ Folder
│  │   └─ File
│  └─ File
└─ Project
```

Organizations had projects. Projects optionally contained process applications, folders, and files.

Starting with Camunda 8.10, Camunda Hub resources are organized like this:

```
Organization
└─ Workspace
   ├─ Project
   │  ├─ Folder
   │  │   ├─ File
   │  │   └─ Folder
   │  └─ File
   └─ Project
```

Organizations have workspaces. Workspaces contain projects. Projects optionally contain folders and files.

The new structure introduces the following terminology changes:

| Web Modeler (\<8.10) | Camunda Hub (8.10+) | Notes                                                                                                                                                                                             |
| :------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Project              | Workspace           | Files and folders can no longer be created at the workspace level.                                                                                                                                |
| Process application  | Project             | Process applications weren't explicitly exposed in Web Modeler API v1. In Camunda Hub API v2, there is a dedicated [project API](/apis-tools/hub-api-saas/specifications/create-project.api.mdx). |

In Camunda Hub API v2, the endpoint paths, field names, and underlying data all reflect the structural and terminology changes. In Web Modeler API v1 running on Camunda 8.10+, only the underlying data reflects the new organization. The sections below identify all affected endpoints and fields.

## Deprecation timeline

| Version  | Action                                                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **8.10** | Camunda Hub API v2 ships alongside Web Modeler API v1. Web Modeler API v1 is documented as **deprecated**, and its OpenAPI spec is marked `deprecated: true`. |
| **8.11** | Web Modeler API v1 remains available but isn't extended. No new features are added to deprecated endpoints.                                                   |
| **8.12** | Web Modeler API v1 endpoints are removed. Applications still using v1 receive `404`.                                                                          |

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

See the Camunda Hub API authentication guide for [SaaS](/apis-tools/hub-api-saas/authentication.md) or [Self-Managed](/apis-tools/hub-api-sm/authentication.md) for setup instructions.

### Pagination

Offset pagination in Camunda Hub API v2 is different from Web Modeler API v1.

In Web Modeler API v1, you use two fields to paginate items:

- `page` specifies the page to return, starting with page 0.
- `size` specifies the number of items per page.

For example:

```json title="Web Modeler API v1"
{
  "page": 3,
  "size": 20
}
```

This request skips the first three _pages_ of 20 items (pages 0–2 and item indexes 0–59, inclusive) and returns the fourth page of 20 items (indexes 60–79). If there aren't enough items to fill the fourth page, you receive all remaining items.

The response includes two fields, `items` and `total`:

```json title="Web Modeler API v1"
{
    "items": [
        ...
    ],
    "total": 141
}
```

In Camunda Hub API v2, you use a `page` object with two fields:

- `page.from` specifies the offset, the item index to start from, starting with index 0.
- `page.limit` limits the number of items returned.

For example:

```json title="Camunda Hub API v2"
{
  "page": {
    "from": 60,
    "limit": 20
  }
}
```

Instead of specifying the number of pages to skip, you specify the index to start _from_ (60) and the maximum number, or _limit_, of items to return (20). This request returns the items at indexes 60–79. As in v1, if there are fewer items than the limit, you receive all remaining items.

The new response replaces `total` with a new `page` object that includes two fields, `totalItems` and `hasMoreTotalItems`:

```json title="Camunda Hub API v2"
{
    "items": [
        ...
    ],
    "page": {
        "totalItems": 360,
        "hasMoreTotalItems": false
    }
}
```

In addition to the different pagination model, the default page size has changed. In v1, the default page size is 10. In v2, the default limit is 100.

### Date filters

Web Modeler API v1 supports a custom date precision syntax that encodes a comparison operator, timestamp, and truncation unit into a single string. Camunda Hub API v2 uses explicit operators instead. You compute period boundaries yourself.

The following examples show equivalent date filters in Web Modeler API v1 and Camunda Hub API v2:

| Web Modeler API v1             | Camunda Hub API v2                                                       | Explanation                          |
| ------------------------------ | ------------------------------------------------------------------------ | ------------------------------------ |
| `2023-09-20T00:00:00Z\|\|/y`   | `{ "$gte": "2023-01-01T00:00:00Z", "$lte": "2023-12-31T23:59:59.999Z" }` | Within year 2023                     |
| `2023-09-20T00:00:00Z\|\|/M`   | `{ "$gte": "2023-09-01T00:00:00Z", "$lte": "2023-09-30T23:59:59.999Z" }` | Within September 2023                |
| `>=2023-09-20T00:00:00Z\|\|/y` | `{ "$gte": "2023-01-01T00:00:00Z" }`                                     | On or after start of 2023            |
| `<2023-09-20T00:00:00Z\|\|/M`  | `{ "$lt": "2023-09-01T00:00:00Z" }`                                      | Before September 2023                |
| `2023-09-20T11:31:20Z`         | `{ "$eq": "2023-09-20T11:31:20Z" }`                                      | Exact match                          |
| `>=2023-09-20T11:31:20Z`       | `{ "$gte": "2023-09-20T11:31:20Z" }`                                     | On or after a specific date and time |

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

You can still use simple equality filters in Camunda Hub API v2, and you can also use more advanced explicit filter operators:

```json title="Camunda Hub API v2"
{
  "filter": {
    "name": { "$eq": "my-process" },
    "type": { "$in": ["bpmn"] }
  }
}
```

The following advanced filter operators are available in Camunda Hub API v2:

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

The following v1 endpoints have no v2 equivalent:

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

| Web Modeler API v1 | Camunda Hub API v2 | Application      | Notes                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------ | ------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fileType`         | `type`             | Request/response | Renamed. `element_template` is now `element-template`. File creation no longer supports `connector_template`. Existing connector template files are reported as `element-template`.                                                                                                                                                                                     |
| `folderId`         | `folderKey`        | Request/response | Renamed. If the file isn't in a folder, v1 endpoints return the project ID (["process application" before Camunda 8.10](#structure-and-terminology)), and v2 endpoints return `null`.                                                                                                                                                                                   |
| `projectId`        | `projectKey`       | Request/response | In v1, `projectId` refers to the ID of the "workspace" ([called the "project" before Camunda 8.10](#structure-and-terminology)). In v2, `projectKey` refers to the key of the "project". The concept of a "project" was [called a "process application" before Camunda 8.10](#structure-and-terminology), but process application data is not explicitly exposed in v1. |
| -                  | `content`          | Response         | In v1, `content` is returned as a separate top-level field alongside `metadata`. In v2, it's included in the flat file object.                                                                                                                                                                                                                                          |
| `id`               | `fileKey`          | Response         | Renamed                                                                                                                                                                                                                                                                                                                                                                 |
| `canonicalPath`    | `canonicalPath`    | Response         | In v1, `canonicalPath` is a list of objects. In v2, it's a [string](#canonical-path).                                                                                                                                                                                                                                                                                   |

### Canonical path

In Web Modeler API v1, `canonicalPath` is an array of objects containing an `id` and a `name` for each path element in the file's unique path:

```json title="Web Modeler API v1"
{
  "canonicalPath": [
    {
      "id": "1abf0198-3462-4fd2-a0e9-362f213d81d0",
      "name": "Process application"
    },
    {
      "id": "b06c97f5-7e39-4108-b947-2848fdc023f0",
      "name": "Parent folder"
    },
    {
      "id": "62132025-57ff-4077-8c80-fc4ebe84aebe",
      "name": "Child folder"
    }
  ]
}
```

In Camunda Hub API v2, `canonicalPath` expresses the file's unique path as a `/`-delimited string. Unlike Web Modeler API v1, which includes `projects` ([called `process applications` before Camunda 8.10](#structure-and-terminology)), Camunda Hub API v2 only includes folder keys. The project is given in a separate field, called `projectKey`:

```json title="Camunda Hub API v2"
{
  "projectKey": "1abf0198-3462-4fd2-a0e9-362f213d81d0",
  "canonicalPath": "b06c97f5-7e39-4108-b947-2848fdc023f0/62132025-57ff-4077-8c80-fc4ebe84aebe"
}
```

### Get a file

The v1 response returns a nested structure, with `metadata` and `content` as separate top-level fields:

```json title="Web Modeler API v1"
{
  "metadata": {
    "id": "57f4635b-5452-44a5-9020-bfce455484ab",
    "name": "process",
    "projectId": "b9b57035-fbce-4412-a7d5-9f0df61ed74d",
    "folderId": "62132025-57ff-4077-8c80-fc4ebe84aebe",
    "simplePath": "Process application/Parent folder/Child folder/process.bpmn",
    "canonicalPath": [
      {
        "id": "1abf0198-3462-4fd2-a0e9-362f213d81d0",
        "name": "Process application"
      },
      {
        "id": "b06c97f5-7e39-4108-b947-2848fdc023f0",
        "name": "Parent folder"
      },
      {
        "id": "62132025-57ff-4077-8c80-fc4ebe84aebe",
        "name": "Child folder"
      }
    ],
    "revision": 5,
    "type": "BPMN",
    "created": "2026-07-08T09:59:34.262858Z",
    "createdBy": {
      "name": "...",
      "email": "..."
    },
    "updated": "2026-07-08T10:05:09.045782Z",
    "updatedBy": {
      "name": "...",
      "email": "..."
    }
  },
  "content": "..."
}
```

The v2 response is a flat object:

```json title="Camunda Hub API v2"
{
  "fileKey": "57f4635b-5452-44a5-9020-bfce455484ab",
  "name": "process",
  "projectKey": "1abf0198-3462-4fd2-a0e9-362f213d81d0",
  "folderKey": "62132025-57ff-4077-8c80-fc4ebe84aebe",
  "simplePath": "Parent folder/Child folder/process.bpmn",
  "canonicalPath": "b06c97f5-7e39-4108-b947-2848fdc023f0/62132025-57ff-4077-8c80-fc4ebe84aebe",
  "revision": 5,
  "type": "bpmn",
  "content": "...",
  "created": "2026-07-08T09:59:34.262858Z",
  "createdBy": {
    "name": "...",
    "email": "..."
  },
  "updated": "2026-07-08T10:05:09.045782Z",
  "updatedBy": {
    "name": "...",
    "email": "..."
  }
}
```

### Update a file

A `revision` is now required to prevent overwriting concurrent changes. Fetch the current revision from a get or create response, and include it in your update request:

```json title="Camunda Hub API v2"
{
  "name": "process",
  "projectKey": "1abf0198-3462-4fd2-a0e9-362f213d81d0",
  "folderKey": "62132025-57ff-4077-8c80-fc4ebe84aebe",
  // highlight-next-line
  "revision": 5,
  "content": "..."
}
```

### Search files

In addition to the [general field changes](#file-api-field-mapping), the following request fields have changed:

| Web Modeler API v1       | Camunda Hub API v2 | Notes                                                                                                               |
| ------------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `filter`                 | `filter`           | Now uses [advanced operators](#search-filters), including `$eq`, `$in`, and `$like`                                 |
| `filter.folderId`        | `filter.folderKey` | Renamed                                                                                                             |
| `filter.createdBy.email` | `filter.createdBy` | In v1, `createdBy` is an object. In v2, it's a string representing the creator's email address.                     |
| `filter.updatedBy.email` | `filter.updatedBy` | In v1, `updatedBy` is an object. In v2, it's a string representing the updater's email address.                     |
| `sort.direction`         | `sort.order`       | Renamed                                                                                                             |
| `filter.projectId`       | -                  | Removed. You can no longer filter files by workspace (["project" before Camunda 8.10](#structure-and-terminology)). |

`content` is `null` on all items in the search response. Fetch individual files to retrieve content.

The following example shows a v1 request:

```json title="Web Modeler API v1"
{
  "filter": {
    "folderId": "16b0beb0-e6c0-494b-9953-c3ff461975f7",
    "createdBy": {
      "email": "jane.doe@email.com"
    }
  },
  "sort": {
    "field": "name",
    "direction": "DESC"
  }
}
```

The equivalent v2 request:

```json title="Camunda Hub API v2"
{
  "filter": {
    "folderKey": { "$eq": "16b0beb0-e6c0-494b-9953-c3ff461975f7" },
    "createdBy": "jane.doe@email.com"
  },
  "sort": {
    "field": "name",
    "order": "DESC"
  }
}
```

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

| Web Modeler API v1 | Camunda Hub API v2 | Application      | Notes                                                                                                                                                                                                                                                                                                                |
| ------------------ | ------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `parentId`         | `parentFolderKey`  | Request/response | Renamed. If the folder is at the root of a project (["process application" before Camunda 8.10](#structure-and-terminology)), v1 endpoints return the project ID, and v2 endpoints return `null`.                                                                                                                    |
| `projectId`        | `projectKey`       | Request/response | In v1, `projectId` refers to the ID of the workspace ([called "project" before Camunda 8.10](#structure-and-terminology)). In v2, the workspace key is no longer available. Instead, `projectKey` refers to the key of the project ([called "process application" before Camunda 8.10](#structure-and-terminology)). |
| `id`               | `folderKey`        | Response         | Renamed                                                                                                                                                                                                                                                                                                              |

### Get a folder

In Web Modeler API v1, folder data in the response is nested under a `metadata` key:

```json title="Web Modeler API v1"
{
  "metadata": {
    "id": "b06c97f5-7e39-4108-b947-2848fdc023f0",
    "name": "Parent folder",
    "projectId": "b9b57035-fbce-4412-a7d5-9f0df61ed74d",
    "parentId": "1abf0198-3462-4fd2-a0e9-362f213d81d0",
    "created": "2026-07-08T09:59:30.719344Z",
    "updated": "2026-07-08T10:04:56.47393Z",
    "createdBy": {
      "name": "...",
      "email": "..."
    },
    "updatedBy": {
      "name": "...",
      "email": "..."
    }
  },
  "content": {
    "folders": [],
    "files": []
  }
}
```

In Camunda Hub API v2, folder data is nested under a `folder` key:

```json title="Camunda Hub API v2"
{
  "folder": {
    "folderKey": "b06c97f5-7e39-4108-b947-2848fdc023f0",
    "name": "Parent folder",
    "projectKey": "1abf0198-3462-4fd2-a0e9-362f213d81d0",
    "parentFolderKey": null,
    "created": "2026-07-08T09:59:30.719344Z",
    "createdBy": {
      "name": "...",
      "email": "..."
    },
    "updated": "2026-07-08T10:04:56.47393Z",
    "updatedBy": {
      "name": "...",
      "email": "..."
    }
  },
  "content": {
    "folders": [],
    "files": []
  }
}
```

## Workspace API

In Web Modeler API v1, you manage workspaces ([called "projects" before Camunda 8.10](#structure-and-terminology)) with the `projects` resource. In Camunda Hub API v2, you manage them with the `workspaces` resource. The UUID values are the same. The concept, field names, and API paths have changed.

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

| Web Modeler API v1 | Camunda Hub API v2 | Application | Notes    |
| ------------------ | ------------------ | ----------- | -------- |
| `id`               | `workspaceKey`     | Response    | Renamed. |

### Get a workspace

In Web Modeler API v1, workspace data in the response is nested under a `metadata` key with `folders` and `files` in the `content`:

```json title="Web Modeler API v1"
{
    "metadata": {
        "id": "b9b57035-fbce-4412-a7d5-9f0df61ed74d",
        "name": "Orders",
        "created": "2026-07-08T07:58:57.601559Z",
        "createdBy": {
            "name": "...",
            "email": "..."
        },
        "updated": "2026-07-08T07:59:13.386407Z",
        "updatedBy": {
            "name": "...",
            "email": "..."
        }
    },
    "content": {
        "folders": [ ... ],
        "files": [ ... ]
    }
}
```

In Camunda Hub API v2, workspace data is nested under a `workspace` key with `projects` in the `content`:

```json title="Camunda Hub API v2"
{
    "workspace": {
        "workspaceKey": "b9b57035-fbce-4412-a7d5-9f0df61ed74d",
        "name": "Orders",
        "description": null,
        "created": "2026-07-08T07:58:57.601559Z",
        "createdBy": {
            "name": "...",
            "email": "..."
        },
        "updated": "2026-07-08T07:59:13.386407Z",
        "updatedBy": {
            "name": "...",
            "email": "..."
        }
    },
    "content": {
        "projects": [ ... ]
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
| `filter.createdBy.email` | `filter.createdBy` | In v1, `createdBy` is an object. In v2, it's a string representing the creator's email address. |
| `filter.updatedBy.email` | `filter.updatedBy` | In v1, `updatedBy` is an object. In v2, it's a string representing the updater's email address. |
| `sort.direction`         | `sort.order`       | Renamed                                                                                         |

The following example shows a v1 request:

```json title="Web Modeler API v1"
{
  "filter": {
    "createdBy": {
      "email": "jane.doe@email.com"
    }
  },
  "sort": {
    "field": "name",
    "direction": "DESC"
  }
}
```

The equivalent v2 request:

```json title="Camunda Hub API v2"
{
  "filter": {
    "createdBy": "jane.doe@email.com"
  },
  "sort": {
    "field": "name",
    "order": "DESC"
  }
}
```

## Member API

In Camunda Hub API v2, the collaborators API has been renamed to `members`. The following sections cover changes that apply to the member API endpoints.

### Endpoint mapping

All member API endpoints have a Camunda Hub API v2 equivalent:

| Operation             | Web Modeler API v1                                      | Camunda Hub API v2                                     |
| --------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| Add a collaborator    | `PUT /v1/collaborators`                                 | `POST /v2/workspaces/{workspaceKey}/members`           |
| Remove a collaborator | `DELETE /v1/projects/{projectId}/collaborators/{email}` | `DELETE /v2/workspaces/{workspaceKey}/members/{email}` |
| Search collaborators  | `POST /v1/collaborators/search`                         | `POST /v2/members/search`                              |

### Field mapping {#member-api-field-mapping}

The following fields have changed across all member endpoints:

| Web Modeler API v1 | Camunda Hub API v2 | Application      | Notes    |
| ------------------ | ------------------ | ---------------- | -------- |
| `projectId`        | `workspaceKey`     | Request/response | Renamed. |

### Add a member

In Web Modeler API v1, the method is `PUT`, and the `projectId` is in the request body:

```bash title="Web Modeler API v1"
PUT /api/v1/collaborators
{
    "email": "jane.doe@email.com",
    "projectId": "b9b57035-fbce-4412-a7d5-9f0df61ed74d",
    "role": "viewer"
}
```

In Camunda Hub API v2, the method is `POST`, and the workspace key is in the path:

```bash title="Camunda Hub API v2"
POST /api/v2/workspaces/b9b57035-fbce-4412-a7d5-9f0df61ed74d/members
{
    "email": "jane.doe@email.com",
    "role": "viewer"
}
```

### Search members

In addition to the [general field changes](#member-api-field-mapping), the following request fields have changed:

| Web Modeler API v1 | Camunda Hub API v2    | Notes                                                                                           |
| ------------------ | --------------------- | ----------------------------------------------------------------------------------------------- |
| `filter`           | `filter`              | Now uses [advanced operators](#search-filters), including `$eq`, `$in`, and `$like`             |
| `filter.projectId` | `filter.workspaceKey` | Renamed. In v2, `filter.workspaceKey` is required. Members can't be searched across workspaces. |
| `sort.direction`   | `sort.order`          | Renamed                                                                                         |

The following example shows a v1 request:

```json title="Web Modeler API v1"
{
  "filter": {
    "projectId": "b9b57035-fbce-4412-a7d5-9f0df61ed74d",
    "role": "project_admin"
  },
  "sort": {
    "field": "name",
    "direction": "DESC"
  }
}
```

The equivalent v2 request:

```json title="Camunda Hub API v2"
{
  "filter": {
    "workspaceKey": { "$eq": "b9b57035-fbce-4412-a7d5-9f0df61ed74d" },
    "role": { "$eq": "workspace_admin" }
  },
  "sort": {
    "field": "name",
    "order": "DESC"
  }
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
| Compare two versions | `GET /v1/versions/compare/{version1Id}...{version2Id}` | [Does not exist](#compare-two-versions)      |

### Field mapping {#version-api-field-mapping}

The following fields have changed across all version endpoints:

| Web Modeler API v1 | Camunda Hub API v2 | Application      | Notes   |
| ------------------ | ------------------ | ---------------- | ------- |
| `fileId`           | `fileKey`          | Request/response | Renamed |
| `id`/`versionId`   | `versionKey`       | Response         | Renamed |

### Get a version

In Web Modeler API v1, version data in the response is nested under a `metadata` key:

```json title="Web Modeler API v1"
{
  "metadata": {
    "id": "c3e3a091-513e-4911-94d0-32aca88c80b9",
    "name": "V2",
    "description": "...",
    "fileId": "0ade583b-4022-47b5-8982-93ddd849ee6b",
    "created": "2026-06-09T16:50:37.186742Z",
    "createdBy": {
      "name": "...",
      "email": "..."
    },
    "updated": "2026-06-09T16:50:58.356172Z",
    "updatedBy": {
      "name": "...",
      "email": "..."
    },
    "organizationPublic": false
  },
  "content": "..."
}
```

In Camunda Hub API v2, version data is at the top level of the response body:

```json title="Camunda Hub API v2"
{
  "versionKey": "c3e3a091-513e-4911-94d0-32aca88c80b9",
  "name": "V2",
  "description": "...",
  "fileKey": "0ade583b-4022-47b5-8982-93ddd849ee6b",
  "organizationPublic": false,
  "created": "2026-06-09T16:50:37.186742Z",
  "createdBy": {
    "name": "...",
    "email": "..."
  },
  "updated": "2026-06-09T16:50:58.356172Z",
  "updatedBy": {
    "name": "...",
    "email": "..."
  },
  "content": "..."
}
```

### Search versions

In addition to the [general field changes](#version-api-field-mapping), the following request fields have changed:

| Web Modeler API v1 | Camunda Hub API v2 | Notes                                                                                  |
| ------------------ | ------------------ | -------------------------------------------------------------------------------------- |
| `filter`           | `filter`           | Now uses [advanced operators](#search-filters), including `$eq`, `$in`, and `$like`    |
| `filter.fileId`    | `filter.fileKey`   | Renamed. In v2, `filter.fileKey` is required. Versions can't be searched across files. |
| `sort.direction`   | `sort.order`       | Renamed                                                                                |

The following example shows a v1 request:

```json title="Web Modeler API v1"
{
  "filter": {
    "fileId": "0ade583b-4022-47b5-8982-93ddd849ee6b"
  },
  "sort": {
    "field": "name",
    "direction": "DESC"
  }
}
```

The equivalent v2 request:

```json title="Camunda Hub API v2"
{
  "filter": {
    "fileKey": { "$eq": "0ade583b-4022-47b5-8982-93ddd849ee6b" }
  },
  "sort": {
    "field": "name",
    "order": "DESC"
  }
}
```

### Restore a version

In Web Modeler API v1, the endpoint path uses `/restore`, and you pass the `versionId` in both the path and the request body:

```bash title="Web Modeler API v1"
POST /api/v1/versions/{versionId}/restore
{
  "versionId": {versionId}
}
```

In Camunda Hub API v2, the endpoint path uses `/restoration`, and you identify the version using the path parameter:

```bash title="Camunda Hub API v2"
POST /api/v2/versions/{versionKey}/restoration
(no body)
```

For element template files, include a `version` integer in the request body to set the target version number in the restored content:

```bash title="Camunda Hub API v2"
POST /api/v2/versions/{versionKey}/restoration
{ "version": 2 }
```

### Compare two versions

The compare versions endpoint `GET /versions/compare/{version1Id}...{version2Id}` no longer exists in Camunda Hub API v2.

In Web Modeler API v1, the compare versions endpoint returns a link to a visual comparison between two versions, with `version1Id` as the baseline and `version2Id` as the version being compared.

Instead of making an API request for this link, you can construct it yourself:

1. Get the file and version keys from the search or get version API.
2. Insert the keys into one of the following URL patterns, and open the URL in your browser:

| Resource type    | Template URL                                                                     |
| :--------------- | :------------------------------------------------------------------------------- |
| BPMN             | `{baseURL}/diagrams/{fileKey}/versions/{versionKey1}...{versionKey2}`            |
| Element template | `{baseURL}/connector-templates/{fileKey}/versions/{versionKey1}...{versionKey2}` |
| Form             | `{baseURL}/forms/{fileKey}/versions/{versionKey1}...{versionKey2}`               |
| RPA              | `{baseURL}/rpa-scripts/{fileKey}/versions/{versionKey1}...{versionKey2}`         |

Replace `{baseURL}` with the Camunda Hub base URL. The version keys must be for the same file.

For example:

```bash
https://hub.cloud.camunda.io/diagrams/98634f96-52e9-4c00-8702-893a12803771/versions/2b6fd548-e107-4338-ae59-37a609f65202...78e0f8c5-0462-4521-bff9-5f432d689925
```

## Info API

### Endpoint mapping

The info API endpoint has a Camunda Hub API v2 equivalent:

| Operation | Web Modeler API v1 | Camunda Hub API v2 |
| --------- | ------------------ | ------------------ |
| Get info  | `GET /v1/info`     | `GET /v2/info`     |

### Get info

The following response fields have changed:

| Web Modeler API v1         | Camunda Hub API v2         | Notes     |
| -------------------------- | -------------------------- | --------- |
| `version` (returns `"v1"`) | `version` (returns `"v2"`) | New value |
| `createPermission`         | -                          | Removed   |
| `readPermission`           | -                          | Removed   |
| `updatePermission`         | -                          | Removed   |
| `deletePermission`         | -                          | Removed   |

To determine your permissions, check the scopes you configured when creating your API token. If a request lacks the required permission, the API returns `403 Forbidden` with a `ProblemDetail` body explaining which permission is missing.
