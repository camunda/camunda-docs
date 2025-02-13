---
id: idp-reference
title: IDP reference
description: "Technical reference information for IDP, such as technical architecture, supported document file formats, and document storage."
---

import IdpArchitectureImg from './img/idp-architecture-diagram.png';

Technical reference information for IDP, including the technical architecture and supported document file formats.

## Architecture

IDP offers a composable architecture that allows you to customize and extend IDP capabilities as needed. This flexibility enables you to adapt quickly to evolving business needs while maintaining a streamlined and manageable system.

When you publish an IDP project, an IDP extraction connector template is created.

<img src={IdpArchitectureImg} alt="Architecture diagram of IDP" width="500px" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}}/>

The IDP extraction connector is used by IDP to integrate with Camunda document connectors and APIs, such as [Amazon S3](/components/connectors/out-of-the-box-connectors/amazon-s3.md), [Amazon Textract](/components/connectors/out-of-the-box-connectors/amazon-textract.md), [Amazon Comprehend](/components/connectors/out-of-the-box-connectors/amazon-comprehend.md), and [Amazon Bedrock](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md). This ensures that documents can be created, stored, and retrieved efficiently for processing.

1. **Document Input**: The connector accepts documents as input. These documents can be uploaded to a local document store, and their references are used in the extraction process. For example, the connector uploads the document to an Amazon S3 bucket for extraction.

1. **Amazon Textract**: Uploaded documents are then analyzed by Amazon Textract, which extracts the text and returns the results. The connector's configuration includes specifying the document, the S3 bucket name for temporary storage during Amazon Textract analysis, and other required parameters such as extraction fields and Amazon Bedrock Converse parameters.

1. **Amazon Bedrock**: Your [extraction field](idp-key-concepts.md#extraction-fields) prompts are used by Amazon Bedrock Converse to extract data from the document. The extracted content is mapped to process variables, and the results stored in a specified result variable. Error handling and retry mechanisms are also configurable.

## Document file formats

IDP currently only supports data extraction from the following document file formats.

| File format | Description                                                                                                                                                                                                                              |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PDF         | <p><ul><li>PDF documents must not be password protected.</li><li>Maximum document file size is 4MB.</li><li>Text and image content can be extracted from a PDF document. For example, a scanned document converted to PDF.</li></ul></p> |

## Document storage

For SaaS, uploaded documents are stored in Web Modeler itself, not your cluster.

Storage limit?

## Extraction field data types

You can use any of the following supported data types when creating an extraction field.

| Data type | Description |
| :-------- | :---------- |
| Boolean   | ...         |
| Number    | ...         |
| String    | ...         |
