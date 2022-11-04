---
id: forms-element-library-text
title: Text view
description: A form element to display static information
---

A text component allowing to display static information to the user.

![Form Text Symbol](/img/form-icons/form-text.svg)

### Configurable properties

- **Text**: Either an [**Expression**](../../feel/language-guide/feel-expressions-introduction.md), **Markdown** or **basic HTML** which will be rendered in the form. Note that dangerous HTML elements will not be rendered so to prevent the risk of cross-site scripting using Camunda Forms.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the text.

**Example for Markdown**:

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

**Example for HTML**:

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
