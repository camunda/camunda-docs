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

GET `/v1/variables/{variableId}`

#### Parameters:

| param name | type | required | description        |
| ---------- | ---- | :------: | ------------------ |
| variableId | path |   true   | ID of the variable |

#### Request format:

```bash
curl -X 'GET' \
'http://{host}/v1/variables/{variableId}' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

#### Response format:

```json
{
  "id": "string",
  "name": "string",
  "value": "string",
  "isValueTruncated": true,
  "previewValue": "string"
}
```
