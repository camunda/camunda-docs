---
id: tasklist-api-rest-variables-controller
title: Variables API
description: "Learn about the Variables API controller, including request parameters, and an HTTP request example."
---

The Variables API controller provides an API to query variables.

## Endpoints

### Get variable

Get the variable details by variable ID.

#### URL

`/v1/variables/{variableId}`

#### Method

`GET`

#### Request parameters

| Parameter name | Type | Required | Description        |
| -------------- | ---- | :------: | ------------------ |
| variableId     | path |  `true`  | ID of the variable |

#### HTTP request example

Send a token issue GET request to the authorization server with the following content:

```
{
  "variable_id": "<variable-id>",
  "tasklist_session": "<tasklist-session-id>"
}
```

Refer to the following example with curl:

```
curl -X 'GET' \
  'http://{host}/v1/variables/{variableId}?processDefinitionKey={processDefinitionKey}&tasklist_session={tasklist-session-id}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {yourBearerToken}'
```

See details on [Tasklist API (REST) authentication](/apis-tools/tasklist-api-rest/tasklist-api-rest-authentication.md) if you have not already authenticated.

#### Responses

| HTTP status | Description                                                              | Response schema                                                                             |
| ----------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| 200         | On success                                                               | JSON object with [`VariableResponse`](../schemas/responses/variable-response.mdx) structure |
| 404         | An error is returned when the variable with the variableId is not found. | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure               |
