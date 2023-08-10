---
id: about-modeler
title: About Modeler
description: "Any executable process needs a BPMN diagram designed and configured beforehand. Camunda offers Web Modeler and Desktop Modeler to design and implement these."
keywords: ["process mapping tool"]
---

<span class="badge badge--cloud">Camunda Platform 8 only</span>

Any executable process needs a **[Business Process Model and Notation (BPMN)](./bpmn/bpmn.md) diagram** designed and configured beforehand.

A BPMN diagram is used to visually outline the structure and flow of a process. As a result, the process can be more easily understood by various stakeholders.

In tandem, different events and implementation details (such as the conditions within a gateway or the specifications of a service task) must be configured in the model so the workflow engine understands what must be executed once the process reaches a certain task.

Camunda offers two tools to design and implement your diagrams:

- [Web Modeler](./web-modeler/launch-cloud-modeler.md)
- [Desktop Modeler](./desktop-modeler/index.md)

Web Modeler and Desktop Modeler differ mainly in their environment. Web Modeler is part of Cloud Console and offers a seamless integration into Camunda Platform 8 to model BPMN. Desktop Modeler is a desktop application that can be installed and used locally to also design, view, and edit models, all while integrating your local development environment.

:::note
Interested in editing the underlying XML of BPMN and [Decision Model and Notation (DMN)](./dmn/dmn.md) diagrams directly? Be sure to utilize Desktop Modeler, as it features an XML editor tab. The XML editor comes with its own history (undo or redo), search and replace functionality, and XML syntax highlighting.
:::

In this guide, we'll demonstrate modeling BPMN diagrams using both Web Modeler and Desktop Modeler.

## Next steps

- [Modeling BPMN](/guides/automating-a-process-using-bpmn.md) - Learn how to model an automated process in this tutorial using Web Modeler with Camunda Platform 8 SaaS.
- [Camunda Forms](/guides/utilizing-forms.md) - Allows you to design and configure forms. Once configured, they can be connected to a user task or start event to implement a task form in your application.
- [DMN](./dmn/dmn.md) - In DMN, decisions can be modeled and executed using the same language. Business analysts can model the rules that lead to a decision in easy to read tables, and those tables can be executed directly by a decision engine (like Camunda).
- [Out-of-the-box Connectors](/guides/configuring-out-of-the-box-connector.md) - Out-of-the-box Connectors provide prebuilt connectivity with a number of outside systems. Connectors are modular by nature, reusable, and accelerate automation across those systems.
- [Creating Connector templates](/components/connectors/manage-connector-templates.md) - Connector templates allow you to create and build connectivity with the outside systems you choose and want to automate across in Modeler.
