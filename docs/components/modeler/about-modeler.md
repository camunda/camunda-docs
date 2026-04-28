---
id: about-modeler
title: Process modeling
description: "Camunda offers Web Modeler and Desktop Modeler to design and implement any executable process using BPMN."
keywords: ["process mapping tool"]
---

Camunda provides modeling tools for designing and implementing executable diagrams with [BPMN](./bpmn/bpmn.md), [DMN](./dmn/dmn.md), and [Forms](./forms/camunda-forms-reference.md).

Choose the modeler that best fits how you work:

- [Web Modeler](./web-modeler/launch-web-modeler.md): Use Camunda's browser-based modeler to collaborate on diagrams in Camunda 8 SaaS or Self-Managed.
- [Desktop Modeler](./desktop-modeler/index.md): Install the desktop application to model locally and integrate with your development environment.

## Open Web Modeler

If you are logged in to Camunda 8 SaaS, open the **Camunda components** menu in the top-left corner, and select **Camunda Hub**. Navigate to your workspace, then, in your project, select the file you want to edit.

## Get Desktop Modeler

If you want to model locally, work offline, or edit the underlying XML directly, download Desktop Modeler for macOS, Windows, or Linux from the [Camunda downloads page](https://camunda.com/download/modeler/).

For installation details and features, see [Desktop Modeler](./desktop-modeler/index.md).

:::note
Desktop Modeler includes an XML editor for [BPMN](./bpmn/bpmn.md) and [Decision Model and Notation (DMN)](./dmn/dmn.md) diagrams, with its own undo and redo history, search and replace, and XML syntax highlighting.
:::

If you use both tools, see [using Web and Desktop Modeler together](./using-web-and-desktop-modeler-together.md).

## Next steps

- [Modeling BPMN](/components/modeler/bpmn/automating-a-process-using-bpmn.md) - Learn how to model an automated process in this tutorial using Web Modeler with Camunda 8 SaaS.
- [Camunda Forms](/components/modeler/forms/utilizing-forms.md) - Design and configure forms, and connect them to a user task or start event to implement a task form in your application.
- [DMN](./dmn/dmn.md) - In DMN, model and execute decisions using the same language. As a business analyst, model the rules that lead to a decision in comprehensive tables, and execute these tables directly by a decision engine like Camunda.
- [Out-of-the-box connectors](/components/connectors/use-connectors/configuring-out-of-the-box-connector.md) - Utilize pre-built connectivity with a number of outside systems via our [Camunda Marketplace](./web-modeler/modeling/camunda-marketplace.md). Connectors are modular by nature, reusable, and accelerate automation across those systems.
- [Element templates](/components/modeler/element-templates/about-templates.md) - Learn how to create element templates to extend Web Modeler and Desktop Modeler.
- [Custom connectors](/components/connectors/manage-connector-templates.md) - Learn how to build custom connectors alongside external systems based on our out-of-the-box connectors.
