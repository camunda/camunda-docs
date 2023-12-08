---
id: forms-element-library-table
title: Table
description: Learn about the table form element to render tabular data.
---

This is an element allowing the user to render tabular data in a user friendly way.

![Form table Symbol](/img/form-icons/form-table.svg)

## Configurable properties

- **Table label**: Label displayed on top of the table and as the accessible label. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Data source**: Data which will be used to render the rows of the table. Can only be an [expression](../../feel/language-guide/feel-expressions-introduction.md).
- **Pagination**: Enables pagination in the table. If enabled it splits the rows provided by **Data source** into chunks with the size defined by the field **Number of rows per page**
- **Number of rows per page**: The size of each page. Used only if pagination is enabled. Must be greater than zero.
- **Headers source**: Defines which headers will be used in the table. It can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md) or a list of static headers.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the table.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/guidelines/2x-grid/overview).
