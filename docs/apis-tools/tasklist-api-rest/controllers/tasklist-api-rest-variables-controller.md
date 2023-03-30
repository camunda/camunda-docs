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

#### Response:

The response will be a JSON object with the following structure [`VariableResponse`](../schemas/responses/variable-response.mdx).
