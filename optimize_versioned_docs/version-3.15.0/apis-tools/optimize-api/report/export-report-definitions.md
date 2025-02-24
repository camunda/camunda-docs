---
id: export-report-definitions
title: "Export report definitions"
description: "The REST API to export report definitions."
---

This API allows users to export report definitions which can later be imported into another Optimize system. The reports to be exported may be within a collection or private entities, the API has access to both.

The obtained list of entity exports can be imported into other Optimize systems either using the dedicated [import API](../import-entities.md) or [via UI](components/userguide/additional-features/export-import.md#importing-entities).

## Method & HTTP target resource

POST `/api/public/export/report/definition/json`

## Request headers

The following request headers have to be provided with every request:

| Header         | Constraints | Value                                               |
| -------------- | ----------- | --------------------------------------------------- |
| Authentication | REQUIRED    | [Authentication](../optimize-api-authentication.md) |

## Query parameters

No query parameters available.

## Request body

The request body should contain a JSON array of report IDs to be exported.

## Result

The response contains a list of exported report definitions.

## Response codes

Possible HTTP response status codes:

| Code | Description                                                                                                                 |
| ---- | --------------------------------------------------------------------------------------------------------------------------- |
| 204  | Request successful.                                                                                                         |
| 401  | Secret incorrect or missing in HTTP Header. See [authentication](../optimize-api-authentication.md) on how to authenticate. |
| 404  | At least one of the given report IDs does not exist.                                                                        |
| 500  | Some error occurred while processing the request, best check the Optimize log.                                              |

## Example

### Export two reports

Assuming you want to export the two reports with IDs `123` and `456` and have configured the accessToken `mySecret`, this is what it would look like:

POST `/api/public/export/report/definition/json`

#### Request header

`Authorization: Bearer mySecret`

#### Request body

```
[ "123", "456" ]
```

#### Response

Status 200.

#### Response content

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
