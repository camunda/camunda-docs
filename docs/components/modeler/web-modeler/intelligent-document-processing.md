---
id: idp
title: Intelligent document processing (IDP)
description: "You can import a BPMN or DMN diagram at any time with Web Modeler."
---

import IdpOverviewImg from './img/idp-overview-diagram.png';

Camunda intelligent document processing (IDP) uses artificial intelligence (AI) and machine learning (ML) to classify, extract, and process data from your structured and unstructured documents.

## About IDP

Use IDP to integrate automated document processing into your end-to-end processes.

IDP can identify, extract, and organize specific pieces of data from your structured and unstructured PDF documents into a structured format you can use in your BPMN diagrams.

For example, you can use IDP to extract data from invoices and other document types in your document processing workflow.

<img src={IdpOverviewImg} alt="An overview of intelligent document processing" />

## Get started with IDP

To start using IDP in your processes:

1. Create an [IDP application](idp/idp-applications.md) folder to store and manage a set of related IDP projects.

1. Create and publish IDP projects:

   - Create a [document extraction](idp/idp-document-extraction.md) project to identify and extract data from a single type of document (for example, an invoice).

   - Create a [document automation](idp/idp-document-automation.md) project to automatically extract data from larger, more complex documents (for example, a multi-page PDF document made up of many types of documents and data). This project type is based on and requires one or more linked document extraction project(s).

1. [Integrate IDP into your processes](idp/idp-integrate.md) by adding your published projects to a BPMN diagram.

:::tip

- New to IDP? See [key IDP concepts](idp/idp-key-concepts.md) to learn about key IDP concepts and terms.
- See [Get started with IDP] for a worked example of how to integrate IDP into your processes.

:::

## Configure IDP for Self-Managed

What is the path for Self-Managed?
