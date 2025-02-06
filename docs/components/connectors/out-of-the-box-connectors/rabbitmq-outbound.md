---
id: rabbitmq
title: RabbitMQ Connector
sidebar_label: RabbitMQ
description: Send messages to RabbitMQ from your BPMN process using the RabbitMQ Connector.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="rabbitmq" defaultValue="outbound" queryString values={
[
{label: 'RabbitMQ Producer Connector', value: 'outbound' },
{label: 'RabbitMQ inbound Connector', value: 'inbound' }
]}>

<TabItem value='outbound'>

The **RabbitMQ Connector** is an outbound Connector that allows you to connect your BPMN process with [RabbitMQ](https://www.rabbitmq.com/) to send messages to RabbitMQ.

## Prerequisites

To use the **RabbitMQ Connector**, you need to have installed a RabbitMQ server and create the relevant [credentials](https://www.rabbitmq.com/passwords.html).
Use Camunda secrets to store credentials, so that you don't expose sensitive information directly from the process. See [this appendix entry](#how-do-i-store-secrets-for-my-connector) to learn more.

:::note
Ensure you enter the correct exchange name and routing key, as the **RabbitMQ Connector** can't throw an exception if they are incorrect.
:::

## Create a RabbitMQ Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Connecting to RabbitMQ and sending messages

To connect to RabbitMQ, choose the required connection type in the **Authentication** section and complete the mandatory fields highlighted in red in the Connector properties panel on the right side of the screen.

:::note
All the mandatory and non-mandatory fields depending on the authentication selection you choose are covered in the upcoming sections.
:::

## Authentication

You can choose among the available RabbitMQ Connectors according to your authentication requirements.
First, you must have a user in your RabbitMQ instance with the necessary permissions. See more at the [RabbitMQ access control specification](https://www.rabbitmq.com/access-control.html).

Next, we will choose the type of connection.

### URI type connection

For a URI connection, take the following steps:

1. Click the **URI** connection type in the **Authentication** section
2. Set **URI** to `URI`. It must contain RabbitMQ username, password, host name, port number, and virtual host. For example, `amqp://userName:password@serverHost:port/virtualHost`; follow the [RabbitMQ URI specification](https://www.rabbitmq.com/uri-spec.html) to learn more.

### Credentials type connection

To connect with credentials, take the following steps:

1. Click the **Username/Password** connection type in the **Authentication** section
2. Set the **Password** to `Password`.

## Routing data

In the **Routing** section, you must set the routing data attributes:

- For a **URI** type connection, the required fields are `exchange` and `routingKey`.
- For a **Credentials** type connection, the required fields are `exchange`, `routingKey`, `virtualHost`, `hostName`, and `port`.

Refer to the RabbitMQ documentation to learn about routing attributes:

- [Exchanges, routing keys, and bindings](https://www.cloudamqp.com/blog/part4-rabbitmq-for-beginners-exchanges-routing-keys-bindings.html)
- [Virtual hosts](https://www.rabbitmq.com/vhosts.html)
- [Networking, host, and port configuration](https://www.rabbitmq.com/networking.html)

## Message

1. In the **Message** section, insert the message payload. The message can be Text or JSON format.
2. (Optional) In the **Properties** section, insert the message properties in JSON or as a [FEEL](/components/modeler/feel/what-is-feel.md) expression. Go to [RabbitMQ documentation](https://www.rabbitmq.com/publishers.html#message-properties) for learn more about RabbitMQ message properties.
   example of message :

```
= {"myMessageKey":"Hello Camunda Team"}
```

example of properties:

```
= {
  "contentEncoding":"UTF-8",
  "contentType":"text/plain"
}
```

## RabbitMQ Connector response

The **RabbitMQ Connector** returns the `Success` result.
The response contains a `messageId` variable.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map specific fields from the response into process variables using [FEEL](/components/modeler/feel/what-is-feel.md). For example:

```
= {
  "myResultVariable": response.statusResult
}
```

## Appendix & FAQ

### How do I store secrets for my Connector?

Use Camunda secrets to avoid exposing your credentials. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

</TabItem>

<TabItem value='inbound'>

The **RabbitMQ Connector** is an inbound Connector that allows you to connect your BPMN process with [RabbitMQ](https://www.rabbitmq.com/) to receive messages from RabbitMQ.

## Prerequisites

To use the **RabbitMQ Connector**, you need to have installed a RabbitMQ server and create the relevant [credentials](https://www.rabbitmq.com/passwords.html).
Using Camunda secrets to store credentials is recommended so you do not expose sensitive information directly from the process. See [this appendix entry](#how-do-i-store-secrets-for-my-connector) to learn more.

## Create a RabbitMQ Connector event

See [create a RabbitMQ Connector task](#create-a-rabbitmq-connector-task) for additional details.

1. Add a **Start Event** or an **Intermediate Event** to your BPMN diagram to get started.
2. Change its template to a RabbitMQ Connector.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the RabbitMQ consumer.

## Connecting to RabbitMQ and receiving messages

### Authentication

You can choose among the available authentication types according to your requirements.
First, you must have a user in your RabbitMQ instance with the necessary permissions. See more at the [RabbitMQ access control specification](https://www.rabbitmq.com/access-control.html).

Next, we will choose the type of connection.

#### URI type connection

For a URI connection, take the following steps:

1. Click the **URI** connection type in the **Authentication** section.
2. Set **URI** to `URI`. It must contain RabbitMQ username, password, host name, port number, and virtual host. For example, `amqp://userName:password@serverHost:port/virtualHost`; follow the [RabbitMQ URI specification](https://www.rabbitmq.com/uri-spec.html) to learn more.

#### Credentials type connection

To connect with credentials, take the following steps:

1. Click the **Username/Password** connection type in the **Authentication** section
2. Set the **Password** to `Password`.

### Routing data

- For a **Credentials** type connection, you are required to fill in the `virtualHost`, `hostName`, and `port` fields.
- For a **URI** type connection, these values are already included in the URI, so you don't need to fill them in.

### Subscription properties

The **Subscription** section allows you to configure the subscription to the RabbitMQ queue.

- **Queue name** is a mandatory field that specifies the name of the queue to subscribe to.
- **Consumer tag** is an optional field that specifies the consumer tag to use for the consumer. If not set, the server will generate one.
- **Exclusive consumer** is an optional dropdown field that specifies whether the consumer is exclusive. Exclusivity allows you to ensure only one consumer at a time consumes from the queue.
- **Arguments** is an optional FEEL expression field that specifies the arguments for the queue. The expression must be a [FEEL context expression](/components/modeler/feel/language-guide/feel-context-expressions.md). For example, `={x-message-ttl: 60000}`. See more at the [RabbitMQ queue arguments specification](https://www.rabbitmq.com/queues.html#optional-arguments).

:::note
When configuring the **Arguments** field, remember that inbound Connectors are executed outside the BPMN process context and are not tied to a specific process instance.
Therefore, you cannot use process variables in the **Arguments** context expression.
However, you can refer to Connector secrets using placeholder syntax. For example, `= {x-consumer-timeout: "{{secrets.CONSUMER_TIMEOUT}}"}`.
:::

### Activation condition

**Activation condition** is an optional FEEL expression field that allows for fine-tuning of the Connector activation.
For example, given a RabbitMQ message contains the payload `{"role": "USER", "action": "LOGIN""}`, the **Activation Condition** value might look like `=(message.body.role="USER")`.
This way, the Connector is triggered only if the message body contains the `role` field with the value `USER`. Leave this field empty to trigger your Connector for every incoming message.

By default, messages with unmatched activation conditions are rejected without re-queuing. You can set up a dead-letter queue in RabbitMQ to handle these messages. Learn more about dead-letter queues in the [RabbitMQ documentation](https://www.rabbitmq.com/dlx.html).

You can also configure the RabbitMQ inbound Connector to acknowledge messages that don't match the activation condition. In this case, the message will not end up in the dead-letter queue, but will be acknowledged and removed from the queue.
To acknowledge messages that don't match the activation condition, check the **Consume unmatched events** checkbox.

| **Consume unmatched events** checkbox | Activation condition | Outcome                                            |
| ------------------------------------- | -------------------- | -------------------------------------------------- |
| Checked                               | Matched              | Message is acknowledged and removed from the queue |
| Unchecked                             | Matched              | Message is acknowledged and removed from the queue |
| Checked                               | Unmatched            | Message is acknowledged and removed from the queue |
| Unchecked                             | Unmatched            | Message is rejected and re-queued                  |

### Correlation

The **Correlation** section allows you to configure the message correlation parameters.

:::note
The **Correlation** section is not applicable for the plain **start event** element template of the RabbitMQ Connector. Plain **start events** are triggered by process instance creation and do not rely on message correlation.
:::

#### Correlation key

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **Message Intermediate Catch Event**.
- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

For example, given that your correlation key is defined with `myCorrelationKey` process variable, and the incoming RabbitMQ message contains `message:{body:{correlationKey:myValue}}`, your correlation key settings will look like this:

- **Correlation key (process)**: `=myCorrelationKey`
- **Correlation key (payload)**: `=message.body.correlationKey`

Learn more about correlation keys in the [messages guide](../../../concepts/messages).

#### Message ID expression

The **Message ID expression** is an optional field that allows you to extract the message ID from the incoming message. The message ID serves as a unique identifier for the message and is used for message correlation.
This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

In most cases, it is not necessary to configure the **Message ID expression**. However, it is useful if you want to ensure message deduplication or achieve a certain message correlation behavior.
Learn more about how message IDs influence message correlation in the [messages guide](../../../concepts/messages#message-correlation-overview).

For example, to set the message ID to the value of the `transactionId` field in the incoming message, configure the **Message ID expression** as follows:

```
= message.body.transactionId
```

#### Message TTL

The **Message TTL** is an optional field that allows you to set the time-to-live (TTL) for the correlated messages. TTL defines the time for which the message is buffered in Zeebe before being correlated to the process instance (if it can't be correlated immediately).
The value is specified as an ISO 8601 duration. For example, `PT1H` sets the TTL to one hour. Learn more about the TTL concept in Zeebe in the [message correlation guide](../../../concepts/messages#message-buffering).

### Deduplication

The **Deduplication** section allows you to configure the Connector deduplication parameters.
Not to be confused with **message deduplication**, **Connector deduplication** is a mechanism in the Connector Runtime that determines how many RabbitMQ subscriptions are created if there are multiple occurrences of the **RabbitMQ Consumer Connector** in the BPMN diagram.

By default, the Connector runtime deduplicates Connectors based on properties, so elements with the same subscription properties only result in one subscription. Learn more about deduplication in the [deduplication guide](../use-connectors/inbound.md#connector-deduplication).

To customize the deduplication behavior, check the **Manual mode** checkbox and configure the custom deduplication ID.

### Output mapping

The **Output mapping** section allows you to configure the mapping of the RabbitMQ message to the process variables.

- Use **Result variable** to store the response in a process variable. For example, `myResultVariable`.
- Use **Result expression** to map specific fields from the response into process variables using [FEEL](/components/modeler/feel/what-is-feel.md). For example, given the RabbitMQ Connector is triggered with the message body `{"role": "USER", "action": "LOGIN""}` and you would like to extract the pull request `role` as a process variable `messageRole`, the **Result Expression** might look like this:

```
= {
  "messageRole": message.body.role
}
```

## Appendix & FAQ

### How do I store secrets for my Connector?

Use Camunda secrets to avoid exposing your credentials. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

### What is the output format of the RabbitMQ Connector?

The RabbitMQ Connector returns the following output that can be used in the next steps of your process, including result expressions:

```
{
   "message": {
      "consumerTag": "myConsumerTag",
      "body": {
         {{ the message body }}
      },
      "properties": {
            "contentType": "application/json",
            "contentEncoding": "UTF-8",
            "headers": {
                "x-first": "1",
                "x-second": "2"
            },
            "deliveryMode": 2,
            "priority": 0,
            "correlationId": "myCorrelationId",
            "replyTo": "myReplyTo",
            "expiration": "myExpiration",
            "messageId": "myMessageId",
            "timestamp": "myTimestamp",
            "type": "myType",
            "userId": "myUserId",
            "appId": "myAppId",
            "clusterId": "myClusterId"
      }
   }
}
```

:::note
The output payload contains a top-level `message` object that contains `consumerTag`, `body`, and `properties` fields.
:::

### How is message body deserialized?

The RabbitMQ Consumer Connector always tries to deserialize the message body as JSON. If the deserialization fails, the Connector will return the message body as a string.
However, if the body only contains a primitive value, such as a string, a number, or a boolean, the Connector will return the primitive value itself.

### When is the message acknowledged? What happens if the Connector execution fails?

The following outcomes are possible:

- If Connector execution is successful and **Activation condition** was met, the message is acknowledged and removed from the queue.
- If **Activation condition** was not met, the message is rejected and removed from the queue.
- If Connector execution fails due to an unexpected error (e.g. Zeebe is unavailable), the message is rejected and re-queued.

### What lifecycle does the RabbitMQ Consumer Connector have?

The RabbitMQ Subscription Connector is a long-running Connector that is activated when the process is deployed and deactivated when the process is un-deployed or overwritten by a new version.

</TabItem>

</Tabs>
