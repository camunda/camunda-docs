---
id: aws-lambda
title: AWS Lambda Connector
sidebar_label: AWS Lambda
description: Invoke AWS Lambda functions with an outbound Connector.
---

The **AWS Lambda Connector** is an outbound Connector that allows you to connect your BPMN service with Amazon Web Service's [AWS Lambda Service](https://aws.amazon.com/lambda/) to invoke [AWS Lambda functions](https://aws.amazon.com/lambda/).

## Prerequisites

To use an **AWS Lambda Connector**, you need to have an [AWS Lambda Function](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html), IAM key, and secret pair with permissions for execute function. Refer to the [AWS Lambda developer guide](https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html) to learn more.

:::note
Use Camunda secrets to avoid exposing your AWS IAM credentials as plain text. Refer to [managing secrets](components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an AWS Lambda Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Invoking your AWS Lambda function

To make the **AWS Lambda Connector** executable, fill out the mandatory fields highlighted in red in the properties panel on the right side of the screen:

1. Choose an applicable authentication type from the **Authentication** dropdown. Learn more about authentication types in the related [appendix entry](#aws-authentication-types).
2. Set the relevant IAM key and secret pair in the **Authentication** section. For example, `{{secrets.MY_AWS_ACCESS_KEY}}`. The value can be plain text, but this is not recommended due to security concerns.
3. Set the relevant AWS region in the **Authentication** section. Refer to the [Regions and Zones](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) to learn more.
4. In the **Select Operation** section, the default option is set to synchronous invocation; an asynchronous invocation option is currently not available. Refer to [event-driven invocation](https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html#event-driven-invocation) to learn more.
5. In the **Operation Details** section, fill out the field **Function name**. This field can be a [function URL](https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html?icmpid=docs_lambda_help), [function ARN](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html), function name, or alias.
6. (Optional) The **Payload** field in the **Operation Details** section is optional. This field requires FEEL input. Payload must be in JSON format as this is the data that will be processed by your Lambda function.

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

## Appendix

### AWS authentication types

There are two options to authenticate the Connector with AWS:

- Choose **Credentials** in the **Authentication** dropdown if you have a valid pair of access and secret keys provided by your AWS account administrator. This option is applicable for both SaaS and Self-Managed users.
- Choose **Default Credentials Chain (Hybrid/Self-Managed only)** in the **Authentication** dropdown if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This option is applicable only for Self-Managed or hybrid distribution. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.
