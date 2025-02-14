---
id: idp
title: Intelligent document processing (IDP)
description: "Use intelligent document processing (IDP) to integrate automated document processing into your end-to-end processes."
---

import IdpOverviewImg from './img/idp-overview-diagram.png';
import IdpSecretsImg from './idp/img/idp-connector-secrets.png';

Use intelligent document processing (IDP) to integrate automated document processing into your end-to-end processes.

## About IDP

IDP uses artificial intelligence (AI) and machine learning (ML) to identify, extract, and organize data from your structured and unstructured documents into a structured format you can use in your processes.

For example, you can use IDP to extract data from invoices and other document types in your document processing workflow.

<img src={IdpOverviewImg} alt="An overview of intelligent document processing" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}} />

## Configure IDP

To configure and use IDP in Camunda 8 you must:

- Create an [Amazon Bedrock](https://aws.amazon.com/bedrock/) account to allow IDP to integrate with the [Amazon Bedrock](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md) connector.

- Deploy the [Amazon S3](/components/connectors/out-of-the-box-connectors/amazon-s3.md), [Amazon Textract](/components/connectors/out-of-the-box-connectors/amazon-textract.md), [Amazon Comprehend](/components/connectors/out-of-the-box-connectors/amazon-comprehend.md), and [Amazon Bedrock](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md) connectors used by IDP to extract document content and converse with LLM models.

- Add your Amazon AWS IAM account `access key` and `secret key` as a [connector secret](/components/console/manage-clusters/manage-secrets.md) to the cluster you want to use with IDP.

  <img src={IdpSecretsImg} alt="AWS connector secrets" width="650px" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}}/>

- Create an Amazon AWS S3 bucket named `idp-extraction-connector` used by IDP for document storage during test extraction.

:::info
To learn more about the IDP technical architecture and how IDP works, see [technical architecture](idp/idp-reference.md#technical-architecture).
:::

## Get started with IDP

To start using IDP in your processes:

1. Create an [IDP application](idp/idp-applications.md) folder in which to store and manage a set of related IDP projects.

1. Create and publish your IDP projects in your IDP application folder:

   - Create a [document extraction](idp/idp-document-extraction.md) project to identify and extract data from a single type of document (for example, an invoice).

   - Create a [document automation](idp/idp-document-automation.md) project to automatically extract data from larger, more complex documents (for example, a multi-page PDF document made up of many types of documents and data). This project type is based on and requires one or more linked document extraction project(s).

1. [Integrate IDP into your processes](idp/idp-integrate.md) by adding your published projects to a BPMN diagram.

:::info

- New to IDP? See [key IDP concepts](idp/idp-key-concepts.md) to learn about key IDP concepts and terms.
- See [Integrate IDP into your processes](idp/idp-integrate.md) for a simple worked example of how to integrate IDP into your processes.

:::
