---
id: form-styling
title: "Styling"
description: "Style your forms using easy-to-maintain CSS variables."
---

import GHIcon from "@site/src/mdx/GitHubInlineIcon";

import FormViewer from "@site/src/mdx/FormViewer";

import exampleForm from "./exampleForm.js";

Forms can be easily styled by combining defining own CSS rules and overriding a set of CSS variables. If you want to go beyond CSS, you can fork the [form viewer](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer) <GHIcon /> and change the HTML returned by the individual form component renderers.

## Styling via CSS

Form styling is built on two layers of CSS variables:

| Layer                   | Variables                                | Purpose                                                                                                                         |
| ----------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Semantic tokens**     | `--bio-*`                                | Name a role rather than a component — surface, text, border, accent, radius. Rebinding one restyles every element in that role. |
| **Component variables** | `--color-*`, `--font-*`, `--border-*`, … | What the form actually reads. Each color variable derives from a token; fonts, sizes, and geometry stand on their own.          |

Rebinding the tokens restyles the whole form, including the properties panel embedded in the form editor. Reach for a component variable only where you want to deviate from the shared semantics.

### Theming with semantic tokens

form-js declares the tokens on the `bio-theme-parent` class, which it adds to every root it renders — the form container and any popup it attaches to `document.body`.

Override them from an ancestor, and apply your theme class at the **application root** rather than around the form. Popups and tooltips are appended to the end of `<body>`, outside the element that opened them, and a theme only reaches what it contains.

```css
.my-theme .bio-theme-parent,
.my-theme.bio-theme-parent {
  --bio-primary: #0f62fe;
  --bio-surface: #ffffff;
  --bio-border: #8d8d8d;
  --bio-text: #161616;
}
```

Both selectors are required. A custom property declared on an element always beats one inherited from an ancestor, so a theme has to match the element form-js declared its tokens on — sitting above it is not enough.

The complete, always-current list of tokens and the component variables derived from them lives in the stylesheets themselves:

- [`form-js-base.css`](https://github.com/bpmn-io/form-js/blob/develop/packages/form-js-viewer/assets/form-js-base.css) <GHIcon /> — viewer
- [`form-js-editor-base.css`](https://github.com/bpmn-io/form-js/blob/develop/packages/form-js-editor/assets/form-js-editor-base.css) <GHIcon /> — editor

In both files the `.bio-theme-parent` block declares the tokens, and the `.fjs-container` block below it maps them onto component variables.

### Component variables

Where a token does not express what you need, override the component variable directly on the form container:

```css
.fjs-container {
  --color-background-disabled: #f4f4f4;
  --font-family: "IBM Plex Sans", sans-serif;
  --font-size-base: 14px;
  --form-field-height: 36px;
}
```

Fonts, sizes, spacing, and field geometry are only available as component variables — they have no token equivalent.

### Styleable classes

The simplest way to find the right styleable elements to override is inspecting form-js using your browser's developer tools. Scope rules with the `.fjs-container` class to prevent CSS conflicts.

For example, to override field borders for single-line fields:

```css
.fjs-container .fjs-input-group {
  border-width: 0 0 1px 0;
}
```

### Example

To theme a form after another design system, bind the tokens to its palette. This is how the **Custom style (Material-like)** preview below is built:

```css
.materialized .bio-theme-parent,
.materialized.bio-theme-parent {
  --bio-surface: rgba(0, 0, 0, 0.06);
  --bio-text: rgba(0, 0, 0, 0.87);
  --bio-text-subtle: rgba(0, 0, 0, 0.6);
  --bio-border: rgba(0, 0, 0, 0.42);
  --bio-border-subtle: rgba(0, 0, 0, 0.12);
  --bio-primary: #5453d3;
  --bio-focus: #5453d3;
  --bio-danger: #d32f2f;
}
```

That covers color. Anything the tokens do not express — typography, and Material's underlined field, which is a border shape rather than a color — is a component variable or a plain rule:

```css
.materialized .fjs-container {
  --font-family: Roboto, Helvetica, Arial, sans-serif;
  --line-height-input: 24px;
}

.materialized .fjs-container .fjs-input-group {
  border: none;
  border-bottom: 1px solid var(--bio-border);
  border-radius: 4px 4px 0 0;
}
```

<div style={ { display: 'flex', gap: '8px', flexWrap: 'wrap' } }>

<div style={ { width: '450px' } } >
<h4>Basic style</h4>
<FormViewer schema={ exampleForm } />
</div>

<div style={ { width: '450px' } } >
<h4>Custom style (Material-like)</h4>
<FormViewer customClass="materialized" schema={ exampleForm } />
</div>

</div>

## Styling via form viewer customization

The [form viewer](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer) <GHIcon /> contains all [basic form components](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer/src/render/components/form-fields) <GHIcon /> shipped in Camunda Forms. For full flexibility, fork the library and change the returned HTML of the individual components, or override existing components via [custom form components](02-custom-components.md).

### Example

The following example demonstrates replacing the default rendering of the [text field component](https://github.com/bpmn-io/form-js/blob/develop/packages/form-js-viewer/src/render/components/form-fields/Textfield.js) <GHIcon /> with [Material UI](https://mui.com/material-ui/react-text-field/).

```js title="packages/form-js-viewer/src/render/components/form-fields/Textfield.js"
import TextField from '@mui/material/TextField';

...

export default function Textfield(props) {
  const {
    ...
  } = props;

  ...

  const onInputBlur = () => {
    ...
  };

  return <div class={ formFieldClasses(type, { errors, disabled, readonly }) }>
    // using MUI TextField instead of default
    <TextField
        id={ domId }
        label={ label }
        value={ value }
        defaultValue={ defaultValue }
        onChange={(event) => {
            ...
        }}
    />

    <Description description={ description } />
    <Errors errors={ errors } id={ errorMessageId } />
  </div>;

  ...
}
```
