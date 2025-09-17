---
id: idp-document-extraction
title: Document extraction
description: "Document extraction projects form the basis for using intelligent document processing (IDP) in your end-to-end processes. Extract data from a single type of structured or unstructured document."
---

import IdpExtractionProjectModalImg from './img/idp-create-extraction-project-modal.png';

Extract data from a single type of structured or unstructured document.

## About document extraction

Document extraction templates form the basis for using IDP in your end-to-end processes.

- Create a separate document extraction template for each type of document you want to categorize and extract data from, such as an invoice, a report, identity document, and so on.
- Published document extraction templates can then be used to [integrate IDP into your processes](idp-integrate.md).
<!-- - Published extraction projects can be [integrated into your processes](idp-integrate.md) or linked to a [document automation](idp-document-automation.md) project. -->

## Create document extraction template

To create a new document extraction template:

1. In your [IDP application](idp-applications.md), click **Create extraction project** to open the Create new project modal.
   <img src={IdpExtractionProjectModalImg} alt="Create an extraction project modal" width="600px" style={{marginTop: '0'}} />
1. Select the **Extraction method** depending on whether your documents contain structured or unstructured data.
   - **Unstructured data extraction**: Extract data from unstructured documents.
   - **Structured form extraction**: Extract data from structured documents.
1. **Name**: Enter a descriptive name for the type of document, such as “Invoice type A” for example.
1. **Description**: Enter a description to provide more detailed information about the document type.
1. Click **Create** to create and open the new document extraction template.
1. Configure and publish the template:
   - [Extract unstructured data](idp-unstructured-extraction.md): Configure and publish an unstructured data extraction template.
   - [Extract structured data](idp-structured-extraction.md): Configure and publish a structured data extraction template.

:::tip
Not sure which extraction method to use? See [structured and unstructured documents](idp-key-concepts.md#structured-and-unstructured-documents) to help determine what type of document(s) you will be processing.
:::
