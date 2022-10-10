---
id: forms-element-library-number
title: Number
description: A form element to read and edit numeric data
---

A number field allowing the user to read and edit numeric data.

![Form Number Symbol](/img/form-icons/form-number.svg)

### Configurable properties

- **Field label**: Label displayed on top of the number field.
- **Field description**: Description provided below the number field.
- **Key**: Binds the field to a form variable, see [data binding docs](../configuration/forms-config-data-binding.md).
- **Default value**: Provides a default value for the number field in case no input data exists for the given key.
- **Disabled**: Disables the number field, for use during development.
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: Number field must contain a value.
  - **Minimum**: Number field value must be at least `n`.
  - **Maximum**: Number field value must be no larger than `n`.

### Datatypes

Number can be bound to `integer` data, or `strings` which can be parsed to `integer` data (as per [Javascript's tryParse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)), but will always output strictly `integer` data.
