---
id: rabbitmq-inbound
title: RabbitMQ Consumer Connector
sidebar_label: RabbitMQ Consumer Connector
description: Receive messages from RabbitMQ to start or continue a BPMN process using the RabbitMQ Connector.
---

The **RabbitMQ Connector** is an inbound Connector that allows you to connect your BPMN process with [RabbitMQ](https://www.rabbitmq.com/) to receive messages from RabbitMQ.

## Prerequisites

To use the **RabbitMQ Connector**, you need to have installed a RabbitMQ server and create the relevant [credentials](https://www.rabbitmq.com/passwords.html).
Using Camunda secrets to store credentials is highly recommended, so you do not expose sensitive information directly from the process. See [this appendix entry](#how-do-i-store-secrets-for-my-connector) to learn more.

## Create a RabbitMQ Connector event

To use the **RabbitMQ Consumer Connector** in your process, either change the type of existing event by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector event using the **Append Connector** context menu. Follow our [guide on using Connectors](/components/connectors/use-connectors/index.md) to learn more.

## Create a RabbitMQ Consumer Connector task

1. Add a **Start Event** or an **Intermediate Event** to your BPMN diagram to get started.
2. Change its template to a RabbitMQ Connector.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the RabbitMQ consumer.

## Connecting to RabbitMQ and receiving messages

### Authentication

You can choose among the available RabbitMQ Connectors according to your authentication requirements.
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
- **Arguments** is an optional FEEL expression field that specifies the arguments for the queue. The expression must be a [FEEL context expression](https://camunda.github.io/feel-scala/docs/reference/language-guide/feel-context-expressions). For example, `={x-message-ttl: 60000}`. See more at the [RabbitMQ queue arguments specification](https://www.rabbitmq.com/queues.html#optional-arguments).

:::note
When configuring the **Arguments** field, remember that inbound Connectors are executed outside the BPMN process context and are not tied to a specific process instance.
Therefore, you cannot use process variables in the **Arguments** context expression.
However, you can refer to Connector secrets using placeholder syntax. For example, `= {x-consumer-timeout: "{{secrets.CONSUMER_TIMEOUT}}"}`.
:::

### Activation

The **Activation** section allows you to configure the custom activation conditions for the RabbitMQ Consumer Connector.

#### Correlation key

The correlation key fields are only applicable for the intermediate event **RabbitMQ Connector**.

When using the **RabbitMQ Connector** with an **Intermediate Catch Event**, fill in the **Correlation key (process)** and **Correlation key (payload)**.

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **Message Intermediate Catch Event**.
- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

For example, given that your correlation key is defined with `myCorrelationKey` process variable, and the value contains `message:{body:{correlationKey:myValue}}`, your correlation key settings will look like this:

- **Correlation key (process)**: `=myCorrelationKey`
- **Correlation key (payload)**: `=message.body.correlationKey`

Learn more about correlation keys in the [messages guide](../../../concepts/messages).

#### Activation condition

**Activation condition** is an optional FEEL expression field that allows for the fine-tuning of the Connector activation.
For example, given that RabbitMQ message contains the payload `{"role": "USER", "action": "LOGIN""}`, the **Activation Condition** value might look like as `=(message.body.role="USER")`.
This way, the Connector will be triggered only if the message body contains the `role` field with the value `USER`. Leave this field empty to trigger your Connector for every incoming message.

### Variable mapping

The **Variable mapping** section allows you to configure the mapping of the RabbitMQ message to the process variables.

- Use **Result variable** to store the response in a process variable. For example, `myResultVariable`.
- Use **Result expression** to map specific fields from the response into process variables using [FEEL](/components/modeler/feel/what-is-feel.md). For example, given the RabbitMQ Connector is triggered with the message body `{"role": "USER", "action": "LOGIN""}` and you would like to extract the pull request `role` as a process variable `messageRole`, the **Result Expression** might look like this:

```
= {
  "messageRole": message.body.role
}
```

## Appendix & FAQ

### How do I store secrets for my Connector?

It is highly recommended storing your secret credentials as Camunda secrets. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

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
