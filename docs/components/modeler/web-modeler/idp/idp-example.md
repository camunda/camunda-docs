---
id: idp-example
title: Example IDP integration
description: "A worked example showing how you can integrate a published IDP document extraction template into a simple process in Web Modeler."
---

import IdpExampleImg from './img/idp-example-process.png';
import IdpFilepickerImg from './img/idp-filepicker.png';
import IdpExtractImg from './img/idp-example-extract-step.png';

This worked example shows how you can integrate a published document extraction template into a simple process.

## About this worked example

This worked example is provided for illustration purposes only, to demonstrate the steps involved in creating a simple process that uses a published document extraction template to extract data from a document uploaded via Tasklist.

The process diagram has the following steps:

<img src={IdpExampleImg} alt="An example process diagram with three steps" style={{width: '800px', border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}} />

1. **Upload document**: A PDF document is uploaded via Tasklist.
1. **Extract data**: The document extraction template extracts data from the uploaded PDF document.
1. **View results**: The extraction results are viewed.

## Document extraction template

In this example a document extraction template has already been created and published as follows.

## Upload document

In this step, a [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) and linked [form](/components/modeler/forms/camunda-forms-reference.md) allows a document to be uploaded for extraction.

<img src={IdpFilepickerImg} alt="The File picker element" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}} />

- The form uses a [File picker](/components/modeler/forms/form-element-library/forms-element-library-filepicker.md) form element to upload a document.
- The File picker element **Key** is set to `document`. This is used for the **Document** input in the document extraction template.

## Extract data

In this step, the document extraction template is [applied to a task](idp-integrate.md#create-and-configure-an-idp-task) to extract data from the uploaded document.

<img src={IdpExtractImg} alt="Document extraction step" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}} />

- The **Document** input uses the FEEL expression `document[1]` to get the first document in the FEEL array, as per the uploaded document **Key**.
- The

## Running the process
