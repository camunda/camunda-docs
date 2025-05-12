---
id: idp-configuration
title: Configure IDP
description: "Set up and configure intelligent document processing (IDP) in Camunda 8 SaaS and Self-Managed."
---

import IdpSecretsImg from './img/idp-connector-secrets.png';
import TickImg from '/static/img/icon-list-tick.png';
import CrossImg from '/static/img/icon-list-cross.png';

Configure IDP for your Camunda 8 setup and make sure IDP can access the required components and credentials.

## Known limitations

The current known limitations of IDP are as follows:

| Limitation                                                        | Description                                                                                                                                                                                                                                                                           |
| :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Microsoft Entra ID](https://docs.azure.cn/en-us/entra/identity/) | Use of Microsoft Entra ID as an OpenID Connect (OIDC) identity provider in Self-Managed is not currently supported with IDP.                                                                                                                                                          |
| [Multi-tenancy](/self-managed/concepts/multi-tenancy.md)          | If multi-tenancy is enabled, IDP can only be used by users who can access the `<default>` tenant.                                                                                                                                                                                     |
| Clusters requiring basic authentication                           | Self-Managed clusters that require basic authentication are not currently supported with IDP. You must use another [available authentication method](../../../../self-managed/modeler/web-modeler/configuration/configuration.md#available-authentication-methods) for compatibility. |

## Prerequisites

The following prerequisites are required for IDP:

| Prerequisite                                                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Amazon Web Services (AWS) IAM user and permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) | <ul><li><p>A valid AWS Identity and Access Management (IAM) user with permissions configured to allow access to Amazon Bedrock, Amazon S3, and Amazon Textract, such as:<ul><li><p>`AmazonBedrockFullAccess`</p></li><li><p>`AmazonTextractFullAccess`</p></li></ul></p></li><li><p>Access to the IDP Amazon Bedrock foundation models:<ul><li><p>For a list of models suported by IDP, see [extraction models](idp-reference.md#extraction-models).</p></li><li><p>To learn more about configuring access to foundation models, refer to [add or remove access to Amazon Bedrock foundation models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html).</p></li></ul></p></li><li><p>The [access key pair](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) (_access key_ and _secret access key_) for this IAM user. This is required during IDP configuration.</p></li></ul> |
| [Amazon S3 bucket](https://aws.amazon.com/s3/)                                                                       | <ul><li><p>An Amazon S3 bucket that can be used by IDP for document storage during document analysis and extraction.</p><p>The bucket name must be unique across all your AWS accounts.</p></li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md)                                                 | <ul><li><p>Web Modeler is required to create, manage, publish, and integrate [IDP applications](idp-applications.md) and [document extraction](idp-document-extraction.md) templates.</p></li><li><p>IDP does not support Desktop Modeler.</p></li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

## Cluster requirements {#cluster-requirements}

The following requirements apply for IDP application clusters:

| Requirement                                                    | Description                                                                                                                                                                                                                                                 |
| :------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Connector secrets](#aws-secrets)                              | You must configure the required IDP AWS connector secrets on any cluster used with IDP.                                                                                                                                                                     |
| [Document handling](/components/concepts/document-handling.md) | IDP requires a cluster that supports document handling. For example, a version 8.7 or higher cluster.                                                                                                                                                       |
| Cluster health                                                 | IDP applications and projects are only fully operational when linked to a healthy, active cluster. If needed, you can select an unstable or unhealthy cluster when first creating an IDP application, and change to a stable cluster when one is available. |

:::info
To learn more about storing, tracking, and managing documents in Camunda 8, see [document handling](/components/concepts/document-handling.md).
:::

## Configure IDP

Once you have completed all the required prerequisites, configure IDP in a suitable `dev` cluster as follows:

### Add AWS connector secrets to cluster {#aws-secrets}

Add the following AWS connector secrets required for IDP.

- **SaaS:** Create and configure as [connector secrets](/components/console/manage-clusters/manage-secrets.md).
- **Self-Managed:** Connector secrets are generally provided as environment variables, set via `values.yaml` or the command line. Add these connector secrets as environment variables for the Tasklist and Zeebe components. To learn more about using connector secrets in Self-Managed, see [managing secrets in Helm charts](/self-managed/setup/guides/secret-management.md) and [secrets in manual installations](/self-managed/connectors-deployment/connectors-configuration.md#secrets).

| Connector secret Key  | Required | Description                                                                                                                                                                                               |
| :-------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IDP_AWS_ACCESSKEY`   | Yes      | The AWS access key ID used to interact with the Amazon S3 bucket.                                                                                                                                         |
| `IDP_AWS_SECRETKEY`   | Yes      | The AWS secret access key associated with the `IDP_AWS_ACCESSKEY`.                                                                                                                                        |
| `IDP_AWS_REGION`      | Yes      | <p>The AWS region where documents can be temporarily stored during Amazon Textract analysis. This should match the region where the Amazon S3 bucket is located.</p><p>Example: `us-east-1` (default)</p> |
| `IDP_AWS_BUCKET_NAME` | Yes      | <p>The name of the Amazon S3 bucket you want to use for document storage during extraction.</p><p>Example: `idp-extraction-connector`</p>                                                                 |

<!-- <img src={IdpSecretsImg} alt="Connector secrets" style={{width: '750px'}} /> -->

:::note

- These connector secrets are used in IDP document extraction templates. See [integrate IDP into your processes](idp-integrate.md).
- You can rename these connector secrets if you want to change the testing bucket used in other environments (such as `test`, `stage` or `prod`). If you do this, you must also change these names to match within the **Authentication** section of the Properties panel for any related published document extraction templates.

:::

## Example IDP deployment {#examples}

The following examples show how you can deploy and configure IDP in your local development environment.

### Camunda 8 Run {#idp-c8run-example}

To use [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md) to deploy and run Camunda 8 with IDP in a local development environment:

1. Ensure you have completed the IDP [Amazon Web Services (AWS) prerequisites](#prerequisites) and have obtained your AWS [access key pair](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) (_access key_ and _secret access key_).

1. [Install Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md#install-and-start-camunda-8-run). For example, download the latest release of Camunda 8 Run for your operating system and architecture and open the .tgz file to extract the Camunda 8 Run script into a new directory.

1. Navigate to the `docker-compose-8.x` folder in the new c8run directory.

   1. Open the `connector-secrets.txt` file, and add your AWS connector secrets.

      For example:

      ```
      IDP_AWS_ACCESSKEY=AWSACCESSKEYID
      IDP_AWS_SECRETKEY=AWSSECRETACCESSKEYGOESHERE
      IDP_AWS_REGION=us-east-1
      IDP_AWS_BUCKET_NAME=idp-extraction-connector
      ```

   1. Save and close the file.

   1. Configure [document handling environment variables](/components/concepts/document-handling.md) for the Tasklist and Zeebe components (for example, in the `.env` file).

1. Start Camunda 8 Run via Docker Compose. For example, run `./start.sh --docker` (or `.\c8run.exe start -docker` on Windows) in your terminal.

1. Launch Web Modeler at http://localhost:8070 and log in with the username `demo` and password `demo`.
1. Get started with IDP by creating a new [IDP application](idp-applications.md) in a Web Modeler project.

:::info
To learn more about using Camunda 8 Run to run Camunda Self-Managed locally, see [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md).
:::

### Docker {#idp-docker-example}

To use [Docker](/self-managed/setup/deploy/other/docker.md) to deploy and run Camunda 8 with IDP in a local development environment:

1. Ensure you have completed the IDP [Amazon Web Services (AWS) prerequisites](#prerequisites) and have obtained your AWS [access key pair](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) (_access key_ and _secret access key_).

1. Download the latest Camunda Docker Compose release artifact from the [camunda-distributions](https://github.com/camunda/camunda-distributions/releases) GitHub repository, and extract the file contents to your desired directory.
1. In the extracted directory:

   1. Open the `connector-secrets.txt` file, and add your AWS connector secrets.

      For example:

      ```
      IDP_AWS_ACCESSKEY=AWSACCESSKEYID
      IDP_AWS_SECRETKEY=AWSSECRETACCESSKEYGOESHERE
      IDP_AWS_REGION=us-east-1
      IDP_AWS_BUCKET_NAME=idp-extraction-connector
      ```

   1. Save and close the file.

1. Configure [document handling environment variables](/components/concepts/document-handling.md) for the Tasklist and Zeebe components.
1. [Run Camunda 8 with Docker Compose](/self-managed/setup/deploy/local/docker-compose.md#run-camunda-8-with-docker-compose). For example, run the following command in the extracted directory:

   ```
   Docker compose up -d
   ```

1. Launch Web Modeler at http://localhost:8070 and log in with the username `demo` and password `demo`.
1. Get started with IDP by creating a new [IDP application](idp-applications.md) in a Web Modeler project.

:::info
To learn more about using Docker Compose to run Camunda Self-Managed locally, see [Docker Compose](/self-managed/setup/deploy/local/docker-compose.md).
:::
