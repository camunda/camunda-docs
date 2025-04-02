---
id: delete-report
title: "Delete reports"
description: "The REST API to delete reports from Optimize."
---

The report deletion API allows you to delete reports by ID from Optimize.

:::note Heads up!
During deletion a report will get removed from any dashboard or combined process report it is referenced by. In case a report is referenced by an alert, the corresponding alert will get deleted too.
:::

## Method & HTTP target resource

DELETE `/api/public/report/{report-ID}`

Where `report-ID` is the ID of the report you wish to delete.

## Request headers

The following request headers have to be provided with every delete request:

| Header         | Constraints | Value                                                   |
| -------------- | ----------- | ------------------------------------------------------- |
| Authentication | REQUIRED    | See [authentication](../optimize-api-authentication.md) |

## Query parameters

No query parameters available.

## Request body

No request body is required.

## Result

No response body.

## Response codes

Possible HTTP response status codes:

| Code | Description                                                                                                                 |
| ---- | --------------------------------------------------------------------------------------------------------------------------- |
| 204  | Request successful.                                                                                                         |
| 401  | Secret incorrect or missing in HTTP Header. See [authentication](../optimize-api-authentication.md) on how to authenticate. |
| 404  | The requested report was not found, please check the provided report-ID.                                                    |
| 500  | Some error occurred while processing the request, best check the Optimize log.                                              |

## Example

### Delete a report

Let's assume you want to delete a report with the ID `e6c5abb1-6a18-44e7-8480-d562d511ba62`, this is what it would look like:

DELETE `/api/public/report/e6c5aaa1-6a18-44e7-8480-d562d511ba62`

#### Request header

`Authorization: Bearer mySecret`

#### Response

Status 204.
