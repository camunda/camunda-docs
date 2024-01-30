---
id: form-js-concepts
title: "Concepts"
description: "Understand the basic concepts of form-js"
---

import clsx from "clsx";

import GHIcon from "@site/src/mdx/GitHubInlineIcon";
import FormViewer from "@site/src/mdx/FormViewer";
import FormPlaygroundImg from "./img/forms-playground.png";

import policyReviewForm from "./policyReviewForm.js";
import simpleForm from "./simpleForm.js";

Use form-js, the open-source library that powers Camunda Forms, to embed forms anywhere from vanilla JavaScript to low-code application platforms. With form-js, you can view, visually edit, and simulate forms that are based on pure JSON.

## form-js basics

The form-js project is made of three core libraries: the [form editor](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-editor) <GHIcon />, the [form viewer](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer) <GHIcon />, and the [form playground](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-playground) <GHIcon />.

### Form editor

The [form editor](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-editor) <GHIcon /> allows to design forms with a drag'n'drop interface, and uses [FEEL expressions](/components/modeler/feel/what-is-feel.md) to execute form logic, such as visibility conditions, in realtime. Learn more about using the form editor in the [getting started guide](/guides/utilizing-forms.md).

The form editor as it is shipped in Camunda 8 actually uses the [form playground](#form-playground), which provides realtime preview and validation functionality.

### Form viewer

The [form viewer](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-viewer) <GHIcon /> renders a form built using the form editor. It is versatile and can be embedded in any JavaScript application to render a form and capture user interactions. Learn more about embedding the form viewer on the following pages.

See the following example form using the form viewer, and interact with it:

<FormViewer schema={ policyReviewForm } />

### Form playground

The [form playground](https://github.com/bpmn-io/form-js/tree/develop/packages/form-js-playground) <GHIcon /> is a tool to preview forms, simulate their behavior, and explore form-js in a playful manner. It combines the [editor](#form-editor) and the [viewer](#form-viewer) with mock data input and output panels to test a form and form editor features instantly.

There is also a [Camunda-flavored version of the form playground](https://github.com/camunda/form-playground) <GHIcon />, which closely resembles the form editor experience in Camunda Web and Desktop Modeler, and supports rapid development.

The form playground mainly comprises the following areas:

- The **component palette** to search and add components.
- The **editor canvas**, allowing to compose a form by dragging components.
- The **preview pane**, which shows an interactive preview of the form. The preview updates in real-time when a change happens in the editor, properties panel, or mock input data.
- The **properties panel**, which is used to configure the properties of a component.
- The **data input panel**, which allows to simulate the form preview using mock input data.
- The **output panel**, which calculates and shows the current form output in real-time, based on the interactions with the preview.

The input and output panel, together with the preview, come in handy to simulate the behavior of a form, and to validate or debug the configuration of one or multiple components, especially when using expressions extensively. Use the input data panel to simulate process variables, business objects, or static data used in your form.

<img src={FormPlaygroundImg} alt="Camunda Forms playground" />

<div style={{marginTop: '24px', marginBottom: '8px'}}>
   <a
      className={clsx(
         "button button--outline button--secondary button--lg"
      )}
      href="https://camunda-form-playground.netlify.app/">
      Try form playground
   </a>
</div>

Try the form playground yourself directly on the web, no log in needed.

## The form schema

A form is serialized as plain JSON with a simple, flat structure to maximize flexibility and versatility. In the root, a form contains some metadata attributes. The main form is defined by a list of components, where the components carry their layout properties themselves (e.g. which row a component belongs to). This is in contrast to markup languages such as HTML, where the arrangement of the nodes determines the layout. This enables backward compatibility and compatibility with user-defined renderers.

See this simple form schema for example, and the resulting form:

```json
{
  "components": [
    {
      "label": "First name",
      "type": "textfield",
      "layout": {
        "row": "Row_0hqc9xn",
        "columns": null
      },
      "id": "Field_05l2s7c",
      "key": "firstName"
    },
    {
      "label": "Last name",
      "type": "textfield",
      "layout": {
        "row": "Row_0hqc9xn",
        "columns": null
      },
      "id": "Field_0nw7e1c",
      "key": "lastName"
    },
    {
      "label": "Income",
      "type": "number",
      "layout": {
        "row": "Row_1ggwq2d",
        "columns": 8
      },
      "id": "Field_12yshuy",
      "key": "monthlyNetIncome",
      "description": "Monthly net income",
      "appearance": {
        "prefixAdorner": "USD"
      },
      "increment": "100",
      "validate": {
        "required": true,
        "min": 0
      }
    }
  ],
  "type": "default",
  "id": "ExampleForm",
  "executionPlatform": "Camunda Cloud",
  "executionPlatformVersion": "8.4.0",
  "exporter": {
    "name": "Camunda Modeler",
    "version": "5.18.0"
  },
  "schemaVersion": 12
}
```

<FormViewer schema={ simpleForm } />

All form-js packages share the same [JSON schema](https://github.com/bpmn-io/form-js/tree/develop/packages/form-json-schema) <GHIcon /> for forms.

This enables the interoperability of the created forms between the form editor and the viewer and possibly also between custom-made form renderers, or translating from a Camunda Form to another form. Using the form schema, you can write extensions to existing components, while still receiving benefits from updates made to the core form-js libraries.

The schema abstracts the form model from the viewer, and allows you to inject another expression or templating language as an alternative to FEEL, since expressions are simply stored as strings.

The schema is built on top of and validated by [`json-schema@draft-07`](https://json-schema.org/draft-07/json-schema-release-notes.html).

:::tip
You can use tools like this [JSON Schema Viewer](https://navneethg.github.io/jsonschemaviewer/) to explore the schema visually, or this [tool from Atlassian](https://json-schema.app/view/%23?url=https%3A%2F%2Funpkg.com%2F%40bpmn-io%2Fform-json-schema%401.6.0%2Fresources%2Fschema.json) to validate a form against the schema.
:::

### Schema variables

Form-js comes with versatile methods to extract the expected input and output variables from a form schema. This makes it easy to validate the input and output of a form, and you can combine it with data validation libraries like [joi](https://github.com/hapijs/joi) <GHIcon /> to ensure type and schema safety. Learn more about schema variables in the [embedding guide](./02-embed-in-javascript.md).

## Examples

Visit the [form-js examples repository](https://github.com/bpmn-io/form-js-examples) <GHIcon /> to explore form-js by playing with the toolkit.
