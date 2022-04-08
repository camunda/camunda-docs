---
id: enable-sharing
title: "Enable Sharing"
description: "The REST API to enable sharing"
---

## Purpose

This API allows users to enable the sharing functionality for all reports and dashboards in Optimize. Please note that this setting will be permanently persisted in memory and will take precedence over any other previous configurations (e.g. configuration files). If sharing had been previously enabled and then disabled, re-enabling sharing will allow users to access previously shared URLs under the same address as before. Calling this endpoint when sharing is already enabled will have no effect.

## Method & HTTP Target Resource

POST `api/public/share/enable`

## Request Headers

The following request headers have to be provided with every request:

|Header|Constraints|Value|
|--- |--- |--- |
|Authorization|REQUIRED|See [Authorization](../../authorization)|

## Query Parameters

No query parameters necessary.

## Request Body

An empty request body should be sent.

## Response Codes

Possible HTTP Response Status codes:

|Code|Description|
|--- |--- |
|204|Request successful.|
|401|Secret incorrect or missing in HTTP Header. See [Authorization](../../authorization) on how to authenticate.|
|500|Some error occurred while processing the request, best check the Optimize log.|

## Example

### Enable sharing

POST `api/public/share/enable`

##### Request header
`Authorization: Bearer mySecret`

##### Response

Status 204 (Successful)

##### Response Content

```
no content
```