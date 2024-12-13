---
id: idp-document-extraction
title: Document extraction
description: "You can import a BPMN or DMN diagram at any time with Web Modeler."
---

import IdpExtractionProjectModalImg from './img/idp-create-extraction-project-modal.png';

Create a document extraction project to identify and extract specific data from your structured and unstructured documents.

## About document extraction

Document extraction projects form the basis for using IDP in your end-to-end processes.

- Create a separate document extraction project for each type of document you want to categorize and extract data from, such as an invoice, a report, identity document, and so on.
- Once published, extraction projects can be added to your processes, or linked to a [document automation](idp-document-automation.md) project.

## Create extraction project

To create an extraction project:

1. In your IDP application, select **Create new** > **Document extraction** to open the **Create an extraction project** modal.
   <img src={IdpExtractionProjectModalImg} alt="Create an extraction project modal" width="600px"/>
1. **Name**: Enter a descriptive name for the project, such as “Invoice type A” for example.
1. **Extraction method**: Select an extraction method based on whether your documents contain structured or unstructured data.

   - **Form extraction**: Select this method to extract data from structured documents.
   - **Unstructured data extraction**: Select this method to extract data from unstructured documents.

1. Click **Create** to create and open the new extraction project.
1. Configure and publish the project:
   - See [Extract structured data](idp-structured-extraction.md) to learn how to configure and publish a structured data extraction project.
   - See [Extract unstructured data](idp-unstructured-extraction.md) to learn how to configure and publish an unstructured data extraction project.

:::info
Not sure what extraction method to use? See [Structured and unstructured documents](idp-key-concepts.md) to help determine what kind of document(s) you will be processing.
:::
