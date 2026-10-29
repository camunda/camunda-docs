---
id: amazon-sagemaker
sidebar_label: AWS SageMaker
title: Amazon SageMaker connector
description: Run real-time and asynchronous inferences on models deployed in Amazon SageMaker from your BPMN process.
---

import ConnectorTask from '../../../components/react-components/connector-task.md'

Invoke a model deployed in [Amazon SageMaker](https://aws.amazon.com/sagemaker/) from your BPMN process and use the inference result in later steps.

## About this connector

The **Amazon SageMaker connector** is an outbound connector that sends inference requests to a SageMaker endpoint. Use it to score data with a machine learning model as part of a process, for example to classify a document or predict a value.

The connector supports two inference types:

- **Real-time**: Calls the [`InvokeEndpoint`](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpoint.html) action, waits for the model, and returns the inference result.
- **Asynchronous**: Calls the [`InvokeEndpointAsync`](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpointAsync.html) action, which reads the input from Amazon S3 and returns the locations where SageMaker writes the output.

## Prerequisites

To use the Amazon SageMaker connector, you need the following:

| Prerequisite                                                                                                | Description                                                                                                                                                                                                          |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Deployed SageMaker endpoint](https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-deployment.html) | A real-time or asynchronous endpoint that points to your operational model. Learn more about [deploying models](https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html) in the SageMaker documentation.   |
| [AWS IAM user and permissions](https://repost.aws/knowledge-center/sagemaker-minimum-permissions)           | An IAM access key and secret key pair with permission to run `InvokeEndpoint` (real-time) or `InvokeEndpointAsync` (asynchronous). Not required if you use the default credentials chain (hybrid/Self-Managed only). |

:::note
Use secrets to store credentials and avoid exposing sensitive information directly from the process. Refer to [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Amazon SageMaker connector task

<ConnectorTask/>

## Configuration

### Authentication

Select an authentication method for the connector. Learn more about the available options in [AWS authentication types](#aws-authentication-types).

| Property       | Type     | Required | Description                                                                                                                                                     | Example                         |
| :------------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| Authentication | Dropdown | Yes      | The AWS authentication strategy: **Credentials**, or **Default Credentials Chain (Hybrid/Self-Managed only)**.                                                  | **Credentials**                 |
| Access key     | String   | Yes      | IAM access key of a user with permissions to the SageMaker `InvokeEndpoint` or `InvokeEndpointAsync` actions. Shown when **Authentication** is **Credentials**. | `{{secrets.MY_AWS_ACCESS_KEY}}` |
| Secret key     | String   | Yes      | IAM secret key of the user with the access key above. Shown when **Authentication** is **Credentials**.                                                         | `{{secrets.MY_AWS_SECRET_KEY}}` |

### Region

| Property | Type   | Required | Description                              | Example     |
| :------- | :----- | :------- | :--------------------------------------- | :---------- |
| Region   | String | Yes      | The AWS region of the deployed endpoint. | `us-east-1` |

### Inference settings

These properties apply to both inference types. Select the inference type first, because it determines which other properties appear.

| Property          | Type     | Required | Description                                                                                                                                           | Example             |
| :---------------- | :------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ |
| Inference type    | Dropdown | Yes      | The type of inference: **Real-time** or **Asynchronous**.                                                                                             | **Real-time**       |
| Endpoint name     | String   | Yes      | The name of the deployed SageMaker endpoint to invoke.                                                                                                | `my-model-endpoint` |
| Content type      | String   | Yes      | The MIME type of the input data. The default is `application/json`.                                                                                   | `application/json`  |
| Accept            | String   | Yes      | The desired MIME type of the inference response from the model container. The default is `application/json`.                                          | `application/json`  |
| Custom attributes | String   | No       | Additional information about the inference request, passed to the model hosted at the endpoint.                                                       | `session=1234`      |
| Inference ID      | String   | No       | An identifier for the inference request. If you provide a value, SageMaker adds it to the captured data when you enable data capture on the endpoint. | `order-1001`        |

## Operations

### Invoke a real-time endpoint

Send data to a real-time endpoint and return the inference result. Select **Real-time** in **Inference type**. Ensure you deployed your model with a real-time endpoint.

The connector currently supports only JSON-like content types for real-time inference.

#### Input parameters

In addition to the [inference settings](#inference-settings), configure the following properties.

| Property                    | Type     | Required | Description                                                                                                     | Example                        |
| :-------------------------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------- | :----------------------------- |
| Payload                     | Text     | Yes      | The input data your deployed model requires. Use a FEEL expression to build it from process variables.          | `= { "features": [1.2, 3.4] }` |
| Target model                | String   | No       | The model to request for inference when you invoke a multi-model endpoint.                                      | `model-a.tar.gz`               |
| Target variant              | String   | No       | The production variant to send the inference request to.                                                        | `AllTraffic`                   |
| Target invocation host name | String   | No       | The host name of the container to invoke, if the endpoint hosts multiple containers and uses direct invocation. |                                |
| Enable explanations         | Dropdown | Yes      | Whether SageMaker explains the request: **Not set**, **True**, or **False**.                                    | **Not set**                    |
| Inference component name    | String   | No       | The name of the inference component to invoke, if the endpoint hosts one or more inference components.          |                                |

Learn more about these properties in the [`InvokeEndpoint` documentation](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpoint.html).

#### Output

The connector returns an object with the following fields:

| Field                      | Description                                                                                                                                  |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `body`                     | The inference result. If the response content type is `application/json`, the connector parses it into an object. Otherwise, it is a string. |
| `contentType`              | The content type of the response.                                                                                                            |
| `customAttributes`         | The custom attributes returned by the endpoint.                                                                                              |
| `invokedProductionVariant` | The production variant that processed the request.                                                                                           |

The content of `body` depends on your deployed model. For example:

```json
{
  "body": {
    "predictions": [{ "label": "approved", "score": 0.94 }]
  },
  "contentType": "application/json",
  "customAttributes": "session=1234",
  "invokedProductionVariant": "AllTraffic"
}
```

To map the response into process variables, use **Result variable** to store the whole response, or **Result expression** to map individual fields:

```feel
= {
  "decision": response.body.predictions[1].label,
  "score": response.body.predictions[1].score
}
```

### Invoke an asynchronous endpoint

Queue an inference request against an asynchronous endpoint and return the locations of the result. Select **Asynchronous** in **Inference type**. The request payload must already be stored in Amazon S3.

For asynchronous inference, the connector doesn't wait for the model result. It returns once SageMaker accepts the request. Read the output from the returned `outputLocation` after SageMaker finishes processing.

#### Input parameters

In addition to the [inference settings](#inference-settings), configure the following properties.

| Property                         | Type   | Required | Description                                                                                                             | Example                          |
| :------------------------------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------- | :------------------------------- |
| Input location                   | String | Yes      | The Amazon S3 URI where the inference request payload is stored.                                                        | `s3://my-bucket/input/data.json` |
| Request time-to-leave in seconds | String | No       | The maximum age in seconds a request can be in the queue before it is marked as expired. The default is 21,600 seconds. | `21600`                          |
| Invocation timeout in seconds    | String | No       | The maximum time in seconds a request can be processed before it is marked as expired. The default is 900 seconds.      | `900`                            |

For asynchronous inference, the connector supports any content type. Learn more about these properties in the [`InvokeEndpointAsync` documentation](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpointAsync.html).

#### Output

The connector returns an object with the following fields:

| Field             | Description                                                           |
| :---------------- | :-------------------------------------------------------------------- |
| `outputLocation`  | The Amazon S3 location where SageMaker stores the inference output.   |
| `failureLocation` | The Amazon S3 location where SageMaker stores the output if it fails. |
| `inferenceId`     | The identifier of the inference request.                              |

For example:

```json
{
  "outputLocation": "s3://my-bucket/async-output/4d7c1f.out",
  "failureLocation": "s3://my-bucket/async-failure/4d7c1f-error.out",
  "inferenceId": "order-1001"
}
```

To store the output location in a process variable, use **Result expression**:

```feel
= {
  "inferenceOutput": response.outputLocation
}
```

## AWS authentication types

You can authenticate the connector with AWS in the following ways:

- **Credentials**: Use this option if your AWS account administrator provided a pair of access and secret keys. It applies to SaaS and Self-Managed.
- **Default Credentials Chain (Hybrid/Self-Managed only)**: Use this option if your system relies on an implicit authentication mechanism, such as role-based authentication, credentials supplied through environment variables, or files on the target host. It applies only to Self-Managed or hybrid distributions, and uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve credentials.

## Troubleshooting

To learn about general error handling in Camunda, see [BPMN errors and failing jobs](/components/connectors/use-connectors/index.md#bpmn-errors).

## Further resources

- [Amazon SageMaker documentation](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html)
- [Minimum permissions for Amazon SageMaker](https://repost.aws/knowledge-center/sagemaker-minimum-permissions)
