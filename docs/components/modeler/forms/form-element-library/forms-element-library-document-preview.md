---
id: forms-element-library-document-preview
title: Document preview
description: A form element to preview documents
---

A form element to select files.

<img src="/img/form-icons/form-documentPreview.svg" alt="Form Document preview Symbol" />

### Configurable properties

- **Title**: Title displayed on top of the file picker. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Document reference**: Data used to render the documents. This can only be an [expression](../../feel/language-guide/feel-expressions-introduction.md). The resulting value must have the following structure:

```json
[
  {
    "documentId": "u123",
    "metadata": {
      "fileName": "Document.pdf",
      "contentType": "application/pdf"
    }
  }
]
```

- **Document URL**: A context key which contains the URL value used to get each document. This can only be an [expression](../../feel/language-guide/feel-expressions-introduction.md). The resulting value must be a string and it must contain the placeholder `{documentId}` which will be replaced with the document ID present in the **Document reference** data. By default this component will use the key `defaultDocumentsEndpointKey`, if you leave this field unchanged it will work without any extra configuration on Tasklist and you won't have inject this variable in the process instance context.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the file picker.
- **Max height of preview container**: A number which will define the maximum height of each document preview. Any document with a bigger height will display a scroll bar.

Refer to [document handling](/components/concepts/document-handling.md) for additional details and limitations.
