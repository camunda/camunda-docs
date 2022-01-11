---
id: delete-dashboard
title: "Dashboard Delete"
description: "The REST API to delete Dashboards from Optimize."
---

<span class="badge badge--platform">Platform only</span>

## Purpose

The Dashboards Deletion API allows to delete Dashboards by ID from Optimize.

:::note Heads up!
The deletion of a Dashboard does not affect the referenced Reports.
:::


## Method & HTTP Target Resource

DELETE `/api/public/dashboard/{dashboard-ID}`

Where `dashboard-ID` is the ID of the Dashboard you wish to delete.

## Request Headers

The following request headers have to be provided with every delete request:

|Header|Constraints|Value|
|--- |--- |--- |
|Authorization|REQUIRED*|See [Authorization](dashboard-api.md/#authorization)|

* Only required if not set as a query parameter

## Query Parameters

The following query parameters have to be provided with every delete request:

|Parameter|Constraints|Value|
|--- |--- |--- |
|access_token|REQUIRED*|See [Authorization](dashboard-api.md/#authorization)|

* Only required if not set as a request header

## Request Body

No request body is required.

## Result

No response body.

## Response Codes

Possible HTTP Response Status codes:

|Code|Description|
|--- |--- |
|204|Request successful.|
|401|Secret incorrect or missing in HTTP Header. See [Authorization](dashboard-api.md/#authorization) on how to authenticate.|
|404|The requested Dashboard was not found, please check the provided dashboard-ID.|
|500|Some error occurred while processing the request, best check the Optimize log.|



## Example

### Delete a Dashboard
Let's assume you want to delete a Dashboard with the ID `e6c5abb1-6a18-44e7-8480-d562d511ba62`, this is what it would look like:

DELETE `/api/public/dashboard/e6c5aaa1-6a18-44e7-8480-d562d511ba62?access_token=mySecret`

##### Response

Status 204.