---
id: forms-element-library-text
title: Text view
description: A form element to display simple Markdown-powered text.
---

A Markdown-powered text component allowing to display simple information to the user.

<img src="/img/form-icons/form-text.svg" alt="Form Text Symbol" />

## Configurable properties

- **Text**: Either an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md). After evaluation, the result is processed using a Markdown renderer that supports basic HTML and [GitHub-flavored Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). To ensure safety and prevent cross-site scripting in Camunda Forms, potentially harmful HTML elements will not be rendered.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the text.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/elements/2x-grid/overview/).

## Example text configurations

Note that these configurations work in combination with one another. You may use templating syntax to leverage Markdown and HTML. You may also mix Markdown and HTML in a single definition.

**Markdown**:

```
# This is a heading

This shows an image:
![alternative image text](https://someurl.com/image.png)

## This is a sub-heading

Text can be shown for example using
**bold**, or *italic* font.

* This is an unordered list...
* ...with two list items

1. This is an ordered list...
2. ...with two list items
```

**HTML**:

```
<h1>This is a heading</h1>

This shows an image:
<img src="https://someurl.com/image.png"
alt="alternative image text">

<h2>This is a sub-heading</h2>

Text can be shown for example
using <b>bold</b>, or <i>italic</i> font.

<ul>
  <li>This is an unordered list...</li>
  <li>...with two list items</li>
</ul>

<ol>
  <li>This is an ordered list...</li>
  <li>...with two list items</li>
</ol>
```

:::note
The text component supports a small subset of HTML configurations, and cannot be styled. Please use our [dedicated HTML component](./forms-element-library-html.md) for presentation use-cases relying on HTML heavily.
:::

**Template syntax**:

```
{{#if usingTemplating}}

Hello {{user.name}}, we are inside a conditional template block.

Your hobbies are:
{{#loop user.hobbies}}
* {{this}}
{{/loop}}

{{/if}}
```
