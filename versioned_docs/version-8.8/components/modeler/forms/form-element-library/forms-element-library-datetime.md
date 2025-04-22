---
id: forms-element-library-datetime
title: Datetime
description: Learn about the datetime form element to read and edit date and time data.
---

A component allowing the user to read and edit date and time data.

<img src="/img/form-icons/form-datetime.svg" alt="Form Datetime Symbol" />

## Configurable properties

- **Date label**: Label displayed beside the date input field. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Time label**: Label displayed beside the time input field. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Field description**: Description provided below the datetime component. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Key**: Binds the field to a form variable, refer to [data binding docs](../configuration/forms-config-data-binding.md).
- **Subtype**: Selects the type of the datetime component. This can either be **Date**, **Time**, or **Date & Time**.
- **Use 24h**: Enables 24-hour time format.
- **Read only**: Makes the datetime component read-only, meaning the user can't change but only read its state. Can be dynamically set using an [expression](../../feel/language-guide/feel-expressions-introduction.md).
- **Disabled**: Disables the datetime component, for use during development.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the datetime component.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/elements/2x-grid/overview/).
- **Time format**: Defines the time data format. This can either be **UTC offset**, **UTC normalized**, or **No timezone**.
- **Time interval**: Defines the steps of time that can be selected in the time input field.
- **Disallow past dates**: Enables the restriction to not allow past dates.
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: Datetime component must contain a value.

## Datatypes

Datetime components can be bound to data of the `string` type. The format of the string depends on the subtype:

- **date**: ISO 8601 string of the format `YYYY-MM-DD`.
- **datetime**: ISO 8601 string of the format `YYYY-MM-DDTHH:MM`. Note that leading zeroes must be present in the hour and minutes (e.g., 01:30 not 1:30); this is an ISO 8601 requirement.
- **time**: String of the format `HH:MM`. Leading zeros can be omitted.
