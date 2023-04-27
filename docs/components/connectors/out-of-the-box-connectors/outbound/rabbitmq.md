---
id: rabbitmq
title: RabbitMQ Service Connector
sidebar_label: RabbitMQ Connector
description: Send messages to RabbitMQ from your BPMN process using the RabbitMQ Connector.
---

The **RabbitMQ Connector** is an outbound Connector that allows you to connect your BPMN process with [RabbitMQ](https://www.rabbitmq.com/) to send messages to RabbitMQ.

## Prerequisites

To use the **RabbitMQ Connector**, you need to have installed a RabbitMQ server and create the relevant [credentials](https://www.rabbitmq.com/passwords.html).
It is highly recommended to use Camunda secrets to store credentials, so that you don't expose sensitive information directly from the process. See [this appendix entry](#how-do-i-store-secrets-for-my-connector) to learn more.

:::note
Ensure you enter the correct exchange name and routing key, as the **RabbitMQ Connector** can't throw an exception if they are incorrect.
:::

## Create a RabbitMQ Connector task

To use the **RabbitMQ Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon,

![wrench-shape](../../img/connectors-rabbitmq-wrench-shaped.png)

or create a new Connector task by using the **Append Connector** context menu.

![wrench-shape](../../img/connectors-rabbitmq-append-connector.png)

Follow our [guide to using Connectors](/components/connectors/use-connectors.md) to learn more.

## Connecting to RabbitMQ and sending messages

To connect to RabbitMQ, choose the required connection type in the **Authentication** section and complete the mandatory fields highlighted in red in the connector properties panel:

![connectors-rabbitmq-red-properties](../../img/connectors-rabbitmq-red-properties.png)

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

![connectors-rabbitmq-uri-fields](../../img/connectors-rabbitmq-uri-fields.png)

### Credentials type connection

To connect with credentials, take the following steps:

1. Click the **Username/Password** connection type in the **Authentication** section
2. Set the **Password** to `Password`.
   ![connectors-rabbitmq-credentials-fields](../../img/connectors-rabbitmq-credentials-fields.png)

## Routing data

In the **Routing** section, you must set the routing data attributes:

- For a **URI** type connection, the required fields are `exchange` and `routingKey`.
  ![connectors-rabbitmq-routing](../../img/connectors-rabbitmq-routing-uri.png)
- For a **Credentials** type connection, the required fields are `exchange`, `routingKey`, `virtualHost`, `hostName`, and `port`.
  ![connectors-rabbitmq-routing](../../img/connectors-rabbitmq-routing-cred.png)

Refer to the RabbitMQ documentation to learn about routing attributes:

- [Exchanges, routing keys, and bindings](https://www.cloudamqp.com/blog/part4-rabbitmq-for-beginners-exchanges-routing-keys-bindings.html)
- [Virtual hosts](https://www.rabbitmq.com/vhosts.html)
- [Networking, host, and port configuration](https://www.rabbitmq.com/networking.html)

## Message

1. In the **Message** section, insert the message payload. The message can be Text or JSON format.
2. (Optional) In the **Properties** section, insert the message properties in JSON or as a [FEEL](/components/modeler/feel/what-is-feel.md) expression. Go to [RabbitMQ documentation](https://www.rabbitmq.com/publishers.html#message-properties) for learn more about RabbitMQ message properties.

![connectors-rabbitmq-message-with-properties](../../img/connectors-rabbitmq-message-with-properties.png)

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

It is highly recommended storing your secret credentials as Camunda secrets. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
