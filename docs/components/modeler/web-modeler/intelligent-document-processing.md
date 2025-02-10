---
id: idp
title: Intelligent document processing (IDP)
description: "Use intelligent document processing (IDP) to integrate automated document processing into your end-to-end processes."
---

import IdpOverviewImg from './img/idp-overview-diagram.png';

Use intelligent document processing (IDP) to integrate automated document processing into your end-to-end processes.

## About IDP

IDP uses artificial intelligence (AI) and machine learning (ML) to identify, extract, and organize data from your structured and unstructured documents into a structured format you can use in your processes.

For example, you can use IDP to extract data from invoices and other document types in your document processing workflow.

<img src={IdpOverviewImg} alt="An overview of intelligent document processing" />

## Configure IDP

To configure IDP in Camunda 8 you will need to:

- Add your Amazon AWS IAM account **access key** and **secret key** as a [connector secret](/components/console/manage-clusters/manage-secrets.md) to the cluster you want to use with IDP. Camunda secrets allow you to store credentials and avoid exposing sensitive information.
- Self-Managed users must also deploy the [Amazon Bedrock](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md) and [Amazon Textract](/components/connectors/out-of-the-box-connectors/amazon-textract.md) connectors used by IDP to extract document content and converse with LLM models.

:::note
To learn more about the IDP technical architecture, see [IDP reference](idp/idp-reference.md).
:::

## Get started with IDP

To start using IDP in your processes:

1. Create an [IDP application](idp/idp-applications.md) folder in which to store and manage a set of related IDP projects.

1. Create and publish your IDP projects in your IDP application folder:

   - Create a [document extraction](idp/idp-document-extraction.md) project to identify and extract data from a single type of document (for example, an invoice).

   - Create a [document automation](idp/idp-document-automation.md) project to automatically extract data from larger, more complex documents (for example, a multi-page PDF document made up of many types of documents and data). This project type is based on and requires one or more linked document extraction project(s).

1. [Integrate IDP into your processes](idp/idp-integrate.md) by adding your published projects to a BPMN diagram.

:::tip

- New to IDP? See [key IDP concepts](idp/idp-key-concepts.md) to learn about key IDP concepts and terms.
- See [Integrate IDP into your processes](idp/idp-integrate.md) for a worked example of how to integrate IDP into your processes.

:::
