---
id: inbound
title: Using inbound Connectors
description: Learn how to use inbound Connectors
---

[Inbound Connectors](/components/connectors/connector-types.md#inbound-connectors) enable workflows to receive data or messages from external systems or services.
Check out our [list of existing inbound Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) for more information.

## Creating the Connector event

Inbound Connectors are modeled as **catch events** in BPMN. Connectors that trigger a process instance are modeled as **start events**, and Connectors that send messages to an already running process instance are modeled as **intermediate catch events**.

When you **deploy** such a BPMN diagram with an inbound Connector, the Connector becomes ready to receive incoming requests. The outcome depends on the Connector type:

- The webhook endpoint becomes available.
- Subscription Connectors start listening to the message queue.
- Polling Connectors start polling the external system.

### Modeling the Connector start event

:::caution
Inbound Connector start events are on deprecation path. Please use inbound Connector message start event instead.
:::

1. Start building your BPMN diagram with a **Start Event** building block.
2. Change its template to an inbound Connector of your choice (e.g., HTTP webhook, or a message queue subscription).
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy it to your Camunda 8 instance.

:::note
You can still start instances of that process manually via the modeler, which is sometimes useful during testing.
:::

### Modeling the Connector intermediate message catch event

1. Start building your BPMN diagram with an **Intermediate Catch Event** building block.
2. Change its template to an inbound Connector of your choice (e.g., HTTP webhook, or a message queue subscription).
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy it to your Camunda 8 instance.

### Modeling the Connector boundary event

1. Start building your BPMN diagram with any **Task** building block.
2. Attach a **Boundary event** to a **Task** at your diagram.
3. Change its template to an inbound Connector of your choice (e.g., HTTP webhook, or a message queue subscription).
4. Fill in all required properties.
5. Complete your BPMN diagram.
6. Deploy it to your Camunda 8 instance.

### Modeling the Connector non-interrupting message start event

1. Start building your BPMN diagram with an **Event Sub Process**.
2. Add a plain **Message Start Event (non-interrupting)** into an **Event Sub Process**.
3. Change its template to an inbound Connector of your choice (e.g., HTTP webhook, or a message queue subscription).
4. Fill in all required properties.
5. Select **Correlation required** in the **Subprocess correlation** section.
6. Specify both **Correlation key (process)** and **Correlation key (payload)** values.
7. Complete your BPMN diagram.
8. Deploy it to your Camunda 8 instance.

### Example: Configuring an HTTP webhook

Different Connector types have different configuration options, but parts like **Result expression**, or **Correlation key** are common for all of them. Let's take a look at an example of configuring an HTTP webhook.

To deploy and use the webhook, you need to fill in several fields:

1. **Webhook method** - HTTP method for your inbound webhook. You can either set a specific one or choose `Any` if all methods need to be supported.
2. **Webhook ID** - Context path for your inbound webhook. This is used to build a URL endpoint for your webhook. For example, given the `Webhook ID` value is `myWebhookPath`, the complete webhook URL endpoint will be `http(s)://<base URL>/inbound/myWebhookPath`.
3. **HMAC authentication** - If an external caller uses HMAC as a means of request validation and authentication, you can `enable` this property. In that case, you'll need to specify additional field values. Read more about the [generic HTTP webhook configuration](/components/connectors/protocol/http-webhook.md).
4. **Authorization** - Authorization method of the webhook.
5. **Activation condition** - FEEL expression that assesses trigger conditions. Note: Unlike other properties, in the activation condition, you cannot use the process instance variables. For example, given external caller triggers a webhook endpoint with body `{"id": 1, "status": "OK"}`, the **Activation Condition** value might look like `=(request.body.status = "OK")`. Leave this field empty to trigger your webhook every time.
6. **Result variable** - Name of the process variable that will be created or updated with the result of the webhook. For example, if you want to save the result of the webhook in a variable called `myDocumentId`, you would specify `myDocumentId` as the **Result variable** value.
7. **Result expression** - FEEL expression that transforms incoming body into BPMN process variables. For example, given external caller triggers a webhook endpoint with body `{"id": 1, "status": "OK"}` and you would like to extract `id` as a process variable `myDocumentId`. In that case, the **Variable mapping** might look as `={myDocumentId: request.body.id}`.
8. **Response body expression** - FEEL expression that forces a webhook to return a specific response.
   This might be useful for one-time challenge verification, or acknowledgement response.
   Given your webhook triggered with body `{"id": 1, "status": "OK"}`, if you wish to return acknowledgement, you can specify the following expression `={message: "received document ID " + string(request.body.id)}` which will produce `{"message":"received document ID 123"}` as a response.
   Another example, when you wish to return a one-time subscription challenge. Given your webhook triggered with body `{"event": "subscribe", "challenge":"myRandomChallenge"}`. You can return challenge back with the following expression `=if request.body.event = "subscribe" then request.body.challenge else null` which will produce a plain string `"myRandomChallenge"` as a response.
   There is also a special keyword `correlation`, which when used in response body expression can return a Zeebe correlation result. Given a response body expression `=correlation`, a webhook execution will return `{"activated":true,"errorData":null,"type":"START_EVENT","correlationPointId":"2251799813687968","responseData":{"processInstanceKey":2251799813688006,"bpmnProcessId":"Process_1rxisne","processDefinitionKey":2251799813687968,"version":7}}`.

If the Webhook Connector is applied to an **intermediate catch event**, you also need to specify the following fields:

9. **Correlation key (process)** - a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **message intermediate catch event**.
10. **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

For example, given that your correlation key is defined with `requestIdValue` process variable, and the request body contains `{"request": {"id": 123}}`, your correlation key settings will look like this:

- **Correlation key (process)**: `=requestIdValue`
- **Correlation key (payload)**: `=request.body.request.id`

See the [webhook documentation](/components/connectors/protocol/http-webhook.md) or the documentation of [other Connector types](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) for more details.

### Working with request context

A user can access request context in the **Activation condition**, **Result expression**, and **Response body expression**.

Let's consider the following cURL query: `curl -X POST -H "Content-Type: application/json" -H "MyHeader: myValue" -d '{"status": "OK", "id": 123}' "http://<YOUR_HOST>/inbound/myWebhook?param1=val1"`.

A webhook Connector context data will arrive as follows:

```json
{
  "request": {
    "body": {
      "status": "OK",
      "id": 123
    },
    "headers": {
      "host": "YOUR_HOST",
      "user-agent": "curl/7.88.1",
      "accept": "*/*",
      "content-type": "application/json",
      "myheader": "myValue",
      "content-length": "27"
    },
    "params": {
      "param1": "val1"
    }
  },
  "connectorData": {}
}
```

This means in scope of the fields **Activation condition**, **Result expression**, and **Response body expression**,
you can use not only `request.body.<property>` but also access headers via `request.headers.myheader` or params `request.params.param1`.

There is also a Connector-specific special case of `connectorData` that is usually empty and used in rare cases, when body has to be crafted in a special way, but a Connectors user might still want access context data.

See a list of [available inbound Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) and their respective specific configuration instructions.
