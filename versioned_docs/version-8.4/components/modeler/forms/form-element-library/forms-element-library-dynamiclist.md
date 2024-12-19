---
id: forms-element-library-dynamiclist
title: Dynamic list
description: Learn about the dynamic list form element to dynamically manage a list of form elements.
---

The **dynamic list** element is designed to dynamically manage a list of form elements. It enables users to add or remove items from the list and is particularly useful in scenarios where the number of items in a list is not fixed.

<img src="/img/form-icons/form-dynamiclist.svg" alt="Dynamic List Symbol" />

## Configurable properties

- **Group label**: Label displayed on top of the dynamic list. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **Path**: Assigns a path that maps its children into a data object, defined as a variable name or a dot separated variable accessor. See the [data binding docs](../configuration/forms-config-data-binding.md) for more details.
- **Default number of items**: Specifies the default number of items rendered when no input data is provided.
- **Allow add/delete items**: Enables users to add new items to or delete existing items from the list.
- **Disable collapse**: Prevents items in the list from being collapsed.
- **Number of non-collapsing items**: Defines the number of items in the list that will not collapse.
- **Vertical alignment**: Determines the alignment of items in the list.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the dynamic list.

## Usage

The dynamic list element facilitates the management of data lists in forms. It is highly adaptable, with features like default item count, add/delete capabilities, and control over item collapse. It's the ideal component for scenarios where users need to input a variable number of items, such as adding multiple contacts or entries in a form.
