---
id: aws-lambda
title: AWS Lambda connector
sidebar_label: AWS Lambda
description: Invoke AWS Lambda functions with an outbound connector.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Invoke an [AWS Lambda](https://aws.amazon.com/lambda/) function from your BPMN process and use its response in later steps.

## About this connector

The **AWS Lambda connector** is an outbound connector that connects your BPMN service with the [AWS Lambda service](https://aws.amazon.com/lambda/). Use it to run serverless code, such as a calculation or a call into another AWS service, as part of a process, and to pass JSON data to the function and receive its result.

The connector supports synchronous invocation only. It waits for the function to finish and returns its response. Asynchronous (event-driven) invocation isn't available.

## Prerequisites

To use the AWS Lambda connector, you need the following:

| Prerequisite                                                                                         | Description                                                                                                                                                                            |
| :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AWS Lambda function](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)                     | A deployed function you want to invoke.                                                                                                                                                |
| [AWS IAM user and permissions](https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html) | An IAM access key and secret key pair with permission to run the function. Not required if you use the default credentials chain (hybrid/Self-Managed only) or a saved AWS credential. |

:::note
Use secrets to avoid exposing your AWS IAM credentials as plain text. Refer to [managing secrets](/components/saas/clusters/manage-secrets.md) to learn more.
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

Select an authentication method for the connector. Learn more about the available options in [AWS authentication types](#aws-authentication-types).

| Property       | Type          | Required | Description                                                                                                                                                                                                                                                       | Example                         |
| :------------- | :------------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| AWS credential | Configuration | No       | Select a saved AWS credential, which can include a default region. When you select a credential, the **Authentication**, **Access key**, and **Secret key** fields are hidden. Learn more about [credentials](/components/hub/organization/credentials/index.md). |                                 |
| Authentication | Dropdown      | Yes      | The AWS authentication strategy: **Credentials**, or **Default Credentials Chain (Hybrid/Self-Managed only)**. Shown when no AWS credential is selected.                                                                                                          | **Credentials**                 |
| Access key     | String        | Yes      | IAM access key of a user with the necessary permissions for this connector. Shown when **Authentication** is **Credentials** and no AWS credential is selected.                                                                                                   | `{{secrets.MY_AWS_ACCESS_KEY}}` |
| Secret key     | String        | Yes      | IAM secret key of a user with the necessary permissions for this connector. Shown when **Authentication** is **Credentials** and no AWS credential is selected.                                                                                                   | `{{secrets.MY_AWS_SECRET_KEY}}` |

### Region

| Property | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                            | Example     |
| :------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| Region   | String | Yes      | The AWS region where your function is hosted. Refer to [Regions and Zones](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) to learn more. When you select an AWS credential, this field is optional: it overrides the credential's default region, and is required if the credential has no default region. | `us-east-1` |

### AWS authentication types

You can authenticate the connector with AWS in the following ways:

- **Credentials**: Use this option if your AWS account administrator provided a pair of access and secret keys. It applies to SaaS and Self-Managed.
- **Default Credentials Chain (Hybrid/Self-Managed only)**: Use this option if your system relies on an implicit authentication mechanism, such as role-based authentication, credentials supplied through environment variables, or files on the target host. It applies only to Self-Managed or hybrid distributions, and uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve credentials.
- **AWS credential**: Select a saved credential instead of entering authentication details on the task.

## Operations

### Invoke function

Invoke an AWS Lambda function synchronously and return its response.

#### Input parameters

| Property       | Type     | Required | Description                                                                                                                 | Example                    |
| :------------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| Operation type | Dropdown | Yes      | The invocation type. **Invoke function (sync)** is the only option.                                                         | **Invoke function (sync)** |
| Function name  | String   | Yes      | The name, [ARN](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html), or alias of your function.     | `my-function`              |
| Payload        | Text     | Yes      | The JSON input passed to your Lambda function when it is invoked. Use a FEEL expression to build it from process variables. | `= { "orderId": orderId }` |

#### Output

The connector returns an object with the following fields:

| Field             | Description                                                                                                                                                                                                |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `statusCode`      | The HTTP status code returned by the AWS Lambda Invoke API. It shows whether AWS Lambda accepted and handled the invocation request, not whether the function itself succeeded.                            |
| `executedVersion` | The version of the Lambda function that ran.                                                                                                                                                               |
| `payload`         | The response returned by the Lambda function, or an error object. If your function returns its own `statusCode`, that value describes the function result and is separate from the top-level `statusCode`. |

For example, for a function that returns an order status:

```json
{
  "statusCode": 200,
  "executedVersion": "$LATEST",
  "payload": {
    "orderId": "1001",
    "status": "shipped"
  }
}
```

To read a `statusCode` that your function returns, use `response.payload.statusCode` rather than `response.statusCode`.

To map the response into process variables, use **Result variable** to store the whole response, or **Result expression** to map individual fields:

```feel
= {
  "myNewReportStatusCode": response.statusCode,
  "myNewReportExecutedVersion": response.executedVersion,
  "myNewReportPayload": response.payload
}
```

## Troubleshooting

<ErrorHandling />

## Further resources

- [AWS Lambda developer guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
