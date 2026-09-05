---
id: forms-config-table-data-binding
title: Table data binding
description: When using the table component, you can bind the table to a context variable to populate the table with data from the process.
---

When using the table component, you can bind the table to a context variable to populate the table with data from the process.

To do this, set two properties when modeling your form: **Headers source** and **Data source**.

## Headers source

For **Headers source**, define the columns of the table. You have two options:

- **List of items**: Define the headers statically by adding the headers in the **Headers items** section. From there, you can define a list of columns defined by a **Label** and a **Key**. The **Label** is the text that will be displayed in the header, and the **Key** is the name of the variable that will be used to populate the column.
- **Expression**: Define the headers dynamically by using an [expression](../../feel/language-guide/feel-expressions-introduction.md). The [expression](../../feel/language-guide/feel-expressions-introduction.md) must return a list of objects with a **label** and a **key** property. For example, if you have a list of objects with a **name** and a **surname** property, your [expression](../../feel/language-guide/feel-expressions-introduction.md) must evaluate to the following JSON to define the headers:

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

## Data source

To define the data which will be displayed as table rows, define the **Data source** property. This field accepts only [expressions](../../feel/language-guide/feel-expressions-introduction.md). The [expression](../../feel/language-guide/feel-expressions-introduction.md) must return a list of objects, where each object represents a row in the table. Each object must have a property for each column defined in the **Headers source** property. For example, if you have a list of objects with a **name** and a **surname** property, your [expression](../../feel/language-guide/feel-expressions-introduction.md) must evaluate to the following JSON to define the data:

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
