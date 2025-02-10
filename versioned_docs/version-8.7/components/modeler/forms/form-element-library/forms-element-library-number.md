---
id: forms-element-library-number
title: Number
description: A form element to read and edit numeric data
---

A number field allowing the user to read and edit numeric data.

<img src="/img/form-icons/form-number.svg" alt="Form Number Symbol" />

### Configurable properties

- **Field label**: Label displayed on top of the number field. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Field description**: Description provided below the number field. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Key**: Binds the field to a form variable, refer to [data binding docs](../configuration/forms-config-data-binding.md).
- **Default value**: Provides a default value for the number field in case no input data exists for the given key.
- **Decimal digits**: Defines the maximum number of digits after the decimal.
- **Increment**: Defines the increment between valid field values.
- **Read only**: Makes the number field read-only, meaning the user can't change but only read its state. Can be dynamically set using an [expression](../../feel/language-guide/feel-expressions-introduction.md).
- **Disabled**: Disables the number field, for use during development.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the number.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/elements/2x-grid/overview/).
- **Serialize to string**: Configures the output format of the datetime value. This enables unlimited precision digits.
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: Number field must contain a value.
  - **Minimum**: Number field value must be at least `n`. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md) or a number.
  - **Maximum**: Number field value must be no larger than `n`. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md) or a number.
- **Appearance**: Changes the visual appearance of the number field.
  - **Prefix**: Adds an appendage before the input. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
  - **Suffix**: Adds an appendage after the input. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).

### Datatypes

Number can be bound to numeric data, or `strings` which can be parsed to numeric data (as per [JavaScript's tryParse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)), but will always output strictly `integer` data.
