---
id: idp-structured-extraction
title: Extract structured data
description: "Structured data extraction allows you to extract data from structured documents."
---

Use this extraction method to extract data from [structured documents](idp-key-concepts.md#structured-documents).

## About structured data extraction

Use this extraction method for documents with a consistent layout, such as invoices, tax forms (for example, W-2s, VAT declarations), and loan or insurance applications.

Structured extraction allows you to:

- Upload a sample document.
- Automatically discover fields and tables.
- Configure the fields and tables you want included in your template.
- Receive confidence scores to each extracted value.
- Build reusable templates.
- Integrate extracted data into BPMN processes via variables.

## About OCR

Optical Character Recognition (OCR) technology is used to detect and extract text and layout from scanned or digital documents.

Structured data extraction currently uses Amazon Textract:

- Extracts text, layout, and key-value pairs.
- Supports horizontal text only.
- Supports English handwriting.
- Supported languages for typed characters: Spanish, German, French, Italian, Portuguese.

Limitations to consider:

- No language detection.
- No vertical text support.
- Limited support for complex custom fields.
- No detection of table headers.

## Data extraction steps

Complete the following steps to configure and publish a structured data extraction template:

1. [Upload sample document and run extraction](#upload): Upload a sample document and run an extraction of document fields and tables.
1. [Configure template](#configure): Select the fields and tables you want to include in your template.
1. [Test data extraction](#test): (Optional) Upload documents to test your selection before publishing it as a template.
1. [Publish](#publish): Publish the project to make it available for use in your BPMN diagrams, processes, and [document automation](idp-document-automation.md) projects.

## Upload a sample document and run extraction {#upload}

## Configure template {#configure}

## Test data extraction {#test}

## Publish {#publish}
