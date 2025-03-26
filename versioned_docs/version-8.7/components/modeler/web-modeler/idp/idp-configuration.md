---
id: idp-configuration
title: Configure IDP
description: "Set up and configure intelligent document processing (IDP) in Camunda 8 SaaS and Self-Managed."
---

import IdpSecretsImg from './img/idp-connector-secrets.png';
import TickImg from '/static/img/icon-list-tick.png';
import CrossImg from '/static/img/icon-list-cross.png';

Configure IDP for your Camunda 8 setup and make sure IDP can access the required components and credentials.

:::note
For the 8.7.0-alpha5 release IDP only offers support for Camunda 8 Self-Managed development deployment via Docker (see [example deployment](#idp-docker-example)). Full production support for Camunda 8 SaaS and Camunda 8 Self-Managed is planned for delivery with the 8.7 release. Camunda 8 Run is not supported as IDP requires Web Modeler.
:::

## Prerequisites

The following prerequisites are required for IDP:

| Prerequisite                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Amazon Web Services (AWS) IAM user and permissions | <ul><li><p>A valid [AWS Identity and Access Management (IAM) user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) with permissions configured to allow access to Amazon Bedrock, Amazon S3, and Amazon Textract, such as:<ul><li><p>`AmazonBedrockFullAccess`</p></li><li><p>`AmazonTextractFullAccess`</p></li></ul></p></li><li><p>Access to the IDP Amazon Bedrock foundation models:<ul><li><p>For a list of models suported by IDP, see [extraction models](idp-reference.md#extraction-models).</p></li><li><p>To learn more about configuring access to foundation models, refer to [add or remove access to Amazon Bedrock foundation models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html).</p></li></ul></p></li><li><p>The [access key pair](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) (_access key_ and _secret access key_) for this IAM user. This is required during IDP configuration.</p></li></ul> |
| Amazon S3 bucket                                   | <ul><li><p>An [Amazon S3 bucket](https://aws.amazon.com/s3/) that can be used by IDP for document storage during document analysis and extraction.</p><p>The bucket name must be unique across all your AWS accounts.</p></li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Web Modeler                                        | <ul><li><p>Web Modeler is required to create, manage, publish, and integrate [IDP applications](idp-applications.md) and [document extraction](idp-document-extraction.md) templates.</p></li><li><p>IDP does not support Desktop Modeler.</p></li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

## Configure IDP

Once you have completed all the required prerequisites, configure IDP in a `dev` cluster as follows:

### Add AWS connector secrets to cluster {#aws-secrets}

Add the following required AWS [connector secrets](/components/console/manage-clusters/manage-secrets.md):

| Connector secret Key | Example                                    | Description                                                                                                                                                   |
| :------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| IDP_AWS_ACCESSKEY    | `AKIAIOSFODNN7EXAMPLE`                     | Your AWS IAM user _access key_.                                                                                                                               |
| IDP_AWS_SECRETKEY    | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` | Your AWS IAM user _secret key_.                                                                                                                               |
| IDP_AWS_REGION       | `us-east-1` (default)                      | The AWS region where documents can be temporarily stored during Amazon Textract analysis. This should match the region where the Amazon S3 bucket is located. |
| IDP_AWS_BUCKET_NAME  | `idp-extraction-connector`                 | The name of the Amazon S3 bucket you want to use for document storage during extraction.                                                                      |

<img src={IdpSecretsImg} alt="Connector secrets" style={{width: '750px'}} />

:::note NOTES

- To learn more about how connector secrets are used in a document extraction template, see [integrate IDP into your processes](idp-integrate.md).
- You can rename these connector secrets if you want to change the testing bucket used in other environments (such as `test`, `stage` or `prod`). If you do this, you must also change these names to match within the **Authentication** section of the Properties panel for any related published document extraction templates.

:::

## Example Self-Managed Docker IDP deployment {#idp-docker-example}

To deploy and run Camunda 8 with IDP in a local development environment:

1. Ensure you have completed the IDP [Amazon Web Services (AWS) prerequisites](#prerequisites) and have obtained your AWS [access key pair](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) (_access key_ and _secret access key_).

1. Download [camunda-snapshot-idp.zip](https://github.com/camunda/camunda-distributions/releases/download/docker-compose-8.7-alpha5-idp-enabled/camunda-snapshot-idp.zip) from the [camunda-distributions](https://github.com/camunda/camunda-distributions/releases) GitHub repository, and extract the file contents to your desired directory.
1. In the extracted directory:

   1. Open the `connector-secrets.txt` file, and add your AWS connector secrets.

      For example:

      ```
      IDP_AWS_ACCESSKEY=AKIAIOSFODNN7EXAMPLE
      IDP_AWS_SECRETKEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
      IDP_AWS_REGION=us-east-1
      IDP_AWS_BUCKET_NAME=idp-extraction-connector
      ```

   1. Save and close the file.
   1. Open the `.env` file, and add your AWS connector secrets as environment variables.

      For example:

      ```
      # Document store credentials
      - DOCUMENT_STORE_AWS_BUCKET=idp-extraction-connector
      - AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
      - AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
      - AWS_REGION=us-east-1
      ```

   1. Save and close the file.
   1. [Run Camunda 8 with Docker Compose](/self-managed/setup/deploy/local/docker-compose.md#run-camunda-8-with-docker-compose).

1. Launch Web Modeler at http://localhost:8070 and log in with the username `demo` and password `demo`.
1. Get started with IDP by creating a new [IDP application](idp-applications.md) in a project.

:::info
To learn more about using Docker Compose to run Camunda Self-Managed locally, see [Docker Compose](/self-managed/setup/deploy/local/docker-compose.md).
:::

### Deployment files

This example deployment uses the following files:

| File                    | Notes                                                                                  |
| :---------------------- | :------------------------------------------------------------------------------------- |
| `docker-compose.yaml`   | Enables IDP with `IDP_ENABLED: "true"` in the Web Modeler environment variables.       |
| `.env`                  | Environment variables for component 8.7.0-SNAPSHOT versions and AWS connector secrets. |
| `connector-secrets.txt` | Sets the [connector secrets](#aws-secrets) required by IDP.                            |
