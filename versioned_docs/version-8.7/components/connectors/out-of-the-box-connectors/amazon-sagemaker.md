---
id: amazon-sagemaker
sidebar_label: AWS SageMaker
title: Amazon SageMaker Connector
description: Interact with the Amazon SageMaker Connector from your BPMN process.
---

:::info
The **Amazon SageMaker Connector** is available for `8.6.0-alpha2` or later.
:::

The **Amazon SageMaker Connector** is an outbound Connector that allows you to interact with
[Amazon SageMaker](https://aws.amazon.com/sagemaker/) from your BPMN process.

## Prerequisites

To use the **Amazon SageMaker Connector**, you need to have an AWS account with an access key and secret key to
execute [`InvokeEndpoint`](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpoint.html) or
[`InvokeEndpointAsync`](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpointAsync.html) actions.

The necessary endpoints must be deployed beforehand and point to the operational model.

Learn more on how to deploy real-time and asynchronous models in the [official SageMaker documentation](https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-deployment.html).

:::note
Use Camunda secrets to store credentials and avoid exposing sensitive information directly from the process. Refer to [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Amazon SageMaker Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Amazon SageMaker Connector executable

To work with the **Amazon SageMaker Connector**, fill all mandatory fields.

## Authentication

Choose an applicable authentication type from the **Authentication** dropdown. Learn more about authentication types in the related [appendix entry](#aws-authentication-types).

If you select **Credentials** to access the **Amazon SageMaker Connector**, the Connector requires the appropriate credentials. The following authentication options are available:

- **Access key**: Provide an access key of a user with permissions to the Amazon SageMaker `InvokeEndpoint` and/or `InvokeEndpointAsync` actions.
- **Secret key**: Provide the secret key of the user with the access key provided above.

The **Access Key** and the **Secret Key** are required properties and must be provided to use the Connector.

For more information on authentication and security in Amazon SageMaker, refer to the [AWS Knowledge Center post](https://repost.aws/knowledge-center/sagemaker-minimum-permissions).

## Region

In the **Region** field write the region of the deployed endpoint.

## Inference type

Learn more about inferences at the [official Amazon SageMaker documentation page](https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html).

### Real-time

Ensure you deployed your model with a real-time endpoint.

- In the **Inference type** field, select **Real-time**.
- In the **Endpoint name** field, enter your deployed real-time endpoint name.
- In the **Payload** field, enter data that is required by your deployed model.
- In the **Content type** field, enter the content type of the input. Be aware that the **Amazon SageMaker Connector** currently supports only JSON-like content types.
- In the **Accept** field, enter the content type of the return value.
- Fill in the other fields as described in the [SageMaker documentation](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpoint.html).

### Asynchronous

- In the **Inference type** field, select **Asynchronous**.
- In the **Endpoint name** field, enter your deployed asynchronous endpoint name.
- In the **Input location** field, enter an S3 URL where the inference payload is stored.
- In the **Content type** field, enter the content type of the input. Unlike the real-time, this inference supports any kind of content type.
- In the **Accept** field, enter the content type of the return value.
- Fill in the other fields as described in the [SageMaker documentation](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpointAsync.html).

## Handle Connector response

## Amazon SageMaker Connector response

The response of the **Amazon SageMaker Connector** depends on the model deployed and an inference type.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables.

### Real-time inference response

The response of the real-time inference depends on your model deployed.
Refer to the [Amazon SageMaker documentation](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpoint.html#API_runtime_InvokeEndpoint_ResponseElements)
to learn more.

### Asynchronous inference response

The response of the real-time inference depends on your model deployed.
Refer to the [AWS SageMaker documentation](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpointAsync.html#API_runtime_InvokeEndpointAsync_ResponseElements)
to learn more.

## AWS authentication types

There are two options to authenticate the Connector with AWS:

- Choose **Credentials** in the **Authentication** dropdown if you have a valid pair of access and secret keys provided by your AWS account administrator. This option is applicable for both SaaS and Self-Managed users.
- Choose **Default Credentials Chain (Hybrid/Self-Managed only)** in the **Authentication** dropdown if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This option is applicable only for Self-Managed or hybrid distribution. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.
