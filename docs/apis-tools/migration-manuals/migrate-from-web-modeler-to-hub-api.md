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
- In v1, resources were identified by `Id` fields. In v2, resources are identified by `Key` fields. For example, `folderId` is now `folderKey`.
- Update operations in v2 require a `revision` field. Fetch the current revision from a get or create response and include it in your update request to prevent overwriting concurrent changes.

## General changes

The following sections cover changes that apply across the entire API, regardless of which resource you're working with. Review these before making any endpoint-specific changes.

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

| Web Modeler API v1 | Camunda Hub API v2 | Notes                                                                       |
| ------------------ | ------------------ | --------------------------------------------------------------------------- |
| `folderId`         | `folderKey`        | Renamed.                                                                    |
| `projectId`        | `projectKey`       | Renamed. Use to move files between projects within a Camunda Hub workspace. |
| `revision`         | `revision`         | Now required.                                                               |

### Search files

| Web Modeler API v1 | Camunda Hub API v2           | Notes                                                                 |
| ------------------ | ---------------------------- | --------------------------------------------------------------------- |
| `filter`           | `filter`                     | Now supports advanced operators, including `$eq`, `$in`, and `$like`. |
| `total` (response) | `page.totalItems` (response) | Moved into the `page` response object.                                |

In v1, `page` specified the page to return, and `size` specified the number of items per page. In v2, `page` is an object supporting limit/offset pagination:

- `page.from` specifies the offset, the item index to start searching from.
- `page.limit` limits the number of items returned.

In v1, the default page size was 10. In v2, the default limit now 100.

`content` is `null` on all items in the search response. Fetch individual files to retrieve content.

### File response fields

Only changed fields are listed:

| v1 field        | v2 field        | Notes                                                       |
| --------------- | --------------- | ----------------------------------------------------------- |
| `id`            | `fileKey`       | Renamed.                                                    |
| `projectId`     | `projectKey`    | Renamed.                                                    |
| `folderId`      | `folderKey`     | Renamed.                                                    |
| `canonicalPath` | `canonicalPath` | In v1, `canonicalPath` was an object. In v2, it's a string. |
