---
id: forms-config-table-data-binding
title: Table data binding
description: How to populate the table component with data
---

## Table data binding

When using the table component, you can bind the table to a context variable. This allows you to populate the table with data from the process.

For that you need to set 2 properties when modeling your form, **Headers source** and **Data source**.

With the **Headers source** you can define the columns of the table. You have 2 options:

- **List of items**: You can define the headers statically, by adding the headers in the **Headers items** section. In there you can define a list of columns defined by a **Label** and a **Key**. The **Label** is the text that will be displayed in the header, and the **Key** is the name of the variable that will be used to populate the column.
- **Expression**: You can define the headers dynamically, by using an [expression](../../feel/language-guide/feel-expressions-introduction.md). The [expression](../../feel/language-guide/feel-expressions-introduction.md) must return a list of objects with a **label** and a **key** property. For example, if you have a list of objects with a **name** and a **surname** property, your [expression](../../feel/language-guide/feel-expressions-introduction.md) needs to evaluate to the following JSON to define the headers:

```json
[
  {
    "label": "Name",
    "key": "name"
  },
  {
    "label": "Surname",
    "key": "surname"
  }
]
```

To define the data which will be displayed as table rows you must define the **Data source** property. This field accepts only [expressions](../../feel/language-guide/feel-expressions-introduction.md). The [expression](../../feel/language-guide/feel-expressions-introduction.md) must return a list of objects, where each object represents a row in the table. Each object must have a property for each column defined in the **Headers source** property. For example, if you have a list of objects with a **name** and a **surname** property, your [expression](../../feel/language-guide/feel-expressions-introduction.md) needs to evaluate to the following JSON to define the data:

```json
[
  {
    "name": "John",
    "surname": "Doe"
  },
  {
    "name": "Jane",
    "surname": "Doe"
  }
]
```
