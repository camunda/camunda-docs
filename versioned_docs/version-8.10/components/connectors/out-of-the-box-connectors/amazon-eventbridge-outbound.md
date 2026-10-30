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

The **Amazon EventBridge connector** is an outbound connector that integrates your BPMN service with [Amazon EventBridge](https://aws.amazon.com/eventbridge/). Use it to send events from your processes to an event bus, where rules can route them to other AWS services. It provides event-driven integration within your business processes. For example, use it to publish an order-created event that triggers a fulfillment rule in EventBridge.

To start a process instance from an Amazon EventBridge event instead, see the [Amazon EventBridge Webhook connector](./amazon-eventbridge-inbound.md).

For more information, refer to the [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/index.html).

## Prerequisites

To use the **Amazon EventBridge connector**, you need:

- An AWS account with permission to send events to EventBridge. Refer to the [AWS documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/auth-and-access-control-eventbridge.html) for more information.
- An access key and secret key of a user with the appropriate permissions.

:::note
Use secrets to avoid exposing your AWS IAM credentials as plain text. Refer to our documentation on [managing secrets](/components/saas/clusters/manage-secrets.md) to learn more.
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

| Property       | Type          | Required                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Example |
| :------------- | :------------ | :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| AWS credential | Configuration | No                                            | Select a saved AWS credential with an optional default region, or enter the authentication details and a region in the fields below. Learn more about [credentials](/components/hub/organization/credentials/index.md).                                                                                                                                                                                                                                                                                                                                                                                                                                              |         |
| Authentication | Dropdown      | Yes, if no AWS credential is set              | <p>The AWS authentication strategy:</p><ul><li><p>**Credentials** (SaaS/Self-Managed): Use this option if you have a pair of access and secret keys from your AWS account administrator.</p></li><li><p>**Default Credentials Chain (Hybrid/Self-Managed only)**: Use this option if your system relies on implicit authentication, such as role-based authentication, credentials supplied through environment variables, or files on the target host. It uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve credentials.</p></li></ul>Shown when no AWS credential is selected. |         |
| Access key     | String        | Yes, if **Authentication** is **Credentials** | The IAM access key of a user with the permissions to send events to Amazon EventBridge. Shown when no AWS credential is selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |         |
| Secret key     | String        | Yes, if **Authentication** is **Credentials** | The IAM secret key of the user with the access key above. Shown when no AWS credential is selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |         |

### Region

| Property | Type   | Required                                     | Description                                                                                                | Example |
| :------- | :----- | :------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :------ |
| Region   | String | Yes, if no AWS credential is set             | The AWS region where your EventBridge resides.                                                             |         |
| Region   | String | Yes, if the credential has no default region | Overrides the default region of the selected AWS credential. Shown when an **AWS credential** is selected. |         |

## Operations

### Send event

Send an event to an Amazon EventBridge event bus.

#### Input parameters

| Property       | Type   | Required | Description                                                                                                                                                                                                  | Example |
| :------------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Event bus name | Text   | Yes      | The name of the destination event bus. Refer to the [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-event-bus.html) for more details on event buses.   |         |
| Source         | String | Yes      | The value that identifies the service that generated the event. Refer to the [Amazon documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-events-structure.html) for more information. |         |
| Detail type    | String | Yes      | The type of event being sent. Refer to the [Amazon documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-events-structure.html) for more information.                                   |         |
| Event payload  | String | Yes      | A JSON object that contains information about the event.                                                                                                                                                     |         |

#### Output

The connector returns the [original response](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutEvents.html) from the Amazon EventBridge service, including the `sdkResponseMetadata` and `sdkHttpMetadata`. Example response:

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

<ErrorHandling />

## Further resources

- [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/)
- [Amazon EventBridge Webhook connector](./amazon-eventbridge-inbound.md)
- [Available connectors](./available-connectors-overview.md)
