---
id: delete-report
title: "Report Deletion"
description: "The REST API to delete Reports from Optimize."
---

<span class="badge badge--platform">Platform only</span>

## Purpose

The Report Deletion API allows to delete Reports by ID from Optimize.

:::note Heads up!
During deletion a Report will get removed from any Dashboard or Combined Report it is referenced by. In case a Report is referenced by an Alert, the corresponding Alert will get deleted too.
:::

## Method & HTTP Target Resource

DELETE `/api/public/report/{report-ID}`

Where `report-ID` is the ID of the Report you wish to delete.

## Request Headers

The following request headers have to be provided with every delete request:

|Header|Constraints|Value|
|--- |--- |--- |
|Authorization|REQUIRED*|See [Authorization](./report-api.md/#authorization)|

* Only required if not set as a query parameter

## Query Parameters

The following query parameters have to be provided with every delete request:

|Parameter|Constraints|Value|
|--- |--- |--- |
|access_token|REQUIRED*|See [Authorization](report-api.md/#authorization)|

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
|401|Secret incorrect or missing in HTTP Header. See [Authorization](report-api.md/#authorization) on how to authenticate.|
|404|The requested Report was not found, please check the provided report-ID.|
|500|Some error occurred while processing the request, best check the Optimize log.|



## Example

### Delete a report
Let's assume you want to delete a Report with the ID `e6c5abb1-6a18-44e7-8480-d562d511ba62`, this is what it would look like:

DELETE `/api/public/report/e6c5aaa1-6a18-44e7-8480-d562d511ba62?access_token=mySecret`

##### Response

Status 204.