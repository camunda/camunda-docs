---
id: inbound
title: Use an inbound connector
description: Learn how to use inbound connectors
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

[Inbound connectors](/components/connectors/connector-types.md#inbound-connectors) enable workflows to receive data or messages from external systems or services.
Review our [list of existing inbound connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) for more information.

## Creating the connector event

Inbound connectors are modeled as **catch events** in [BPMN](/components/modeler/bpmn/bpmn.md). Connectors can be modeled as:

- **Start events** - Start a new process instance.
- **Message start events** - Start a new process instance with a `messageId` to prevent duplicate process instance creation.
- **Intermediate catch events** - Receive messages in an already running process instance.
- **Boundary events** - Receive messages in an already running process instance, attached to a task.

:::info
If **idempotency** is a concern for the process creation and reprocessing of messages should never lead to a duplicate process instance creation, use the **message start event** element for an inbound connector as it relies on publishing a message.

Unlike plain **start event** elements, **message start events** support the **Message ID expression** property that allows to derive a unique value from the connector output that will be used by Zeebe to [guarantee uniqueness](/components/concepts/messages.md#message-uniqueness) in case other messages are published that use the same **Message ID**.
:::

When you **deploy** such a BPMN diagram with an inbound connector, the connector becomes ready to receive incoming requests. The outcome depends on the connector type:

- Webhook connectors become available via the webhook endpoint.
- Subscription connectors start listening to the message queue.
- Polling connectors start polling the external system.

<Tabs groupId="inbound-element" defaultValue="start" queryString values={
[
{label: 'Start event', value: 'start' },
{label: 'Message start event', value: 'message-start' },
{label: 'Intermediate catch event', value: 'intermediate' },
{label: 'Boundary event', value: 'boundary' },
]}>

<TabItem value='start'>

### Modeling the connector start event

1. Start building your BPMN diagram with a **Start Event** building block.
2. Change its template to an inbound connector of your choice (e.g., HTTP webhook, or a message queue subscription).
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy it to your Camunda 8 instance.

:::note
You can still start instances of that process manually via the modeler, which is sometimes useful during testing.
:::

</TabItem>

<TabItem value='message-start'>

### Modeling the connector message start event

1. Start building your BPMN diagram with a **Message start event (non-interrupting)**
2. Change its template to an inbound connector of your choice (for example, HTTP webhook or a message queue subscription).
3. Fill in all required properties.
4. Configure the **Correlation** section if needed

- If you are setting up a non-interrupting message start event for a subprocess, select **Correlation required** and specify the **Correlation key (process)** and **Correlation key (payload)** values.
- If you are setting up a message start event for a regular process (not a subprocess), skip the correlation settings.

5. Complete your BPMN diagram.
6. Deploy it to your Camunda 8 instance.

</TabItem>

<TabItem value='intermediate'>

### Modeling the connector intermediate message catch event

1. Start building your BPMN diagram with an **Intermediate Catch Event** building block.
2. Change its template to an inbound connector of your choice (e.g., HTTP webhook, or a message queue subscription).
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy it to your Camunda 8 instance.

</TabItem>

<TabItem value='boundary'>

### Modeling the connector boundary event

1. Start building your BPMN diagram with any **Task** building block.
2. Attach a **Boundary event** to a **Task** at your diagram.
3. Change its template to an inbound connector of your choice (e.g., HTTP webhook, or a message queue subscription).
4. Fill in all required properties.
5. Complete your BPMN diagram.
6. Deploy it to your Camunda 8 instance.

</TabItem>

</Tabs>

### Example: Configuring an HTTP webhook

Different connector types have different configuration options, but parts like **Result expression**, or **Correlation key** are common for all of them. Let's take a look at an example of configuring an HTTP webhook.

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

If the Webhook connector is applied to an **intermediate catch event**, you also need to specify the following fields:

9. **Correlation key (process)** - a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **message intermediate catch event**.
10. **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the connector Runtime and the result is used to correlate the message.

For example, given that your correlation key is defined with `requestIdValue` process variable, and the request body contains `{"request": {"id": 123}}`, your correlation key settings will look like this:

- **Correlation key (process)**: `=requestIdValue`
- **Correlation key (payload)**: `=request.body.request.id`

See the [webhook documentation](/components/connectors/protocol/http-webhook.md) or the documentation of [other connector types](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) for more details.

## Connector deduplication

In the simplest case, each inbound connector element in a BPMN diagram corresponds to a unique endpoint, event consumer, or a polling task.
However, sometimes you might want to have multiple BPMN elements listening to the same event source. For example, you might want to link multiple connector events to the same message queue consumer and activate only one of them based on the message content.

Consider the following BPMN diagram:

![Connector deduplication use-case example](../img/deduplication-example.png)

In this diagram, two connector events are listening to the same message queue that can contain messages of two types: `PAYMENT_COMPLETED` and `PAYMENT_CANCELLED`.
When the process execution arrives at the event gateway, the type of the message determines which path the process will take.
If each connector event listened to the message queue using a separate subscription, this might lead to race conditions if the message is received by a different consumer (for example, the `PAYMENT_COMPLETED` event being consumed by the consumer that expects `PAYMENT_CANCELLED`).
Eventually, this might lead to message loss or delayed processing, while also increasing the load on the message broker as the message is returned to the queue.

To avoid this, both events can be assigned to the same subscription by assigning the same **Deduplication ID** to both events. Then, all messages will be consumed by the same subscription, and the connector runtime will evaluate the **Activation condition** of each event to determine which one should be triggered.

:::note
When using this pattern, ensure the **Activation condition** of each event is mutually exclusive, so only one event is triggered for each message.
Attempting to trigger multiple events for the same message will result in an error.
:::

### Automatic deduplication

By default, the connector runtime will assign the same deduplication ID to connector events that have equal properties, and different deduplication IDs to events that have different properties.
In this context, **equal properties** means the properties that define the business logic of the connector are exactly the same, including whitespace characters.

The automatic deduplication only takes into account the properties that are related to the business logic of the connector itself (for example, **Server URL** or **Authentication properties**).
It does not take into account the properties that define output mapping (**Result variable**, **Result expression**, **Response expression**), correlation (**Correlation key (process)**, **Correlation key (payload)**, **Activation condition**), or other properties that are handled by the connector runtime and not by the connector itself.

This way, two connectors of the same type that are identical in terms of business logic and are defined in the same business process will be deduplicated automatically.

### Manual deduplication

You can manually assign a deduplication ID to each connector event. This allows you to group connectors in a more flexible way based on your requirements.

If needed, you can have multiple connectors with the same properties that have different deduplication IDs. This way, you can still have multiple instances of the same connector listening to the same event source, but each instance will have its own deduplication ID and will be treated as a separate entity by the connector runtime.

To assign a deduplication ID, take the following steps:

1. Enable the **Manual mode** checkbox in the **Deduplication** section of the connector properties.
2. The **Deduplication ID** field will appear. Fill in the desired deduplication ID.
3. Repeat the process for all connectors that should share the same deduplication ID.
4. Deploy the BPMN diagram for the changes to take effect.

![Deduplication input example](../img/deduplication-input-example.png)

:::note
When manual deduplication is used, connectors that have the same deduplication ID must also have the same properties. Attempting to assign the same deduplication ID to connectors with different properties will result in a runtime error.
:::

### Should I use automatic or manual deduplication?

Use **automatic deduplication** if:

- You don't need to group connectors in a specific way and don't have any special requirements for deduplication.
- Deduplication configuration is not important for your use case (you don't use multiple connectors in the same process that listen to the same event source).

Use **manual deduplication** if:

- You need to group connectors in a specific way that is not supported by automatic deduplication.
- You are unsure which properties of the connector are used for automatic deduplication.
- You want to have more control over the deduplication process.

### How to choose a deduplication ID

A deduplication ID can contain alphanumeric characters, dashes, and underscores. It is recommended to use a descriptive name that reflects the purpose of the deduplication group, for example, `payment-outcome-event-consumer`.

### Limitations of deduplication

While deduplication is a powerful tool that can optimize the execution of your BPMN process, it has some limitations. It is important to understand them to avoid unexpected behavior.

1. **Deduplication ID scope** - Deduplication ID is unique within a single BPMN diagram. It is not possible to deduplicate connectors across different BPMN diagrams.
2. **Connector type** - connectors of different types cannot share the same deduplication ID (for example, a Webhook connector and a Message Queue connector).
3. **Connector properties** - connectors that share the same deduplication ID must have the same business logic properties. This means they must have the same **Webhook ID**, **Server URL**, **Authentication properties**, etc. (depending on the connector type).
4. **Activation condition** - connectors with the same deduplication ID must have mutually exclusive activation conditions. If multiple connectors with the same deduplication ID have activation conditions that can be true for the same message, the connector runtime will not be able to determine which connector should be triggered, and an error will occur.

## Working with request context

You can access request context in the **Activation condition**, **Result expression**, and **Response body expression**.

Let's consider the following cURL query: `curl -X POST -H "Content-Type: application/json" -H "MyHeader: myValue" -d '{"status": "OK", "id": 123}' "http://<YOUR_HOST>/inbound/myWebhook?param1=val1"`.

A webhook connector context data will arrive as follows:

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

There is also a connector-specific special case of `connectorData` that is usually empty and used in rare cases, when body has to be crafted in a special way, but a connectors user might still want access context data.

See a list of [available inbound connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) and their respective specific configuration instructions.
