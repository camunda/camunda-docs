---
id: idp-key-concepts
title: IDP concepts
description: "Key intelligent document processing (IDP) concepts and terms, such as the difference between structured and unstructured documents."
---

import IdpStructuredDocumentImg from './img/idp-structured-document.png';
import IdpUnstructuredDocumentImg from './img/idp-unstructured-document.png';
import IdpExtractionFieldImg from './img/idp-extraction-field.png';

When using IDP it is helpful to understand the following key concepts and terms.

## Structured and unstructured documents {#documents}

<!-- Your choice of extraction method depends on whether your documents contain structured or unstructured data. -->

Documents are typically classified as containing either structured or unstructured data.

### Structured documents {#structured}

<div class="double-column-container">
<div class="double-column-left"  style={{marginRight: '30px'}}>

<img src={IdpStructuredDocumentImg} alt="Example structured document" class="img-noborder img-600 img-transparent" />

</div>
<div class="double-column-right">

Structured documents have a predefined, consistent layout and fixed format, such as rows and columns in a database or spreadsheet, or fields in a standardized form.

Data in a structured document has a fixed location. For example, the ID, date, and company name are always located in the same place.

Example structured documents include:

- Invoices/ customer records
- Forms
- Identity documents

<!-- Use [structured data extraction](idp-structured-extraction.md) to extract data from this type of document. -->

</div>
</div>

### Unstructured documents {#unstructured}

<div class="double-column-container">
<div class="double-column-left"  style={{marginRight: '30px'}}>

<img src={IdpUnstructuredDocumentImg} alt="Example unstructured document" class="img-noborder img-600 img-transparent" />

</div>
<div class="double-column-right">

Unstructured documents have a less defined, free-form layout that can be more difficult to extract structured data from, such as free-text paragraphs where key information is located in unpredictable places.

IDP uses an [LLM foundation model](#llms) to extract data from this document type.

Example unstructured documents include:

- Emails
- Reports
- Memos

<!-- Use [unstructured data extraction](idp-unstructured-extraction.md) to extract data from this document type. -->

</div>
</div>

## Document classification {#classification}

Document classification uses an [LLM foundation model](#llms) to analyze, categorize, and assign a document type to incoming documents based on their content.

- Create a [document classification template](idp-document-classification.md) to define the document types you want to classify (such as invoices, contracts, or identity documents), test classification accuracy, and publish the template for use in your processes.
- Classification enables you to route different document types to the correct downstream process step or [document extraction](idp-document-extraction.md) template.
- Classification accuracy is improved with well-defined document types (including clear descriptions and classification instructions) and a set of test documents that accurately represents each type of document you want to process.

### Fallback output value {#fallback}

The fallback output value is the value returned when a document cannot be classified as any of the defined types. By default, this value is `unclassified-document`, but you can customize it to align with your process routing logic.

### Preconfigured document types {#preconfigured-types}

IDP provides a set of preconfigured document types (such as invoice, contract, identity document) to help you get started quickly when creating a [classification template](idp-document-classification.md#define-document-types). You can also create custom document types for categories specific to your business.

## Extraction model/Large Language Models (LLM) {#llms}

LLM Foundation models are large-scale, pre-trained AI models that can be adapted for various document processing tasks without extensive retraining.

- For IDP, these models serve as a powerful base for extracting, understanding, and processing data from diverse document types. Algorithms are used to learn document patterns and to improve data extraction accuracy over time.

- IDP allows you to work with and test different extraction models until you find the model that best suits your budget and accuracy requirements.

- See [extraction models](idp-reference.md#extraction-models) for a list of currently supported LLM extraction models.

## Text extraction engines {#extraction-engines}

A text extraction engine determines how text is extracted from a document before the LLM processes its content. Different document types and quality levels benefit from different extraction approaches.

- **Lightweight parsing** (Fast Extract): For digitally generated PDFs where text is already embedded, a fast built-in parser can extract text without OCR, reducing processing time and cost.
- **OCR-based extraction** (AWS Textract, Azure Document Intelligence, GCP Document AI): For scanned or image-based documents, OCR engines provide high-accuracy text recognition from images.
- **Multimodal**: For LLMs that support vision capabilities, the document can be sent directly to the model for native interpretation, bypassing a separate text extraction step entirely.

You can select the extraction engine per unstructured extraction template during [extraction testing](idp-unstructured-extraction.md#extract-data), [validation](idp-unstructured-extraction.md#validate-extraction), and [publishing](idp-unstructured-extraction.md#publish-template), to optimize accuracy, performance, and cost for each document type.

:::info
For a full list of available extraction engines, see [text extraction engines](idp-reference.md#extraction-engines).
:::

## Extraction fields {#fields}

Extraction fields are the data fields you want to extract from a document, such as an invoice ID, date, customer name, and so on.

<img src={IdpExtractionFieldImg} class="img-800" alt="Example structured document" />

- You must add a separate field for each piece of information you want to extract from a document.
- For example, for an invoice, add a separate field for the invoice ID, date, customer name, invoice amount, and so on.

:::info
To learn more about extraction field data types, see [extraction field data types](idp-reference.md#data-types).
:::
