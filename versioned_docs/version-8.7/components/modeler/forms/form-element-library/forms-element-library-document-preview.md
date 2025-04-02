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
    "endpoint": "https://api.example.com/documents/u123",
    "metadata": {
      "fileName": "Document.pdf",
      "contentType": "application/pdf"
    }
  }
]
```

:::note
When previewing documents that were uploaded via [Filepicker](./forms-element-library-filepicker.md) in Tasklist, document references are handled automatically:

- Modifying the document’s metadata after upload may prevent the preview from working correctly.
- To use Camunda's document service without Filepicker, you must include the `contentHash`, `endpoint`, and `documentId` values.
  :::

- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the file picker.
- **Max height of preview container**: A number which will define the maximum height of each document preview. Any document with a bigger height will display a scroll bar.

Refer to [document handling](/components/concepts/document-handling.md) for additional details and limitations.
