---
id: amazon-eventbridge-outbound
sidebar_label: AWS EventBridge outbound
title: Amazon EventBridge connector
description: Send events to Amazon EventBridge from your BPMN process.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Send events from your BPMN process to [Amazon EventBridge](https://aws.amazon.com/eventbridge/) for further processing or routing to other AWS services.

## About this connector

The **Amazon EventBridge connector** is an outbound connector that integrates your BPMN service with Amazon EventBridge. It provides event-driven integration within your business processes by sending an event to an event bus.

To start a process instance from an event in Amazon EventBridge, see the [Amazon EventBridge Webhook connector](./amazon-eventbridge-inbound.md).

For more information, refer to the [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/index.html).

## Prerequisites

Before using the **Amazon EventBridge connector**, ensure you have the necessary permissions in your AWS account to send events to EventBridge. You need an access key and secret key of a user with the appropriate permissions. Refer to the [AWS documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/auth-and-access-control-eventbridge.html) for more information.

:::note
Use Camunda secrets to avoid exposing your AWS IAM credentials as plain text. Refer to our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

| Property       | Type     | Required                                      | Description                                                                                                                                            | Example |
| :------------- | :------- | :-------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Authentication | Dropdown | Yes                                           | The AWS authentication strategy: **Credentials**, or **Default Credentials Chain (Hybrid/Self-Managed only)**. **Credentials** is selected by default. |         |
| Access key     | String   | Yes, if **Authentication** is **Credentials** | The access key of an IAM user with permissions to send events to [Amazon EventBridge](https://aws.amazon.com/eventbridge).                             |         |
| Secret key     | String   | Yes, if **Authentication** is **Credentials** | The secret key of the IAM user with the access key above.                                                                                              |         |

#### AWS authentication types

There are two options to authenticate the connector with AWS:

- Choose **Credentials** in the **Authentication** dropdown if you have a valid pair of access and secret keys provided by your AWS account administrator. This option is applicable for both SaaS and Self-Managed users.
- Choose **Default Credentials Chain (Hybrid/Self-Managed only)** in the **Authentication** dropdown if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This option is applicable only for Self-Managed or hybrid distribution. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.

### Region

| Property | Type   | Required | Description                                              | Example |
| :------- | :----- | :------- | :------------------------------------------------------- | :------ |
| Region   | String | Yes      | The AWS region where your EventBridge event bus resides. |         |

## Operations

### Send event

Send an event to an Amazon EventBridge event bus.

#### Input parameters

| Property       | Type   | Required | Description                                                                                                                                                                                                  | Example |
| :------------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Source         | String | Yes      | The value that identifies the service that generated the event.                                                                                                                                              |         |
| Detail type    | String | Yes      | The type of event being sent. Refer to the [Amazon documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-events-structure.html) for more information on **Source** and **Detail type**. |         |
| Event bus name | Text   | Yes      | The name of the destination event bus. Refer to the [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-event-bus.html) for more details on event buses.   |         |
| Event payload  | String | Yes      | A JSON object that contains information about the event.                                                                                                                                                     |         |

#### Output

The connector returns the [original response](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutEvents.html) from the Amazon EventBridge service, including the `sdkResponseMetadata` and `sdkHttpMetadata`. Here is an example of the response:

```json
{
  "sdkResponseMetadata": {
    "requestId": "766647a2-835a-418b-9161-94245d0c93a3"
  },
  "sdkHttpMetadata": {
    "httpHeaders": {
      "Content-Length": "85",
      "Content-Type": "application/x-amz-json-1.1",
      "Date": "Fri, 23 Jun 2023 08:39:22 GMT",
      "x-amzn-RequestId": "766647a2-835a-418b-9161-94245d0c93a3"
    },
    "httpStatusCode": 200,
    "allHttpHeaders": {
      "x-amzn-RequestId": ["766647a2-835a-418b-9161-94245d0c93a3"],
      "Content-Length": ["85"],
      "Date": ["Fri, 23 Jun 2023 08:39:22 GMT"],
      "Content-Type": ["application/x-amz-json-1.1"]
    }
  },
  "failedEntryCount": 0,
  "entries": [
    {
      "eventId": "bb86b1af-9abb-0f8e-28c2-c69c24c35e05",
      "errorCode": null,
      "errorMessage": null
    }
  ]
}
```

To map the response into process variables, use **Result variable** to store the whole response, or **Result expression** to map individual fields, for example `= { "eventId": response.entries[1].eventId }`.

<ErrorHandling />

## Further resources

- [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/)
- Learn about [other connectors available](./available-connectors-overview.md) in Camunda to integrate with different systems and services.
- Learn more about [using connectors](../use-connectors/index.md).
