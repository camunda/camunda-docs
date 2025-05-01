---
id: forms-element-library-document-preview
title: Document preview
description: A form element to preview documents
---

import DocCardList from '@theme/DocCardList';

A form element to preview and download documents.

<img src="/img/form-icons/form-documentPreview.svg" alt="Form Document preview Symbol" />

## Configurable properties

#### General

- **Title**: Title displayed on top of the element.
  - Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Document reference**: Data used to render documents.
  - Accepts an array of objects with document metadata.
  - Can only be an [expression](../../feel/language-guide/feel-expressions-introduction.md).
  - The resulting value must have the following structure:

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

#### Condition

- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the element.

#### Layout

- **Columns**: Space the field will use inside its row.
  - **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/elements/2x-grid/overview/).

#### Appearance

- **Max height of preview container**: A number which will define the maximum height of each document preview. Any document with a bigger height will display a scroll bar.

## Additional guides

Design process applications for document handling with the Document preview component.

<DocCardList items={[{type:"link", href:"/docs/components/concepts/document-handling/", label: "Document handling", docId:"components/concepts/document-handling"}
]}/>
