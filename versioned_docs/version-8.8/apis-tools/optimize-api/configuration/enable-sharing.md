---
id: enable-sharing
title: "Enable sharing"
description: "The REST API to enable sharing"
---

This API allows users to enable the sharing functionality for all reports and dashboards in Optimize. Note that this setting will be permanently persisted in memory and will take precedence over any other previous configurations (e.g. configuration files).

If sharing had been previously enabled and then disabled, re-enabling sharing will allow users to access previously shared URLs under the same address as before. Calling this endpoint when sharing is already enabled will have no effect.

## Method & HTTP target resource

POST `api/public/share/enable`

## Request headers

The following request headers must be provided with every request:

| Header         | Constraints | Value                                                   |
| -------------- | ----------- | ------------------------------------------------------- |
| Authentication | REQUIRED    | See [authentication](../optimize-api-authentication.md) |

## Query parameters

No query parameters necessary.

## Request body

An empty request body should be sent.

## Response codes

Possible HTTP Response Status codes:

| Code | Description                                                                                                                 |
| ---- | --------------------------------------------------------------------------------------------------------------------------- |
| 204  | Request successful.                                                                                                         |
| 401  | Secret incorrect or missing in HTTP Header. See [authentication](../optimize-api-authentication.md) on how to authenticate. |
| 500  | Some error occurred while processing the request, best check the Optimize log.                                              |

## Example

### Enable sharing

POST `api/public/share/enable`

#### Request header

`Authorization: Bearer mySecret`

#### Response

Status 204 (Successful)

#### Response content

```
no content
```
