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

`/v1/forms/{formId}?processDefinitionKey={processDefinitionKey}`

#### Method:

`GET`

#### Request parameters:

| param name           | type  | required | description                     |
| -------------------- | ----- | -------- | ------------------------------- |
| formId               | path  | `true`   | ID of the form                  |
| processDefinitionKey | query | `true`   | Reference to process definition |

#### HTTP request example:

```bash
curl -X 'GET' \
  'http://{host}/v1/forms/{formId}?processDefinitionKey={processDefinitionKey}' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

#### Responses:

| HTTP status | Description                                                                                   | Response schema                                                                     |
| ----------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 200         | On success                                                                                    | JSON object with [`FormResponse`](../schemas/responses/form-response.mdx) structure |
| 404         | An error is returned when the form with the `formId` and `processDefinitionKey` is not found. | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |
