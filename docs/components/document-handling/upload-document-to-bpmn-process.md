---
id: upload-document-to-bpmn-process
title: Upload a document to a BPMN process
description: "Learn how to build a form for document upload, upload a document from a user task in Tasklist, upload a document to start a process, and more."
keywords: ["document handling"]
---

You can implement document uploads in your BPMN processes using [forms](#build-a-form-for-document-upload), [inbound connectors](#upload-a-document-via-inbound-webhook-connector), and the [Camunda 8 REST API](/apis-tools/camunda-api-rest/specifications/create-document.api.mdx).

## Build a form for document upload

When [building a form](/guides/utilizing-forms.md) for a process, you can use the [Filepicker form component](/components/modeler/forms/form-element-library/forms-element-library-filepicker.md) to allow users to upload files.

In the Filepicker configuration, you can specify whether users can upload a single file or [multiple files](/components/modeler/forms/form-element-library/forms-element-library-filepicker.md#configurable-properties) and define the list of [supported file formats](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers).

Although this example focuses on [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md), you can also build a form for document upload in [Desktop Modeler](/components/modeler/desktop-modeler/index.md). The Filepicker form component is available in both environments.

![Form with Filepicker](./img/form-with-file-picker.png)

A designed form can be [linked](/components/modeler/web-modeler/advanced-modeling/form-linking.md) to a [user task](#upload-a-document-from-a-user-task-in-tasklist) or used to [start a process](#upload-a-document-to-start-a-process).
Documents uploaded with the form can then be [referenced](#get-reference-to-an-uploaded-document) later in the process.

The Filepicker always returns an array with metadata for a single or multiple files, for example:

```json
[
  {
    "documentId": "u123",
    "endpoint": "https://api.example.com/documents/u123",
    "metadata": {
      "fileName": "Document.pdf",
      "contentType": "application/pdf"
    }
  }
]
```

### Upload a document from a user task in Tasklist

When the process is deployed and running, users can access and complete user tasks that include a form with the Filepicker component in [Tasklist](/components/tasklist/introduction-to-tasklist.md):

![document handling in tasklist](./img/task-with-file-picker-tasklist.png)

### Upload a document to start a process

You can configure a form with the Filepicker for a start event of a BPMN process to allow users to upload documents when initiating the process. This is supported in [Tasklist](/components/tasklist/introduction-to-tasklist.md) and is available to logged-in users.

:::note

Only logged-in users can upload files.
[Publicly accessible processes](/components/modeler/web-modeler/advanced-modeling/publish-public-processes.md) with a start form do not support file upload using the Filepicker.

:::

### Get reference to an uploaded document

Uploaded documents can be referenced later in the process.

Filepicker's output variable is an array of objects with document metadata.
It always returns an array of objects, whether a user uploads a single document or multiple documents.

Single document uploads are accessible using `value[1]` (since [FEEL](/components/modeler/feel/what-is-feel.md) uses 1-based indexing).

Refer to the example array below:

```
[
  {
    "documentId": "u123",
    "endpoint": "https://api.example.com/documents/u123",
    "metadata": {
      "fileName": "Document.pdf",
      "contentType": "application/pdf"
    }
  }
]
```

## Upload a document via inbound webhook connector

Documents can be added to a process using the [inbound](/components//connectors/connector-types.md#inbound-connectors) [HTTP webhook connector](/components/connectors/protocol/http-webhook.md).

You can pass the documents in both the response expression and the result expression, where the `documents` object contains the references for created documents. Below, review an example of a webhook configuration:

![Example payload of inbound webhook connector](./img/inbound-webhook-connector-example.png)

In this example, the result expression may look as follows, where `applicationDocument` can be later used by the process to retrieve documents:

```
{
  applicationDocument: documents[1]
}
```

The document reference received as an output of one connector should be stored in process variables by using the result expression or result variable.

To call the webhook sending a file, see the following example:

```curl
curl --location 'https://some.dev.environment/uploadDocument' \
--form 'file=@"/path-to-file/file.pdf"'
```

:::note
This example uses Postman to obtain the result, so your `user-agent` value may look different.
:::

The result variable will have the following structure:

```
{
 "request": {
   "body": {},
   "headers": {
     "host": "example.host.io",
     "x-request-id": "34509f2d9293cdfj49875rjf03",
     "x-real-ip": "some.example.ip.address",
     "x-forwarded-host": "example.host.io",
     "x-forwarded-port": "443",
     "x-forwarded-proto": "https",
     "x-forwarded-scheme": "https",
     "x-scheme": "https",
     "content-length": "70484",
     "user-agent": "PostmanRuntime/7.43.0",
     "accept": "*/*",
     "cache-control": "no-cache",
     "postman-token": "my-example-token",
     "accept-encoding": "gzip, deflate, br",
     "content-type": "multipart/form-data; boundary=--------------------------3007423254435453453514"
   },
   "params": {}
 },
 "connectorData": {},
 "documents": [
   {
     "storeId": "gcp",
     "documentId": "example-document-id",
     "contentHash": "fwkhkj34843rfhfwho3297ufdsj0df09",
     "metadata": {
       "contentType": "application/pdf",
       "size": 70266,
       "fileName": "file.pdf"
     },
     "camunda.document.type": "camunda"
   }
 ]
}
```

## Upload a document using the Camunda 8 API

You can also upload a document to your Camunda 8 cluster using the Camunda 8 API.

:::note
This is currently supported for document stores of type: [AWS, GCP, in-memory (non-production), local (non-production)](/self-managed/concepts/document-handling/configuration/overview.md).
:::

Learn more about [uploading a single document](/apis-tools/camunda-api-rest/specifications/create-document.api.mdx) and [uploading multiple documents](/apis-tools/camunda-api-rest/specifications/create-documents.api.mdx) using the Camunda 8 API.
