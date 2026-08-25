---
id: web-modeler-v1-apis
title: "Process application management in Web Modeler API v1"
description: "Learn about changes to process application management in Web Modeler API v1 SaaS."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About these changes

Before 29 August 2026, process applications were not explicitly exposed in Web Modeler API v1. There were no process application endpoints.

However, process applications were implicitly accessible as folders. For example:

- You could pass a process application ID to `DELETE /api/v1/folders/{folderId}` to delete the process application.
- The response for `GET /api/v1/folders/{folderId}` returns a `parentId`, representing the folder's parent folder. If the parent is in a process application, rather than another folder, the process application ID is returned.

In preparation for Camunda 8.10, file organization in Web Modeler has changed. Projects can now only contain process applications and IDP applications. Files and folders are always stored inside process applications. To support this new file hierarchy, two major changes have been introduced to Web Modeler API v1:

- Process applications are no longer implicitly accessible via v1 folders, files, and project APIs.
- New process application APIs and changes to existing APIs are introduced to make access explicit.

:::note
These changes currently only apply to the Web Modeler API running in Camunda 8 SaaS. They apply to Self-Managed starting in Camunda 8.10.
:::

## Folders API

You can no longer read or write process application IDs in any folders API context.

### Folder IDs reference folders

In folders API requests, you'll receive a `404 NOT FOUND` if you pass a process application ID as the `folderId`. Previously, you could pass a process application's ID when deleting, reading, and updating folders.

Example:

```shell
GET /api/v1/folders/1ef492f5-7ddc-43a7-b5e2-f5ad5c14b676  # must be a folder, not a process application
```

Affected endpoints:

- `DELETE /api/v1/folders/{folderId}`
- `GET /api/v1/folders/{folderId}`
- `PATCH /api/v1/folders/{folderId}`

Instead of passing the process application ID to the folders endpoints, use the new process application endpoints:

- `DELETE /api/v1/processApplications/{processApplicationId}`
- `GET /api/v1/processApplications/{processApplicationId}`
- `PATCH /api/v1/processApplications/{processApplicationId}`

Example:

```shell
GET /api/v1/processApplications/e005e49a-dce8-42ee-b0db-30b1d5555ebd  # must be a process application, not a folder
```

### Parent IDs reference folders

In folders API requests, you'll receive a `404 NOT FOUND` if you pass a process application ID as the `parentId`. Previously, you could pass a process application's ID when writing data. Use the new `processApplicationId` field to specify the target process application and, optionally, the `parentId` field to specify a target folder.

Example:

```shell
POST /api/v1/folders
{
  "name": "Nested folder",
  "projectId": "fb928277-6268-44bb-b3e6-1925fa730ecf",
  "parentId": "1ef492f5-7ddc-43a7-b5e2-f5ad5c14b676",  # must be a folder, not a process application
  "processApplicationId": "e005e49a-dce8-42ee-b0db-30b1d5555ebd"  # new process application field
}
```

Affected endpoints:

- `PATCH /api/v1/folders/{folderId}`
- `POST /api/v1/folders`

### Process applications are never returned as parent folders

In folders API responses, the `parentId` is null for any folder stored at the root of a process application. Previously, `parentId` would return the process application ID. The process application ID is, instead, returned in a new `processApplicationId` field.

Example:

