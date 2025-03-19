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

This worked example shows how you can integrate a published document extraction template into a simple process.

## About this worked example

This worked example is provided for illustration purposes only, to demonstrate a simple process that uses a published document extraction template to extract data from a document uploaded via Tasklist.

The process diagram has the following steps:

<img src={IdpExampleImg} alt="An example process diagram with three steps" style={{width: '800px', border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}} />

1. **Upload document**: A PDF document is uploaded in Tasklist.
1. **Extract data**: A published document extraction template is used to extract data from the uploaded PDF document.
1. **View results**: The extraction results are viewed.

## Document extraction template

The document extraction template used in this example has the following extraction fields and sample customer invoice document.

| Field name      | Field type | Prompt                   |
| :-------------- | :--------- | :----------------------- |
| invoiceType     | String     | Find the type of invoice |
| invoiceCustomer | String     | The invoice customer     |
| invoiceId       | String     | The invoice ID           |

<img src={IdpTemplateImg} alt="An example process diagram with three steps" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}} />

## Upload document

In the first step of the process, a [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) and linked [form](/components/modeler/forms/camunda-forms-reference.md) allows a document to be uploaded in Tasklist.

<img src={IdpFilepickerImg} alt="The File picker element" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}} />

- The form uses a [File picker](/components/modeler/forms/form-element-library/forms-element-library-filepicker.md) form element to upload a document.
- The File picker element **Key** is set to `document`. This is used for the **Document** input in the document extraction template.

## Extract data

In this step, the document extraction template is [applied to a task](idp-integrate.md#create-and-configure-an-idp-task) to extract data from the uploaded document.

<img src={IdpExtractImg} alt="Document extraction step" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}} />

- **Input message data**: The **Document** input uses the FEEL expression `document[1]` to get the first document in the FEEL array, as per the uploaded document **Key**.
- **Output mapping**: The extracted data is stored in an `idpResult` **Result variable**.

## View results

Once the process completes, the results of the extraction are available in the `idpResult` variable.

For example, looking at the process in Operate shows that the data was accurately extracted from the document.

```
{
  "extractedFields": {
    "invoiceType": "A",
    "invoiceId": "A/3454",
    "invoiceCustomer": "Camunda"
  }
}
```

<img src={IdpResultsImg} alt="Document extraction step" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}} />

:::note
This step in the process could be one of many types of element, depending on what you want to do with the extraction results. For example, you might want to display, check, or summarize the extracted data, or route to further actions in the process depending on the document data.
:::
