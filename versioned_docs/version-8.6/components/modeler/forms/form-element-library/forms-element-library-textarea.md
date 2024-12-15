---
id: forms-element-library-textarea
title: Text area
description: Learn about the text area form element to read and edit multiline textual data.
---

A text area allowing the user to read and edit multiline textual data.

<img src="/img/form-icons/form-textArea.svg" alt="Form Textarea Symbol" />

## Configurable properties

- **Field label**: Label displayed on top of the text area. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Field description**: Description provided below the text area. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Key**: Binds the field to a form variable, refer to [data binding docs](../configuration/forms-config-data-binding.md).
- **Default value**: Provides a default value for the text area in case no input data exists for the given key.
- **Read only**: Makes the text area read-only, meaning the user can't change but only read its state. Can be dynamically set using an [expression](../../feel/language-guide/feel-expressions-introduction.md).
- **Disabled**: Disables the text area; for use during development.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the text area.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/elements/2x-grid/overview/).
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: Text area must contain a value.
  - **Minimum length**: Text area must have at least `n` characters.
  - **Maximum length**: Text area must not have more than `n` characters.

## Datatypes

Text area can be bound to `boolean`, `string`, and `number` data, but will coerce the data into a string, which will lead the data to be written back to the process as a `string` when the form is submitted.
