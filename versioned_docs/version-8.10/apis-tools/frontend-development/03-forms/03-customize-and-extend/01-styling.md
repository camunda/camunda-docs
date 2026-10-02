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

### CSS variables

The variables are defined at the root of the form-js container:

```css
.fjs-container {
  /**
   * Color settings. Specify color variables in the following schema:
   * 1 - use specified layer
   * 2 - use layer one
   * 3 - use fallback 
   */
  --color-background: var(--cds-field, var(--cds-field-01, var(--color-white)));
  --color-background-disabled: var(
    --cds-background,
    var(--color-grey-225-10-95)
  );
  --color-background-readonly: var(
    --cds-background,
    var(--color-grey-225-10-95)
  );
  --color-background-adornment: var(
    --cds-field,
    var(--cds-field-01, var(--color-grey-225-10-95))
  );
  --color-background-inverted: var(
    --cds-background-inverse,
    var(--color-grey-225-10-90)
  );
  --color-background-inverted-hover: var(
    --cds-background-inverse-hover,
    var(--color-grey-225-10-93)
  );
  --color-background-active: var(
    --cds-background-active,
    var(--color-grey-225-10-75)
  );
  --color-layer: var(--cds-layer, var(--cds-layer-01, var(--color-white)));
  --color-layer-accent: var(--cds-layer-accent, var(--color-grey-0-0-88));
  --color-icon-base: var(--cds-icon-primary, var(--color-black));
  --color-icon-inverted: var(--cds-icon-inverse, var(--color-black));
  --color-text: var(--cds-text-primary, var(--color-grey-225-10-15));
  --color-text-light: var(--cds-text-secondary, var(--color-grey-225-10-35));
  --color-text-lighter: var(--cds-text-secondary, var(--color-grey-225-10-45));
  --color-text-lightest: var(
    --cds-text-placeholder,
    var(--color-grey-225-10-55)
  );
  --color-text-inverted: var(--cds-text-inverse, var(--color-text));
  --color-text-disabled: var(--cds-text-disabled, var(--color-text-light));
  --color-borders: var(
    --cds-border-strong,
    var(--cds-border-strong-01, var(--color-grey-225-10-55))
  );
  --color-borders-group: var(--cds-border-subtle, var(--color-grey-225-10-85));
  --color-borders-table: var(--color-borders-group);
  --color-borders-disabled: var(
    --cds-border-disabled,
    var(--color-grey-225-10-75)
  );
  --color-borders-adornment: var(
    --cds-border-subtle,
    var(--cds-border-subtle-01, var(--color-grey-225-10-85))
  );
  --color-borders-readonly: var(
    --cds-border-subtle,
    var(--color-grey-225-10-75)
  );
  --color-borders-inverted: var(
    --cds-border-inverse,
    var(--color-grey-225-10-90)
  );
  --color-warning: var(--cds-text-error, var(--color-red-360-100-45));
  --color-warning-light: var(--cds-text-error, var(--color-red-360-100-92));
  --color-accent: var(--cds-link-primary, var(--color-blue-205-100-40));
  --color-accent-readonly: var(
    --cds-border-strong,
    var(--cds-border-strong-01, var(--color-grey-225-10-55))
  );
  --color-datepicker-focused-day: var(
    --cds-button-primary,
    var(--color-grey-225-10-55)
  );
  --color-shadow: var(--cds-shadow, var(--color-grey-225-10-85));

  /* font + text settings */
  --font-family: "IBM Plex Sans", sans-serif;
  --font-size-group: 15px;
  --font-size-base: 14px;
  --font-size-input: 14px;
  --font-size-label: 12px;
  --line-height-base: 20px;
  --line-height-input: 18px;
  --line-height-label: 16px;
  --letter-spacing-base: 0.16px;
  --letter-spacing-input: 0.16px;
  --letter-spacing-label: 0.32px;

  /* field settings */
  --form-field-height: 36px;
  --border-definition: 1px solid var(--color-borders);
  --border-definition-adornment: 1px solid var(--color-borders-adornment);
  --outline-definition: 1px solid var(--cds-focus, var(--color-borders));
  --button-warning-outline-definition: 2px solid var(--color-warning);
  --border-definition-disabled: 1px solid var(--color-borders-disabled);
  --border-definition-readonly: 1px solid var(--color-borders-readonly);
}
```

### Styleable classes

The simplest way to find the right styleable elements to override is inspecting form-js using your browser's developer tools. Scope rules with the `.fjs-container` class to prevent CSS conflicts.

For example, to override field borders for single-line fields:

```css
.fjs-container .fjs-input-group {
  border-width: 0 0 1px 0;
}
```

### Example

Camunda 8 web applications are built using the IBM Carbon design system. Forms rendered in Tasklist appear in this design system by default. Visit the [Carbon form-js styles repository](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-carbon-styles) <GHIcon /> to learn how to create your own form styles.

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
