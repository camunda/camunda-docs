---
id: idp-example
title: Example IDP integration
description: "A worked example showing how you can integrate a published IDP document extraction template into a simple process in Web Modeler."
---

import IdpExampleImg from './img/idp-example-process.png';
import IdpFilepickerImg from './img/idp-filepicker.png';
import IdpExtractImg from './img/idp-example-extract-step.png';
import IdpResultsImg from './img/idp-example-results.png';
import IdpTemplateImg from './img/idp-example-template.png';

This worked example shows how you can [integrate IDP](idp-configuration.md) into a simple process.

## About this worked example

This worked example demonstrates how a published [document extraction template](idp-document-extraction.md) can be used to extract data from a document uploaded via [Tasklist](/components/tasklist/introduction-to-tasklist.md).

In this example, a process is set up with the following steps:

<img src={IdpExampleImg} class="img-800" alt="An example process diagram with three steps" />

1. **Upload document**: A PDF document is uploaded manually in Tasklist.
1. **Extract data**: A published document extraction template automatically extracts the required data from the PDF document.
1. **View results**: The extraction results are viewed.

## Document extraction template

The document extraction template used in this example uses the following extraction fields and sample document.

| Field name      | Field type | Prompt                    |
| :-------------- | :--------- | :------------------------ |
| invoiceType     | String     | Find the type of invoice. |
| invoiceCustomer | String     | The invoice customer.     |
| invoiceId       | String     | The invoice ID.           |

<img src={IdpTemplateImg} alt="An example process diagram with three steps" />

## Upload document

In the first step of the process, a [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) and linked [form](/components/modeler/forms/camunda-forms-reference.md) allows a document to be uploaded in Tasklist.

<img src={IdpFilepickerImg} alt="The Filepicker element" />

- The form uses the [Filepicker](/components/modeler/forms/form-element-library/forms-element-library-filepicker.md) form element to upload a document.
- The Filepicker element **Key** is set to `documents`. This is then bound to the **Document** input in the document extraction template.

:::info
You can also use the [Camunda 8 REST API](/apis-tools/camunda-api-rest/camunda-api-rest-overview.md) to upload documents for IDP. To learn more about storing, tracking, and managing documents in Camunda 8, see [document handling](/components/concepts/document-handling.md).
:::

## Extract data

In this step, the document extraction template is [applied to a task](idp-integrate.md#create-and-configure-an-idp-task) to automatically extract data from the uploaded document.

<img src={IdpExtractImg} alt="Document extraction step" />

- **Input message data**: The **Document** input uses the FEEL expression `documents[1]` to get the first document in the FEEL array, as per the uploaded document **Key**.
- **Output mapping**: The extracted data is stored as JSON in a **Result variable** named `idpResult`.

## View results

Once the process completes, the results of the extraction are available in the `idpResult` variable.

For example, viewing the process in Operate shows the data was accurately extracted from the document as follows:

```
{
  "extractedFields": {
    "invoiceType": "A",
    "invoiceId": "A/3454",
    "invoiceCustomer": "Camunda"
  }
}
```

<img src={IdpResultsImg} alt="Document extraction step" />

:::note
This step in the process could be one of many types of element, depending on what you want to do with the extraction results. For example, you might want to display, check, or summarize the extracted data, or route to further actions in the process depending on the document data extracted by IDP.
:::
