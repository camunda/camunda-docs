---
id: export-report-definitions
title: "Export Report Definitions"
description: "The REST API to export Report definitions."
---

## Purpose

This API allows users to export Report definitions which can later be imported into another Optimize system. The Reports to be exported may be within a Collection or private entities, the API has access to both.  
The obtained list of entity exports can be imported into other Optimize systems either using the dedicated [import API](../../import-entities) or [via UI](../../../../../components/optimize/userguide/additional-features/export-import#importing-entities).

## Method & HTTP Target Resource

POST `/api/public/export/report/definition/json`

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

The request body should contain a JSON array of Report IDs to be exported.

## Result

The response contains a list of exported Report definitions.

## Response Codes

Possible HTTP Response Status codes:

|Code|Description|
|--- |--- |
|204|Request successful.|
|401|Secret incorrect or missing in HTTP Header. See [Authorization](../../authorization) on how to authenticate.|
|404|At least one of the given Report IDs does not exist.|
|500|Some error occurred while processing the request, best check the Optimize log.|

## Example

### Export two Reports

Assuming you want to export the two Reports with IDs `123` and `456` and have configured the accessToken `mySecret`, this is what it would look like:

POST `/api/public/export/report/definition/json?access_token=mySecret`

with request body:

```
[ "123", "456" ]
```

##### Response

Status 200.

##### Response Content

```
[
    {
        "id": "123",
        "exportEntityType": "single_process_report",
        "name": "Number: Process instance duration",
        "sourceIndexVersion": 8,
        "collectionId": "40cb3657-bdcb-459d-93ce-06877ac7244a",
        "data": {...}
    },
    {
        "id": "456",
        "exportEntityType": "single_process_report",
        "name": "Heatmap: Flownode count",
        "sourceIndexVersion": 8,
        "collectionId": "40cb3657-bdcb-459d-93ce-06877ac7244a",
        "data": {...}
    }
]
```