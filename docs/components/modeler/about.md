---
id: about-modeler
title: About Modeler
---

Any executable process needs a **BPMN diagram** designed and configured beforehand.

A BPMN diagram is used to visually outline the structure and flow of a process. As a result, the process can be more easily understood by various stakeholders.

In tandem, different events and implementation details (such as the conditions within a gateway, or the specifications of a service task) must be configured in the model so the workflow engine understands what must executed once the process reaches a certain task.

Camunda offers three tools to design your diagrams and implement them:

- [Cloud Modeler](./cloud-modeler/launch-cloud-modeler.md)
- [Camunda Modeler](./camunda-modeler/install-the-modeler.md)
- [Cawemo](https://cawemo.com/)

**Cloud Modeler** and **Camunda Modeler** support the technical implementation of the models. It's possible to design the model in Cawemo, and continue working with Cloud Modeler or Camunda Modeler.

Cloud Modeler and Camunda Modeler differ mainly in their environment. Cloud Modeler is part of Cloud Console and offers a seamless integration into Camunda Cloud to model BPMN. Camunda Modeler is a desktop application that can be installed and used locally, all while integrating your local development environment.

**Cawemo** focuses on the design phase and provides options for collaborative work on a BPMN model.

In this guide, we'll demonstrate modeling BPMN diagrams using both Cloud Modeler and Camunda Modeler.

Additionally, the Camunda Forms feature allows you to easily design and configure forms. Once configured, they can be connected to a user task or start event to implement a task form in your application. Learn more in our documentation on [utilizing forms](./../../guides/utilizing-forms.md).