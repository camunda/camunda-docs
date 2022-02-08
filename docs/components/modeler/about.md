---
id: about-modeler
title: About Modeler
---

Any executable process needs a **BPMN diagram** designed and configured beforehand.

A BPMN diagram is used to visually outline the structure and flow of a process. As a result, the process can be more easily understood by various stakeholders.

In tandem, different events and implementation details (such as the conditions within a gateway or the specifications of a service task) must be configured in the model so the workflow engine understands what must executed once the process reaches a certain task.

Camunda offers a few tools to design your diagrams and implement them:

- [Cloud Modeler](./cloud-modeler/launch-cloud-modeler.md)
- [Camunda Modeler](./camunda-modeler/install-the-modeler.md)

:::note
You can also utilize [Cawemo](https://cawemo.com/), which focuses on the design phase and provides options for collaborative work on a BPMN model.
:::

**Cloud Modeler** and **Camunda Modeler** support the technical implementation of the models. It's possible to design the model in Cawemo, and continue working with Cloud Modeler or Camunda Modeler.

Cloud Modeler and Camunda Modeler differ mainly in their environment. Cloud Modeler is part of Cloud Console and offers a seamless integration into Camunda Cloud to model BPMN. Camunda Modeler is a desktop application that can be installed and used locally, all while integrating your local development environment.

In this guide, we'll demonstrate modeling BPMN diagrams using both Cloud Modeler and Camunda Modeler.

## Next steps

- [Camunda Forms](./guides/utilizing-forms.md) - Allows you to easily design and configure forms. Once configured, they can be connected to a user task or start event to implement a task form in your application.
- [DMN](./dmn/dmn.md) - In DMN, decisions can be modeled and executed using the same language. Business analysts can model the rules that lead to a decision in easy to read tables, and those tables can be executed directly by a decision engine (like Camunda).