```json
{
  "id": "f169a3d4-056b-463c-b4c9-6c3600c2213a",
  "name": "Root folder",
  "projectId": "58a93bf7-4ea0-4e56-85fa-5c8fccc3877d",
  "parentId": null, // null if the parent container is a process application
  "processApplicationId": "e005e49a-dce8-42ee-b0db-30b1d5555ebd", // new process application field
  "created": "2026-08-24T14:17:33.889317Z",
  "createdBy": {
    "name": "Jane Doe",
    "email": "jane.doe@email.com"
  },
  "updated": "2026-08-24T14:23:48.371161659Z",
  "updatedBy": {
    "name": "Jane Doe",
    "email": "jane.doe@email.com"
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

In files API requests, you'll receive a `404 NOT FOUND` if you pass a process application ID as the `folderId`. Previously, you could pass a process application's ID to place the file in the process application. Use the new `processApplicationId` field to specify the target process application and, optionally, the `folderId` field to specify a target folder.

```shell
POST /api/v1/files
{
  "name": "New BPMN diagram",
  "folderId": "cdcf3895-1061-4084-b97e-c0abaab59b6f",  # must be a folder, not a process application
  "processApplicationId": "e005e49a-dce8-42ee-b0db-30b1d5555ebd",  # new process application field
  "projectId": "fb928277-6268-44bb-b3e6-1925fa730ecf",
  "content": "...",
  "fileType": "BPMN"
}
```

Affected endpoints:

- `PATCH /api/v1/files/{fileId}`
- `POST /api/v1/files`

### Process applications are never returned as folders

In files API responses, the `folderId` is null for any file stored at the root of a process application. Previously, `folderId` would return the process application ID. The process application ID is, instead, returned in a new `processApplicationId` field.

Example:

```json
{
  "id": "5cafbf6a-d5d8-4ed2-8dae-b950ce3597c3",
  "name": "New BPMN diagram",
  "projectId": "fb928277-6268-44bb-b3e6-1925fa730ecf",
  "folderId": null, // null if the parent container is a process application
  "processApplicationId": "e005e49a-dce8-42ee-b0db-30b1d5555ebd", // new process application field
  "simplePath": "New BPMN diagram.bpmn",
  "canonicalPath": [],
  "revision": 2,
  "type": "BPMN",
  "created": "2026-08-24T14:17:33.889317Z",
  "createdBy": {
    "name": "Jane Doe",
    "email": "jane.doe@email.com"
  },
  "updated": "2026-08-24T14:23:48.371161659Z",
  "updatedBy": {
    "name": "Jane Doe",
    "email": "jane.doe@email.com"
  }
}
```

Affected endpoints:

- `GET /api/v1/files/{fileId}`
- `PATCH /api/v1/files/{fileId}`
- `POST /api/v1/files/search`
- `POST /api/v1/files`

### File paths exclude process applications

In files API endpoints, the `simplePath` and `canonicalPath` omit the container process application. Previously, the process application was included if it was on the path.

Example:

```json
{
  "metadata": {
    "id": "ed043868-556f-4a93-97dc-3cba1652363c",
    "name": "New BPMN diagram",
    "projectId": "fb928277-6268-44bb-b3e6-1925fa730ecf",
    "folderId": "cdcf3895-1061-4084-b97e-c0abaab59b6f",
    "processApplicationId": "e005e49a-dce8-42ee-b0db-30b1d5555ebd", // new process application field
    "simplePath": "Root folder/New BPMN diagram.bpmn", // excludes process applications
    "canonicalPath": [
      // excludes process applications
      {
        "id": "cdcf3895-1061-4084-b97e-c0abaab59b6f",
        "name": "Root folder"
      }
    ],
    "revision": 2,
    "type": "BPMN",
    "created": "2026-08-24T17:35:46.329162Z",
    "createdBy": {
      "name": "Jane Doe",
      "email": "jane.doe@email.com"
    },
    "updated": "2026-08-24T17:35:46.330218Z",
    "updatedBy": {
      "name": "Jane Doe",
      "email": "jane.doe@email.com"
    }
  },
  "content": "..."
}
```

Affected endpoints:

- `GET /api/v1/files/{fileId}`
- `PATCH /api/v1/files/{fileId}`
- `POST /api/v1/files/search` (the process application is excluded from these paths in both the response and the request `filter`)
- `POST /api/v1/files`

### Search for files in a process application

With `POST /api/v1/files/search`, you can now use a new `processApplicationId` filter.

Example:

```shell
POST /api/v1/files/search
{
  "filter": {
    "processApplicationId": "e005e49a-dce8-42ee-b0db-30b1d5555ebd"
  }
}
```

## Projects API

You can no longer read or write process application IDs in any projects API context.

### Process applications are never returned as parent folders

In the `GET /api/v1/projects/{projectId}` response, the `content.folders[i].parentId` and `content.files[i].folderId` are null for any folder or file stored at the root of a process application. Previously, `parentId` and `folderId` would return the process application ID.

Example:

```json
{
  "metadata": {
    "id": "fb928277-6268-44bb-b3e6-1925fa730ecf",
    "name": "Project",
    "created": "2026-08-24T17:35:46.329162Z",
    "createdBy": {
      "name": "Jane Doe",
      "email": "jane.doe@email.com"
    },
    "updated": "2026-08-24T17:35:46.330218Z",
    "updatedBy": {
      "name": "Jane Doe",
      "email": "jane.doe@email.com"
    }
  },
  "content": {
    "folders": [
      {
        "id": "cdcf3895-1061-4084-b97e-c0abaab59b6f",
        "name": "Root folder",
        "projectId": "fb928277-6268-44bb-b3e6-1925fa730ecf",
        "parentId": null, // null if the parent container is a process application
        "created": "2026-08-24T14:37:04.36503Z",
        "createdBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        },
        "updated": "2026-08-24T14:37:07.470563Z",
        "updatedBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        }
      }
    ],
    "files": [
      {
        "id": "5a6aa24f-844b-4da2-9118-007f5c1a2df7",
        "name": "Root file",
        "projectId": "fb928277-6268-44bb-b3e6-1925fa730ecf",
        "folderId": null, // null if the parent container is a process application
        "simplePath": "Root file.bpmn",
        "canonicalPath": [],
        "revision": 2,
        "type": "BPMN",
        "created": "2026-08-24T14:17:33.889317Z",
        "createdBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        },
        "updated": "2026-08-24T14:23:48.371161659Z",
        "updatedBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        }
      },
      {
        "id": "ed043868-556f-4a93-97dc-3cba1652363c",
        "name": "Nested file",
        "projectId": "fb928277-6268-44bb-b3e6-1925fa730ecf",
        "folderId": "cdcf3895-1061-4084-b97e-c0abaab59b6f",
        "simplePath": "Root folder/Nested file.bpmn",
        "canonicalPath": [
          {
            "id": "cdcf3895-1061-4084-b97e-c0abaab59b6f",
            "name": "Root folder"
          }
        ],
        "revision": 3,
        "type": "BPMN",
        "created": "2026-08-24T14:17:33.889317Z",
        "createdBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        },
        "updated": "2026-08-24T14:23:48.371161659Z",
        "updatedBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        }
      }
    ],
    "processApplications": [
      {
        "id": "e005e49a-dce8-42ee-b0db-30b1d5555ebd",
        "name": "Process application"
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
    "id": "fb928277-6268-44bb-b3e6-1925fa730ecf",
    "name": "Project",
    "created": "2026-08-24T14:17:33.889317Z",
    "createdBy": {
      "name": "Jane Doe",
      "email": "jane.doe@email.com"
    },
    "updated": "2026-08-24T14:23:48.371161659Z",
    "updatedBy": {
      "name": "Jane Doe",
      "email": "jane.doe@email.com"
    }
  },
  "content": {
    "folders": [
      {
        "id": "cdcf3895-1061-4084-b97e-c0abaab59b6f",
        "name": "Root folder",
        "projectId": "fb928277-6268-44bb-b3e6-1925fa730ecf",
        "parentId": null,
        "created": "2026-08-24T14:37:04.36503Z",
        "createdBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        },
        "updated": "2026-08-24T14:37:07.470563Z",
        "updatedBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        }
      }
    ],
    "files": [
      {
        "id": "5a6aa24f-844b-4da2-9118-007f5c1a2df7",
        "name": "Root file",
        "projectId": "fb928277-6268-44bb-b3e6-1925fa730ecf",
        "folderId": null,
        "simplePath": "Root file.bpmn", // excludes process applications
        "canonicalPath": [], // excludes process applications
        "revision": 2,
        "type": "BPMN",
        "created": "2026-08-24T14:17:33.889317Z",
        "createdBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        },
        "updated": "2026-08-24T14:23:48.371161659Z",
        "updatedBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        }
      },
      {
        "id": "ed043868-556f-4a93-97dc-3cba1652363c",
        "name": "Nested file",
        "projectId": "fb928277-6268-44bb-b3e6-1925fa730ecf",
        "folderId": "cdcf3895-1061-4084-b97e-c0abaab59b6f",
        "simplePath": "Root folder/Nested file.bpmn", // excludes process applications
        "canonicalPath": [
          // excludes process applications
          {
            "id": "cdcf3895-1061-4084-b97e-c0abaab59b6f",
            "name": "Root folder"
          }
        ],
        "revision": 3,
        "type": "BPMN",
        "created": "2026-08-24T14:17:33.889317Z",
        "createdBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        },
        "updated": "2026-08-24T14:23:48.371161659Z",
        "updatedBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        }
      }
    ],
    "processApplications": [
      {
        "id": "e005e49a-dce8-42ee-b0db-30b1d5555ebd",
        "name": "Process application"
      }
    ]
  }
}
```

### Project folders exclude process applications

In the `GET /api/v1/projects/{projectId}` response, `content.folders` excludes process applications. Previously, process applications were included in this list. The process applications are, instead, returned in a new `content.processApplications` field.

```json
{
  "metadata": {
    "id": "fb928277-6268-44bb-b3e6-1925fa730ecf",
    "name": "Project",
    "created": "2026-08-24T14:17:33.889317Z",
    "createdBy": {
      "name": "Jane Doe",
      "email": "jane.doe@email.com"
    },
    "updated": "2026-08-24T14:23:48.371161659Z",
    "updatedBy": {
      "name": "Jane Doe",
      "email": "jane.doe@email.com"
    }
  },
  "content": {
    "folders": [
      // excludes process applications
      {
        "id": "cdcf3895-1061-4084-b97e-c0abaab59b6f",
        "name": "Root folder",
        "projectId": "fb928277-6268-44bb-b3e6-1925fa730ecf",
        "parentId": null,
        "created": "2026-08-24T14:37:04.36503Z",
        "createdBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        },
        "updated": "2026-08-24T14:37:07.470563Z",
        "updatedBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        }
      }
    ],
    "files": [
      {
        "id": "5a6aa24f-844b-4da2-9118-007f5c1a2df7",
        "name": "Root file",
        "projectId": "fb928277-6268-44bb-b3e6-1925fa730ecf",
        "folderId": null,
        "simplePath": "Root file.bpmn",
        "canonicalPath": [],
        "revision": 2,
        "type": "BPMN",
        "created": "2026-08-24T14:17:33.889317Z",
        "createdBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        },
        "updated": "2026-08-24T14:23:48.371161659Z",
        "updatedBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        }
      },
      {
        "id": "ed043868-556f-4a93-97dc-3cba1652363c",
        "name": "Nested file",
        "projectId": "fb928277-6268-44bb-b3e6-1925fa730ecf",
        "folderId": "cdcf3895-1061-4084-b97e-c0abaab59b6f",
        "simplePath": "Root folder/Nested file.bpmn",
        "canonicalPath": [
          {
            "id": "cdcf3895-1061-4084-b97e-c0abaab59b6f",
            "name": "Root folder"
          }
        ],
        "revision": 3,
        "type": "BPMN",
        "created": "2026-08-24T14:17:33.889317Z",
        "createdBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        },
        "updated": "2026-08-24T14:23:48.371161659Z",
        "updatedBy": {
          "name": "Jane Doe",
          "email": "jane.doe@email.com"
        }
      }
    ],
    "processApplications": [
      // new process applications list
      {
        "id": "e005e49a-dce8-42ee-b0db-30b1d5555ebd",
        "name": "Process application"
      }
    ]
  }
}
```

## Versions API

### Version individual process application files

With `POST /api/v1/versions`, you can now publish a new version for process application files. Previously, this endpoint returned a `400 BAD REQUEST` because files were intended to be versioned as part of the process application. See [process application versioning model](/docs/reference/announcements-release-notes/8100/whats-new-in-810.md#process-application-versioning-model) for a deeper explanation of this change.

:::note
When versioning a connector template, you may receive a `409 CONFLICT` citing a version number you never explicitly published because:

- Process application versions, which are managed in the [Web Modeler user interface](/components/modeler/web-modeler/process-applications/process-application-versioning.md), operate on the same set of file versions the versions API operates on. A new process application version results in new versions for each individual file the process application contains.
- An element template version, which is defined in the [template metadata](/components/modeler/element-templates/template-metadata.md#identification-id-and-version), can't be created if the version already exists in Web Modeler.
- Therefore, if a process application version is created, but the element template version hasn't been updated, you receive a `409`.
  :::
