---
id: aws-eventbridge
title: Amazon EventBridge Connector
description: Send events to AWS EventBridge from your BPMN process.
---

The **AWS EventBridge Connector** integrates your BPMN service with [Amazon EventBridge](https://aws.amazon.com/eventbridge/), enabling the sending of events from your workflows for further processing or routing to other AWS services. It provides seamless event-driven integration within your business processes.

For more information, refer to the [AWS EventBridge documentation](https://docs.aws.amazon.com/eventbridge/index.html).

## Prerequisites

Before using the **Amazon EventBridge Connector**, ensure you have the necessary permissions in your AWS account to send events to EventBridge. You will need an access key and secret key of a user with the appropriate permissions. Refer to the [AWS documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/auth-and-access-control-eventbridge.html) for more information.

:::note
It is highly recommended not to expose your AWS IAM credentials as plain text. Instead, use Camunda secrets. Refer to our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Amazon EventBridge Connector task

To use the **Amazon EventBridge Connector** in your process, you can either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task by using the **Append Connector** context menu. Refer to our [guide on using Connectors](/components/connectors/use-connectors/index.md) to learn more.

## Configure the Amazon EventBridge Connector

Follow these steps to configure the Amazon EventBridge Connector:

1. In the **Authentication** section, enter the relevant IAM key and secret pair of the user with permissions to send events to [AWS EventBridge](https://aws.amazon.com/eventbridge).
2. In the **Configuration** section, specify the AWS region where your EventBridge resides.
3. In the **Event Details** section, provide the following information:
   - **Event bus name**: Enter the name of the destination event bus. Refer to the [AWS EventBridge documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-event-bus.html) for more details on event buses.
   - **Source**: Enter the value that identifies the service that generated the event.
   - **Detail type**: Enter the type of event being sent. Refer to the [official documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-events-structure.html) for more information on these properties.
4. In the **Event Payload** section, enter a JSON object that contains information about the event.
5. (Optional) In the **Output Mapping** section, you can set a **Result variable** or **Result expression**. Refer to the [response mapping documentation](/docs/components/connectors/use-connectors/index.md#response-mapping) to learn more.
6. (Optional) In the **Error Handling** section, define the **Error expression** to handle errors that may occur during the event sending process. Refer to the [response mapping documentation](/docs/components/connectors/use-connectors/index.md#bpmn-errors) to learn more.

## Amazon EventBridge Connector response

The **Amazon EventBridge Connector** returns the [original response](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutEvents.html) from the Amazon EventBridge service, including the **sdkResponseMetadata** and **sdkHttpMetadata**. Here is an example of the response:

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

## Next steps

- [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/)
- Learn about [other Connectors available](./available-connectors-overview.md) in Camunda to integrate with different systems and services.
- Learn more about using Connectors [here](../use-connectors/index.md).
