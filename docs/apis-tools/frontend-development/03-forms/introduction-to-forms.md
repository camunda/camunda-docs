---
id: introduction-to-forms
title: "Introduction to forms"
description: "Forms are an essential element for giving work instructions, collecting information and making decisions on human tasks."
---

import FormEditorImg from './img/form-editor.png';

Forms are an essential element for giving work instructions, collecting information and making decisions on human tasks. Forms are generally lightweight user interfaces, tailored for focused data input in specific steps of a process, rendering the orchestration of human tasks more efficient than simply routing users to the applications that are orchestrated.

Forms are commonly used in [user tasks](/components/modeler/bpmn/user-tasks/user-tasks.md/#user-task-forms), but also as [start forms](/components/tasklist/userguide/starting-processes.md) to start a new process instance, or even as [public forms](/components/modeler/web-modeler/advanced-modeling/publish-public-processes.md), e.g. to capture user input at scale or to allow your customers to trigger a self-service process.

## Camunda Forms

In Camunda 8, you can design forms using a drag'n'drop low-code editor. The form editor is available in both Desktop and Web Modeler. Learn more about Camunda Forms and available components in the [Camunda Forms reference documentation](/components/modeler/forms/camunda-forms-reference.md), and learn how to design a human workflow with forms in the [getting started guide](/guides/getting-started-orchestrate-human-tasks.md).

<img src={FormEditorImg} alt="Camunda Forms editor" />

## form.js

Camunda Forms present a flexible, open solution to form creation. Camunda Forms are based on the [form-js library](https://github.com/bpmn-io/form-js), maintained by Camunda. As a result, the form editor and renderer are non-proprietary, open-source technology, and can be used everywhere, also outside the context of Camunda 8. This unlocks a world of use cases, and eliminates any doubt around vendor lock in or technical barriers.

Form.js is a vanilla JavaScript library with [Preact](https://preactjs.com/) in the background, and can be used in any framework, from Angular to React.

The resulting forms are serialized as a JSON document. The JSON document follows an open form schema, that allows you to render the form using both the built-in form render, or even with a custom render. The form schema is extensible, allowing you to build your own extensions or custom components.

<!-- TODO link to dedicated form.js page -->

:::tip Want to Contribute?
We welcome your contributions to form.js! Whether it's fixing a bug, adding a feature or a new component, your input is valuable.

**How to Contribute:**
1. 🌐 Visit our [GitHub Repository](https://github.com/bpmn-io/form-js).
2. 🛠️ Check out the issues or open a new one.
3. 💻 Fork the repository and submit a pull request.

Let's make form.js better together! 👩‍💻👨‍💻
:::
