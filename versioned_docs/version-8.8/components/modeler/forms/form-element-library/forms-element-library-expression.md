---
id: forms-element-library-expression
title: Expression field
description: A form element to compute form state
---

An expression field allowing the user to compute new data based on form state.

<img src="/img/form-icons/form-expression.svg" alt="Form Expression Field Symbol" />

### Configurable properties

- **Key**: Binds the field to a form variable, refer to [data binding docs](../configuration/forms-config-data-binding.md).
- **Target value**: Defines an [expression](../../feel/language-guide/feel-expressions-introduction.md) to evaluate.
- **Compute on**: Defines when the expression should be evaluated. Either whenever the result changes, or only on form submission.
- **Deactivate if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to disable the expression.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/elements/2x-grid/overview/).

:::info

The expression field is a simple way to create intermediary data which may be re-used within your form, or further down your process. To effectively use this component, a good understanding of [FEEL](../../feel/language-guide/feel-expressions-introduction.md) is required.

:::
