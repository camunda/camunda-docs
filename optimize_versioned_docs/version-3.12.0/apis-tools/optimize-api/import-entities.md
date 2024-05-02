---
id: import-entities
title: "Import entities"
description: "The REST API to import entity definitions."
---

This API allows users to import entity definitions such as reports and dashboards into existing collections. These entity definitions may be obtained either using the [report](../report/export-report-definitions/) or [dashboard](../dashboard/export-dashboard-definitions) export API or [via the UI](components/userguide/additional-features/export-import.md#exporting-entities).

## Prerequisites

For importing via API, the following prerequisites must be met:

- All definitions the entities require exist in the target Optimize.
- The target collection, identified using the `collectionId` query parameter, must exist in the target system.
- The collection data sources must include all relevant definitions for the entities.
- The entity data structures match. To ensure matching data structures, confirm that the Optimize version of the source is the same as the version of the target Optimize.

If any of the above conditions are not met, the import will fail with an error response; refer to the error message in the response for more information.

## Method & HTTP target resource

POST `/api/public/import`

## Request headers

The following request headers have to be provided with every request:

| Header         | Constraints | Value                                              |
| -------------- | ----------- | -------------------------------------------------- |
| Authentication | REQUIRED    | [Authentication](./optimize-api-authentication.md) |

## Query parameters

The following query parameters have to be provided with every request:

| Parameter    | Constraints | Value                                                          |
| ------------ | ----------- | -------------------------------------------------------------- |
| collectionId | REQUIRED    | The ID of the collection for which to retrieve the report IDs. |

## Request body

The request body should contain a JSON array of entity definitions to be imported. These entity definitions may be obtained by using the [report](../report/export-report-definitions) or [dashboard](../dashboard/export-dashboard-definitions) export APIs or by [manually exporting entities](components/userguide/additional-features/export-import.md#exporting-entities) via the Optimize UI.

## Result

The response contains a list of DTOs that specify the ID and entity type (`report` or `dashboard`) of each newly created entity in the target system.

## Response codes

Possible HTTP response status codes:

| Code | Description                                                                                                                                                                                              |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200  | Request successful.                                                                                                                                                                                      |
| 400  | The provided list of entities is invalid. This can occur if any of the above listed [prerequisites](#prerequisites) are not met. Check the `detailedMessage` of the error response for more information. |
| 401  | Secret incorrect or missing in HTTP header. See [authentication](./optimize-api-authentication.md) on how to authenticate.                                                                               |
| 404  | The given target collection ID does not exist.                                                                                                                                                           |
| 500  | Some error occurred while processing the request, best check the Optimize log.                                                                                                                           |

## Example

### Import two entities

Assuming you want to import a report and a dashboard into the collection with ID `123`, this is what it would look like:

POST `/api/public/import?collectionId=123`

#### Request header

`Authorization: Bearer mySecret`

#### Request body

```
[
    {
        "id": "61ae2232-51e1-4c35-b72c-c7152ba264f9",
        "exportEntityType": "single_process_report",
        "name": "Number: Process instance duration",
        "description": "This report shows the average instance duration",
        "sourceIndexVersion": 11,
        "collectionId": null,
        "data": {...}
    },
    {
        "id": "b0eb845-e8ed-4824-bd85-8cd69038f2f5",
        "exportEntityType": "dashboard",
        "name": "Dashboard 1",
        "description": "This dashboard displays reports relating to process durations",
        "sourceIndexVersion": 8,
        "reports": [
            {
                "id": "61ae2232-51e1-4c35-b72c-c7152ba264f9",
                ...
            }
        ],
        "availableFilters": [...],
        "collectionId": null
    }
]
```

#### Response

Status 200.

#### Response Content

```
[
    {
        "id": "e8ca18b9-e637-45c8-87da-0a2b08b34d6e",
        "entityType": "dashboard"
    },
    {
        "id": "290b3425-ba33-4fbb-b20b-a4f236036847",
        "entityType": "report"
    }
]
```
