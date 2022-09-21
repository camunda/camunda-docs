---
id: forms-element-library-textfield
title: Textfield
description: A form element to read and edit textual data
---

A text field allowing the user to read and edit textual data.

![Form Text Field Symbol](/img/form-icons/form-textField.svg)

### Configurable properties

- **Field label**: Label displayed on top of the text field.
- **Field description**: Description provided below the text field.
- **Key**: Binds the field to a form variable, see [data binding docs](../configuration/forms-config-data-binding.md).
- **Default value**: Provides a default value for the text field in case no input data exists for the given key.
- **Disabled**: Disables the text field, for use during development.
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: Text field must contain a value.
  - **Minimum length**: Text field must have at least `n` characters.
  - **Maximum length**: Text field must not have more than `n` characters.
  - **Regular expression pattern**: Text field value must match the provided [RegEx](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet) pattern.

### Datatypes

Text Fields can be bound to `boolean`, `string`, and `number` data, but will cohere the data into a string, which will lead the data to be written back to the process as a `string` when the form is submitted.
