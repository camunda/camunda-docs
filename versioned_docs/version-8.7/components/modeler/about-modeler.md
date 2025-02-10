---
id: about-modeler
title: About Modeler
description: "Camunda offers Web Modeler and Desktop Modeler to design and implement any executable process using BPMN."
keywords: ["process mapping tool"]
---

<span class="badge badge--cloud">Camunda 8 only</span>

Any executable process needs a **[Business Process Model and Notation (BPMN)](./bpmn/bpmn.md) diagram** designed and configured beforehand.

A BPMN diagram is used to visually outline the structure and flow of a process. As a result, the process can be more easily understood by various stakeholders.

In tandem, different events and implementation details (such as the conditions within a gateway or the specifications of a service task) must be configured in the model so the workflow engine understands what must be executed once the process reaches a certain task.

Camunda offers two tools to design and implement your diagrams:

- [Web Modeler](./web-modeler/launch-web-modeler.md): Integrate seamlessly with Camunda 8 SaaS and Self-Managed installations alongside [Console](../console/introduction-to-console.md).
- [Desktop Modeler](./desktop-modeler/index.md): Design, view, and edit models using this desktop application. Install and use Desktop Modeler locally, all while integrating your local development environment.

:::note
Interested in editing the underlying XML of [BPMN](./bpmn/bpmn.md) and [Decision Model and Notation (DMN)](./dmn/dmn.md) diagrams directly? Be sure to utilize Desktop Modeler, as it features an XML editor tab. The XML editor comes with its own history (undo or redo), search and replace functionality, and XML syntax highlighting.
:::

In this guide, we'll demonstrate modeling BPMN diagrams using both Web Modeler and Desktop Modeler.

## Next steps

- [Modeling BPMN](/guides/automating-a-process-using-bpmn.md) - Learn how to model an automated process in this tutorial using Web Modeler with Camunda 8 SaaS.
- [Camunda Forms](/guides/utilizing-forms.md) - Design and configure forms, and connect them to a user task or start event to implement a task form in your application.
- [DMN](./dmn/dmn.md) - In DMN, model and execute decisions using the same language. As a business analyst, model the rules that lead to a decision in comprehensive tables, and execute these tables directly by a decision engine like Camunda.
- [Out-of-the-box Connectors](/guides/configuring-out-of-the-box-connector.md) - Utilize pre-built connectivity with a number of outside systems via our [Camunda Marketplace](./web-modeler/camunda-marketplace.md). Connectors are modular by nature, reusable, and accelerate automation across those systems.
- [Custom Connectors](/components/connectors/manage-connector-templates.md) - Learn how to build custom Connectors alongside external systems based on our out-of-the-box Connectors.
