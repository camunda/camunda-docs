---
id: forms-element-library-checklist
title: Checklist
description: A form element to select multiple values from set options
---

A set of checkboxes providing data multi-selection for small datasets.

![Form Checklist Symbol](/img/form-icons/form-checklist.svg)

### Configurable properties

- **Field label**: Label displayed on top of the checklist.
- **Field description**: Description provided below the checklist.
- **Key**: Binds the field to a form variable, see [data binding docs](../configuration/forms-config-data-binding.md).
- **Options source**: Checklists can be configured with an options source defining the individual choices your user can make, see [options source docs](../configuration/forms-config-options.md).
- **Disabled**: Disables the checklist, for use during development.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the checklist.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/guidelines/2x-grid/overview).

### Datatypes

Checklists can be bound to data of the `any[]` type, although for most practical cases we recommend `string[]` instead. The checklist component correlates the bound data with the values of the different options.

The data representation of this checklist:

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
