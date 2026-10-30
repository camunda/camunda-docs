---
id: amazon-eventbridge-outbound
sidebar_label: AWS EventBridge outbound
title: Amazon EventBridge connector
description: Send events to Amazon EventBridge from your BPMN process.
---

import ConnectorTask from '../../../components/react-components/connector-task.md'

Use the Amazon EventBridge connector to send events from your BPMN process to an [Amazon EventBridge](https://aws.amazon.com/eventbridge/) event bus.

## About this connector

The **Amazon EventBridge connector** is an outbound connector that integrates your BPMN service with Amazon EventBridge. Use it to send events from your process for further processing or routing to other AWS services, for example to build event-driven integrations within your business processes.

To receive events from Amazon EventBridge in a process, use the [Amazon EventBridge Webhook connector](./amazon-eventbridge-inbound.md).

## Prerequisites

To use the **Amazon EventBridge connector**, you need an AWS account with permission to send events to EventBridge. You need an access key and secret key of a user with the appropriate permissions, unless you use the default credentials chain (hybrid/Self-Managed only). See the [AWS documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/auth-and-access-control-eventbridge.html) for more information.

:::note
Use Camunda secrets to avoid exposing your AWS IAM credentials as plain text. Refer to [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Amazon EventBridge connector task

<ConnectorTask/>

## Configuration

### Authentication

Choose an authentication type. Learn more in [AWS authentication types](#aws-authentication-types).

| Property       | Type     | Required                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Example |
| :------------- | :------- | :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Authentication | Dropdown | Yes                                           | <p>The AWS authentication strategy:</p><ul><li><p>**Credentials** (SaaS/Self-Managed): Use this option if you have a pair of access and secret keys from your AWS account administrator.</p></li><li><p>**Default Credentials Chain (Hybrid/Self-Managed only)**: Use this option if your system relies on implicit authentication, such as role-based authentication, credentials supplied through environment variables, or files on the target host. It uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve credentials.</p></li></ul>Shown when no AWS credential is selected. |         |
| Access key     | String   | Yes, if **Authentication** is **Credentials** | The IAM access key of a user with the necessary permissions for this connector.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |         |
| Secret key     | String   | Yes, if **Authentication** is **Credentials** | The IAM secret key of a user with the necessary permissions for this connector.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |         |

#### AWS authentication types

There are two options to authenticate the connector with AWS:

- **Credentials**: Use this option if you have a valid pair of access and secret keys provided by your AWS account administrator. This option is available for SaaS and Self-Managed.
- **Default Credentials Chain (Hybrid/Self-Managed only)**: Use this option if your system is configured for implicit authentication, such as role-based authentication, credentials supplied through environment variables, or files on the target host. This option is available for Self-Managed and hybrid distributions only. It uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve the required credentials.

### Region

| Property | Type   | Required | Description                                           | Example |
| :------- | :----- | :------- | :---------------------------------------------------- | :------ |
| Region   | String | Yes      | The AWS region where your Amazon EventBridge resides. |         |

## Operations

### Send event

Send an event to an Amazon EventBridge event bus.

#### Input parameters

Set these properties in the **Event Details** and **Event Payload** sections of the properties panel.

| Property       | Type   | Required | Description                                                                                                                                                                                       | Example |
| :------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------ |
| Source         | String | Yes      | The value that identifies the service that generated the event. See the [Amazon EventBridge event structure](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-events-structure.html).  |         |
| Detail type    | String | Yes      | The type of event being sent. See the [Amazon EventBridge event structure](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-events-structure.html).                                    |         |
| Event bus name | Text   | Yes      | The name of the destination event bus. Learn more about event buses in the [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-event-bus.html). |         |
| Event payload  | String | Yes      | The payload of the event, provided as a JSON object that contains information about the event.                                                                                                    |         |

#### Output

The connector returns the [response](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutEvents.html) of the Amazon EventBridge `PutEvents` call converted to JSON. In this version, the connector returns an empty object (`{}`), because the AWS SDK response object doesn't expose any properties for the JSON conversion:

```json
{}
```

Use **Result variable** or **Result expression** to store the response. Learn more about [response mapping](/components/connectors/use-connectors/index.md#variableresponse-mapping).

## Troubleshooting

To handle errors from the connector, define an **Error expression** in the **Error handling** section of the properties panel. Learn more about [BPMN errors and failing jobs](/components/connectors/use-connectors/index.md#bpmn-errors).

## Further resources

- [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/)
- [Other connectors available](./available-connectors-overview.md) in Camunda
- [Using connectors](../use-connectors/index.md)
