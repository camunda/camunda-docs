---
id: messages
title: "Messages"
---

Process instances can respond to incoming messages. Published messages need to be mapped onto a process instance. This step is called message correlation.

## Message subscriptions

A message is not sent to a process instance directly. Instead, the message correlation is based on subscriptions that contains the _message name_ and the _correlation key_ (aka correlation value).

![Message Correlation](assets/message-correlation.png)

A subscription is opened when a process instance awaits a message, for example, when entering a message catch event. The message name is defined either statically in the process (e.g. `Money collected`) or dynamically as an expression. The correlation key is defined dynamically as an expression (e.g. `= orderId`). The expressions are evaluated on activating the message catch event. The results of the evaluations are used as message name and as correlation key of the subscription (e.g. `"order-123"`).

When a message is published and the message name and the correlation key matches to a subscription then the message is correlated to the corresponding process instance. If no proper subscription is opened then the message is discarded.

A subscription is closed when the corresponding element (e.g. the message catch event), or its scope is left. After a subscription is opened, it is not updated, for example, when the referenced process instance variable is changed.

<details>
   <summary>Publish message via zbctl</summary>
   <p>

```
zbctl publish message "Money collected" --correlationKey "order-123"
```

   </p>
 </details>

## Message buffering

Messages can be buffered for a given time. Buffering can be useful in a situation when it is not guaranteed that the subscription is opened before the message is published.

A message has a _time-to-live_ (TTL) which specifies for how long it is buffered. Within this time, the message can be correlated to a process instance.

When a subscription is opened then it polls the buffer for a proper message. If a proper message exists then it is correlated to the corresponding process instance. In case multiple messages match to the subscription then the first published message is correlated (like a FIFO queue).

The buffering of a message is disabled when its TTL is set to zero. If no proper subscription is open then the message is discarded.

<details>
   <summary>Publish message with TTL via zbctl</summary>
   <p>

```
zbctl publish message "Money collected" --correlationKey "order-123" --ttl 1h
```

   </p>
 </details>

## Message cardinality

A message is correlated only **once** to a process (based on the BPMN process id), across all versions of this process. If multiple subscriptions for the same process are opened (by multiple process instances or within one instance) then the message is correlated only to one of the subscriptions.

When subscriptions are opened for different processes then the message is correlated to **all** of the subscriptions.

A message is **not** correlated to a message start event subscription if an instance of the process is active and was created by a message with the same correlation key. If the message is buffered then it can be correlated after the active instance is ended. Otherwise, it is discarded.

## Message uniqueness

A message can have an optional message id - a unique id to ensure that the message is published and processed only once (i.e. idempotency). The id can be any string, for example, a request id, a tracking number or the offset/position in a message queue.

A message is rejected and not correlated if a message with the same name, the same correlation key and the same id is already buffered. After the message is discarded from the buffer, a message with the same name, correlation key and id can be published again.

The uniqueness check is disabled when no message id is set.

<details>
   <summary>Publish message with id via zbctl</summary>
   <p>

```
zbctl publish message "Money collected" --correlationKey "order-123" --messageId "tracking-12345"
```

   </p>
 </details>

## Message patterns

The following patterns describe solutions to common problems what can be solved using the message correlation.

### Message aggregator

Problem: aggregate/collect multiple messages, map-reduce, batching

Solution:

![Message Aggregator](assets/message-aggregator.png)

The messages are published with a TTL > 0 and a correlation key that groups the messages per entity.

The first message creates a new process instance. The following messages are correlated to the same process instance if they have the same correlation key.

When the instance is ended and messages with the same correlation key are not correlated yet then a new process instance is created.

### Single instance

Problem: create exactly one instance of a process

Solution:

![Message Single Instance](assets/message-single-instance.png)

The message is published with a TTL = 0 and a correlation key that identifies the entity.

The first message creates a new process instance. Following messages are discarded and do not create a new instance if they have the same correlation key and the created process instance is still active.
