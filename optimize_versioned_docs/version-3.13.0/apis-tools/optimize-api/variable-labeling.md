---
id: variable-labeling
title: "Variable labeling"
description: "The REST API to create, update, and delete variable labels in Optimize."
---

With the variable labeling endpoint, variable labels can be added, updated, and deleted from Optimize.

## Functionality

The variable labeling API allows users to add, update, and delete batches of variable label data, which Optimize stores in a dedicated
index. All variable label data includes a reference to the process definition each variable belongs to, which allows Optimize to display a variable's label instead of its original name anywhere the given process definition is being used. Some examples of that would be in reports, configuring filters, report grouping, dashboard filters, and event-based processes.

## Limitations

Note that this feature is currently not supported in task analysis. This means that during task analysis, the original name of a variable will be displayed.

## Authentication

Every request requires [authentication](./optimize-api-authentication.md).

## Method & HTTP target resource

POST `/api/public/variables/labels`

## Request headers

The following request headers must be provided with every variable labeling request:

| Header         | Constraints | Value                                              |
| -------------- | ----------- | -------------------------------------------------- |
| Authentication | REQUIRED\*  | [Authentication](./optimize-api-authentication.md) |

## Request body

The request body should contain a reference to the process definition using its key, as well as an array of variable labels. Each variable label object in the array must specify the name and type of the variable for which a label is being added, as well as the value of the label itself.

## Result

This method returns no content.

## Response codes

Possible HTTP Response Status codes:

| Code | Description                                                                             |
| ---- | --------------------------------------------------------------------------------------- |
| 204  | Request successful.                                                                     |
| 400  | Returned if some of the properties in the request body are invalid or missing.          |
| 401  | Secret incorrect or missing. See [authentication](#authentication) on how to authorize. |
| 404  | The process definition with the given definition key doesn't exist.                     |

## Example 1

Insert three labels for three variable for a given process definition

:::note
If the label exists already in the index, its value will be overridden.
:::

### Request

POST `/api/public/variables/labels`

Request Body:

```
        {
          "definitionKey": "bookrequest-1-tenant",
          "labels" : [
            {
              "variableName": "bookAvailable",
              "variableType": "Boolean",
              "variableLabel": "book availability"
            },
            {
              "variableName": "person.name",
              "variableType": "String",
              "variableLabel": "first and last name"
            },
            {
              "variableName": "person.hobbies._listSize",
              "variableType": "Long",
              "variableLabel": "amount of hobbies"
            }
          ]
        }
```

### Response

Status 204.

## Example 2

Delete a label for a variable belonging to a given process definition by inputting an empty
string for its value. If there is no label for the given variable in Elasticsearch, no operation is being conducted.

### Request

POST `/api/public/variables/labels`

Request Body:

```
      {
        "definitionKey": "bookrequest-1-tenant",
        "labels" : [
          {
            "variableName": "bookAvailable",
            "variableType": "Boolean",
            "variableLabel": ""
          }
        ]
      }
```

### Response

Status 204.

## Example 3

Insert and delete labels for two variables belonging to a given process definition. The following example adds a label for the variable with name **bookAvailable** and deletes a label for the variable with name **person.name**.

### Request

POST `/api/public/variables/labels`

Request Body:

```
      {
        "definitionKey": "bookrequest-1-tenant",
         "labels" : [
           {
             "variableName": "bookAvailable",
             "variableType": "Boolean",
             "variableLabel": "book availability"
           },
           {
             "variableName": "person.name",
             "variableType": "String",
             "variableLabel": ""
           },
         ]
       }
```

### Response

Status 204.

## Example 4

Attempting to insert multiple labels for the same variable will result to a 400 response code.

### Request

POST `/api/public/variables/labels`

Request Body:

```
      {
        "definitionKey": "someProcessDefinitionKey",
        "labels" : [
          {
            "variableName": "bookAvailable",
            "variableType": "Boolean",
            "variableLabel": "book availability"
          },
          {
            "variableName": "bookAvailable",
            "variableType": "Boolean",
            "variableLabel": "is book available"
          },
        ]
      }
```

### Response

Status 400.
