---
id: tasklist-api-rest-form-controller
title: Form API
description: "This article provides a description of Form API controller."
---

## Overview

Provides API to query forms

## Endpoints

### Get form

Get the form details by `formId` and `processDefinitionKey` required param.

#### URL:

GET `/v1/forms/{formId}?processDefinitionKey={processDefinitionKey}`

#### Parameters:

| param name           | type  | required |
| -------------------- | ----- | -------- |
| formId               | path  | true     |
| processDefinitionKey | query | true     |

#### Request format:

```bash
curl -X 'GET' \
  'http://{host}/v1/forms/{formId}?processDefinitionKey={processDefinitionKey}' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

#### Response format:

```json
{
  "id": "string",
  "processDefinitionKey": "string",
  "schema": "string"
}
```
