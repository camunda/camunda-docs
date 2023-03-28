---
id: forms-element-library-taglist
title: Taglist
description: A form element to select multiple values from set options
---

A complex and searchable tag based component providing multi-selection for large datasets.

![Form Taglist Symbol](/img/form-icons/form-taglist.svg)

### Configurable properties

- **Field label**: Label displayed on top of the taglist.
- **Field description**: Description provided below the taglist.
- **Key**: Binds the field to a form variable, see [data binding docs](../configuration/forms-config-data-binding.md).
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the taglist.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/guidelines/2x-grid/overview).
- **Options source**: Taglists can be configured with an options source defining the individual choices your user can make, see [options source docs](../configuration/forms-config-options.md).
- **Disabled**: Disables the taglist, for use during development.

### Datatypes

Taglists can be bound to data of the `any[]` type, although for most practical cases we recommend `string[]` instead. The Taglist component will correlate the bound data with the values of the different options defined for the component.

The data representation of this taglist:

![Checklist Selection Image](../assets/taglist-example.png)

Would look like this:

```
{
  "cc_empl": [
    "john_doe",
    "anna_belle"
  ]
}
```
