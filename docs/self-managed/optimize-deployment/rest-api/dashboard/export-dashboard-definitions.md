---
id: export-dashboard-definitions
title: "Export Dashboard Definitions"
description: "The REST API to export Dashboard definitions."
---

## Purpose

This API allows users to export Dashboard definitions which can later be imported into another Optimize system. Note that exporting a Dashboard also exports all Reports contained within the Dashboard. The Dashboards to be exported may be within a Collection or private entities, the API has access to both.  
The obtained list of entity exports can be imported into other Optimize systems either using the dedicated [import API](../../import-entities) or [via UI](../../../../../components/optimize/userguide/additional-features/export-import#importing-entities).

## Method & HTTP Target Resource

POST `/api/public/export/dashboard/definition/json`

## Request Headers

The following request headers have to be provided with every request:

|Header|Constraints|Value|
|--- |--- |--- |
|Authorization|REQUIRED*|[Authorization](../../authorization)|

* Only required if not set as a query parameter

## Query Parameters

The following query parameters have to be provided with every request:

|Parameter|Constraints|Value|
|--- |--- |--- |
|access_token|REQUIRED*|See [Authorization](../../authorization)|

* Only required if not set as a request header

## Request Body

The request body should contain a JSON array of Dashboard IDs to be exported.

## Result

The response contains a list of exported Dashboard definitions as well as all Report Definitions contained within the Dashboards.

## Response Codes

Possible HTTP Response Status codes:

|Code|Description|
|--- |--- |
|204|Request successful.|
|401|Secret incorrect or missing in HTTP Header. See [Authorization](../../authorization) on how to authenticate.|
|404|At least one of the given Dashboard IDs does not exist.|
|500|Some error occurred while processing the request, best check the Optimize log.|

## Example

### Export two Dashboards

Assuming you want to export the two Dashboards with IDs `123` and `456` and have configured the accessToken `mySecret`, this is what it would look like:

POST `/api/public/export/dashboard/definition/json?access_token=mySecret`

with request body:

```
[ "123", "456" ]
```

##### Response

Status 200.

##### Response Content

The response contains the two exported Dashboard definitions as well as all three process Reports contained within the two Dashboards.

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
        "id": "625c2411-b95f-4442-936b-1976b9511d4a",
        "exportEntityType": "single_process_report",
        "name": "Heatmap: Flownode count",
        "sourceIndexVersion": 8,
        "collectionId": null,
        "data": {...}
    },
    {
        "id": "94a7252e-d5c3-45ea-9906-75271cc0cac2",
        "exportEntityType": "single_process_report",
        "name": "Data Table: User task count",
        "sourceIndexVersion": 8,
        "collectionId": null,
        "data": {...}
    },
    {
        "id": "123",
        "exportEntityType": "dashboard",
        "name": "Dashboard 1",
        "sourceIndexVersion": 5,
        "reports": [
            {
                "id": "61ae2232-51e1-4c35-b72c-c7152ba264f9",
                ...
            },
            {
                "id": "625c2411-b95f-4442-936b-1976b9511d4a",
                ...
            }
        ],
        "availableFilters": [...],
        "collectionId": null
    },
    {
        "id": "456",
        "exportEntityType": "dashboard",
        "name": "Dashboard 2",
        "sourceIndexVersion": 5,
        "reports": [
            {
                "id": "94a7252e-d5c3-45ea-9906-75271cc0cac2",
                ...
            }
        ],
        "availableFilters": [...],
        "collectionId": null
    }
]
```