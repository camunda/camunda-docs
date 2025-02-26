---
id: idp-configuration
title: Configure IDP
description: "Set up and configure intelligent document processing (IDP) in Camunda 8 SaaS and Self-Managed."
---

import IdpSecretsImg from './img/idp-connector-secrets.png';
import TOCInline from '@theme/TOCInline';

Configure your setup with the components and credentials required by IDP.

:::info
To learn more about the technical architecture and how IDP works, see [technical architecture](idp-reference.md#technical-architecture).
:::

## Prerequisites and configuration

The following prerequisites and configuration is required for IDP in Camunda 8:

- [Web Modeler](#web-modeler)
- [Amazon AWS account and credentials](#aws-account)
- [Amazon AWS S3 storage](#aws-storage)
- [Connectors](#connectors)

### Web Modeler {#web-modeler}

You must be able to access and use [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md).

- IDP currently only supports Web Modeler. Desktop Modeler is not supported.
- To use IDP with Camunda 8 Self-Managed and Camunda 8 Run you must [install](/self-managed/modeler/web-modeler/installation.md) and [configure](/self-managed/modeler/web-modeler/configuration/configuration.md) Web Modeler.

### Amazon AWS account and credentials {#aws-account}

As IDP uses Camunda connectors to integrate with Amazon AWS technology, you must:

- Create or have access to an [Amazon AWS](https://aws.amazon.com/iam/) account, configured with access to [Amazon Bedrock](https://aws.amazon.com/bedrock/).
- Add your Amazon AWS account `access key` and `secret key` as a [connector secret](/components/console/manage-clusters/manage-secrets.md) to any cluster used with IDP.
  <img src={IdpSecretsImg} alt="Connector secrets" style={{width: '650px'}} />

### Amazon AWS S3 storage {#aws-storage}

You must create an Amazon AWS S3 bucket named `idp-extraction-connector` to be used by IDP for temporary document storage during analysis and test extraction.

### Connectors {#connectors}

IDP requires the following connectors for extracting document content and conversing with LLM models:

| Connector                                                                                  | Usage                                                     |
| :----------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| [Amazon S3](/components/connectors/out-of-the-box-connectors/amazon-s3.md)                 | Used for document storage during analysis and extraction. |
| [Amazon Textract](/components/connectors/out-of-the-box-connectors/amazon-textract.md)     | Used to extract text from documents.                      |
| [Amazon Comprehend](/components/connectors/out-of-the-box-connectors/amazon-comprehend.md) | Used to extract insights about the content of documents.  |
| [Amazon Bedrock](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md)       | Used to extract data from documents.                      |

For example, if you are using Camunda 8 Self-Managed, check you have these connectors [installed and deployed](/self-managed/connectors-deployment/install-and-start.md) in your environment.

## Configure IDP for Camunda 8 Run

The following example steps are typically required to configure IDP with Camunda 8 Run:

1. [Install and start Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md#install-and-start-camunda-8-run).
1.

## Configure IDP for Camunda 8 SaaS
