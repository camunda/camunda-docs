---
id: event-ingestion
title: "Event ingestion"
description: "The REST API to ingest external events into Optimize."
---

<span class="badge badge--platform">Camunda 7 only</span>

The Event Ingestion REST API ingests business process related event data from any third-party system to Camunda Optimize. These events can then be correlated into an [event-based process](#) in Optimize to get business insights into business processes that are not yet fully modeled nor automated using Camunda 7.

## Functionality

The Event Ingestion REST API has the following functionality:

1. Ingest new event data in batches, see the example on [ingesting three cloud events](#ingest-cloud-events).
2. Reingest/override previously ingested events, see the example on [reingesting cloud events](#reingest-cloud-events).

## CloudEvents compliance

To provide the best interoperability possible, the Optimize Event Ingestion REST API implements the [CloudEvents Version 1.0](https://github.com/cloudevents/spec/blob/v1.0/spec.md) specification, which is hosted by the [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/).

In particular, the Optimize Event Ingestion REST API is a CloudEvents consumer implemented as an HTTP Web Hook, as defined by the [CloudEvents HTTP 1.1 Web Hooks for Event Delivery - Version 1.0](https://github.com/cloudevents/spec/blob/v1.0/http-webhook.md) specification. Following the [Structured Content Mode](https://github.com/cloudevents/spec/blob/v1.0/http-protocol-binding.md#32-structured-content-mode) of the [HTTP Protocol Binding for CloudEvents - Version 1.0](https://github.com/cloudevents/spec/blob/v1.0/http-protocol-binding.md), event context attributes and event data is encoded in the [JSON Batch Format](https://github.com/cloudevents/spec/blob/v1.0/json-format.md#4-json-batch-format) of the [CloudEvents JSON Event Format Version 1.0](https://github.com/cloudevents/spec/blob/v1.0/json-format.md).

## Authentication

As required by the [CloudEvents HTTP 1.1 Web Hooks for Event Delivery - Version 1.0](https://github.com/cloudevents/spec/blob/v1.0/http-webhook.md#3-authorization) specification, every [Event Ingestion REST API Request](#method-and-http-target-resource) needs to include an authentication token as an [`Authorization`](https://tools.ietf.org/html/rfc7235#section-4.2) request header.

Details on how to configure and pass this token can be found [here](./optimize-api-authentication.md).

## Method and HTTP target resource

POST `/api/ingestion/event/batch`

## Request headers

The following request headers have to be provided with every ingest request:

| Header         | Constraints | Value                                                                                                                                  |
| -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication | REQUIRED    | See [authentication](./optimize-api-authentication.md)                                                                                 |
| Content-Length | REQUIRED    | Size in bytes of the entity-body, also see [Content-Length](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length). |
| Content-Type   | REQUIRED    | Must be one of: `application/cloudevents-batch+json` or `application/json`                                                             |

## Request body

[JSON Batch Format](https://github.com/cloudevents/spec/blob/v1.0/json-format.md#4-json-batch-format) compliant JSON Array of CloudEvent JSON Objects:

| Name                                                                             | Type                                                                           | Constraints | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [specversion](https://github.com/cloudevents/spec/blob/v1.0/spec.md#specversion) | String                                                                         | REQUIRED    | The version of the CloudEvents specification, which the event uses, must be `1.0`. See [CloudEvents - Version 1.0 - specversion](https://github.com/cloudevents/spec/blob/v1.0/spec.md#specversion).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [id](https://github.com/cloudevents/spec/blob/v1.0/spec.md#id)                   | String                                                                         | REQUIRED    | Uniquely identifies an event, see [CloudEvents - Version 1.0 - id](https://github.com/cloudevents/spec/blob/v1.0/spec.md#id).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [source](https://github.com/cloudevents/spec/blob/v1.0/spec.md#source-1)         | String                                                                         | REQUIRED    | Identifies the context in which an event happened, see [CloudEvents - Version 1.0 - source](https://github.com/cloudevents/spec/blob/v1.0/spec.md#source-1). A use-case could be if you have conflicting types across different sources. For example, a `type:OrderProcessed` originating from both `order-service` and `shipping-service`. In this case, the `source` field provides means to clearly separate between the origins of a particular event. Note: The triplet of `type`, `source`, and `group` will be used as a unique identifier for classes of events.                                                                                                                                                                                                                                                                                                                       |
| [type](https://github.com/cloudevents/spec/blob/v1.0/spec.md#type)               | String                                                                         | REQUIRED    | This attribute contains a value describing the type of event related to the originating occurrence, see [CloudEvents - Version 1.0 - type](https://github.com/cloudevents/spec/blob/v1.0/spec.md#type). Note: The triplet of `type`, `source`, and `group` will be used as a unique identifier for classes of events. The value `camunda` cannot be used for this field.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [time](https://github.com/cloudevents/spec/blob/v1.0/spec.md#type)               | [Timestamp](https://github.com/cloudevents/spec/blob/v1.0/spec.md#type-system) | OPTIONAL    | Timestamp of when the occurrence happened, see [CloudEvents - Version 1.0 - time](https://github.com/cloudevents/spec/blob/v1.0/spec.md#time). String encoding: [RFC 3339](https://tools.ietf.org/html/rfc3339). If not present, a default value of the time the event was received will be created.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [data](https://github.com/cloudevents/spec/blob/v1.0/spec.md#event-data)         | Object                                                                         | OPTIONAL    | Event payload data that is part of the event, see [CloudEvents - Version 1.0 - Event Data](https://github.com/cloudevents/spec/blob/v1.0/spec.md#event-data). This CloudEvents Consumer API only accepts data encoded as `application/json`, the optional attribute [CloudEvents - Version 1.0 - datacontenttype](https://github.com/cloudevents/spec/blob/v1.0/spec.md#datacontenttype) is thus not required to be provided by the producer. Furthermore, there are no schema restrictions on the `data` attribute and thus the attribute [CloudEvents - Version 1.0 - dataschema](https://github.com/cloudevents/spec/blob/v1.0/spec.md#datacontenttype) is also not required to be provided. Producer may provide any valid JSON object, but only simple properties of that object will get converted to variables of a process instances of an [event-based process](#) instance later on. |
| group                                                                            | String                                                                         | OPTIONAL    | This is an OPTIONAL [CloudEvents Extension Context Attribute](https://github.com/cloudevents/spec/blob/v1.0/spec.md#extension-context-attributes) that is specific to this API. A group identifier that may allow to easier identify a group of related events for a user at the stage of mapping events to a process model. An example could be a domain of events that are most likely related to each other; for example, `billing`. When this field is provided, it will be used to allow adding events that belong to a group to the [mapping table](##external-events). Optimize handles groups case-sensitively. Note: The triplet of `type`, `source`, and `group` will be used as a unique identifier for classes of events.                                                                                                                                                          |
| traceid                                                                          | String                                                                         | REQUIRED    | This is a REQUIRED [CloudEvents Extension Context Attribute](https://github.com/cloudevents/spec/blob/v1.0/spec.md#extension-context-attributes) that is specific to this API. A traceid is a correlation key that relates multiple events to a single business transaction or process instance in BPMN terms. Events with the same traceid will get correlated into one process instance of an Event Based Process.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

The following is an example of a valid propertie's `data` value. Each of those properties would be available as a variable in any [event-based process](#) where an event containing this as `data` was mapped:

```
      {
        "reviewSuccessful": true,
        "amount": 10.5,
        "customerId": "lovelyCustomer1"
      }
```

Nested objects, such as `customer` in this example, would not be available as a variable in event-based processes where an event containing this as `data` value was mapped:

```
      {
        "customer": {
        "firstName":"John",
        "lasTName":"Doe"
        }
      }
```

## Result

This method returns no content.

## Response codes

Possible HTTP response status codes:

| Code | Description                                                                                                                                                                                                                                                                                                                              |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 204  | Request successful                                                                                                                                                                                                                                                                                                                       |
| 400  | Returned if some of the properties in the request body are invalid or missing.                                                                                                                                                                                                                                                           |
| 401  | Secret incorrect or missing in HTTP Header `Authorization`. See [Authorization](#authorization) on how to authenticate.                                                                                                                                                                                                                  |
| 403  | The Event Based Process feature is not enabled.                                                                                                                                                                                                                                                                                          |
| 429  | The maximum number of requests that can be serviced at any time has been reached. The response will include a `Retry-After` HTTP header specifying the recommended number of seconds before the request should be retried. See [Configuration](##event-ingestion-rest-api-configuration) for information on how to configure this limit. |
| 500  | Some error occurred while processing the ingested event, best check the Optimize log.                                                                                                                                                                                                                                                    |

## Example

### Ingest cloud events

#### Request

POST `/api/ingestion/event/batch`

##### Request header

`Authorization: Bearer mySecret`

##### Request body

```json
[
  {
    "specversion": "1.0",
    "id": "1edc4160-74e5-4ffc-af59-2d281cf5aca341",
    "source": "order-service",
    "type": "orderCreated",
    "time": "2020-01-01T10:00:00.000Z",
    "traceid": "id1",
    "group": "shop",
    "data": {
      "numberField": 1,
      "stringField": "example"
    }
  },
  {
    "specversion": "1.0",
    "id": "1edc4160-74e5-4ffc-af59-2d281cf5aca342",
    "source": "order-service",
    "type": "orderValidated",
    "time": "2020-01-01T10:00:10.000Z",
    "traceid": "id1",
    "group": "shop",
    "data": {
      "numberField": 1,
      "stringField": "example"
    }
  },
  {
    "specversion": "1.0",
    "id": "1edc4160-74e5-4ffc-af59-2d281cf5aca343",
    "source": "shipping-service",
    "type": "packageShipped",
    "traceid": "id1",
    "group": "shop",
    "time": "2020-01-01T10:00:20.000Z"
  }
]
```

#### Response

Status 204.

### Reingest cloud events

The API allows you to update any previously ingested cloud event by ingesting an event using the same event `id`.

The following request would update the first cloud event that got ingested in the [ingest three cloud events sample](#ingest-cloud-events). Note that on an update, the cloud event needs to be provided as a whole; it's not possible to perform partial updates through this API.

In this example, an additional field `newField` is added to the data block of the cloud event with the id `1edc4160-74e5-4ffc-af59-2d281cf5aca341`.

#### Request

POST `/api/ingestion/event/batch`

##### Request header

`Authorization: Bearer mySecret`

##### Request Body:

```
     [
       {
          "specversion": "1.0",
          "id": "1edc4160-74e5-4ffc-af59-2d281cf5aca341",
          "source": "order-service",
          "type": "orderCreated",
          "time": "2020-01-01T10:00:00.000Z",
          "traceid": "id1",
          "group": "shop",
          "data": {
              "numberField": 1,
              "stringField": "example",
              "newField": "allNew"
          }
      }
    ]
```

#### Response

Status 204.
