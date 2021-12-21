---
id: external-variable-ingestion
title: "External Variable Ingestion"
description: "The REST API to ingest external variable data into Optimize."
---

:::note Heads Up!
The external variable ingestion API is a beta feature and will be subject
to future changes.
:::

# Purpose

With the external variable ingestion API, variable data held in external systems can be ingested into Optimize directly,
without the need for these variables to be present in your Camunda platform data. This can be useful when external
business data, which is relevant for process analysis in Optimize, is to be associated with specific process instances.
Especially if this data changes over time it is advisable to use this REST API to persist external variable updates to Optimize, as otherwise Optimize may not be aware of data changes in the external system.

# Functionality

The external variable ingestion API allows users to ingest batches of variable data which Optimize stores in a dedicated
index. All variable data includes a reference to the process instance each variable belongs to, this reference then
enables Optimize to import external variable data from the dedicated index to their respective process instances at
regular intervals. Once Optimize has updated the process instance data, the external variables are available for Report
evaluations in Optimize.

# Limitations

Please note that external variables should be treated as separate from engine variables. If you ingest variables that are already present in the engine, engine imports may override the ingested data and vice versa, leading to unreliable report results. Similarly, if the same ingested batch contains variables with duplicate IDs, you may experience unexpected report results because Optimize will assume only one of the updates per ID and batch to be the most up to date one. Also please ensure that the reference information (process instance ID and process definition key) is accurate, as otherwise Optimize will not be able to correctly associate variables with instance data and may create new instance indices, resulting in data which will not be usable in reports. External variables can only be ingested for process instances and will not be affected by any configured variable plugin.


# Configuration

Please refer to
the [configuration section](../../setup/configuration#external-variable-ingestion-rest-api-configuration) to learn more
about how to set up external variable ingestion.

# Authorization

Every variable ingestion request has to be authorized with an authorization token, this token can either be given as
an [`Authorization`](https://tools.ietf.org/html/rfc7235#section-4.2) request header or as a URI Query Parameter
named `access_token`. This token is configurable, please refer to
the [configuration section](../../setup/configuration#external-variable-ingestion-rest-api-configuration) for further
information.

Given a valid token, `mySecret`, the header would need to be set in one of the following ways:
```
Authorization: mySecret
```
```
Authorization: Bearer mySecret
```
For sending the token as a query parameter the HTTP Query would look like the following:
```
POST /api/ingestion/variable?access_token=mySecret
```

# Method & HTTP Target Resource

POST `/api/ingestion/variable`

# Request Headers

The following request headers have to be provided with every variable ingestion request:

| Header | Constraints | Value |
| --- | --- | --- |
| Authorization | REQUIRED | See [Authorization](#authorization). |
| Content-Type | REQUIRED | `application/json` |

# Request Body

The request body contains an array of variable JSON Objects:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Constraints</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>REQUIRED</td>
    <td>
      The unique identifier of this variable.
    </td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>REQUIRED</td>
    <td>
      The name of the variable.
    </td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>REQUIRED</td>
    <td>
      The type of the variable. Must be one of: String, Short, Long, Double, Integer, Boolean or Date.
    </td>
  </tr>
  <tr>
    <td>value</td>
    <td>String</td>
    <td>REQUIRED</td>
    <td>
      The current value of the variable.
    </td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>REQUIRED</td>
    <td>
        The ID of the process instance this variable is to be associated with.
    </td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>REQUIRED</td>
    <td>
        The definition key of the process instance this variable is to be associated with.
    </td>
  </tr>
</table>

# Result

This method returns no content.

# Response Codes

Possible HTTP Response Status codes:

|Code|Description|
|--- |--- |
|204|Request successful.|
|400|Returned if some of the properties in the request body are invalid or missing.|
|401|Secret incorrect or missing. See [Authorization](#authorization) on how to authorize.|

# Example

### Request
POST `/api/ingestion/variable`

Request Body:

     [
      {
          "id": "7689fced-2639-4408-9de1-cf8f72769f43",
          "name": "address",
          "type": "string",
          "value": "Main Street 1",
          "processInstanceId": "c6393461-02bb-4f62-a4b7-f2f8d9bbbac1",
          "processDefinitionKey": "shippingProcess"
      },
      {
          "id": "993f4e73-7f6a-46a6-bd45-f4f8e3470ba1",
          "name": "amount",
          "type": "integer",
          "value": "500",
          "processInstanceId": "8282ed49-2243-44df-be5e-1bf893755d8f",
          "processDefinitionKey": "orderProcess"
      }
    ]

### Response

Status 204.