---
id: message-correlation
title: Message correlation
description: "Message correlation allows you to target a running workflow with a state update from an external system asynchronously."
---

<span class="badge badge--intermediate">Intermediate</span>
<span class="badge badge--medium">Time estimate: 20 minutes</span>

## Prerequisites

- [Node.js client](https://github.com/camunda-community-hub/zeebe-client-node-js)
- [Simple Monitor](https://github.com/camunda-community-hub/zeebe-simple-monitor)
- [Desktop Modeler](https://camunda.com/download/modeler/)

## Message correlation

Message correlation is a powerful feature in Camunda 8. It allows you to target a running workflow with a state update from an external system asynchronously.

This tutorial uses the [Node.js client](https://github.com/camunda-community-hub/zeebe-client-node-js), but it serves to illustrate message correlation concepts that are applicable to all language clients.

We will use [Simple Monitor](https://github.com/camunda-community-hub/zeebe-simple-monitor) to inspect the running workflow state. Simple Monitor is a community-supported tool, and is not designed to be used in production. However, it is useful during development.

## Workflow

Here is a basic example from [the Camunda 8 documentation](/components/concepts/messages.md):

![message correlation workflow](img/message-correlation-workflow.png)

Use [Desktop Modeler](https://camunda.com/download/modeler/) to open the [test-messaging](https://github.com/jwulf/zeebe-message-correlation/blob/master/bpmn/test-messaging.bpmn) file in [this GitHub project](https://github.com/jwulf/zeebe-message-correlation).

Click on the intermediate message catch event to see how it is configured:

![message properties](img/message-correlation-message-properties.png)

A crucial piece here is the **Subscription Correlation Key**. In a running instance of this workflow, an incoming **Money Collected** message will have a `correlationKey` property:

```typescript
  zbc.publishMessage({
    correlationKey: "345",
    name: "Money Collected",
    variables: {
      paymentStatus: "paid"
    });
```

The concrete value of the message `correlationKey` is matched against running workflow instances by comparing the supplied value against the `orderId` variable of running instances subscribed to this message. This is the relationship established by setting the `correlationKey` to `orderId` in the message catch event in the BPMN.

## Running the demonstration

To run the demonstration, take the following steps:

1. Clone this repository.
2. Install dependencies:
   :::note
   This guide requires `npm` version 6.
   :::
   `npm i && npm i -g ts-node typescript`
3. In another terminal, start the Zeebe Broker in addition to [simple-monitor](https://github.com/camunda-community-hub/zeebe-simple-monitor).
4. Deploy the workflow and start an instance:
   `ts-node start-workflow.ts`
   This starts a workflow instance with the `orderId` set to 345:

```typescript
await zbc.createProcessInstance("test-messaging", {
  orderId: "345",
  customerId: "110110",
  paymentStatus: "unpaid",
});
```

5. Open Simple Monitor at [http://localhost:8082](http://localhost:8082).
6. Click on the workflow instance. You will see the current state of the workflow:
   ![workflow state](img/message-correlation-workflow-state.png)
   The numbers above the BPMN symbols indicate that no tokens are waiting at the start event, and one has passed through. One token is waiting at the **Collect Money** task, and none have passed through.
7. Take a look at the **Variables** tab at the bottom of the screen. (If you don't see it, you are probably looking at the workflow, rather than the instance. In that case, drill down into the instance):
   ![message correlation variables](img/message-correlation-variables.png)
   You can see that this workflow instance has the variable `orderId` set to the value 345.
8. Start the workers:
   `ts-node workers.ts`
9. Refresh Simple Monitor to see the current state of the workflow:
   ![message correlation wait on message](img/message-correlation-wait-on-message.png)
   Now, the token is at the message catch event, waiting for a message to be correlated.
10. Take a look at the **Message Subscriptions** tab:
    ![message subscriptions](img/message-correlation-message-subscriptions.png)
    You can see the broker has opened a message subscription for this workflow instance with the concrete value of the `orderId` 345. This was created when the token entered the message catch event.
11. Send the message in another terminal:
    `ts-node send-message.ts`
12. Refresh Simple Monitor, and note that the message has been correlated and the workflow has run to completion:

![message correlation completed](img/message-correlation-completed.png)

The **Message Subscriptions** tab now reports that the message was correlated:

![message correlation correlated](img/message-correlation-correlated.png)

## Message buffering

Messages are buffered on the broker, so your external systems can emit messages before your process arrives at the catch event. The amount of time a message is buffered is configured when publishing the message from the client library.

For example, to send a message buffered for 10 minutes with the JavaScript client:

```typescript
zbc.publishMessage({
  correlationKey: "345",
  name: "Money Collected",
  variables: {
    paymentStatus: "paid",
  },
  timeToLive: 600000,
});
```

To see it in action, take the following steps:

1. Keep the workers running.
2. Publish the message:

```typescript
ts-node send-message.ts
```

3. Click on **Messages** at the top of the Simple Monitor page. You will see the message buffered on the broker:

![](img/message-correlation-buffered.png)

4. Start another instance of the workflow:

```typescript
ts-node start-workflow.ts
```

Note that the message is correlated to the workflow instance, even though it arrived before the workflow instance was started.

## Common mistakes

A couple of common gotchas:

- The `correlationKey` in the BPMN message definition is the name of the workflow variable to match against. The `correlationKey` in the message is the concrete value to match against that variable in the workflow instance.

- The message subscription _is not updated after it is opened_. That is not an issue in the case of a message catch event. However, for boundary message events (both interrupting and non-interrupting,) the subscription is opened _as soon as the token enters the bounding subprocess_. If any service task modifies the `orderId` value inside the subprocess, the subscription is not updated.

For example, the interrupting boundary message event in the following example will not be correlated on the updated value, because the subscription is opened when the token enters the subprocess, using the value at that time:

![not correlating](img/message-correlation-not-like-this.png)

If you need a boundary message event correlated on a value modified somewhere in your process, put the boundary message event in a subprocess after the task that sets the variable. The message subscription for the boundary message event will open when the token enters the subprocess, with the current variable value.

![correlating](img/message-correlation-like-this.png)

## Summary

Message Correlation is a powerful feature in Camunda 8. Knowing how messages are correlated, and how and when the message subscription is created is important to design systems that perform as expected.

Simple Monitor is a useful tool for inspecting the behavior of a local Camunda 8 system to figure out what is happening during development.
