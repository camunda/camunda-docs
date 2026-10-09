---
id: forms-element-library-html
title: HTML view
description: A form element to display HTML content.
---

A flexible display component designed to quickly render HTML content for the user.

<img src="/img/form-icons/form-html.svg" alt="Form HTML Symbol" />

## Configurable properties

- **Content**: This property accepts HTML content. Define it using [templating syntax](../configuration/forms-config-templating-syntax.md) or as plaintext HTML. The rendered content is sanitized for security reasons, see below for details.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to conditionally hide the HTML content.
- **Columns**: Space the field will use inside its row. The **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/elements/2x-grid/overview/).

## Our security and sanitation strategy

We prevent all usages of JavaScript inside the HTML, this means that this component is solely meant to be used for presentation of information. Additionally, any text rendered through templating will be escaped. This means that you cannot pass HTML and CSS dynamically, by design, as certain attack vectors could make use of it. You may however inject individual style properties in your CSS.

We automatically scope all CSS, templated or otherwise, to the root of the component. This ensures the component does not affect and potentially break the entire structure of the form.

:::note
While these are all strong security mechanisms, we still advise you to ensure the data coming into your form is trusted, and to use templating only where you really need it.
:::

## HTML configurations

Below are various ways of configuring your HTML component, depending on your use case and configuration needs.

**Basic HTML**:

```
<div>
  <h1>Welcome to Our Site</h1>
  <p>This is a paragraph with some <strong>bold text</strong> and <em>italic text</em>.</p>
  <a href="https://example.com">Click here</a> to visit our page.
</div>
```

**HTML with inline styling**:

```
<div style="background-color: lightblue; padding: 10px;">
  <h2 style="color: navy;">Styling Example</h2>
  <p style="font-size: 14px;">This paragraph is styled with inline CSS.</p>
</div>
```

**HTML with style tags**:

```
<style>
  .example-container {
    background-color: lightblue;
    padding: 10px;
  }

  .example-container h2 {
    color: navy;
  }

  .example-container p {
    font-size: 14px;
  }
</style>

<div class="example-container">
  <h2>Styling Example</h2>
  <p>This paragraph is styled with CSS in a style tag.</p>
</div>
```

**List and images**:

```
<ul>
  <li>First Item</li>
  <li>Second Item</li>
</ul>

<img src="https://someurl.com/image.png" alt="Descriptive Image Text">
```

**Templating notation**

```
<div>
  <h1>{{pageTitle}}</h1>
  <p>Welcome, {{user.name}}!</p>
  <p>Your selected color is: <span style="color: {{user.favoriteColor}};">{{user.favoriteColor}}</span></p>
  <p>Your tasks for today are:</p>
  <ul>
    {{#loop user.tasks}}
      <li>{{this}}</li>
    {{/loop}}
  </ul>
</div>
```
