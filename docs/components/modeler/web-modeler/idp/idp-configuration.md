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
| Clusters requiring basic authentication                           | Self-Managed clusters that require basic authentication are not currently supported with IDP. You must use another [available authentication method](/self-managed/components/modeler/web-modeler/configuration/configuration.md#available-authentication-methods) for compatibility. |

## Prerequisites

The following prerequisites are required for IDP:

### Amazon Web Services (AWS)

When using AWS as your cloud provider, the following AWS-specific prerequisites are required. IDP supports both structured and unstructured document extraction with AWS services:

| Prerequisite                                                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Amazon Web Services (AWS) IAM user and permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) | <ul><li><p>A valid AWS Identity and Access Management (IAM) user with permissions configured to allow access to Amazon Bedrock, Amazon S3, and Amazon Textract, such as:<ul><li><p>`AmazonBedrockFullAccess`</p></li><li><p>`AmazonTextractFullAccess`</p></li></ul></p></li><li><p>Access to the IDP Amazon Bedrock foundation models:<ul><li><p>For a list of models suported by IDP, see [extraction models](idp-reference.md#extraction-models).</p></li><li><p>To learn more about configuring access to foundation models, refer to [add or remove access to Amazon Bedrock foundation models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html).</p></li></ul></p></li><li><p>The [access key pair](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) (_access key_ and _secret access key_) for this IAM user. This is required during IDP configuration.</p></li></ul> |
| [Amazon S3 bucket](https://aws.amazon.com/s3/)                                                                       | <ul><li><p>An Amazon S3 bucket that can be used by IDP for document storage during document analysis and extraction.</p><p>The bucket name must be unique across all your AWS accounts.</p></li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

### Google Cloud Platform (GCP)

When using GCP as your cloud provider, the following GCP-specific prerequisites are required. IDP supports both structured and unstructured document extraction with GCP services:

| Prerequisite                                                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :---------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Google Cloud Vertex AI](https://cloud.google.com/vertex-ai/docs) (required for unstructured extraction)          | <ul><li><p>Access to Vertex AI is required for performing unstructured document extractions using Google's generative AI models.</p></li><li><p>Vertex AI provides access to foundation models and machine learning capabilities that power IDP's intelligent document processing features.</p></li><li><p>To learn more about Vertex AI, refer to [Vertex AI documentation](https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform).</p></li></ul>                                                |
| [Google Cloud Storage (GCS) bucket](https://cloud.google.com/storage/docs) (required for unstructured extraction) | <ul><li><p>A Google Cloud Storage bucket that can be used by IDP for temporary document storage during Vertex AI analysis and unstructured extraction.</p></li><li><p>The bucket must be accessible by the service account and located in the same region as your Vertex AI resources for optimal performance.</p></li><li><p>To learn more about creating and managing Cloud Storage buckets, refer to [Cloud Storage documentation](https://cloud.google.com/storage/docs/creating-buckets).</p></li></ul>            |
| [Google Cloud Document AI](https://cloud.google.com/document-ai/docs) (required for structured extraction)        | <ul><li><p>Access to Document AI is required for performing structured document extractions from forms, invoices, and other templated documents.</p></li><li><p>Document AI provides specialized processors for extracting structured data from various document types with high accuracy.</p></li><li><p>To learn more about Document AI capabilities, refer to [Document AI overview](https://cloud.google.com/document-ai/docs/overview).</p></li></ul>                                                              |
| [Google Cloud Service Account](https://cloud.google.com/iam/docs/service-account-overview)                        | <ul><li><p>A valid GCP service account with appropriate permissions configured to allow access to Vertex AI, Document AI, and Cloud Storage services.</p></li><li><p>The service account must have IAM roles that allow use of the services above based on your extraction needs (unstructured and/or structured).</p></li><li><p>The [service account JSON key file](https://cloud.google.com/iam/docs/service-account-creds#user-managed-keys) is required during IDP configuration for authentication.</p></li></ul> |

### Microsoft Azure

When using Azure as your cloud provider, the following Azure-specific prerequisites are required. IDP currently supports unstructured document extraction with Azure services:

| Prerequisite                                                                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :----------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/) | <ul><li><p>Access to Azure AI Document Intelligence is required for extracting text and structural information from uploaded documents during unstructured extraction.</p></li><li><p>Document Intelligence uses machine learning models to automate data processing and provides essential capabilities for document analysis.</p></li><li><p>Authentication is handled using the service endpoint and access keys provided by the Azure AI Document Intelligence resource.</p></li><li><p>To learn more about Document Intelligence, refer to [Document Intelligence overview](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview).</p></li></ul> |
| [Azure AI Foundry](https://learn.microsoft.com/en-us/azure/ai-foundry/)                                      | <ul><li><p>Access to Azure AI Foundry is required for using different large language models (LLMs) during unstructured document extraction.</p></li><li><p>Azure AI Foundry provides access to various foundation models and AI capabilities that power IDP's intelligent document processing features.</p></li><li><p>Authentication is handled using the service endpoint and access keys provided by the Azure AI Foundry resource.</p></li><li><p>To learn more about Azure AI Foundry, refer to [Azure AI Foundry documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/what-is-azure-ai-foundry).</p></li></ul>                                                   |

### General requirements

The following prerequisites apply regardless of your cloud provider:

| Prerequisite                                                         | Description                                                                                                                                                                                                                                              |
| :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md) | <ul><li><p>Web Modeler is required to create, manage, publish, and integrate [IDP applications](idp-applications.md) and [document extraction](idp-document-extraction.md) templates.</p></li><li><p>IDP does not support Desktop Modeler.</p></li></ul> |

## Cluster requirements {#cluster-requirements}

The following requirements apply for IDP application clusters:

| Requirement                                                           | Description                                                                                                                                                                                                                                                 |
| :-------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Connector secrets](#aws-secrets)                                     | You must configure the required IDP AWS connector secrets on any cluster used with IDP.                                                                                                                                                                     |
| [Document handling](/components/document-handling/getting-started.md) | IDP requires a cluster that supports document handling. For example, a version 8.7 or higher cluster.                                                                                                                                                       |
| Cluster health                                                        | IDP applications and projects are only fully operational when linked to a healthy, active cluster. If needed, you can select an unstable or unhealthy cluster when first creating an IDP application, and change to a stable cluster when one is available. |

:::info
To learn more about storing, tracking, and managing documents in Camunda 8, see [document handling](/components/document-handling/getting-started.md).
:::

### Identity {#identity}

If you are using an identity-enabled cluster, the following authorizations are required for IDP operations:

| Resource type      | Permission              | Owner type | Owner          | Description                                                          |
| :----------------- | :---------------------- | :--------- | :------------- | :------------------------------------------------------------------- |
| DOCUMENT           | READ                    | Role       | Connectors     | Required for the idp connector to read the document from the cluster |
| DOCUMENT           | CREATE                  | User       | `user's email` | Required to upload documents to the cluster during IDP extraction    |
| RESOURCE           | CREATE                  | User       | `user's email` | Required to deploy process instances                                 |
| PROCESS_DEFINITION | CREATE_PROCESS_INSTANCE | User       | `user's email` | Required to start process instances                                  |

## Configure IDP

Once you have completed all the required prerequisites, configure IDP in a suitable `dev` cluster as follows. You only need to add the connector secrets for the cloud provider you plan to use.

### Add AWS connector secrets to cluster {#aws-secrets}

If you are using AWS as your cloud provider, add the following AWS connector secrets required for IDP.

- **SaaS:** Create and configure as [connector secrets](/components/console/manage-clusters/manage-secrets.md).
- **Self-Managed:** Connector secrets are generally provided as environment variables, set via `values.yaml` or the command line. Add these connector secrets as environment variables for the Tasklist and Zeebe components. To learn more about using connector secrets in Self-Managed, see [managing secrets in Helm charts](/self-managed/installation-methods/helm/configure/secret-management.md) and [secrets in manual installations](/self-managed/components/connectors/connectors-configuration.md#secrets).

| Connector secret Key  | Required | Description                                                                                                                                                                                               |
| :-------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IDP_AWS_ACCESSKEY`   | Yes      | The AWS access key ID used to interact with the Amazon S3 bucket.                                                                                                                                         |
| `IDP_AWS_SECRETKEY`   | Yes      | The AWS secret access key associated with the `IDP_AWS_ACCESSKEY`.                                                                                                                                        |
| `IDP_AWS_REGION`      | Yes      | <p>The AWS region where documents can be temporarily stored during Amazon Textract analysis. This should match the region where the Amazon S3 bucket is located.</p><p>Example: `us-east-1` (default)</p> |
| `IDP_AWS_BUCKET_NAME` | Yes      | <p>The name of the Amazon S3 bucket you want to use for document storage during extraction.</p><p>Example: `idp-extraction-connector`</p>                                                                 |

### Add GCP connector secrets to cluster {#gcp-secrets}

If you are using GCP as your cloud provider, add the following GCP connector secrets required for IDP. The secrets you need depend on which type of extraction you plan to use.

| Connector secret Key               | Required for Unstructured Extraction | Required for Structured Extraction | Description                                                                                                                                                |
| :--------------------------------- | :----------------------------------: | :--------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IDP_GCP_SERVICE_ACCOUNT`          |                 Yes                  |                Yes                 | The GCP service account JSON key file content for authentication with GCP services.                                                                        |
| `IDP_GCP_VERTEX_REGION`            |                 Yes                  |                 No                 | <p>The GCP region where Vertex AI resources are located.</p><p>Example: `us-central1`</p>                                                                  |
| `IDP_GCP_VERTEX_PROJECT_ID`        |                 Yes                  |                 No                 | <p>The Vertex project ID where Vertex AI resources are configured.</p><p>Example: `my-gcp-project-id`</p>                                                  |
| `IDP_GCP_VERTEX_BUCKET_NAME`       |                 Yes                  |                 No                 | <p>The name of the Google Cloud Storage bucket for temporary document storage during Vertex AI analysis.</p><p>Example: `idp-vertex-extraction-bucket`</p> |
| `IDP_GCP_DOCUMENT_AI_REGION`       |                  No                  |                Yes                 | <p>The GCP region where Document AI resources are located. Must be either `eu` or `us`.</p><p>Example: `us`</p>                                            |
| `IDP_GCP_DOCUMENT_AI_PROJECT_ID`   |                  No                  |                Yes                 | <p>The DocumentAI project ID where Document AI resources are configured.</p><p>Example: `my-gcp-project-id`</p>                                            |
| `IDP_GCP_DOCUMENT_AI_PROCESSOR_ID` |                  No                  |                Yes                 | <p>The Document AI processor ID for the specific processor you want to use for structured extraction.</p><p>Example: `1234567890abcdef`</p>                |

### Add Azure connector secrets to cluster {#azure-secrets}

If you are using Azure as your cloud provider, add the following Azure connector secrets required for IDP.

| Connector secret Key                       | Required | Description                                                                                                                                                                                     |
| :----------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IDP_AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT` | Yes      | The endpoint URL for your Azure AI Document Intelligence resource.                                                                                                                              |
| `IDP_AZURE_DOCUMENT_INTELLIGENCE_KEY`      | Yes      | The access key for your Azure AI Document Intelligence resource.                                                                                                                                |
| `IDP_AZURE_AI_FOUNDRY_ENDPOINT`            | Yes      | The endpoint URL for your Azure AI Foundry resource. Construct this URL using the pattern: `https://<resource-name>.services.ai.azure.com/models`.                                              |
| `IDP_AZURE_AI_FOUNDRY_KEY`                 | Yes      | The access key for your Azure AI Foundry resource. You can find this key in the details page of deployed base models or on the Azure AI Foundry "Overview" page.                                |
| `IDP_AZURE_OPEN_AI_ENDPOINT`               | Optional | The endpoint URL for your Azure OpenAI resource. Required only if you want to use OpenAI models. You can find this endpoint in the "Models + endpoints" page in the Azure AI Foundry dashboard. |
| `IDP_AZURE_OPEN_AI_KEY`                    | Optional | The access key for your Azure OpenAI resource. Required only if you want to use OpenAI models. You can find this key in the "Models + endpoints" page in the Azure AI Foundry dashboard.        |

:::note

- These connector secrets are used in IDP document extraction templates. See [integrate IDP into your processes](idp-integrate.md).
- You can rename these connector secrets if you want to change the testing configuration used in other environments (such as `test`, `stage` or `prod`). If you do this, you must also change these names to match within the **Authentication** section of the Properties panel for any related published document extraction templates.

:::

## Example IDP deployment {#examples}

The following examples show how you can deploy and configure IDP in your local development environment.

### Camunda 8 Run {#idp-c8run-example}

To use [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) to deploy and run Camunda 8 with IDP in a local development environment:

1. Ensure you have completed the IDP [Amazon Web Services (AWS) prerequisites](#prerequisites) and have obtained your AWS [access key pair](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) (_access key_ and _secret access key_).

1. [Install Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md#install-and-start-camunda-8-run). For example, download the latest release of Camunda 8 Run for your operating system and architecture and open the .tgz file to extract the Camunda 8 Run script into a new directory.

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

   1. Configure [document handling environment variables](/components/document-handling/getting-started.md) for the Tasklist and Zeebe components (for example, in the `.env` file).

1. Start Camunda 8 Run via Docker Compose. For example, run `./start.sh --docker` (or `.\c8run.exe start -docker` on Windows) in your terminal.

1. Launch Web Modeler at http://localhost:8070 and log in with the username `demo` and password `demo`.
1. Get started with IDP by creating a new [IDP application](idp-applications.md) in a Web Modeler project.

:::info
To learn more about using Camunda 8 Run to run Camunda Self-Managed locally, see [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md).
:::

### Docker {#idp-docker-example}

To use [Docker](/self-managed/installation-methods/docker/docker.md) to deploy and run Camunda 8 with IDP in a local development environment:

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

1. Configure [document handling environment variables](/components/document-handling/getting-started.md) for the Tasklist and Zeebe components.
1. [Run Camunda 8 with Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md#run-camunda-8-with-docker-compose). For example, run the following command in the extracted directory:

   ```
   Docker compose up -d
   ```

1. Launch Web Modeler at http://localhost:8070 and log in with the username `demo` and password `demo`.
1. Get started with IDP by creating a new [IDP application](idp-applications.md) in a Web Modeler project.

:::info
To learn more about using Docker Compose to run Camunda Self-Managed locally, see [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md).
:::
