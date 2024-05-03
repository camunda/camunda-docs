---
id: amazon-sagemaker
sidebar_label: AWS SageMaker Connector
title: Amazon SageMaker Connector
description: Interact with AWS SageMaker from your BPMN process.
---

The **AWS SageMaker Connector** is an outbound Connector that allows you to interact with
[AWS SageMaker](https://aws.amazon.com/sagemaker/) from your BPMN.

## Prerequisites

To use the **AWS SageMaker Connector**, you need to have an AWS account with an access key and secret key to
execute [`InvokeEndpoint`](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpoint.html) or
[`InvokeEndpointAsync`](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpointAsync.html) actions.

The necessary endpoint have to be deployed beforehand and point to operational model.

Learn more on how to deploy real-time and asynchronous models at the [official SageMaker documentation page](https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-deployment.html).

:::note
Use Camunda secrets to store credentials, so you don't expose sensitive information directly from the process. Refer to [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an AWS SageMaker Connector task

To use the **AWS SageMaker Connector** in your process, either change the type of existing task by clicking on it
and using the wrench-shaped **Change type** context menu icon, or create a new Connector task using the
**Append Connector** context menu. Follow our [guide on using Connectors](/components/connectors/use-connectors/index.md) to learn more.

## Make your AWS SageMaker Connector executable

To work with the **AWS SageMaker Connector**, fill all mandatory fields.

## Authentication

Choose an applicable authentication type from the **Authentication** dropdown. Learn more about authentication types in the related [appendix entry](#aws-authentication-types).

If you select **Credentials** to access the **AWS SageMaker Connector**, the Connector requires the appropriate credentials. The following authentication options are available:

- **Access key**: Provide an access key of a user with permissions to the AWS SageMaker `InvokeEndpoint` and/or `InvokeEndpointAsync` actions.
- **Secret key**: Provide the secret key of the user with the access key provided above.

The **Access Key** and the **Secret Key** are required properties and must be provided to use the Connector.

For more information on authentication and security in AWS SageMaker, refer to the [AWS Knowledge Center post](https://repost.aws/knowledge-center/sagemaker-minimum-permissions).

## Region

In the **Region** field write the region of the deployed endpoint.

## Inference type

Learn more about inferences at the [official AWS SageMaker documentation page](https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html).

### Real-time

Make sure you deployed your model with a real-time endpoint.

- In the **Inference type** field, select **Real-time**.
- In the **Endpoint name** field enter your deployed real-time endpoint name.
- In the **Payload** field enter data that is required by your deployed model.
- In the **Content type** field, enter the content type of the input. Please be aware that the **AWS SageMaker Connector**
  currently supports only JSON-like content types.
- In the **Accept** field enter the content type of the return value.
- Fill the other fields as described at the [official documentation page](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpoint.html).

### Asynchronous

- In the **Inference type** field, select **Asynchronous**.
- In the **Endpoint name** field enter your deployed asynchronous endpoint name.
- In the **Input location** field enter an S3 URL where the inference payload is stored.
- In the **Content type** field, enter the content type of the input. Unlike the real-time, this inference supports
  any kind of content type.
- In the **Accept** field enter the content type of the return value.
- Fill the other fields as described at the [official documentation page](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpointAsync.html).

## Handle Connector response

## AWS SageMaker Connector response

The response of the **AWS SageMaker Connector** depends on the model deployed and an inference type.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables.

### Real-time inference response

The response of the real-time inference depends on your model deployed.
Please refer to the [official AWS SageMaker documentation page](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpoint.html#API_runtime_InvokeEndpoint_ResponseElements)
to learn more.

### Asynchronous inference response

The response of the real-time inference depends on your model deployed.
Please refer to the [official AWS SageMaker documentation page](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpointAsync.html#API_runtime_InvokeEndpointAsync_ResponseElements)
to learn more.

## Appendix

### AWS authentication types

There are two options to authenticate the Connector with AWS:

- Choose **Credentials** in the **Authentication** dropdown if you have a valid pair of access and secret keys provided by your AWS account administrator. This option is applicable for both SaaS and Self-Managed users.
- Choose **Default Credentials Chain (Hybrid/Self-Managed only)** in the **Authentication** dropdown if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This option is applicable only for Self-Managed or hybrid distribution. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.
