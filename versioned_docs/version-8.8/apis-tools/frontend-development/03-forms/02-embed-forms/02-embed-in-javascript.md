---
id: embed-forms-in-javascript
title: "Embed forms in JavaScript"
description: "Learn how to embed the form viewer in JavaScript"
---

import FormViewer from "@site/src/mdx/FormViewer";
import GHIcon from "@site/src/mdx/GitHubInlineIcon";

Learn how to embed the form viewer in your own applications and web pages using JavaScript.

## Set up form-js

Set up the [form viewer](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer) <GHIcon /> in your own JavaScript projects by importing the library from NPM or a CDN. Alternatively, you can fork the code and [build it yourself](https://github.com/bpmn-io/form-js?tab=readme-ov-file#build-and-run) <GHIcon />.

### NPM

If you use [NPM](https://docs.npmjs.com/getting-started/what-is-npm), install the form viewer as follows:

```sh
npm install @bpmn-io/form-js-viewer
```

### CDN

You can import the form viewer from a content delivery network (CDN), for example when you want to use the form viewer directly in a browser environment without bundling it with your application. Form-js is served via unpkg. Specify the version you want to reference in the URL.

```js
<script src="https://unpkg.com/@bpmn-io/form-js@<VERSION>/dist/form-viewer.umd.js"></script>
```

If you want to automatically use the latest version of the form viewer, you can specify only the major version.

```js
<script src="https://unpkg.com/@bpmn-io/form-js@1/dist/form-viewer.umd.js"></script>
```

Make sure to import the stylesheets as well, and ensure that the version matches:

```js
<link rel="stylesheet" href="https://unpkg.com/@bpmn-io/form-js@1/dist/assets/form-js.css">
```

## Embed into your application

Embedding a form with the form viewer requires only a few steps.

1. Import the library
2. Specify the render target div and render the form
3. Import the [form schema](./01-concepts.md#the-form-schema)

```js
import { Form } from "@bpmn-io/form-js-viewer";

const form = new Form({
  container: document.querySelector("#form"),
});

// schema of the form to embed
const schema = {
  type: "default",
  id: "TestForm",
  components: [
    {
      key: "name",
      label: "Name",
      type: "textfield",
      validate: {
        required: true,
      },
    },
  ],
};

await form.importSchema(schema);
```

This results in:

<FormViewer schema={ {
"type": "default",
"id": "TestForm",
"components": [
{
"key": "name",
"label": "Name",
"type": "textfield",
"validate": {
"required": true
}
}
]
} } />

You can also detach a form from a container and attach to another during form runtime. Learn more about that in the [API documentation](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer#formattachtoparentnode-htmlelement--void) <GHIcon />.

### Input form context data

To provide data to your form, such as process variables or business objects, pass a JSON object containing this data to the `importSchema` function.

```js
...

const schema = {
  ...
};

// form context/input data
const data = {
  name: 'ACME Corp'
};

await form.importSchema(schema, data);
```

This results in:

<FormViewer schema={ {
"type": "default",
"id": "TestForm",
"components": [
{
"key": "name",
"label": "Name",
"type": "textfield",
"validate": {
"required": true
}
}
]
} } data={ {
"name": "ACME Corp"
} } />

You can use context data not just to populate field values, but also to control form behavior, to provide options for select fields, or even to provide localization to your forms. You can fetch business data via an API first, and inject it via the data object. The following example demonstrates how to provide select options via context data, by using a `valuesExpression`.

```js
...

const schema = {
  components: [
    {
      label: "Business domain",
      type: "select",
      key: "domain",
      valuesExpression: "=businessDomains"
    }
  ],
  type: "default",
  id: "TestForm",
  schemaVersion: 12
};

// form context/input data
const data = {
  businessDomains: ["Software development", "Consulting"]
};

await form.importSchema(schema, data);
```

This results in:

<FormViewer schema={ {
"components": [
{
"label": "Business domain",
"type": "select",
"key": "domain",
"valuesExpression": "=businessDomains"
}
],
"type": "default",
"id": "TestForm",
"schemaVersion": 12
} } data={ {
"businessDomains": ["Software development", "Consulting"]
} } />

### Validate a form

Before you allow a user to submit a form, you can use the `validate` function to ensure that all validation rules of your form are met and that all required fields are completed. Learn more in the [form API documentation](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer#formvalidate--errors) <GHIcon />.

```js
const errors = form.validate();

if (Object.keys(errors).length) {
  console.error("Form has errors", errors);
}
```

### Trigger and listen to form events

Form-js provides a comprehensive set of events and APIs to react on form state changes. You can listen for

- [form state changes](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer#changed---data-errors-) <GHIcon />,
- [form submissions](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer#submit---data-errors-) <GHIcon />,
- [form layout changes](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer#layouting-events) <GHIcon />.

In addition, hook into [lifecycle events](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer#lifecycle-events) <GHIcon /> to add custom logic (e.g. initialize listeners on form fields after the form loaded).

Learn more about the full API in the [GitHub repository documentation](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer#api) <GHIcon />.

### Retrieve form output data

To retrieve the current form output data on any form state change, listen to the [`changed`](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer#changed---data-errors--) <GHIcon /> event.

To retrieve the data on submit, listen to the [`submit`](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer#formsubmit---data-data-errors-errors-) <GHIcon /> event.

### Retrieve schema variables

Use the `getSchemaVariables` util to retrieve the [variables defined in a form schema](./01-concepts.md#schema-variables). This is useful to gather what data is consumed and produced by a form.

```javascript
import { getSchemaVariables } from "@bpmn-io/form-js";

const variables = getSchemaVariables(schema);

console.log("Schema variables", variables);
```

It is also possible to distinct between input and output variables:

```javascript
import { getSchemaVariables } from "@bpmn-io/form-js";

const outputVariables = getSchemaVariables(schema, { inputs: false });
const inputVariables = getSchemaVariables(schema, { outputs: false });
```

:::note
form-js does not enforce typing. Retrieving schema variables returns the variable names, but not the type or whether the variable is optional (i.e. whether the field is required or not). To retrieve the expected type of the variable, parse the form schema manually. To enforce the typing of input variables, use validation libraries such as [joi](https://github.com/hapijs/joi) <GHIcon />.
:::

### Next steps

- [Style forms](../03-customize-and-extend/01-styling.md) using CSS and custom renderers.
- [Integrate external data via APIs](../03-customize-and-extend/03-integrate-api-data.md) into your forms and task applications.
- Create [custom form components](../03-customize-and-extend/02-custom-components.md) to design flexible forms tailored to your individual use case.

<!--
- Using React instead of vanilla JavaScript? Learn how to embed forms in a React environment.
-->
