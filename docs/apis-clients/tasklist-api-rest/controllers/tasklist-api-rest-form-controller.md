---
id: tasklist-api-rest-form-controller
title: Form API
description: "Learn about the Form API controller, including the request parameters and an HTTP request example."
---

The Form API controller provides an API to query forms.

## Endpoints

### Get form

Get the form details by `formId` and `processDefinitionKey` required parameters.

#### URL

`/v1/forms/{formId}?processDefinitionKey={processDefinitionKey}`

#### Method

`GET`

#### Request parameters

| Parameter name       | Type  | Required | Description                         |
| -------------------- | ----- | -------- | ----------------------------------- |
| formId               | path  | `true`   | ID of the form                      |
| processDefinitionKey | query | `true`   | Reference to the process definition |

#### HTTP request example

```bash
curl -X 'GET' \
  'http://{host}/v1/forms/{formId}?processDefinitionKey={processDefinitionKey}' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

#### Responses

| HTTP status | Description                                                                                   | Response schema                                                                     |
| ----------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 200         | On success                                                                                    | JSON object with [`FormResponse`](../schemas/responses/form-response.mdx) structure |
| 404         | An error is returned when the form with the `formId` and `processDefinitionKey` is not found. | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |
