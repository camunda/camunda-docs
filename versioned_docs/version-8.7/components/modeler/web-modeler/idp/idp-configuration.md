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
IDP only offers support for Camunda 8 Self-Managed development deployment via Docker with the 8.7.0-alpha5 release (see [example deployment](#idp-docker-example)). Full production support for Camunda 8 SaaS and Camunda 8 Self-Managed is planned for delivery with the 8.7 release. Camunda 8 Run is not supported as IDP requires Web Modeler.
:::

## Prerequisites

The following prerequisites are required for IDP:

| Prerequisite              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Amazon Web Services (AWS) | <ul><li><p>Create a valid [AWS Identity and Access Management (IAM) user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) with permissions configured to allow access to Amazon Bedrock, AWS S3, and Amazon Textract (for example, `AmazonBedrockFullAccess`).</p></li><li><p>Obtain and store the [access key pair](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) (_access key_ and _secret access key_) for this IAM user. These are required during IDP configuration.</p></li><li><p>Create an [Amazon AWS S3 bucket](https://aws.amazon.com/s3/) named `idp-extraction-connector` that can be used by IDP for document storage during document analysis and extraction.</p></li></ul> |
| Web Modeler               | <ul><li><p>Web Modeler is required to create, manage, publish, and integrate [IDP applications](idp-applications.md) and [document extraction](idp-document-extraction.md) templates.</p></li><li><p>IDP does not support Desktop Modeler.</p></li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

## Configure IDP

Once you have completed all the required prerequisites, configure IDP in a `dev` cluster as follows:

### Add AWS connector secrets to cluster {#aws-secrets}

Add your Amazon AWS IAM user _access key_ and _secret key_ as [connector secrets](/components/console/manage-clusters/manage-secrets.md) to the cluster, using the following names:

- _Access key_: `IDP_AWS_ACCESSKEY`
- _Secret key_: `IDP_AWS_SECRETKEY`

<img src={IdpSecretsImg} alt="Connector secrets" style={{width: '750px'}} />

:::note
You can rename these connector secrets if you want to change the testing bucket used in other environments (such as `test`, `stage` or `prod`). If you do this, you must also change these names to match within the **Authentication** section of the Properties panel for any related published document extraction templates.
:::

## Example Self-Managed Docker IDP deployment {#idp-docker-example}

To deploy IDP in a local development environment, download and run the example Docker Compose configuration.

- file

The `camunda-snapshot-idp-enabled.zip` file contains the following files:

| File                    | Notes                                                                                |
| :---------------------- | :----------------------------------------------------------------------------------- |
| `docker-compose.yaml`   | IDP is enabled using `IDP_ENABLED: "true"` in the Web Modeler environment variables. |
| `.env`                  | Contains variables to get the 8.7.0-SNAPSHOT versions of all components.             |
| `connector-secrets.txt` | Sets the [connector secrets](#aws-secrets) required by IDP.                          |
| `README.md`             | A standard README file.                                                              |

### Run IDP locally using Docker Compose

To run Camunda 8 with IDP locally using this example configuration:

1. Ensure you have completed the IDP [Amazon Web Services (AWS) prerequisites](#prerequisites).
1. Download the example `camunda-snapshot-idp-enabled.zip` file, and extract the file contents to your desired directory.
1. In the extracted directory, [run Camunda 8 with Docker Compose](/self-managed/setup/deploy/local/docker-compose.md#run-camunda-8-with-docker-compose).
1. Launch Web Modeler. For example, at http://localhost:8070 with the username `demo` and password `demo`.
1. Get started with IDP by creating an [IDP application](idp-applications.md).

:::info
To learn more about using Docker Compose to run Camunda Self-Managed locally, see [Docker Compose](/self-managed/setup/deploy/local/docker-compose.md).
:::
