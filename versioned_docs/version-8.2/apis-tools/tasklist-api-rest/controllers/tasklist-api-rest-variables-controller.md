---
id: tasklist-api-rest-variables-controller
title: Variables API
description: "Learn about the Variables API controller, including request parameters, and an HTTP request example."
---

The Variables API controller provides an API to query variables.

## Endpoints

### Get variable

Get the variable details by variable id.

#### URL

`/v1/variables/{variableId}`

#### Method

`GET`

#### Request parameters

| Parameter name | Type | Required | Description        |
| -------------- | ---- | :------: | ------------------ |
| variableId     | path |  `true`  | ID of the variable |

#### HTTP request example

```bash
curl -X 'GET' \
'http://{host}/v1/variables/{variableId}' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

#### Responses

:::caution
Starting with the upcoming release, we're making changes to the response format for a `200` status.
The returned JSON will be simplified as follows:

Current response:

```json
{
  "id": "string",
  "name": "string",
  "value": "string",
  "isValueTruncated": true,
  "previewValue": "string"
}
```

New response (from next release):

```json
{
  "id": "string",
  "name": "string",
  "value": "string"
}
```

:::

| HTTP status | Description                                                              | Response schema                                                                             |
| ----------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| 200         | On success                                                               | JSON object with [`VariableResponse`](../schemas/responses/variable-response.mdx) structure |
| 404         | An error is returned when the variable with the variableId is not found. | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure               |
