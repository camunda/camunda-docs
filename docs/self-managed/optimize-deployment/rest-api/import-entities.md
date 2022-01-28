---
id: import-entities
title: "Import Entities"
description: "The REST API to import Entity definitions."
---

## Purpose

This API allows users to import entity definitions such as Reports and Dashboards into existing Collections. These entity definitions may be obtained either using the [Report](../report/export-report-definitions/) or [Dashboard](../dashboard/export-dashboard-definitions) export API or [via the UI](../../../../components/optimize/userguide/additional-features/export-import#exporting-entities).

### Prerequisites

Please note that for importing via API, the following prerequisites must be met:

- All definitions the entities require exist in the target Optimize.
- The target Collection, identified using the `collectionId` query parameter, must exist in the target system
- The Collection Data Sources must include all relevant definitions for the entities.
- The entity data structures match. To ensure matching data structures, please confirm that the Optimize version of the source is the same as the version of the target Optimize.

If any of the above conditions are not met, the import will fail with an error response, please refer to the error message in the response for more information.

## Method & HTTP Target Resource

POST `/api/public/import`

## Request Headers

The following request headers have to be provided with every request:

|Header|Constraints|Value|
|--- |--- |--- |
|Authorization|REQUIRED*|[Authorization](../authorization)|

* Only required if not set as a query parameter

## Query Parameters

The following query parameters have to be provided with every request:

|Parameter|Constraints|Value|
|--- |--- |--- |
|access_token|REQUIRED*|[Authorization](../authorization)|
|collectionId|REQUIRED|The ID of the Collection for which to retrieve the Report IDs.|

* Only required if not set as a request header

## Request Body

The request body should contain a JSON array of entity definitions to be imported. These entity definitions may be obtained by using the [Report](../report/export-report-definitions) or [Dashboard](../dashboard/export-dashboard-definitions)  export APIs or by [manually exporting entities](../../../../components/optimize/userguide/additional-features/export-import#exporting-entities) via the Optimize UI. 

## Result

The response contains a list of IDs of the newly created entities in the target system.

## Response Codes

Possible HTTP Response Status codes:

|Code|Description|
|--- |--- |
|200|Request successful.|
|400|The provided list of entities is invalid. This can occur if any of the above listed [prerequisites](#prerequisites) are not met. Please check the `detailedMessage` of the error response for more information.|
|401|Secret incorrect or missing in HTTP Header. See [Authorization](../authorization) on how to authenticate.|
|404|The given target Collection ID does not exist.|
|500|Some error occurred while processing the request, best check the Optimize log.|

## Example

### Import two Entities

Assuming you want to import a Report and a Dashboard into the Collection with ID `123`, this is what it would look like:

POST `/api/public/import?collectionId=123&access_token=mySecret`

with request body:

```
[
    {
        "id": "61ae2232-51e1-4c35-b72c-c7152ba264f9",
        "exportEntityType": "single_process_report",
        "name": "Number: Process instance duration",
        "sourceIndexVersion": 8,
        "collectionId": null,
        "data": {...}
    },
    {
        "id": "b0eb845-e8ed-4824-bd85-8cd69038f2f5",
        "exportEntityType": "dashboard",
        "name": "Dashboard 1",
        "sourceIndexVersion": 5,
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

##### Response

Status 200.

##### Response Content

```
[
    {
        "id": "e8ca18b9-e637-45c8-87da-0a2b08b34d6e"
    },
    {
        "id": "290b3425-ba33-4fbb-b20b-a4f236036847"
    }
]
```