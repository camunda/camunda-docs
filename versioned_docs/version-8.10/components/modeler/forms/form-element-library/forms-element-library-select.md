---
id: forms-element-library-select
title: Select
description: A form element to select a value from set options
---

A Select dropdown allowing the user to select one of multiple data option from larger datasets.

<img src="/img/form-icons/form-select.svg" alt="Form Select Symbol" />

### Configurable properties

- **Field label**: Label displayed above the select. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Field description**: Description provided below the select. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Key**: Binds the selected value to a form variable, refer to [data binding docs](../configuration/forms-config-data-binding.md).
- **Default value**: Provides a default selection in case no input data exists for the given key. Only available for _static_ options sources.
- **Searchable**: Allows the select entries to be searched via keyboard.
- **Read only**: Makes the select read-only, meaning the user can't change but only read its state. Can be dynamically set using an [expression](../../feel/language-guide/feel-expressions-introduction.md).
- **Disabled**: Disables the select, for use during development.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the select.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/elements/2x-grid/overview/).
- **Options source**: Selects can be configured with an options source defining the individual choices the select provides, refer to [options source docs](../configuration/forms-config-options.md).
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: One select entry must be selected.

### Datatypes

Select components can be bound to `any` data, but we recommend working with `strings`. The component will correlate the data value with the appropriate option defined in the options source. If no option is found, the data will simply be ignored.
