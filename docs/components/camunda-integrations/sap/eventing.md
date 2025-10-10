---
id: eventing
title: SAP Eventing with SAP Advanced Event Mesh (AEM)
description: "React on CloudEvents to/from Advanced Event Mesh in a BPMN process"
sidebar_label: SAP Eventing
---

Receive [CloudEvents](https://cloudevents.io/) from SAP Advanced Event Mesh (AEM) and send CloudEvents to AEM.

## About SAP Eventing

This consists of three connectors that allow bidirectional communication between Camunda and AEM.

<!-- add links of Element Template from marketplace! -->

| Connector                                  | Description                                                                                                                                                                                                                              |
| :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SAP Eventing Outbound Connector            | Send CloudEvents from Camunda to an AEM topic or queue endpoint.                                                                                                                                                                         |
| SAP Eventing Message Start Event Connector | Translate an incoming CloudEvent from AEM into a [BPMN Message Start Event](/components/modeler/bpmn/message-events/message-events.md#message-start-events) triggering a new process instance.                                           |
| SAP Eventing Intermediate Event Connector  | Translate an incoming CloudEvent from AEM into a [BPMN Intermediate Catch Event](/components/modeler/bpmn/message-events/message-events.md#intermediate-message-catch-events) allowing an active process to continue based on the event. |

The integration uses `HTTP` as the transport protocol.

- The incoming connectors act as webhooks, receiving CloudEvent payloads and delivering them into process instances.
- The outbound connector sends `HTTP POST` requests to an Advanced Event Mesh [topic](https://docs.solace.com/Messaging/Guaranteed-Msg/Topic-Endpoints.htm) or [queue](https://docs.solace.com/Messaging/Guaranteed-Msg/Queues.htm) endpoints.

:::info
SAP Advanced Event Mesh uses [Solace Event Broker](https://solace.com/products/event-broker/) as its core event broker.
This means the terms **AEM** and **Solace Event Broker** can be used interchangeably when referring to core eventing functionality.
:::

## Prerequisites

As `HTTP` is used as the transport protocol, AEM must be configured to use [REST messaging](https://docs.solace.com/API/REST/REST-get-start.htm).
This enables publishers and subscribers to communicate over HTTP.

The following configuration examples in Camunda build on the Solace tutorial [Publish/Subscribe REST Messaging](https://tutorials.solace.dev/rest-messaging/publish-subscribe/), which provides detailed steps for setting up REST-based publish/subscribe messaging.

## Installation

You can install the SAP Eventing connectors directly from the [Camunda Marketplace](https://marketplace.camunda.com/).

## Configuration

## SAP Eventing Message Start Event Connector:

Inbound CloudEvents → BPMN Message

Applying the **SAP Eventing Message Start Event Connector** generates a unique **Webhook URL** that starts a new BPMN process instance when invoked.

![webhook URL	](./img/eventing-webhook.png)

:::info
The Webhook URL is generated **only after the initial deployment** of the process.
:::

This Webhook URL must be registered as a target in **SAP Advanced Event Mesh (AEM)**.

The host portion of the URL (`https://<region>.connectors.camunda.io`) is used when configuring the **REST consumer** in AEM.

![AEM REST consumer](./img/eventing-aem-rest-consumer.png)

### Authentication

In the same REST consumer configuration, set up authentication from AEM to the Camunda Webhook endpoint.

The credentials configured in the **Authorization** section of the Camunda connector must correspond to the **Authentication Scheme** used in AEM.

![Camunda and AEM credentials](./img/eventing-authorization.png)

### Queue Binding

The path component of the Camunda Webhook URL must be used as the **POST Request Target** in the **Queue Binding** of the REST consumer.

![AEM Queue Binding](./img/eventing-aem-queue-binding.png)

### Other Configuration Options

The remaining configuration options of the **SAP Eventing Message Start Event Connector** match those of the [HTTP Webhook Connector](../../../components/connectors/protocol/http-webhook/), with one key difference:

> The default **Webhook response** explicitly returns a `200` status code and an `"OK"` message body, confirming that the CloudEvent was successfully received and acknowledged by Camunda.

![Remaining Incoming Webhook config](./img/eventing-incoming-other-config.png)

### Event Flow

When a CloudEvent is received from AEM, all **header** properties and the **body** payload are relayed as-is to the target process instance—either:

- At process creation, when using the **SAP Eventing Message Start Event Connector**, or
- During event correlation, when using the **SAP Eventing Intermediate Event Connector**.

This ensures that message attributes and payload data from AEM are preserved end-to-end within the Camunda process.

## SAP Eventing Intermediate Event Connector

### Correlate CloudEvents as BPMN Messages

The **SAP Eventing Intermediate Event Connector** injects a CloudEvent from **SAP Advanced Event Mesh (AEM)** into an _active_ Camunda BPMN process instance.

It does this by leveraging the BPMN principle of [**message correlation**](../../../components/connectors/protocol/http-webhook/#correlation).  
Any CloudEvent property can be used as a **correlation key** to map incoming event data to the correct process instance.

### Correlation via CloudEvent Body

The configuration options of the **SAP Eventing Message Start Event Connector** and the **SAP Eventing Intermediate Event Connector** are identical, except that the _Intermediate Event_ requires an additional **Correlation** section to be configured.

![Intermediate Message Correlation](./img/eventing-intermediate-correlation.png)

In the example above, the process variable `ENCOMGridID` is expected to exist within the process instance.  
Its value is compared against the CloudEvent payload (`request.body.FlynnLocationID`).  
If both values match, the CloudEvent is considered to be the published BPMN message that is correlated to the corresponding process instance.

### Correlation via CloudEvent Metadata

Since **HTTP** is used as the transport protocol, the [CloudEvents specification](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/http-protocol-binding.md) requires all CloudEvent metadata to be passed as **HTTP headers**.

In addition, AEM prepends all user properties with the prefix `Solace-User-Property-` to persist them in its event engine.  
For example, a CloudEvent with the property `"ce-id"` is represented in AEM as the HTTP header named `Solace-User-Property-ce-id`

Therefore, to perform BPMN message correlation based on CloudEvent metadata, reference the corresponding **HTTP header name** including the `Solace-User-Property-` prefix.

#### Example: CloudEvent HTTP Message

The following is an example of a CloudEvent HTTP request received by Camunda:

```json
{
  "request": {
    "body": { "FlynnLocationID": "34.0522,-118.2437" },
    "headers": {
      "host": "<region>.connectors.camunda.io",
      "x-request-id": "956de0835ad61a211a20e4755315b413e",
      "x-real-ip": "12.123.123.456",
      "x-forwarded-host": "<region>.connectors.camunda.io",
      "x-forwarded-port": "443",
      "x-forwarded-proto": "https",
      "x-forwarded-scheme": "https",
      "x-scheme": "https",
      "content-length": "44",
      "authorization": "Basic CaMUnDakZW1v",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "solace-delivery-mode": "Persistent",
      "solace-user-property-ce-specversion": "1.0",
      "solace-user-property-ce-type": "sap.s4.beh.encom.grid.program.v1",
      "solace-user-property-ce-source": "/alan/pager/buzz",
      "solace-user-property-ce-subject": "CLU-2.0",
      "solace-user-property-ce-id": "Argon-T-01",
      "solace-user-property-ce-time": "2018-04-05T03:56:24Z",
      "solace-user-property-ce-datacontenttype": "application/json",
      "user-agent": "Solace_PubSub+_Enterprise/10.11.1.167"
    },
    "params": {}
  },
  "connectorData": {},
  "documents": []
}
```

In this example, to correlate the CloudEvent `ce-id` property to a process instance, reference it as:
`` request.headers.`solace-user-property-ce-id` `` in the header field.

![Mapping to CloudEvent meta data](./img/eventing-correlation-ce-headers.png)

:::tip
Explicitly note the "backticks" notation of the header value `` request.headers.`solace-user-property-ce-id` `` in order to escape the dashes in the header field name!
:::

### SAP Eventing Outbound Connector

The **SAP Eventing Outbound Connector** allows you to send CloudEvents to **SAP Advanced Event Mesh (AEM)** using its **REST messaging** capability. It uses the REST messaging capability of AEM to publish the CloudEvent via a `HTTP POST` request.

![SAP eventing outbound connector configuration](./img/eventing-outbound-connector.png)

### Endpoint

The **Endpoint** field specifies the URL of your AEM Event Broker.  
You can find this URL in the Advanced Event Mesh's web interface by navigating to:

> **Cluster Manager → Your Cluster → (Service Details) → Connect → Connect with Java → Solace REST Messaging API**

On the right-hand side of the interface, you’ll see the **FQDN** (Fully Qualified Domain Name) of your AEM broker instance.

![FQDN of the AEM REST messaging API](./img/eventing-aem-rest-fqdn.png)

### Topic / Queue

Specify the target **topic** or **queue** path where the CloudEvent will be published.  
Neither value should begin with a `/` — the connector includes a validation check to prevent this.

### Authorization

Select one of the following authorization methods:

- `None`
- `API Key`
- `Basic`
- `OAuth 2.0`
- `Bearer Token`

### CloudEvent

While CloudEvent metadata (for example, `ce-id` or `ce-subject`) is automatically handled by the AEM broker—including the required `Solace-User-Property-` prefix, you only need to configure the **standard CloudEvent attributes** in this connector.

The CloudEvent data is serialized into a **JSON body**, and both the **metadata** and **data** fields support [FEEL expressions](/components/modeler/feel/what-is-feel.md) for dynamic values.

![Eventing Outbound CloudEvent](./img/eventing-outbound-cloudevent.png)

### Other Configuration Options

All remaining options are identical to those of the [REST Connector](/components/connectors/protocol/rest.md), including:

- [Connection timeout](/components/connectors/protocol/rest.md#network-communication-timeouts)
- [Output mapping](/components/connectors/protocol/rest.md#output-mapping)

These settings control network behavior and define how response data is mapped to process variables.
