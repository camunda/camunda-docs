---
id: web-modeler-v1-apis
title: "Process application management in Web Modeler API v1"
description: "Learn about changes to process application management in Web Modeler API v1 SaaS."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About these changes

Before 29 August 2026, process applications were not explicitly exposed in Web Modeler API v1. There were no process application endpoints.

However, process applications were implicitly accessible. For example:

- You could pass a process application ID to `DELETE /api/v1/folders/{folderId}` to delete the process application.
- The response for `GET /api/v1/folders/{folderId}` returns a `parentId`, representing the folder's parent folder. If the parent is in a process application, rather than another folder, the process application ID is returned.

In preparation for Camunda 8.10, file organization in Web Modeler has changed. Projects can now only contain process applications and IDP applications. Files and folders are always stored inside process applications. To support this new file hierarchy, two major changes have been introduced to Web Modeler API v1:

- Process applications are no longer implicitly accessible via v1 folders, files, and project APIs.
- New process application APIs are introduced to make access explicit.

:::note
These changes currently only apply to the Web Modeler API running in Camunda 8 SaaS. They apply to Self-Managed starting in Camunda 8.10.
:::

## Folders API

You can no longer read or write process application IDs in any folders API context.

### Folder and parent IDs reference folders

In folders API requests, you'll receive a `404 NOT FOUND` if you pass a process application ID as the `folderId` or `parentId`. Previously, you could pass a process application's ID to read and write its data.

Example:

```shell
PATCH /api/v1/folders/{folderId}  # must be a folder, not a process application
{
  "name": "string",
  "projectId": "string",
  "parentId": "string"  # must be a folder, not a process application
}
```

Affected endpoints:

- `DELETE /api/v1/folders/{folderId}`
- `GET /api/v1/folders/{folderId}`
- `PATCH /api/v1/folders/{folderId}`
- `POST /api/v1/folders`

### Process applications are never returned as parent folders

In folders API responses, the `parentId` is null for any folder stored at the root of a process application. Previously, `parentId` would return the process application ID.

Example:

```json
{
  "id": "string",
  "name": "string",
  "projectId": "string",
  "parentId": "string", // null if the parent container is a process application
  "created": "string",
  "updated": "string",
  "createdBy": {
    "name": "string",
    "email": "string"
  },
  "updatedBy": {
    "name": "string",
    "email": "string"
  }
}
```

Affected endpoints:

- `GET /api/v1/folders/{folderId}`
- `PATCH /api/v1/folders/{folderId}`
- `POST /api/v1/folders`

## Files API

You can no longer read or write process application IDs in any files API context.

### Folder ID must reference a folder

In files API requests, you'll receive a `404 NOT FOUND` if you pass a process application ID as the `folderId`. Previously, you could pass a process application's ID to place the file in the process application.

```shell
POST /api/v1/files
{
  "name": "string",
  "folderId": "string",  # must be a folder, not a process application
  "projectId": "string",
  "content": "string",
  "fileType": "string"
}
```

- `PATCH /api/v1/files/{fileId}`
- `POST /api/v1/files`

### Process applications are never returned as folders

In files API responses, the `folderId` is null for any file stored at the root of a process application. Previously, `folderId` would return the process application ID.

Example:

```json
{
  "metadata": {
    "id": "string",
    "name": "string",
    "projectId": "string",
    "folderId": "string", // null if the parent container is a process application
    "simplePath": "string",
    "canonicalPath": [
      {
        "id": "string",
        "name": "string"
      }
    ],
    "revision": 0,
    "type": "string",
    "created": "string",
    "createdBy": {
      "name": "string",
      "email": "string"
    },
    "updated": "string",
    "updatedBy": {
      "name": "string",
      "email": "string"
    }
  },
  "content": "string"
}
```

Affected endpoints:

- `GET /api/v1/files/{fileId}`
- `PATCH /api/v1/files/{fileId}`
- `POST /api/v1/files/search`
- `POST /api/v1/files`

### File paths exclude process applications

In files API responses, the `simplePath` and `canonicalPath` omit the container process application. Previously, the process application was included if it was on the path.

Example:

