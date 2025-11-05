---
id: message-aggregation
title: Message aggregation
description: "Learn how to collect and process multiple related messages in a single workflow instance using message correlation in Camunda 8."
tags: [messages, correlation, aggregation, orchestration, zeebe, patterns]
---

Use message aggregation to collect multiple related messages into a single process instance before proceeding to the next step of your workflow.

## What message aggregation is

Message aggregation is a message correlation pattern that allows you to receive, store, and process multiple messages belonging to the same business entity.

It’s commonly used when:

- You receive multiple events about a single entity (for example, shipments for the same order).
- You need to wait for _N_ messages before proceeding.
- You want to combine or "map-reduce" data across messages before continuing.

Instead of creating a new process instance for each message, messages with the same **correlation key** are routed to the same instance.

:::note
This guide applies to Camunda 8 (Zeebe). The message aggregation pattern requires understanding of [message correlation](/components/concepts/messages/#message-correlation) and BPMN message events.
:::

## How it works

1. Each message is published with:
   - A **message name** (for example, `"ItemReceived"`)
   - A **correlation key** (for example, `"order-123"`)
   - Optionally, a **time-to-live (TTL)** greater than `0`
2. The first message starts a new process instance.
3. All subsequent messages with the same correlation key are correlated to that instance.
4. The workflow collects the message data (for example, appending to a list).
5. Once all expected messages are received, the process continues.

If additional messages with the same correlation key arrive after the process instance has completed, a new instance is created automatically.

## Example use case

Imagine a workflow that collects three messages for each order before processing them together.

### BPMN model

Below is the key structure of the BPMN process:

- **Start event:** Message start event that starts a process for the first message of each `correlation_key`.
- **Intermediate catch event:** Waits for additional messages with the same correlation key.
- **Gateway:** Checks if the desired number of messages has been received.
- **Service task:** Processes all aggregated messages when complete.

```xml
<bpmn:process id="message_aggregator" name="Message Aggregator" isExecutable="true">
  <bpmn:startEvent id="StartEvent_Message">
    <bpmn:messageEventDefinition messageRef="Message_Received" />
    <bpmn:extensionElements>
      <zeebe:ioMapping>
        <zeebe:output source="= [message]" target="messages" />
        <zeebe:output source="= correlation_key" target="correlation_key" />
      </zeebe:ioMapping>
    </bpmn:extensionElements>
  </bpmn:startEvent>

  <bpmn:intermediateCatchEvent id="CatchEvent_Message">
    <bpmn:messageEventDefinition messageRef="Message_Received" />
    <bpmn:extensionElements>
      <zeebe:ioMapping>
        <zeebe:output source="= append(messages, message)" target="messages" />
      </zeebe:ioMapping>
    </bpmn:extensionElements>
  </bpmn:intermediateCatchEvent>

  <bpmn:exclusiveGateway id="Gateway_CheckCount" default="Flow_Process">
    <bpmn:sequenceFlow id="Flow_Loop" sourceRef="Gateway_CheckCount" targetRef="CatchEvent_Message">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">=count(messages) &lt; 3</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_Process" sourceRef="Gateway_CheckCount" targetRef="Service_Process" />
  </bpmn:exclusiveGateway>

  <bpmn:serviceTask id="Service_Process" name="Process Aggregated Messages">
    <bpmn:extensionElements>
      <zeebe:taskDefinition type="process-aggregated" />
      <zeebe:ioMapping>
        <zeebe:input source="=messages" target="messages" />
      </zeebe:ioMapping>
    </bpmn:extensionElements>
  </bpmn:serviceTask>

  <bpmn:endEvent id="EndEvent_Complete" />
</bpmn:process>
```

## Behavior

The first message with a unique correlation key starts a process instance.

Each subsequent message with that same key is correlated to the same instance and appended to the list.

Once three messages are received (`count(messages) == 3`), the process continues to the **Process Aggregated Messages** task.

## Publishing messages

Here’s an example in Java using the Zeebe client:

```java
final ZeebeClient client = ZeebeClient.newClientBuilder().build();

for (int i = 0; i < 3; i++) {
  client.newPublishMessageCommand()
      .messageName("Message_Received")
      .correlationKey("order-123")
      .timeToLive(Duration.ofMinutes(5))
      .variables(Map.of(
          "message", "iteration #" + i + " order-123 " + Instant.now(),
          "correlation_key", "order-123"))
      .send()
      .join();
}
```

The first message starts the workflow; the next two correlate to the existing instance.

| Problem                                     | Cause                                                       | Solution                                                            |
| ------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------- |
| Every message starts a new process instance | Missing or mismatched `correlationKey` in message variables | Ensure all messages use the same correlation key and name           |
| Process never completes                     | The `count(messages)` condition is not met                  | Verify your condition and that messages are successfully correlated |
| Messages not correlated                     | TTL expired or wrong message name                           | Use a TTL > 0 and match the BPMN message name exactly               |
| Duplicate aggregation                       | The instance ended but more messages arrived                | This is expected — a new instance is started                        |

## Best practices

- Always include a unique `correlationKey` in message variables and BPMN definition.
- Use a **timer boundary event** to avoid waiting indefinitely for missing messages.
- Add logging or audit tasks for tracking message count and correlation.
- If using multiple sources, validate messages before appending to the collection.
- Test with different message arrival orders to ensure correct behavior.

## Related resources

- [Message correlation concept](/components/concepts/messages/#message-correlation)
- [Forum example discussion](https://forum.camunda.io/t/message-aggregator-example-bpmn/36625)
- [Messages](/components/concepts/messages.md)

## Next steps

- Learn more about [message correlation patterns](/components/concepts/messages/#message-correlation).
- Explore how to handle race conditions using [event-based gateways](/components/modeler/bpmn/event-based-gateways.md).
- Try combining aggregation with [message expiration](/components/concepts/messages/#message-time-to-live) for dynamic batching scenarios.
- Experiment with the BPMN model in your environment to verify message routing and process completion logic.
