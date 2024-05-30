---
id: kafka
title: Kafka Connector
sidebar_label: Kafka Connector
description: The Kafka Producer Connector allows you to connect your BPMN service with Kafka. Learn how to create a Kafka Producer Connector and make it executable.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="kafka" defaultValue="outbound" queryString values={
[
{label: 'Kafka Producer Connector', value: 'outbound' },
{label: 'Kafka Consumer Connector', value: 'inbound' }
]}>

<TabItem value='outbound'>

The **Kafka Producer Connector** is an outbound Connector that allows you to connect your BPMN service with [Kafka](https://kafka.apache.org/) to produce messages.

## Prerequisites

To use the **Kafka Producer Connector**, you need to have a Kafka instance with configured bootstrap server.
Use Camunda secrets to avoid exposing your sensitive data as plain text. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

## Create a Kafka Producer Connector task

To use the **Kafka Producer Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task by using the **Append Connector** context menu. Follow our [guide on using Connectors](/components/connectors/use-connectors/index.md) to learn more.

## Make your Kafka Producer Connector for publishing messages executable

To make your **Kafka Producer Connector** for publishing messages executable, take the following steps:

1. (Optional) Set the relevant credentials in the **Authentication** section. For example, `{{secrets.MY_KAFKA_USERNAME}}`. See the relevant [appendix section](#what-mechanism-is-used-to-authenticate-against-kafka) to find more about Kafka secure authentication.
2. In the **Kafka** section, select the serialization type for your messages. Choose **Default (JSON)** for JSON serialization or **Avro (experimental)** for Avro serialization. [Read more about Kafka Avro serialization](#avro-serialization).
3. In the **Kafka** section, set the URL of bootstrap server(s); comma-separated if more than one server required.
4. In the **Kafka** section, set the topic name.
5. (Optional) In the **Kafka** section, fill out the field **Headers** to set producer configuration values. Only `UTF-8` strings are supported as header values.
6. (Optional) In the **Kafka** section, fill out the field **Additional properties** to set producer configuration values. See the list of supported configurations at the [official Kafka documentation page](https://kafka.apache.org/documentation/#producerconfigs). Also check preconfigured values for the **Kafka Producer Connector** in the relevant [appendix section](#what-are-default-kafka-producer-client-properties).
7. In the **Message** section, set the **Key** and the **Value** that will be sent to Kafka topic.
8. (Optional for **Avro (experimental)**) In the **Avro schema** field, input the schema that defines the message structure. Ensure this schema is in your Avro schema registry.

## Avro serialization

:::note
Use Avro serialization with caution, as this is an experimental feature. Functionality may not be comprehensive and could change.
:::

The **Kafka Producer Connector** supports Avro serialization, which offers a compact, fast, and binary data exchange format for Kafka messages. Avro relies on schemas for serialization and deserialization. When using Avro, each message is serialized according to a specific schema written in JSON format. This schema defines the structure of the Kafka message, ensuring the data conforms to a predefined format and enabling schema evolution strategies.

For more detailed information on Kafka Avro serialization, you may refer to the [official Kafka documentation](https://kafka.apache.org/documentation/#serialization) and [official Apache Avro documentation](https://avro.apache.org/docs/).

### Example Avro schema and data

#### Avro schema:

```json
{
  "doc": "Sample schema to help you get started.",
  "fields": [
    {
      "name": "name",
      "type": "string"
    },
    {
      "name": "age",
      "type": "int"
    },
    {
      "name": "emails",
      "type": {
        "items": "string",
        "type": "array"
      }
    }
  ],
  "name": "sampleRecord",
  "namespace": "com.mycorp.mynamespace",
  "type": "record"
}
```

#### Kafka message

- **Key** : `employee1`
- **Value** :

```json
{
  "name": "John Doe",
  "age": 29,
  "emails": ["johndoe@example.com"]
}
```

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

Properties loading consists of three steps:

1. Construct client properties from the BPMN diagram: authentication, bootstrap server, message properties.
2. Load miscellaneous properties.
3. Load and **override** properties from the field **Additional properties**.

### How do I set or override additional client properties?

The following example sets a new client property `client.id` and overrides SASL mechanism to SCRAM SHA-256 instead of plain text:

```
= {
  "client.id":"MyDemoClientId",
  "sasl.mechanism":"SCRAM-SHA-256"
}
```

</TabItem>

<TabItem value='inbound'>

The **Kafka Consumer Connector** allows you to consume messages by subscribing to [Kafka](https://kafka.apache.org/) topics and map them your BPMN processes as start or intermediate events.

## Prerequisites

To use the **Kafka Consumer Connector**, you need to have a Kafka instance with configured bootstrap server.
Use Camunda secrets to avoid exposing your sensitive data as plain text. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

## Create a Kafka Consumer Connector event

1. Add a **Start Event** or an **Intermediate Event** to your BPMN diagram to get started.
2. Change its template to a Kafka Consumer.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the Kafka consumer.

## Configure your Kafka Consumer Connector

To make your **Kafka Consumer Connector** executable, fill in the required properties.

### Authentication

In the **Authentication** section, select the **Authentication type**.
If you selected _Credentials_ as the **Authentication type**, set the username and password. Use Camunda secrets to avoid exposing your sensitive data as plain text. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

Refer to the relevant [appendix section](#what-mechanism-is-used-to-authenticate-against-kafka) to find more about Kafka secure authentication.

### Kafka properties

In the **Kafka** section, you can configure the following properties:

- **Serialization type**: Select the serialization type for your messages. Choose **Default (JSON)** for JSON serialization or **Avro (experimental)** for Avro serialization. If you select **Avro (experimental)**, you need to input the schema that defines the message structure into the **Avro schema** field that appears below. [Read more about Kafka Avro serialization](#avro-serialization).
- **Bootstrap servers**: Set the URL of bootstrap server(s); comma-separated if more than one server required.
- **Topic**: Set the topic name.
- **Additional properties**: Fill out the field to set consumer configuration values. See the list of supported configurations at the [official Kafka documentation page](https://kafka.apache.org/documentation/#consumerconfigs). Additionally, check preconfigured values for the **Kafka Consumer Connector** in the relevant [appendix section](#what-are-default-kafka-consumer-client-properties).
- **Offsets**: Set the offsets for the partition. The number of offsets specified should match the number of partitions on the current topic.
- **Auto offset reset**: Set the strategy to use when there is no initial offset in Kafka or if the specified offsets do not exist on the server.

#### Example Avro schema and data

If the expected Kafka message looks like this:

##### Kafka message

- **Key** : `employee1`
- **Value** :

```json
{
  "name": "John Doe",
  "age": 29,
  "emails": ["johndoe@example.com"]
}
```

Then the corresponding Avro schema to describe this message's structure would be:

##### Avro schema:

```json
{
  "doc": "Sample schema to help you get started.",
  "fields": [
    {
      "name": "name",
      "type": "string"
    },
    {
      "name": "age",
      "type": "int"
    },
    {
      "name": "emails",
      "type": {
        "items": "string",
        "type": "array"
      }
    }
  ],
  "name": "sampleRecord",
  "namespace": "com.mycorp.mynamespace",
  "type": "record"
}
```

This schema defines a structure for a record that includes a name (string), an age (integer), and emails (an array of strings), aligning with the given Kafka message's value format.

### Activation condition

**Activation condition** is an optional FEEL expression field that allows for the fine-tuning of the Connector activation.
For example, given that a Kafka message (value) contains a field `itemId`, you can set the activation condition to `=(value.itemId = "a4f6j2")`. This way, the connector will only be triggered if the condition is met. Leave this field empty to trigger your Connector for every incoming message.

:::warning
By default, **Kafka Consumer Connector** does not commit the offset if the message cannot be processed. This includes cases where the activation condition is not met.
This means that if there is a message in the topic that cannot be processed due to an activation condition mismatch, the Kafka subscription will be stopped.
Follow the instruction below to configure this behavior.
:::

To ignore messages that do not meet the activation condition and commit the offset, check the **Consume unmatched events** checkbox.

| **Consume unmatched events** checkbox | Activation condition | Outcome                                              |
| ------------------------------------- | -------------------- | ---------------------------------------------------- |
| Checked                               | Matched              | Connector is triggered, offsets are commited         |
| Unchecked                             | Matched              | Connector is triggered, offsets are commited         |
| Checked                               | Unmatched            | Connector is not triggered, offsets are commited     |
| Unchecked                             | Unmatched            | Connector is not triggered, offsets are not commited |

### Correlation

The **Correlation** section allows you to configure the message correlation parameters.

:::note
The **Correlation** section is not applicable for the plain **Start Event** element template of the Kafka Connector. Plain **Start Events** are triggered by process instance creation and do not rely on message correlation.
:::

#### Correlation key

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **Message Intermediate Catch Event**.
- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

For example, given that your correlation key is defined with `myCorrelationKey` process variable, and the incoming Kafka message contains `value:{correlationKey:myValue}`, your correlation key settings will look like this:

- **Correlation key (process)**: `=myCorrelationKey`
- **Correlation key (payload)**: `=value.correlationKey`

Learn more about correlation keys in the [messages guide](../../../concepts/messages).

#### Message ID expression

The **Message ID expression** is an optional field that allows you to extract the message ID from the incoming message. Message ID serves as a unique identifier for the message and is used for message correlation.
This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

In most cases, it is not necessary to configure the **Message ID expression**. However, it is useful if you want to ensure message deduplication or achieve certain message correlation behavior.
Learn more about how message IDs influence message correlation in the [messages guide](../../../concepts/messages#message-correlation-overview).

For example, if you want to set the message ID to the value of the `transactionId` field in the incoming message, you can configure the **Message ID expression** as follows:

```
= value.transactionId
```

#### Message TTL

The **Message TTL** is an optional field that allows you to set the time-to-live (TTL) for the correlated messages. TTL defines the time for which the message is buffered in Zeebe before being correlated to the process instance (if it can't be correlated immediately).
The value is specified as an ISO 8601 duration. For example, `PT1H` sets the TTL to one hour. Learn more about the TTL concept in Zeebe in the [message correlation guide](../../../concepts/messages#message-buffering).

### Deduplication

The **Deduplication** section allows you to configure the connector deduplication parameters.
Not to be confused with message deduplication, connector deduplication is a mechanism in the Connector Runtime that determines how many Kafka subscriptions are created if there are multiple occurrences of the **Kafka Consumer Connector** in the BPMN diagram.
By default, the connector runtime deduplicates connectors based on properties, so elements with the same subscription properties only result in one subscription. Learn more about deduplication in the [deduplication guide](/components/connectors/use-connectors/deduplication.md).

If you want to customize the deduplication behavior, you can check the **Manual mode** checkbox and configure the custom deduplication ID.

### Output mapping

The **Kafka Consumer Connector** returns the consumed message.

The following fields are available in the `response` variable:

- `key`: The key of the message.
- `value`: The value of the message.
- `rawValue`: The value of the message as a JSON string.

You can use an output mapping to map the response:

1. Use **Result variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result expression** to map fields from the response into process variables. For example:

```
= {
  "itemId": value.itemId
}
```

## Activate the Kafka Consumer Connector by deploying your diagram

Once you click the **Deploy** button, your Kafka Consumer will be activated and starts consuming messages from the specified topic.

## Appendix & FAQ

### What mechanism is used to authenticate against Kafka?

If you selected _Credentials_ as **Authentication type** and the fields **Username** and **Password** are not empty, by default the **Kafka Consumer Connector** enables the credentials-based SASL SSL authentication and the following properties are set:

```
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule   required username='<Your Username>'   password='<Your Password>';
security.protocol=SASL_SSL
sasl.mechanism=PLAIN
```

If any of the field is not populated, you must configure your security method in respect to your Kafka configuration. You can do so via the field **Additional properties**.

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

### How is the message payload deserialized?

Kafka messages usually use JSON format, therefore we first try to deserialize it as a `JsonElement`. If this fails (e.g. because of wrong format) we use the `String` representation of the original raw value. For convenience, we always store the original raw value as `String` in a different attribute.

The deserialized object structure:

```
{
  key: "String"
  rawValue: "String"
  value: {}
}
```

### When is the offset committed? What happens if the Connector execution fails?

The following outcomes are possible:

- If Connector execution is successful and **Activation condition** was met, the offset is committed.
- If **Activation condition** was not met, the offset is also committed to prevent consuming the same message twice.
- If Connector execution fails due to an unexpected error (e.g. Zeebe is unavailable), the offset is not committed.

### What lifecycle does the Kafka Consumer Connector have?

The Kafka Consumer Connector is a long-running Connector that is activated when the process is deployed and deactivated when the process is un-deployed or overwritten by a new version.

</TabItem>

</Tabs>
