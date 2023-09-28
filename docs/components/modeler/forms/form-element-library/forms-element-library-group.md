---
id: forms-element-library-group
title: Group
description: Learn about the group form element to group multiple form components
---

The group component serves as a container to group various form elements together. It allows for nesting of components and assists in organizing complex forms.

![Form Group Symbol](/img/form-icons/form-group.svg)

### Configurable properties

- **Group label**: Label displayed on top of the group. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Path**: Assigns a path that maps its children into a data object, may be left empty, defined as a variable name or a dot separated variable accessor. See the [data binding docs](../configuration/forms-config-data-binding.md) for more details.
- **Show outline**: Can be toggled on and off to display a separating outline around the group
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the group.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/guidelines/2x-grid/overview).

### Usage

The group component allows for nesting of various form elements. Children components inherit the group's path as a prefix to their key, streamlining data mapping. You can nest additional group components for deeper organization. Groups may also be used to show and hide an entire section.
