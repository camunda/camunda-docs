---
id: kafka
title: Kafka Producer Connector
sidebar_label: Kafka Producer Connector
description: Produce messages to Kafka from your BPMN process.
---

The **Kafka Producer Connector** allows you to connect your BPMN service with [Kafka](https://kafka.apache.org/).

## Prerequisites

To use the **Kafka Producer Connector**, you need to have a Kafka instance with configured bootstrap server.
It is highly recommended not to expose your sensitive data as plain text but rather use Camunda secrets. Follow our documentation on [managing secrets](../../../components/console/manage-clusters/manage-secrets.md) to learn more.

## Create an Kafka Producer Connector task

To use the **Kafka Producer Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task by using the **Append Connector** context menu. Follow our [guide on using Connectors](../use-connectors.md) to learn more.

## Make your Kafka Producer Connector for publishing messages executable

![Kafka Filled](../img/connectors-kafka-filled.png)

To make your **Kafka Producer Connector** for publishing messages executable, take the following steps:

1. (Optional) Set the relevant credentials in the **Authentication** section. For example, `secrets.MY_KAFKA_USERNAME`. See the relevant [appendix section](#what-mechanism-is-used-to-authenticate-against-kafka) to find more about Kafka secure authentication.
2. In the **Kafka** section, set the URL of bootstrap server(s); comma-separated if more than one server required.
3. In the **Kafka** section, set the topic name.
4. (optional) In the **Kafka** section, fill out the field **Additional properties** to set producer configuration values. See the list of supported configurations at the [official Kafka documentation page](https://kafka.apache.org/documentation/#producerconfigs). Also check preconfigured values for the **Kafka Producer Connector** in the relevant [appendix section](#what-are-default-kafka-producer-client-properties).
5. In the **Message** section, set the **Key** and the **Value** that will be sent to Kafka topic.

## Kafka Producer Connector response

The **Kafka Producer Connector** returns metadata for a record that has been acknowledged by the Kafka instance.

The following fields are available in the `response` variable:

- `timestamp`: the timestamp of the message
- `offset`: message offset
- `partition`: message partition
- `topic`: topic name

You can read about these fields at the [official Kafka documentation page](https://kafka.apache.org/documentation/#intro_concepts_and_terms).

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. For example:

```
= {
  "messageAcknowledgedAt": response.timestamp
}
```

## Appendix & FAQ

### What mechanism is used to authenticate against Kafka?

If the fields **Username** and **Password** are not empty, by default the **Kafka Producer Connector** enables the credentials-based SASL SSL authentication and the following properties are set:

```
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule   required username='<Your Username>'   password='<Your Password>';
security.protocol=SASL_SSL
sasl.mechanism=PLAIN
```

If any of the field is not populated, you have to configure your security method in respect to your Kafka configuration. You can do so via the field **Additional properties**.

### What are default Kafka Producer client properties?

- Authentication properties (only if both **Username** and **Password** are not empty):

```
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule   required username='<Your Username>'   password='<Your Password>';
security.protocol=SASL_SSL
sasl.mechanism=PLAIN
```

- Bootstrap server property:

```
bootstrap.servers=<bootstrap server(s) from BPMN>
```

- Message properties:

```
key.serializer=org.apache.kafka.common.serialization.StringSerializer
value.serializer=org.apache.kafka.common.serialization.StringSerializer
```

- Miscellaneous properties:

```
session.timeout.ms=45000
client.dns.lookup=use_all_dns_ips
acks=all
delivery.timeout.ms=45000
```

### What is the precedence of client properties loading?

Properties loading consists of 3 steps:

1. Construct client properties from the BPMN diagram: authentication, bootstrap server, message properties.
2. Load miscellaneous properties.
3. Load and **override** properties from the field **Additional properties**.

### How do I set / override additional client properties?

The following example sets a new client property `client.id` and overrides SASL mechanism to SCRAM SHA-256 instead of plain text:

```
= {
  "client.id":"MyDemoClientId",
  "sasl.mechanism":"SCRAM-SHA-256"
}
```
