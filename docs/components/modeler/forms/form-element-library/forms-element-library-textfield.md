---
id: forms-element-library-textfield
title: Textfield
description: A form element to read and edit textual data
---

A text field allowing the user to read and edit textual data.

![Form Text Field Symbol](/img/form-icons/form-textField.svg)

### Configurable properties

- **Field label**: Label displayed on top of the text field. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Field description**: Description provided below the text field. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Key**: Binds the field to a form variable, see [data binding docs](../configuration/forms-config-data-binding.md).
- **Default value**: Provides a default value for the text field in case no input data exists for the given key.
- **Disabled**: Disables the text field, for use during development.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the text field.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/guidelines/2x-grid/overview).
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: Text field must contain a value.
  - **Regular expression validation**: Use predefined validation patterns. Available options are: `Email`, `Phone`, and `Custom`.
  - **Minimum length**: Text field must have at least `n` characters.
  - **Maximum length**: Text field must not have more than `n` characters.
  - **Regular expression pattern**: Text field value must match the provided [RegEx](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet) pattern.
- **Appearance**: Changes the visual appearance of the text field.
  - **Prefix**: Adds an appendage before the input.
  - **Suffix**: Adds an appendage after the input.

### Datatypes

Text Fields can be bound to `boolean`, `string`, and `number` data, but will cohere the data into a string, which will lead the data to be written back to the process as a `string` when the form is submitted.