```json
{
  "metadata": {
    "id": "string",
    "name": "string",
    "projectId": "string",
    "folderId": "string",
    "simplePath": "string", // excludes process applications
    "canonicalPath": [
      // excludes process applications
      {
        "id": "string",
        "name": "string"
      }
    ],
    "revision": 0,
    "type": "string",
    "created": "string",
    "createdBy": {
      "name": "string",
      "email": "string"
    },
    "updated": "string",
    "updatedBy": {
      "name": "string",
      "email": "string"
    }
  },
  "content": "string"
}
```

Affected endpoints:

- `GET /api/v1/files/{fileId}`
- `PATCH /api/v1/files/{fileId}`
- `POST /api/v1/files/search`
- `POST /api/v1/files`

## Projects API

You can no longer read or write process application IDs in any projects API context.

### Process applications are never returned as parent folders

In the `GET /api/v1/projects/{projectId}` response, the `content.folders[i].parentId` and `content.files[i].folderId` are null for any folder or file stored at the root of a process application. Previously, `parentId` and `folderId` would return the process application ID.

Example:

```json
{
  "metadata": {
    "id": "string",
    "name": "string",
    "created": "string",
    "createdBy": {
      "name": "string",
      "email": "string"
    },
    "updated": "string",
    "updatedBy": {
      "name": "string",
      "email": "string"
    }
  },
  "content": {
    "folders": [
      {
        "id": "string",
        "name": "string",
        "projectId": "string",
        "parentId": "string", // null if the parent container is a process application
        "created": "string",
        "updated": "string",
        "createdBy": {
          "name": "string",
          "email": "string"
        },
        "updatedBy": {
          "name": "string",
          "email": "string"
        }
      }
    ],
    "files": [
      {
        "id": "string",
        "name": "string",
        "projectId": "string",
        "folderId": "string", // null if the parent container is a process application
        "simplePath": "string",
        "canonicalPath": [
          {
            "id": "string",
            "name": "string"
          }
        ],
        "revision": 0,
        "type": "string",
        "created": "string",
        "createdBy": {
          "name": "string",
          "email": "string"
        },
        "updated": "string",
        "updatedBy": {
          "name": "string",
          "email": "string"
        }
      }
    ]
  }
}
```

### File paths exclude process applications

In the `GET /api/v1/projects/{projectId}` response, under `content.files`, the `simplePath` and `canonicalPath` omit the container process application. Previously, the process application was included if it was on the path.

Example:

```json
{
  "metadata": {
    "id": "string",
    "name": "string",
    "created": "string",
    "createdBy": {
      "name": "string",
      "email": "string"
    },
    "updated": "string",
    "updatedBy": {
      "name": "string",
      "email": "string"
    }
  },
  "content": {
    "folders": [
      {
        "id": "string",
        "name": "string",
        "projectId": "string",
        "parentId": "string",
        "created": "string",
        "updated": "string",
        "createdBy": {
          "name": "string",
          "email": "string"
        },
        "updatedBy": {
          "name": "string",
          "email": "string"
        }
      }
    ],
    "files": [
      {
        "id": "string",
        "name": "string",
        "projectId": "string",
        "folderId": "string",
        "simplePath": "string", // excludes process applications
        "canonicalPath": [
          // excludes process applications
          {
            "id": "string",
            "name": "string"
          }
        ],
        "revision": 0,
        "type": "string",
        "created": "string",
        "createdBy": {
          "name": "string",
          "email": "string"
        },
        "updated": "string",
        "updatedBy": {
          "name": "string",
          "email": "string"
        }
      }
    ]
  }
}
```

## Versions API

### Version individual process application files

With `POST /api/v1/versions`, you can now publish a new version for process application files. Previously, this endpoint returned a `400 BAD REQUEST` because files were intended to be versioned as part of the process application. See [process application versioning model](/docs/reference/announcements-release-notes/8100/whats-new-in-810.md#process-application-versioning-model) for a deeper explanation of this change.

:::note
When versioning a connector template, you may now receive a `409 CONFLICT` citing a version number you never published.

When you create a new process application version, new element template versions are recorded for the process application's connector template files. Therefore, when you `POST` a new version for the file the version may collide with an existing version implicitly created in the backend.
:::
