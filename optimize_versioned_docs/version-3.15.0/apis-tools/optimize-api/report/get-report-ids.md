---
id: get-report-ids
title: "Get report IDs"
description: "The REST API to retrieve all report IDs in a given collection."
---

This API allows users to retrieve all report IDs from a given collection.

## Method & HTTP target resource

GET `/api/public/report`

## Request headers

The following request headers have to be provided with every request:

| Header         | Constraints | Value                                               |
| -------------- | ----------- | --------------------------------------------------- |
| Authentication | REQUIRED    | [Authentication](../optimize-api-authentication.md) |

## Query parameters

The following query parameters have to be provided with every request:

| Parameter    | Constraints | Value                                                          |
| ------------ | ----------- | -------------------------------------------------------------- |
| collectionId | REQUIRED    | The ID of the Collection for which to retrieve the report IDs. |

## Request body

No request body is required.

## Result

The response contains a list of IDs of the reports existing in the collection with the given collection ID.

## Response codes

Possible HTTP response status codes:

| Code | Description                                                                                                                 |
| ---- | --------------------------------------------------------------------------------------------------------------------------- |
| 200  | Request successful.                                                                                                         |
| 401  | Secret incorrect or missing in HTTP Header. See [authentication](../optimize-api-authentication.md) on how to authenticate. |
| 500  | Some error occurred while processing the request, best check the Optimize log.                                              |

## Example

### Retrieve all report IDs from a collection

Assuming you want to retrieve all report IDs in the collection with the ID `1234` and have configured the accessToken `mySecret`, this is what it would look like:

GET `/api/public/report?collectionId=1234`

#### Request header

`Authorization: Bearer mySecret`

##### Response

Status 200.

##### Response content

```
[
    {
        "id": "9b0eb845-e8ed-4824-bd85-8cd69038f2f5"
    },
    {
        "id": "1a866c7c-563e-4f6b-adf1-c4648531f7d4"
    }
]
```
