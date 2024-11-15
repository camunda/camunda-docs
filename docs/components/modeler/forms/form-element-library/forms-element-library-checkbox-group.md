---
id: forms-element-library-checkbox-group
title: Checkbox group
description: A form element to select multiple values from set options
---

A set of checkbox options providing data multi-selection for small datasets.

<img src="/img/form-icons/form-checkbox.svg" alt="Form Checkbox Symbol" />

### Configurable properties

- **Field label**: Label displayed on top of the checkbox group. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Field description**: Description provided below the checkbox group. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Key**: Binds the field to a form variable, refer to [data binding docs](../configuration/forms-config-data-binding.md).
- **Options source**: Checkbox group components can be configured with an options source defining the individual choices your user can make, refer to [options source docs](../configuration/forms-config-options.md).
- **Read only**: Makes the checkbox group read-only, meaning the user can't change but only read its state. Can be dynamically set using an [expression](../../feel/language-guide/feel-expressions-introduction.md).
- **Disabled**: Disables the checkbox group, for use during development.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the checkbox group.
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: Checkbox group must contain a value.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/elements/2x-grid/overview/).

### Datatypes

Checkbox group components can be bound to data of the `any[]` type, although for most practical cases we recommend `string[]` instead. The checkbox group component correlates the bound data with the values of the different options.

The data representation of this checkbox group:

![Checklist Selection Image](../assets/checklist-example.png)

Looks like this:

```
{
  "mailto": [
    "regional-manager",
    "approver"
  ],
}
```
