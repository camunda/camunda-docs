---
id: about-modeler
title: About Modeler
description: "Learn about Camunda Modeler, BPMN diagrams designed and configured, and both Web Modeler and Desktop Modeler."
---

<span class="badge badge--cloud">Camunda Cloud only</span>

:::note

Web Modeler is only available for Camunda Cloud SaaS.

:::

Any executable process needs a **BPMN diagram** designed and configured beforehand.

A BPMN diagram is used to visually outline the structure and flow of a process. As a result, the process can be more easily understood by various stakeholders.

In tandem, different events and implementation details (such as the conditions within a gateway or the specifications of a service task) must be configured in the model so the workflow engine understands what must executed once the process reaches a certain task.

Camunda offers a few tools to design your diagrams and implement them:

- [Web Modeler](./web-modeler/launch-web-modeler.md)
- [Desktop Modeler](./desktop-modeler/install-the-modeler.md)

Web Modeler and Desktop Modeler differ mainly in their environment. Web Modeler is part of Cloud Console and offers a seamless integration into Camunda Cloud to model BPMN. Desktop Modeler is a desktop application that can be installed and used locally, all while integrating your local development environment.

In this guide, we'll demonstrate modeling BPMN diagrams using both Web Modeler and Desktop Modeler.

## Next steps

- [Modeling BPMN](/guides/automating-a-process-using-bpmn.md) - Learn how to quickly model an automated process using BPMN.
- [Camunda Forms](/guides/utilizing-forms.md) - Allows you to easily design and configure forms. Once configured, they can be connected to a user task or start event to implement a task form in your application.
- [DMN](./dmn/dmn.md) - In DMN, decisions can be modeled and executed using the same language. Business analysts can model the rules that lead to a decision in easy to read tables, and those tables can be executed directly by a decision engine (like Camunda).