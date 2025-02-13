---
id: idp-unstructured-extraction
title: Extract unstructured data
description: "Unstructured data extraction allows you to extract data from unstructured documents."
---

import IdpUnstructuredDataExtractionImg from './img/idp-unstructured-data-extraction-screen.png';
import IdpUploadDocumentsUnstructuredImg from './img/idp-upload-documents-unstructured.png';
import IdpIconPassImg from './img/idp-validation-icon-pass.png';
import IdpIconCautionImg from './img/idp-validation-icon-caution.png';
import IdpIconFailImg from './img/idp-validation-icon-fail.png';
import IdpValidationExampleImg from './img/idp-validation-example.png';
import IdpExtractionFieldsImg from './img/idp-extraction-fields-unstructured.png';
import IdpValidationResultsImg from './img/idp-validation-results.png';
import IdpPublishProjectImg from './img/idp-publish-unstructured-project.png';

Use this extraction method to extract data from [unstructured documents](idp-key-concepts.md#unstructured-documents).

## Data extraction steps

Complete the following steps to configure and publish an unstructured data extraction project:

1. [Upload documents](#step-1-upload-documents): Upload a set of sample documents to use for training the extraction model.
1. [Extract fields](#step-2-extract-fields): Add and configure the [extraction fields](idp-key-concepts.md#extraction-fields) you want to use to extract data.
1. [Validate extraction](#step-3-validate-extraction): Test and evaluate the data extraction results using your uploaded documents.
1. [Publish](#step-4-publish): Publish the project to make it available for use [in your processes](idp-integrate.md) and [document automation](idp-document-automation.md) projects.

<!-- Configure and publish your project on the **Unstructured data extraction** screen.

<img src={IdpUnstructuredDataExtractionImg} alt="Unstructured data extraction screen" />

:::tip
Use the tabs to navigate between configuration steps at any time.
::: -->

## Step 1: Upload documents

Start by uploading a set of sample PDF documents that represent the specific document type you want to extract data from. You will use these documents throughout the data extraction process.

<img src={IdpUploadDocumentsUnstructuredImg} alt="Unstructured data extraction screen" />

To upload your sample document(s):

1. Click **Upload documents** to browse for and upload your sample document(s).
1. Once you have finished uploading your sample document(s) and want to start testing data extraction, either:
   - Select the **Extract fields** tab.
   - Click the **Extract** icon for the document you want to extract data from.

### Document upload guidelines

Start by uploading a sample document that contains all the data fields you want to extract for this type of document.

- If a single document does not include all the data fields you require, upload multiple documents to cover all variations of the document type. The number and range of documents you need to upload depends on the complexity of your unstructured data and your requirements.

- For example, you must upload at least one sample document for each variation of a document type. This should provide enough extraction accuracy if it is an exact representation of the specific type of document, with no variations in layout or content. However, it is more likely that you will need to upload multiple documents to ensure acceptable extraction accuracy.

- When choosing your sample documents, variation is important to ensure the system captures the full range of document types it will encounter. As a general guideline, Camunda recommends starting with three to five documents, and uploading more as needed to represent the full range of possible data types.

## Step 2: Extract fields

On the **Extract fields** tab, add the data [extraction fields](idp-key-concepts.md#extraction-fields) you want to populate with data from your document(s).

<img src={IdpExtractionFieldsImg} alt="Unstructured data extraction screen" />

- Add a separate field for each piece of information you want to extract. For example, for an invoice, add a field for the invoice ID, date, vendor name, amount, and so on.
- You can then extract data from your sample document(s) using your chosen LLM foundation model, edit and refine your fields, and save the extracted data as a test case to compare outcomes across different LLM models.

### Add extraction field

Add an extraction field for each piece of data you want to extract from your document(s).

1. Click **Add field**.
1. **Field name**: Enter a descriptive name for the field.
   - Example: "invoice_id”.
   - The name format should follow [FEEL naming convention](/components/modeler/feel/language-guide/feel-variables.md#variable-names), for example it is case sensitive and should not include spaces.
1. **Type**: Select the data type you want/expect the field to be populated with.
   - Example: “Number” for a monetary field (“invoice_amount”).
   - See [extraction field data types](idp-reference.md#extraction-field-data-types).
1. **Prompt**: Enter a clear and specific prompt to guide the LLM in accurately extracting data.
   - Example: For an "invoice_date" field, you might use "The date when the invoice was issued".
   - Try and describe the expected outcome in the prompt in clear and concise terms. Refer to the official documentation for your chosen LLM for guidance and best practice for writing prompts.
1. Click **Add** to add the field.
1. Repeat the process until you have added all required extraction fields. You can edit and delete fields at any time.

:::note

- The **Field name** is used as an output variable in a BPMN process.
- To edit or delete an existing extraction field, click the three vertical dots next to the field to open the Options menu.

:::

### Extract data and save as a test case

Once you have added your extraction fields, select an LLM model and test the data extraction.

1. **Extraction model**: Select the LLM model you want to use.
1. Select the document you want to test the data extraction against.
1. Click **Extract document**.
1. The **Extraction fields** are populated with the extracted document data.
   - Check the extracted data is accurate and matches what you require from the document.
   - For incorrect field results, edit the field **Prompt** and retry the data extraction until the results are accurate.
   - Add additional fields as required during testing.
1. Click **Save as test case** to save the results as a test case.
1. (Optional) Test different LLM models with this test case to compare results and determine which model produces the most accurate extraction.
1. Repeat the process of creating and evaluating a test case for your other uploaded sample documents.
1. Once you are ready to validate your data extraction configuration, select the **Validate extraction** tab.

:::tip

- You will achieve different results with different LLM models. Test different models until you find the one that best suits your budget and accuracy requirements.
- You can save and overwrite a test case at any time with your latest results.

:::

## Step 3: Validate extraction

On the **Validate extraction** tab, validate and test the configured data extraction against your uploaded documents.

<img src={IdpValidationResultsImg} alt="Validate extraction screen" />

This step evaluates the data extraction results produced by the LLM model, using your extraction fields and prompts.

To validate the data extraction:

1. **Project extraction model**: Select the LLM model to use for validation.
1. Click **Test all documents** to run the extraction validation against all your uploaded sample documents.
1. The extraction validation results are shown in the **Testcase results** column.
   - A [validation status](#validation-status) summary is shown for each field to indicate the accuracy of the data extracted from each document. For example, if the extracted value matches the expected test case output, it is shown as a “Pass”.
   - Click on a field to expand the detailed results for each individual document.
   - Click **Run failed test case**(s) to...
1. If your evaluation results are not successful, try the following and rerun the validation:
   - Change the LLM model to try and obtain more accurate results with a different model.
   - Edit field prompts. Select the three vertical dots on a field to open the actions menu, and select **Edit prompt**.
   - Go back to a previous step and edit your data extraction configuration, or upload more sample documents.
1. Once you are satisfied that your data extraction configuration is accurate, you can publish the project. Select the **Publish** tab.

:::tip
Search and filter the results to work with specific documents or extraction fields.
:::

### Validation status

| Icon                                                                        | Status  | Description                                                                                                                     |
| :-------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------ |
| <img src={IdpIconPassImg} alt="Pass icon" className="inline-image" />       | Pass    | The document validation passed with accurate and expected results.                                                              |
| <img src={IdpIconCautionImg} alt="Caution icon" className="inline-image" /> | Caution | A test case is missing for comparison. Click **Save test case** to...                                                           |
| <img src={IdpIconFailImg} alt="Fail icon" className="inline-image" />       | Fail    | The validation results do not match the expected output for the document. Click **Review document** to investigate and resolve. |

#### Example

The following example shows the results of a partially successful extraction against three documents.

<img src={IdpValidationExampleImg} alt="Example validation results table" />

The expanded "contract_start_date" field shows that each document had different validation results.

- The first document passed the validation, with the **Extracted value** matching the **Expected test case output**.
- The second document could not be validated as a test case was not found for comparison. Click **Save test case** to create a test case for the document.
- The third document failed validation as the **Extracted value** did not match the **Expected test case output**. Click **Review document** to open the document again and check the prompt for this field.

## Step 4: Publish

On the **Publish** tab, publish the project to make it available for [integration into your processes](idp-integrate.md) and [document automation](idp-document-automation.md) projects.

<img src={IdpPublishProjectImg} alt="Publish project screen" />

1. Click **Publish** to open the **Publish Extraction Project** modal.
1. Enter a version name and description for the project and click **Publish**.
1. The project is published and becomes available to use [in your processes](idp-integrate.md) or [document automation](idp-document-automation.md) projects.

:::note
Projects only become available in your processes or document automation projects once published. Unpublished projects are shown with a “Draft” **Status**.
:::
