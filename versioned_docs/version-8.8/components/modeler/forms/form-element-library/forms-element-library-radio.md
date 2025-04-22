---
id: forms-element-library-radio
title: Radio group
description: A form element to select a value from set options
---

A radio group allowing the user to select one of multiple data options for small datasets.

<img src="/img/form-icons/form-radio.svg" alt="Form Radio Symbol" />

### Configurable properties

- **Field label**: Label displayed above the radio group. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Field description**: Description provided below the radio group. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Key**: Binds the radio group component to a form variable, refer to [data binding docs](../configuration/forms-config-data-binding.md).
- **Default value**: Provides a default selection in case no input data exists for the given key. Only available for _static_ options sources.
- **Read only**: Makes the radio group read-only, meaning the user can't change but only read its state. Can be dynamically set using an [expression](../../feel/language-guide/feel-expressions-introduction.md).
- **Disabled**: Disables the radio group, for use during development.
- **Options source**: Radio group components can be configured with an options source defining the individual choices the component provides, refer to [options source docs](../configuration/forms-config-options.md).
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the radio group.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/elements/2x-grid/overview/).
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: One radio option must be selected.

### Datatypes

Radio group components can be bound to `any` data, but we recommend working with `strings`. The component will correlate the data value with the appropriate option defined in the options source. If no option is found, the data will simply be ignored.
