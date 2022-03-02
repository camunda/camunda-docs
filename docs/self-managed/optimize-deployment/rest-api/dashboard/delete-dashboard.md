---
id: delete-dashboard
title: "Delete dashboards"
description: "The REST API to delete dashboards from Optimize."
---

<span class="badge badge--platform">Platform only</span>

## Purpose

The dashboards deletion API allows you to delete dashboards by ID from Optimize.

:::note Heads up!
The deletion of a dashboard does not affect the referenced reports.
:::

## Method & HTTP target resource

DELETE `/api/public/dashboard/{dashboard-ID}`

Where `dashboard-ID` is the ID of the dashboard you wish to delete.

## Request headers

The following request headers have to be provided with every delete request:

|Header|Constraints|Value|
|--- |--- |--- |
|Authorization|REQUIRED*|See [Authorization](../../authorization)|

* Only required if not set as a query parameter

## Query parameters

The following query parameters have to be provided with every delete request:

|Parameter|Constraints|Value|
|--- |--- |--- |
|access_token|REQUIRED*|See [Authorization](../../authorization)|

* Only required if not set as a request header

## Request body

No request body is required.

## Result

No response body.

## Response codes

Possible HTTP Response status codes:

|Code|Description|
|--- |--- |
|204|Request successful.|
|401|Secret incorrect or missing in HTTP Header. See [Authorization](../../authorization) on how to authenticate.|
|404|The requested dashboard was not found, please check the provided dashboard-ID.|
|500|Some error occurred while processing the request, best check the Optimize log.|

## Example

### Delete a dashboard

Let's assume you want to delete a dashboard with the ID `e6c5abb1-6a18-44e7-8480-d562d511ba62`, this is what it would look like:

DELETE `/api/public/dashboard/e6c5aaa1-6a18-44e7-8480-d562d511ba62?access_token=mySecret`

##### Response

Status 204.
