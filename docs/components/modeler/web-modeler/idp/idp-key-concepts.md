---
id: idp-key-concepts
title: Key IDP concepts
description: "You can import a BPMN or DMN diagram at any time with Web Modeler."
---

import IdpStructuredDocumentImg from './img/idp-structured-document.png';

When using IDP it is helpful to understand the following key concepts and terms.

## Structured and unstructured documents

When creating a document extraction project, your choice of [extraction method](idp-document-extraction.md#create-extraction-project) depends on whether your documents contain structured or unstructured data.

### Structured documents

<div class="double-column-container">
<div class="double-column-left"  style={{marginRight: '30px'}}>

<img src={IdpStructuredDocumentImg} alt="Example structured document" width="600px" style={{marginTop: '10px'}}/>

</div>
<div class="double-column-right">

Structured documents have a predefined, consistent layout and fixed format, such as rows and columns in a database or spreadsheet, or fields in a standardized form.

The data in a structured document has a fixed location. For example, the date, company name, and person name is always located in the same place.

Example structured documents include:

- Invoices
- Customer records
- Forms
- Identity documents

</div>
</div>

### Unstructured documents

<div class="double-column-container">
<div class="double-column-left"  style={{marginRight: '30px'}}>

<img src={IdpStructuredDocumentImg} alt="Example unstructured document" width="600px" style={{marginTop: '10px'}}/>

</div>
<div class="double-column-right">

Unstructured documents have a less defined, free-form layout that is typically more difficult to extract structured data from, such as free-text paragraphs and key information in unpredictable places.

IDP uses an [LLM foundation model](#llm-foundation-models) to extract data from this type of document.

Example unstructured documents include:

- Emails
- Reports
- Memos

</div>
</div>

## LLM foundation models

LLM Foundation models are large-scale, pre-trained AI models that can be adapted for various document processing tasks without extensive retraining. For IDP, these models serve as a powerful base for extracting, understanding, and processing data from diverse document types.

## Document classification

During document automation, …

### Extraction fields

Extraction fields are the set of data fields you want to extract from a document, such as the invoice ID, date, customer name, and so on. When extracting data from an unstructured document, you can define the extraction fields you want to use as the basis for extracting data.
