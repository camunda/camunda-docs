---
id: get-report-ids
title: "Get Report IDs"
description: "The REST API to retrieve all Report IDs in a given Collection."
---

## Purpose

This API allows users to retrieve all Report IDs from a given Collection.

## Method & HTTP Target Resource

GET `/api/public/report`

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
|access_token|REQUIRED*|[Authorization](../../authorization)|
|collectionId|REQUIRED|The ID of the Collection for which to retrieve the Report IDs.|


* Only required if not set as a request header

## Request Body

No request body is required.

## Result

The response contains a list of IDs of the Reports existing in the Collection with the given Collection ID.

## Response Codes

Possible HTTP Response Status codes:

|Code|Description|
|--- |--- |
|200|Request successful.|
|401|Secret incorrect or missing in HTTP Header. See [Authorization](../../authorization) on how to authenticate.|
|500|Some error occurred while processing the request, best check the Optimize log.|

## Example

#### Retrieve all Report IDs from a Collection
Assuming you want to retrieve all Report IDs in the Collection with the ID `1234` and have configured the accessToken `mySecret`, this is what it would look like:

GET `/api/public/report?collectionId=1234&access_token=mySecret`

###### Response

Status 200.

###### Response Content

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