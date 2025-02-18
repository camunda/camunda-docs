---
id: camunda-forms-reference
title: What are Camunda Forms?
description: Streamline your human workflows with the help of Camunda Forms
---

:::note Support for Camunda Forms
The initial release of Camunda Forms includes a debut minimal feature set, which will be expanded with upcoming versions. The Camunda Forms feature was added with the 7.15.0 release of Camunda 7 and the 4.7.0 release of [Camunda Modeler](../about-modeler.md). Therefore, they can be used within BPMN diagrams running on Camunda 7 version 7.15.0 or later.
:::

The Camunda Forms feature allows you to design and configure forms. Once configured, they can be connected to a user task or start event to implement a task form in your application.

While you can incorporate Camunda Forms solely within Camunda 8, you can also utilize Camunda Forms in Camunda 7. After deploying a diagram with an embedded form, Tasklist imports this form schema and uses it to render the form on every task assigned to it.

To learn more about how Camunda Forms are created in Camunda Modeler and embedded in Camunda Tasklist, visit our guide on [user task forms](../../../guides/utilizing-forms.md).

Camunda Forms are powered by the open source [bpmn-io form-js library](https://github.com/bpmn-io/form-js). Visit the [open source repository](https://github.com/bpmn-io/form-js) to find out how to render a form using plain JavaScript in a custom application (note that this also requires you to fetch the form from the respective BPMN 2.0 element and provide data as needed to the form.)

Visit the [form element library](./form-element-library/forms-element-library.md) for an overview of the components supported by Camunda Forms.
