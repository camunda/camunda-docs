---
id: external-variable-ingestion
title: "External variable ingestion"
description: "The REST API to ingest external variable data into Optimize."
---

With the external variable ingestion API, variable data held in external systems can be ingested into Optimize directly,
without the need for these variables to be present in your Camunda platform data. This can be useful when external
business data, which is relevant for process analysis in Optimize, is to be associated with specific process instances.

Especially if this data changes over time, it is advisable to use this REST API to persist external variable updates to Optimize, as otherwise Optimize may not be aware of data changes in the external system.

## Functionality

The external variable ingestion API allows users to ingest batches of variable data which Optimize stores in a dedicated
index. All variable data includes a reference to the process instance each variable belongs to, this reference then
enables Optimize to import external variable data from the dedicated index to their respective process instances at
regular intervals. Once Optimize has updated the process instance data, the external variables are available for report
evaluations in Optimize.

## Limitations

Note that external variables should be treated as separate from engine variables. If you ingest variables that are already present in the engine, engine imports may override the ingested data and vice versa, leading to unreliable report results.

Similarly, if the same ingested batch contains variables with duplicate IDs, you may experience unexpected report results because Optimize will assume only one of the updates per ID and batch to be the most up to date one.

Additionally, ensure the reference information (process instance ID and process definition key) is accurate, as otherwise Optimize will not be able to correctly associate variables with instance data and may create new instance indices, resulting in data which will not be usable in reports. External variables can only be ingested for process instances and will not be affected by any configured variable plugin.

## Configuration

Refer to
the [configuration section](../../self-managed/optimize-deployment/configuration/system-configuration.md) to learn more
about how to set up external variable ingestion.

## Method & HTTP target resource

POST `/api/ingestion/variable`

## Request headers

The following request headers have to be provided with every variable ingestion request:

| Header         | Constraints | Value                                                 |
| -------------- | ----------- | ----------------------------------------------------- |
| Authentication | REQUIRED\*  | See [authentication](../optimize-api-authentication). |
| Content-Type   | REQUIRED    | `application/json`                                    |

- Only required if not set as a query parameter

## Query parameters

The following query parameters have to be provided with every delete request:

| Parameter    | Constraints | Value                                                |
| ------------ | ----------- | ---------------------------------------------------- |
| access_token | REQUIRED\*  | See [authentication](../optimize-api-authentication) |

- Only required if not set as a request header

## Request body

The request body contains an array of variable JSON Objects:

| Name                 | Type   | Constraints | Description                                                                                       |
| -------------------- | ------ | ----------- | ------------------------------------------------------------------------------------------------- |
| id                   | String | REQUIRED    | The unique identifier of this variable.                                                           |
| name                 | String | REQUIRED    | The name of the variable.                                                                         |
| type                 | String | REQUIRED    | The type of the variable. Must be one of: String, Short, Long, Double, Integer, Boolean, or Date. |
| value                | String | REQUIRED    | The current value of the variable.                                                                |
| processInstanceId    | String | REQUIRED    | The ID of the process instance this variable is to be associated with.                            |
| processDefinitionKey | String | REQUIRED    | The definition key of the process instance this variable is to be associated with.                |

## Result

This method returns no content.

## Response codes

Possible HTTP response status codes:

| Code | Description                                                                                            |
| ---- | ------------------------------------------------------------------------------------------------------ |
| 204  | Request successful.                                                                                    |
| 400  | Returned if some properties in the request body are invalid or missing.                                |
| 401  | Secret incorrect or missing. See [authentication](../optimize-api-authentication) on how to authorize. |

## Example

### Request

POST `/api/ingestion/variable`

Request Body:

```
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
```

### Response

Status 204.
