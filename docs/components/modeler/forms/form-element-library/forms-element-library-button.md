---
id: forms-element-library-button
title: Button
description: A form element to trigger form actions
---

A button allowing the user to trigger form actions.

![Form Button Symbol](/img/form-icons/form-button.svg)

### Configurable properties

- **Field label**: Label to be displayed on top of the button.
- **Action**: The button can either trigger a **Submit** or a **Reset** action.
  - **Submit**: Submit the form (given there are no validation errors).
  - **Reset**: Reset the form, all user inputs will be lost.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the button.
- **Columns**: Space the button will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/guidelines/2x-grid/overview).
