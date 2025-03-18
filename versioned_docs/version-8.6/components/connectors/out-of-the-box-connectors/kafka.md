---
id: kafka
title: Kafka Connector
sidebar_label: Kafka
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

The **Kafka Producer Connector** is an outbound Connector that allows you to connect your BPMN service with [Apache Kafka](https://kafka.apache.org/) to produce messages.

## Prerequisites

To use the **Kafka Producer Connector**, you must have a Kafka instance with a configured bootstrap server.

:::note
Use Camunda secrets to avoid exposing your sensitive data as plain text. To learn more, see [managing secrets](/components/console/manage-clusters/manage-secrets.md).
:::

## Create a Kafka Producer Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Kafka Producer Connector for publishing messages executable

To make your **Kafka Producer Connector** for publishing messages executable, complete the following sections.

### Authentication

(Optional) Set the relevant credentials in the **Authentication** section. For example, `{{secrets.MY_KAFKA_USERNAME}}`.

### Schema

In the **Kafka** section:

1. Select the schema strategy for your messages.
   - Select **No schema**, **Inline schema** for Avro serialization.
   - Select **Schema registry** if you have a Confluent Schema Registry.
2. Set the URL of the bootstrap server(s). If more than one server is required, use comma-separated values.
3. Set the topic name.
4. (Optional) Set producer configuration values in the **Headers** field. Only `UTF-8` strings are supported as header values.
5. (Optional) Set producer configuration values in the **Additional properties** field.

:::info

The [appendix](#appendix-and-faq) provides more information about:

- [Kafka secure authentication](#what-mechanism-is-used-to-authenticate-against-kafka).
- [Inline schema](#inline-schema) and [Schema registry](#schema-registry).
- [Pre-configured producer configuration values](#what-are-default-kafka-producer-client-properties) for this Connector.

Additionally, to learn more about supported producer configurations, see the [official Kafka documentation](https://kafka.apache.org/documentation/#producerconfigs).

:::

### Message

In the **Message** section, set the **Key** and the **Value** that will be sent to Kafka topic.

## Schema strategies

:::caution
Use Schema strategies with caution, as this is an [alpha feature](/components/early-access/alpha/alpha-features.md). Functionality may not be comprehensive and could change.
:::

This Connector supports different schema strategies, offering a compact, fast, and binary data exchange format for Kafka messages.

When using a schema strategy, each message is serialized according to a specific schema written in JSON format. This schema defines the Kafka message structure, ensuring the data conforms to a predefined format, and enables schema evolution strategies.

:::info

To learn more about Schema strategies, refer to the official documentation:

- [Inline Avro serialization](https://kafka.apache.org/documentation/#serialization) and [official Apache Avro documentation](https://avro.apache.org/docs/).
- [Confluent Schema Registry](https://docs.confluent.io/platform/current/schema-registry/index.html) (Avro, and JSON schemas).

:::

### No schema

Select **No schema** to send messages without a schema. This option is suitable for simple messages that do not require a schema.

### Inline schema

Select **Inline schema** to send messages with an **Avro schema**.

- This option is suitable for messages that require a schema and that are not (or do not need to be) registered in a schema registry.
- Enter the Avro schema that defines the message structure into the **Schema** field that appears in the **Message** section.

### Schema registry

Select **Schema registry** to send messages with a schema registered in a schema registry.

- This option is suitable for messages that require a schema and that are registered in a [schema registry](https://docs.confluent.io/platform/current/schema-registry/index.html).
- You must provide:
  - The **schema registry URL** in the **Kafka** section.
  - The **schema** itself (that defines the message structure) in the **Message** section.
  - The **credentials** for the schema registry (if required). Refer to the [Schema Registry documentation](https://docs.confluent.io/platform/current/schema-registry/sr-client-configs.html#basic-auth-credentials-source) for more information.

### Example Avro schema and data

The following is an example Avro schema and data:

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

- **Key**: `employee1`
- **Value**:

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

- `timestamp`: The timestamp of the message.
- `offset`: The message offset.
- `partition`: The message partition.
- `topic`: The topic name.

:::info
For more information on these fields, refer to the [official Kafka documentation](https://kafka.apache.org/documentation/#intro_concepts_and_terms).
:::

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. For example:

   ```
   = {
     "messageAcknowledgedAt": response.timestamp
   }
   ```

## Appendix and FAQ

### What mechanism is used to authenticate against Kafka?

If the fields **Username** and **Password** are not empty, by default the **Kafka Producer Connector** enables the credentials-based SASL SSL authentication and the following properties are set:

```
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule   required username='<Your Username>'   password='<Your Password>';
security.protocol=SASL_SSL
sasl.mechanism=PLAIN
```

If any of the fields are not populated, you must configure your security method for your Kafka configuration. You can do this using the **Additional properties** field.

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

The following example sets a new client property `client.id` and overrides the SASL mechanism to `SCRAM SHA-256` instead of plain text:

```
= {
  "client.id":"MyDemoClientId",
  "sasl.mechanism":"SCRAM-SHA-256"
}
```

</TabItem>

<TabItem value='inbound'>

The **Kafka Consumer Connector** allows you to consume messages by subscribing to [Kafka](https://kafka.apache.org/) topics and mapping them to your BPMN processes as start or intermediate events.

## Prerequisites

To use the **Kafka Consumer Connector**, you must have a Kafka instance with a configured bootstrap server.

:::note
Use Camunda secrets to avoid exposing your sensitive data as plain text. To learn more, see [managing secrets](/components/console/manage-clusters/manage-secrets.md).
:::

## Create a Kafka Consumer Connector event

1. Add a **Start Event** or an **Intermediate Event** to your BPMN diagram to get started.
2. Change its template to a Kafka Consumer.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the Kafka consumer.

## Configure your Kafka Consumer Connector

To make your **Kafka Consumer Connector** executable, fill in the required properties.

### Authentication

In the **Authentication** section, select the **Authentication type**. If you selected **Credentials** as the **Authentication type**, set the username and password.

:::note

- Use Camunda secrets to avoid exposing your sensitive data as plain text. To learn more, see [managing secrets](/components/console/manage-clusters/manage-secrets.md).
- To learn more about Kafka authentication, see [Kafka secure authentication](#what-mechanism-is-used-to-authenticate-against-kafka-1).

:::

### Kafka properties

In the **Kafka** section, you can configure the following properties:

- **Schema strategy**: Select the schema strategy for your messages.
  - Select **No schema**, **Inline schema** for Avro serialization.
  - Select **Schema registry** If you have a Confluent Schema Registry.
- **Bootstrap servers**: Set the URL of the bootstrap server(s). If more than one server is required, use comma-separated values.
- **Topic**: Set the topic name.
- **Additional properties**: Set producer configuration values.
- **Offsets**: Set the offsets for the partition. The number of offsets specified should match the number of partitions on the current topic.
- **Auto offset reset**: Set the strategy to use when there is no initial offset in Kafka or if the specified offsets do not exist on the server.

:::info

The [appendix](#appendix-and-faq-1) provides more information about [pre-configured consumer configuration values](#what-are-default-kafka-consumer-client-properties) for this Connector.

Additionally, to learn more about supported producer configurations, see the [official Kafka documentation](https://kafka.apache.org/documentation/#consumerconfigs).

:::

#### Example Avro schema and data

If the expected Kafka message looks like this:

- **Key**: `employee1`
- **Value**:

  ```json
  {
    "name": "John Doe",
    "age": 29,
    "emails": ["johndoe@example.com"]
  }
  ```

The corresponding Avro schema to describe this message's structure would be:

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

**Activation condition** is an optional FEEL expression field that allows for the fine-tuning of the Connector activation. This condition filters if the process step triggers when a Kafka message is consumed.

For example, `=(value.itemId = "a4f6j2")` only triggers the start event or continues the catch event if the Kafka message has a matching itemId in the incoming message payload. Leave this field empty to trigger your process every time.

:::danger
By default, this Connector does not commit the offset if the message cannot be processed. This includes cases where the activation condition is not met.
This means that if there is a message in the topic that cannot be processed due to an activation condition mismatch, the Kafka subscription will be stopped.

Follow the steps below to configure this behavior.
:::

To ignore messages that do not meet the activation condition and commit the offset, select the **Consume unmatched events** checkbox.

| **Consume unmatched events** checkbox | Activation condition | Outcome                                              |
| ------------------------------------- | -------------------- | ---------------------------------------------------- |
| Checked                               | Matched              | Connector is triggered, offsets are commited         |
| Unchecked                             | Matched              | Connector is triggered, offsets are commited         |
| Checked                               | Unmatched            | Connector is not triggered, offsets are commited     |
| Unchecked                             | Unmatched            | Connector is not triggered, offsets are not commited |

### Correlation

The **Correlation** section allows you to configure the message correlation parameters.

:::note
The **Correlation** section is not applicable for the plain **start event** element template of the Kafka Connector. Plain **start events** are triggered by process instance creation and do not rely on message correlation.
:::

#### Correlation key

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **message intermediate catch event**.
- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

For example, given that your correlation key is defined with `myCorrelationKey` process variable, and the incoming Kafka message contains `value:{correlationKey:myValue}`, your correlation key settings would be as follows:

- **Correlation key (process)**: `=myCorrelationKey`
- **Correlation key (payload)**: `=value.correlationKey`

You can also use the key of the message to accomplish this in the **Correlation key (payload)** field with `=key`.

:::info
To learn more about correlation keys, see [messages](../../../concepts/messages).
:::

#### Message ID expression

The **Message ID expression** is an optional field that allows you to extract the message ID from the incoming message. The message ID serves as a unique identifier for the message and is used for message correlation.
This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

In most cases, it is not necessary to configure the **Message ID expression**. However, it is useful if you want to ensure message deduplication or achieve a certain message correlation behavior.

:::info
To learn more about how message IDs influence message correlation, see [messages](../../../concepts/messages#message-correlation-overview).
:::

For example, if you want to set the message ID to the value of the `transactionId` field in the incoming message, you can configure the **Message ID expression** as follows:

```
= value.transactionId
```

#### Message TTL

The **Message TTL** is an optional field that allows you to set the time-to-live (TTL) for the correlated messages. TTL defines the time for which the message is buffered in Zeebe before being correlated to the process instance (if it can't be correlated immediately).
The value is specified as an ISO 8601 duration. For example, `PT1H` sets the TTL to one hour. Learn more about the TTL concept in Zeebe in the [message correlation guide](../../../concepts/messages#message-buffering).

### Deduplication

The **Deduplication** section allows you to configure the Connector deduplication parameters.

**Connector deduplication** is a mechanism in the Connector Runtime that determines how many Kafka subscriptions are created if there are multiple occurrences of the **Kafka Consumer Connector** in the BPMN diagram. This is not to be confused with **message deduplication**.

By default, the Connector runtime deduplicates Connectors based on properties, so that elements with the same subscription properties only result in one subscription.

:::info
To learn more about deduplication, see [deduplication](../use-connectors/inbound.md#connector-deduplication).
:::

To customize the deduplication behavior, select the **Manual mode** checkbox, and configure the custom deduplication ID.

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

When you click the **Deploy** button, your Kafka Consumer is activated and starts consuming messages from the specified topic.

## Appendix and FAQ

### What mechanism is used to authenticate against Kafka?

If you selected _Credentials_ as the **Authentication type** and the fields **Username** and **Password** are not empty, by default the **Kafka Consumer Connector** enables the credentials-based SASL SSL authentication, and sets the following properties:

```
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule   required username='<Your Username>'   password='<Your Password>';
security.protocol=SASL_SSL
sasl.mechanism=PLAIN
```

If any of the field is not populated, you must configure your security method for your Kafka configuration. You can do this using the **Additional properties** field.

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

As Kafka messages usually use JSON format, we first try to deserialize it as a `JsonElement`. If this fails (for example, because of a wrong format) we use the `String` representation of the original raw value. For convenience, we always store the original raw value as `String` in a different attribute.

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

- If the Connector execution is successful and the **Activation condition** was met, the offset is committed.
- If the **Activation condition** was not met, the offset is also committed to prevent consuming the same message twice.
- If the Connector execution fails due to an unexpected error (for example, Zeebe is unavailable), the offset is not committed.

### What lifecycle does the Kafka Consumer Connector have?

The Kafka Consumer Connector is a long-running Connector that is activated when the process is deployed, and deactivated when the process is undeployed or overwritten by a new version.

</TabItem>

</Tabs>
