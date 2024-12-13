---
id: idp-key-concepts
title: Key IDP concepts
description: "You can import a BPMN or DMN diagram at any time with Web Modeler."
---

When using IDP it is helpful to understand the following key concepts and terms.

## Structured and unstructured documents

When creating a document extraction project, your choice of [extraction method] depends on whether your documents contain structured or unstructured data.

### Structured documents

Structured documents have a predefined, consistent layout, such as rows and columns in a database or spreadsheet, or fields in a standardized form. Example structured documents include invoices, customer records, forms, and identity documents.

### Unstructured documents

Unstructured documents have a less defined, free-form layout that is typically more difficult to extract structured data from. For example, free-text paragraphs in emails or documents such as contracts, reports, and memos. IDP uses an [LLM foundation model] to extract data from this type of document.

## LLM foundation models

LLM Foundation models are large-scale, pre-trained AI models that can be adapted for various document processing tasks without extensive retraining. For IDP, these models serve as a powerful base for extracting, understanding, and processing data from diverse document types.

## Document classification

During document automation, …

### Taxonomy

An IDP taxonomy is the predefined structure and set of data fields you want to extract from a document, such as the invoice ID, date, customer name, and so on. When extracting data from an unstructured document, you can define a taxonomy to determine the data fields you want to extract.
