---
id: aws-lambda
title: AWS Lambda Connector
description: Invoke AWS Lambda function.
---

The **AWS Lambda Connector** allows you to connect your BPMN service with Amazon Web Service's [AWS Lambda Service](https://aws.amazon.com/lambda/).

## Prerequisites

To use an **AWS Lambda Connector**, you need to have an [AWS Lambda Function](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html), IAM key, and secret pair with permissions for execute function. See the [AWS Lambda developer guide](https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html) to learn more.

:::note
It is highly recommended to not expose your AWS IAM credentials as plain text and instead use Camunda secrets. See [manage secrets](../img/connectors-aws-lambda-filled.png) to learn more.
:::

## Create an AWS Lambda Connector task

To use an **AWS Lambda Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task by using the **Append Connector** context menu. Follow our [guide on using Connectors](../use-connectors.md) to learn more.

## Invoking your AWS Lambda function

To make the **AWS Lambda Connector** executable, fill out the mandatory fields highlighted in red in the properties panel:

![AWS Lambda Filled](../img/connectors-aws-lambda-filled.png)

1. Set the relevant IAM key and secret pair in the **Authentication** section. For example, `secrets.MY_AWS_ACCESS_KEY`. The value can be plain text, but this is not recommended due to security concerns.
2. Set the relevant AWS region in the **Authentication** section. See the [Regions and Zones](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) to learn more.
3. In the **Select Operation** section, the default option is set to synchronous invocation; an asynchronous invocation
   option is currently not available.
   See [event-driven invocation](https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html#event-driven-invocation)
   to learn more.
4. In the **Operation Details** section, fill out the field **Function name**. This field can be a [function URL](https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html?icmpid=docs_lambda_help), [function ARN](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html), function name, or alias.
5. (Optional) The **Payload** field in the **Operation Details** section is optional. This field requires FEEL input. Payload must be in JSON format as this is the data that will be processed by your Lambda function.

## AWS Lambda Connector response

The **AWS Lambda Connector** returns the HTTP status code, executed version, and payload (the response from the function, or an error object).
The following fields are available in the response variable:

- `statusCode` - HTTP status code.
- `executedVersion` - Executed version of the Lambda function.
- `payload` - The response from the function, or an error object.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. For example:

```
= {
  "myNewReportStatusCode": response.statusCode,
  "myNewReportExecutedVersion": response.executedVersion,
  "myNewReportPayload": response.payload
}
```
