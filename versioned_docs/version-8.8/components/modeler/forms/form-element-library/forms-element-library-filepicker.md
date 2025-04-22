---
id: forms-element-library-filepicker
title: Filepicker
description: A form element to select files
---

import DocCardList from '@theme/DocCardList';

A form element to select files.

<img src="/img/form-icons/form-filepicker.svg" alt="Form Filepicker Symbol" />

## Configurable properties

#### General

- **Field label**: Label displayed on top of the Filepicker.
  - It can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Supported file formats**: [Comma-separated list of supported file formats.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers)
  - It can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md) or plain text.
- **Upload multiple files**: Allows the user to upload multiple files at once.
  - It can be dynamically set using an [expression](../../feel/language-guide/feel-expressions-introduction.md).
- **Key**: Binds the field to a form variable, refer to the [data binding documentation](../configuration/forms-config-data-binding.md).
- **Read only**: Makes the Filepicker read-only, meaning the user can't change but only read its state.
  - It can be dynamically set using an [expression](../../feel/language-guide/feel-expressions-introduction.md).
- **Disabled**: Disables the Filepicker, for use during development.

#### Condition

- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the element.

#### Layout

- **Columns**: Space the field will use inside its row.
  - **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/elements/2x-grid/overview/).

#### Validation

Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.

- **Required**: Filepicker must have a selected file.

## Reference uploaded files

The Filepicker's output variable is an array of objects with file metadata that represents each uploaded file.

It always returns an array of objects, either a user uploads a single file or multiple files.
Single file uploads are accessible using `value[1]` (since [FEEL](../../feel/what-is-feel.md) uses 1-based indexing).

## Additional guides

Design process applications for document handling with the Filepicker component.

<DocCardList items={[{type:"link", href:"/docs/next/guides/document-handling/", label: "Store, track and manage documents", docId:"guides/document-handling"}
]}/>
