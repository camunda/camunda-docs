---
id: idp-configuration
title: Configure IDP
description: "Set up and configure intelligent document processing (IDP) in Camunda 8 SaaS and Self-Managed."
---

import IdpSecretsImg from './img/idp-connector-secrets.png';
import TickImg from '/static/img/icon-list-tick.png';
import CrossImg from '/static/img/icon-list-cross.png';

Configure your Camunda 8 setup with the components and credentials required by IDP.

## Prerequisites and configuration

The following prerequisites and configuration are required for IDP in Camunda 8:

| Prerequisite/configuration                         | Camunda 8 SaaS                                                             | Camunda 8 Self-Managed/Camunda 8 Run |
| :------------------------------------------------- | :------------------------------------------------------------------------- | :----------------------------------- |
| [Modeler](#modeler)                                | No action required. Web Modeler is the default Modeler for Camunda 8 SaaS. | Install and configure Web Modeler.   |
| [Amazon AWS account and credentials](#aws-account) | summary                                                                    | summary                              |
| [Amazon AWS S3 storage](#aws-storage)              | summary                                                                    | summary                              |
| [Connectors](#connectors)                          | summary                                                                    | summary                              |

:::info

- See [configure IDP for Camunda 8 Run](#configure-idp-camunda8run) for a summary of the steps typically required to configure IDP with Camunda 8 Run.
- See [technical architecture](idp-reference.md#technical-architecture) to learn more about the technical architecture and how IDP works.

:::

## Modeler {#modeler}

- Web Modeler is required to create, manage, and publish IDP applications and document extraction projects.
- Web Modeler or Desktop Modeler can be used to integrate published document extraction projects into your processes.

This can be summarized as follows:

| IDP functionality                                                                         |                                                Web Modeler                                                 |                                                 Desktop Modeler                                                 |
| :---------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| Create and manage [IDP applications](idp-applications.md).                                | <img src={TickImg} alt="Connector secrets" style={{width: '20px', padding: '0', margin: '0'}} /> Supported | <img src={CrossImg} alt="Connector secrets" style={{width: '20px', padding: '0', margin: '0'}} /> Not supported |
| Create, manage, and publish [document extraction](idp-document-extraction.md) projects.   | <img src={TickImg} alt="Connector secrets" style={{width: '20px', padding: '0', margin: '0'}} /> Supported | <img src={CrossImg} alt="Connector secrets" style={{width: '20px', padding: '0', margin: '0'}} /> Not supported |
| [Integrate published document extraction projects into your processes](idp-integrate.md). | <img src={TickImg} alt="Connector secrets" style={{width: '20px', padding: '0', margin: '0'}} /> Supported |   <img src={TickImg} alt="Connector secrets" style={{width: '20px', padding: '0', margin: '0'}} /> Supported    |

### Self-Managed/Camunda 8 Run

To fully use IDP with Camunda 8 Self-Managed and Camunda 8 Run you must [install](/self-managed/modeler/web-modeler/installation.md) and [configure](/self-managed/modeler/web-modeler/configuration/configuration.md) Web Modeler.

## Amazon AWS account and credentials {#aws-account}

As IDP uses Camunda connectors to integrate with Amazon AWS technology, you must:

- Create or have access to an [Amazon AWS](https://aws.amazon.com/iam/) account, configured with access to [Amazon Bedrock](https://aws.amazon.com/bedrock/).
- Add your Amazon AWS account `access key` and `secret key` as a [connector secret](/components/console/manage-clusters/manage-secrets.md) to any cluster used with IDP.
  <img src={IdpSecretsImg} alt="Connector secrets" style={{width: '650px'}} />

## Amazon AWS S3 storage {#aws-storage}

You must create an Amazon AWS S3 bucket named `idp-extraction-connector` that can be used by IDP for temporary document storage during analysis and test extraction.

## Connectors {#connectors}

IDP requires access to the following connectors to analyze/extract document content and converse with LLM models:

| Connector                                                                                  | Usage requirement                                         |
| :----------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| [Amazon S3](/components/connectors/out-of-the-box-connectors/amazon-s3.md)                 | Used for document storage during analysis and extraction. |
| [Amazon Textract](/components/connectors/out-of-the-box-connectors/amazon-textract.md)     | Used to extract text from documents.                      |
| [Amazon Comprehend](/components/connectors/out-of-the-box-connectors/amazon-comprehend.md) | Used to extract insights about the content of documents.  |
| [Amazon Bedrock](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md)       | Used to extract data from documents.                      |

**Self-Managed/Camunda 8 Run:** Check you have these connectors [installed and deployed](/self-managed/connectors-deployment/install-and-start.md) in your environment.

## Configure IDP for Camunda 8 Run {#configure-idp-camunda8run}

The steps typically required to configure IDP with Camunda 8 Run can be summarized as follows:

1. [Install and start Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md#install-and-start-camunda-8-run).
1. As Web Modeler is not included in Camunda 8 Run by default, [install](/self-managed/modeler/web-modeler/installation.md) and [configure](/self-managed/modeler/web-modeler/configuration/configuration.md) Web Modeler.
1. ...

## Configure IDP for Camunda 8 SaaS
