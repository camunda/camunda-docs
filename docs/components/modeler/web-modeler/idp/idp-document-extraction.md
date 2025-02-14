---
id: idp-document-extraction
title: Document extraction
description: "Document extraction projects form the basis for using IDP in your end-to-end processes. Extract data from a single type of structured or unstructured document."
---

import IdpExtractionProjectModalImg from './img/idp-create-extraction-project-modal.png';

Extract data from a single type of structured or unstructured document.

## About document extraction

Document extraction projects form the basis for using IDP in your end-to-end processes.

- Create a separate document extraction project for each type of document you want to categorize and extract data from, such as an invoice, a report, identity document, and so on.
- Published extraction projects can be [integrated into your processes](idp-integrate.md) or linked to a [document automation](idp-document-automation.md) project.

## Create document extraction project

To create a document extraction project:

1. In your IDP application, select **Create new** > **Document extraction** to open the **Create an extraction project** modal.
   <img src={IdpExtractionProjectModalImg} alt="Create an extraction project modal" width="600px"/>

   - **Name**: Enter a descriptive name for the project, such as “Invoice type A” for example.
   - **Extraction method**: Select an extraction method:
     - **Form extraction**: Select this method to extract data from structured documents.
     - **Unstructured data extraction**: Select this method to extract data from unstructured documents.

1. Click **Create** to create and open the new extraction project.
1. Configure and publish the project:
   - [Extract structured data](idp-structured-extraction.md): Configure and publish a structured data extraction project.
   - [Extract unstructured data](idp-unstructured-extraction.md): Configure and publish an unstructured data extraction project.

:::tip
Not sure which extraction method to use? See [structured and unstructured documents](idp-key-concepts.md#structured-and-unstructured-documents) to help determine what type of document(s) you will be processing.
:::
