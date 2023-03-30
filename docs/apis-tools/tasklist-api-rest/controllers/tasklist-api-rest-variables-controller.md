---
id: tasklist-api-rest-variables-controller
title: Variables API
description: "This article provides a description of Variables API controller."
---

## Overview

Provides API to query variables

## Endpoints

### Get variable

Get the variable details by variable id.

#### URL:

`/v1/variables/{variableId}`

#### Method:

`GET`

#### Request parameters:

| param name | type | required | description        |
| ---------- | ---- | :------: | ------------------ |
| variableId | path |   true   | ID of the variable |

#### HTTP request example:

```bash
curl -X 'GET' \
'http://{host}/v1/variables/{variableId}' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

#### Responses:

| HTTP status | Description                                                              | Response schema                                                                             |
| ----------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| 200         | On success                                                               | JSON object with [`VariableResponse`](../schemas/responses/variable-response.mdx) structure |
| 404         | An error is returned when the variable with the variableId is not found. | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure               |
