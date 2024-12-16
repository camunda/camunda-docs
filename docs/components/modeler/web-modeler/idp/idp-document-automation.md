---
id: idp-document-automation
title: Document automation
description: "You can import a BPMN or DMN diagram at any time with Web Modeler."
---

Create a document automation project to automatically classify and extract data from documents based on one or more linked document extraction model(s).

## About document automation

Document automation allows you to automatically extract data from complex PDF documents.

For example, if you want to process large multi-page PDFs containing multiple document types (invoices, reports, forms), you can create a document automation project to extract the specific data you want.

- You must link at least one [document extraction](idp-document-extraction.md) project so the LLM can accurately analyze, classify, and extract document data.
- You can choose the LLM you want to use, allowing you to test different models until you find the one that best suits your budget and accuracy requirements.
- Document classification involves automatically categorizing documents into predefined classes/types, based on their content.

## Create document automation project

To create a document automation project:

1. [Add projects]: Link one or more document extraction projects to help the system analyze and categorize your documents.
1. [Test classification] Select an LLM and test the document classification results.
1. [Publish]: Publish the project to make it available to use in your document processing BPMN diagrams.
