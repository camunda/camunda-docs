---
id: idp-reference
title: IDP reference
description: "You can import a BPMN or DMN diagram at any time with Web Modeler."
---

The following technical reference information is provided for IDP.

## IDP technical architecture

diagram

- Amazon Textract Connector
- Amazon Bedrock Connector
- Amazon S3 Connector

## Document file formats

IDP currently only supports data extraction from the following document file formats.

| File format | Description                                                                                                                                                                                                                              |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PDF         | <p><ul><li>PDF documents must not be password protected.</li><li>Maximum document file size is 4MB.</li><li>Text and image content can be extracted from a PDF document. For example, a scanned document converted to PDF.</li></ul></p> |

## Document storage

For SaaS, uploaded documents are stored in Web Modeler itself, not your cluster.

Storage limit?

## Extraction field data types

You can use any of the following data types when creating an extraction field.

| Data type | Description |
| :-------- | :---------- |
| Boolean   | ...         |
| Number    | ...         |
| String    | ...         |
