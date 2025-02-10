---
id: forms-element-library-filepicker
title: Filepicker
description: A form element to select files
---

A form element to select files.

<img src="/img/form-icons/form-filepicker.svg" alt="Form Filepicker Symbol" />

### Configurable properties

- **Field label**: Label displayed on top of the file picker. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Supported file formats**: [Comma-separated list of supported file formats.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers) Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md) or plain text.
- **Upload multiple files**: Allows the user to upload multiple files at once. Can be dynamically set using an [expression](../../feel/language-guide/feel-expressions-introduction.md).
- **Key**: Binds the field to a form variable, refer to the [data binding documentation](../configuration/forms-config-data-binding.md).
- **Read only**: Makes the file picker read-only, meaning the user can't change but only read its state. Can be dynamically set using an [expression](../../feel/language-guide/feel-expressions-introduction.md).
- **Disabled**: Disables the file picker, for use during development.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the file picker.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/elements/2x-grid/overview/).
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: File picker must have a selected file.

Refer to [document handling](/components/concepts/document-handling.md) for additional details and limitations.
