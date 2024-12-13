---
id: idp-unstructured-extraction
title: Extract unstructured data
description: "You can import a BPMN or DMN diagram at any time with Web Modeler."
---

import IdpUnstructuredDataExtractionImg from './img/idp-unstructured-data-extraction-screen.png';
import IdpUploadDocumentsUnstructuredImg from './img/idp-upload-documents-unstructured.png';

Use this extraction method to extract data from unstructured documents.

## About unstructured data extraction

Intro

You can configure and publish your project on the **Unstructured data extraction** screen.

<img src={IdpUnstructuredDataExtractionImg} alt="Unstructured data extraction screen" />

:::note
Use the tabs to navigate between configuration steps at any time.
:::

## Data extraction steps

Complete the following steps to configure and publish an unstructured data extraction project:

1. [Upload documents](#step-1-upload-documents): Upload a set of sample documents to use for training the extraction model.
1. [Extract fields](#step-2-extract-fields) Define the [extraction fields](idp-key-concepts.md#extraction-fields) you want to use to help improve extraction accuracy.
1. [Evaluate extraction](#step-3-evaluate-extraction): Test the data extraction using your uploaded document(s) and evaluate the extraction results.
1. [Publish](#step-4-publish): Publish the project to make it available to use in your processes and [document automation](idp-document-automation.md) projects.

## Step 1: Upload documents

Start by uploading sample PDF documents that represent the specific document type you want to extract data from.

Your documents are analyzed and used as samples to test your data extraction configuration.

<img src={IdpUploadDocumentsUnstructuredImg} alt="Unstructured data extraction screen" />

To upload your sample document(s):

1. Click **Upload document** to browse for and upload a sample document.
1. Once the document has successfully uploaded, click **Extract** to extract data from the document. Repeat this process for all documents you want to upload.
1. Select the **Extract fields** tab to start extracting data.

:::tip
Return to this tab at any time to upload more documents, search your uploaded documents, and delete uploaded documents.
:::

### Document upload guidelines

Start by uploading a single model sample document that contains all the data fields you want to extract for this type of document.

- If a single document doesn’t include all required data fields, upload multiple documents to cover all the variations for this document type. The number and range of sample documents you need to upload depends on the complexity of your unstructured data and your requirements.

- For example, you should upload as a minimum a single sample document for each variation of a document type. This may provide enough extraction accuracy if it is an exact representation of the specific type of document. However, it is more likely that you will need to upload multiple sample documents to ensure extraction accuracy.

## Step 2: Extract fields

## Step 3: Evaluate extraction

## Step 4: Publish
