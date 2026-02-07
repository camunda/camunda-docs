---
id: connector-deduplication
title: Inbound connector deduplication
description: Learn about how inbound connector deduplication works in Camunda
---

<span className="badge badge--active--inbound">Inbound</span>

In the simplest case, each inbound connector element in a BPMN diagram corresponds to a unique endpoint, event consumer, or a polling task.
However, sometimes multiple inbound connector elements are combined in the connector runtime if they are compatible.
This can be done automatically by the runtime, or requested by the user.

This page explains the concept of deduplication in the connector runtime.

## Purpose of deduplication

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

## Automatic deduplication

By default, the connector runtime will assign the same deduplication ID to connector events that have equal properties, and different deduplication IDs to events that have different properties.
In this context, **equal properties** means the properties that define the business logic of the connector are exactly the same, including whitespace characters.

The automatic deduplication only takes into account the properties that are related to the business logic of the connector itself (for example, **Server URL** or **Authentication properties**).
It does not take into account the properties that define output mapping (**Result variable**, **Result expression**, **Response expression**), correlation (**Correlation key (process)**, **Correlation key (payload)**, **Activation condition**), or other properties that are handled by the connector runtime and not by the connector itself.

This way, two connectors of the same type that are identical in terms of business logic and are defined in the same business process will be deduplicated automatically.

## Manual deduplication

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

## Should I use automatic or manual deduplication?

Use **automatic deduplication** if:

- You don't need to group connectors in a specific way and don't have any special requirements for deduplication.
- Deduplication configuration is not important for your use case (you don't use multiple connectors in the same process that listen to the same event source).

Use **manual deduplication** if:

- You need to group connectors in a specific way that is not supported by automatic deduplication.
- You are unsure which properties of the connector are used for automatic deduplication.
- You want to have more control over the deduplication process.

## How to choose a deduplication ID

A deduplication ID can contain alphanumeric characters, dashes, and underscores. It is recommended to use a descriptive name that reflects the purpose of the deduplication group, for example, `payment-outcome-event-consumer`.

## Limitations of deduplication

While deduplication is a powerful tool that can optimize the execution of your BPMN process, it has some limitations. It is important to understand them to avoid unexpected behavior.

1. **Deduplication ID scope** - Deduplication ID is unique within a single BPMN diagram. It is not possible to deduplicate connectors across different BPMN diagrams.
2. **Connector type** - connectors of different types cannot share the same deduplication ID (for example, a Webhook connector and a Message Queue connector).
3. **Connector properties** - connectors that share the same deduplication ID must have the same business logic properties. This means they must have the same **Webhook ID**, **Server URL**, **Authentication properties**, etc. (depending on the connector type).
4. **Activation condition** - connectors with the same deduplication ID must have mutually exclusive activation conditions. If multiple connectors with the same deduplication ID have activation conditions that can be true for the same message, the connector runtime will not be able to determine which connector should be triggered, and an error will occur.
