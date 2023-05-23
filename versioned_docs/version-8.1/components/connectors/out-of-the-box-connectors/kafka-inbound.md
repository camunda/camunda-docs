---
id: kafka-inbound
title: Kafka Consumer Connector
sidebar_label: Kafka Consumer Connector
description: "The Kafka Consumer Connector allows you to connect your BPMN service with Kafka. Learn how to create a Kafka Consumer Connector and make it executable."
---

The **Kafka Consumer Connector** allows you to connect your BPMN service with [Kafka](https://kafka.apache.org/).

## Prerequisites

To use the **Kafka Consumer Connector**, you need to have a Kafka instance with configured bootstrap server.
It is highly recommended not to expose your sensitive data as plain text, but rather use Camunda secrets. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

## Create a Kafka Consumer Connector task

1. Start building your BPMN diagram with a **Start Event** building block.
2. Change its template to a Kafka Consumer.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the Kafka consumer.

## Make your Kafka Consumer Connector for consuming messages executable

![Kafka Inbound Filled](../img/connectors-kafka-inbound-filled.png)

To make your **Kafka Consumer Connector** for publishing messages executable, take the following steps:

1. In the **Authentication** section, select the **Authentication type**.
2. (If you selected _Credentials_ as the **Authentication type**) In the **Authentication** section, set the relevant credentials. For example, `secrets.MY_KAFKA_USERNAME`. See the relevant [appendix section](#what-mechanism-is-used-to-authenticate-against-kafka) to find more about Kafka secure authentication.
3. In the **Kafka** section, set the URL of bootstrap server(s); comma-separated if more than one server required.
4. In the **Kafka** section, set the topic name.
5. (Optional) In the **Kafka** section, fill out the field **Additional properties** to set consumer configuration values. See the list of supported configurations at the [official Kafka documentation page](https://kafka.apache.org/documentation/#consumerconfigs). Also check preconfigured values for the **Kafka Consumer Connector** in the relevant [appendix section](#what-are-default-kafka-consumer-client-properties).
6. In the **Kafka** section, you can set the **Offsets** for the partition. The number of offset specified should match the number of partitions on the current topic.
7. In the **Kafka** section, you can set the **Auto offset reset** which tells the connector what strategy to use when there is no initial offset in Kafka or if the specified offsets does not exist on the server.
8. In the **Activation** section, you can set the **Activation Condition**. Based on this condition we either start a process instance or do nothing if the condition is not met. For example, `=(value.itemId = "a4f6j2")`. Leave this field empty to trigger your webhook every time.

## Activate the Kafka Consumer Connector by deploying your diagram

Once you click the **Deploy** button, your Kafka Consumer will be activated and starts consuming messages from the specified topic.

## Kafka Consumer Connector response

The **Kafka Consumer Connector** returns the message that has been consumed.

The following fields are available in the `response` variable:

- `key`: the key of the message
- `value`: the value of the message
- `rawValue`: the value of the message as a json string
- `topic`: topic name

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. For example:

```
= {
  "itemId": value.itemId
}
```

## Appendix & FAQ

### What mechanism is used to authenticate against Kafka?

If you selected _Credentials_ as **Authentication type** and the fields **Username** and **Password** are not empty, by default the **Kafka Consumer Connector** enables the credentials-based SASL SSL authentication and the following properties are set:

```
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule   required username='<Your Username>'   password='<Your Password>';
security.protocol=SASL_SSL
sasl.mechanism=PLAIN
```

If any of the field is not populated, you have to configure your security method in respect to your Kafka configuration. You can do so via the field **Additional properties**.

### What are default Kafka Consumer client properties?

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
key.deserializer=org.apache.kafka.common.serialization.StringDeserializer
value.deserializer=org.apache.kafka.common.serialization.StringDeserializer
```

- Miscellaneous properties:

```
session.timeout.ms=45000
client.dns.lookup=use_all_dns_ips
acks=all
group.id=kafka-inbound-connector-{{bpmnProcessId}}
enable.auto.commit=false
```

### What is the precedence of client properties loading?

Properties loading consists of three steps:

1. Construct client properties from the BPMN diagram: authentication, bootstrap server, message properties.
2. Load miscellaneous properties.
3. Load and **override** properties from the field **Additional properties**.
