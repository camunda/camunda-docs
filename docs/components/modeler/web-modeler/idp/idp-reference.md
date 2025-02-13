---
id: idp-reference
title: IDP reference
description: "Technical reference information for IDP, such as technical architecture, supported document file formats, and document storage."
---

import IdpArchitectureImg from './img/idp-architecture-diagram.png';
import IdpSecretsImg from './img/idp-connector-secrets.png';

Technical reference information for IDP, including technical architecture, supported documents, and known limitations.

## Technical architecture

IDP offers a composable architecture that allows you to customize and extend IDP capabilities as needed. This flexibility enables you to adapt quickly to evolving business needs while maintaining a streamlined and manageable system.

When you publish an IDP project, an IDP extraction [connector template](/components/connectors/manage-connector-templates.md) is created.

<img src={IdpArchitectureImg} alt="Architecture diagram of IDP" width="500px" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}}/>

The IDP extraction connector integrates with Camunda document handling connectors and APIs such as [Amazon S3](/components/connectors/out-of-the-box-connectors/amazon-s3.md), [Amazon Textract](/components/connectors/out-of-the-box-connectors/amazon-textract.md), [Amazon Comprehend](/components/connectors/out-of-the-box-connectors/amazon-comprehend.md), and [Amazon Bedrock](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md) to retrieve and process documents.

1. **Document upload**: The connector accepts uploaded documents as input. These documents can be uploaded to a local document store, and their references are used in the extraction process. For example, the connector uploads the document to an Amazon S3 bucket for extraction.

1. **Amazon Textract**: Uploaded documents are analyzed by Amazon Textract, which extracts text data and returns the results. The connector configuration includes specifying the document, the S3 bucket name for temporary storage during Amazon Textract analysis, and other required parameters such as extraction fields and Amazon Bedrock Converse parameters.

1. **Amazon Bedrock**: Your [extraction field](idp-key-concepts.md#extraction-fields) prompts are used by Amazon Bedrock Converse to extract data from the document. The extracted content is mapped to process variables, and the results stored in a specified result variable.

:::note
You may encounter extraction errors during testing if you have not added your Amazon AWS IAM account **access key** and **secret key** as a [connector secret](/components/console/manage-clusters/manage-secrets.md) to your cluster when [configuring IDP](../intelligent-document-processing.md#configure-idp).
:::

## Document file formats

IDP currently only supports data extraction from the following document file formats.

| File format | Description                                                                                                                                                                                                                                                                                       |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <p>PDF</p>  | <p><ul><li>PDF documents must not be password protected.</li><li><p>Maximum document file size is 4MB.</p></li><li><p>Both text and image content can be extracted from a PDF document. For example, data can be extracted from a scanned image that has been converted to PDF.</p></li></ul></p> |

## Document storage

For SaaS, uploaded documents are stored in Web Modeler itself, not your cluster.

Storage limit?

## Document language support

IDP supports data extraction and processing of documents in different languages.

IDP integrates with [Amazon Textract](/components/connectors/out-of-the-box-connectors/amazon-textract.md), which supports multilingual text extraction and is capable of detecting and extracting text in multiple languages. This ensures that the extracted text can be accurately mapped to process variables and used within your workflows, regardless of a document's language.

For example, as of February 2025, Amazon Textract can detect printed text and handwriting from the Standard English alphabet and ASCII symbols, and can extract printed text, forms and tables in English, German, French, Spanish, Italian and Portuguese.

:::info
Refer to [Amazon Textract FAQs](https://aws.amazon.com/textract/faqs/) for full details of supported languages.
:::

## Extraction field data types

IDP allows you to choose an [extraction field](idp-key-concepts.md#extraction-fields) data type to indicate to the LLM what type of data should be extracted. This helps the LLM more accurately extract the data you want.

For example, if you want to extract an expected numeric value (such as a monetary value), select the `Number` data type for the extraction field.

| Data type | Description                                  |
| :-------- | :------------------------------------------- |
| Boolean   | True or false values, such as "yes" or "no". |
| Date      | Dates in specific formats.                   |
| Number    | Numeric values.                              |
| String    | A sequence of characters.                    |

<!-- ## Known limitations

Content -->
