---
id: element-templates-with-dependencies
title: Element templates with dependencies
description: "Learn what you need to take into account when handling template dependencies."
---

When creating element templates, you may want to link to a particular resource like a [form](/components/modeler/forms/camunda-forms-reference.md), or pre-populate a [secret](/components/connectors/use-connectors/index.md#using-secrets) expression. Your template might require a particular [job worker](/components/concepts/job-workers.md) to execute an action. These are all different types of dependencies.

Element templates can depend on:

- Resources:
  - [Camunda forms](/components/modeler/forms/camunda-forms-reference.md): used in user tasks.
  - [RPA scripts](/components/rpa/overview.md): Used in service tasks.
  - [BPMN tasks](/components/modeler/bpmn/bpmn.md): used in call activities.
  - [DMN decisions](/components/modeler/dmn/dmn.md): used in business rule tasks.
- [Call activities](/components/modeler/bpmn/call-activities/call-activities.md): this may introduce nested dependencies (For example, a called process may depend on other processes and/or dependencies).
- [Job workers](/components/concepts/job-workers.md): used to provide behavior for a particular service task like a flow-node in a BPMN diagram: A message send event, a send task, a service task, a business rule task, a custom connector runtime.
- Secrets: used in connector elements to access sensitive values (see [secrets in self-managed](/self-managed/components/connectors/connectors-configuration.md#secrets) and [secrets in SaaS](/components/console/manage-clusters/manage-secrets.md)).

To make a template available for use, you must complete two key steps:

- Provision dependencies at runtime: This involves making the dependencies available in the clusters that need it.
  - For job workers, the runtime needs to be started and wired to the cluster (see how to [host custom connectors](/components/connectors/custom-built-connectors/host-custom-connector.md)).
  - Secrets need to be configured beforehand.
  - Other dependency types need to be deployed to the cluster. For example, Camunda forms, RPA scripts or DMN decisions.
- Make the template available at design time: This involves making Web Modeler or Desktop Modeler aware of the template so you can use it in your projects.

![Element template dependencies](./img/element-template-dependencies.png)

## Next

- [Defining element templates](./defining-templates.md)
- [Using element templates in Desktop Modeler](/components/modeler/desktop-modeler/element-templates/using-templates.md)
- [Publishing an element template in Web Modeler](/components/connectors/manage-connector-templates.md#publish-a-connector-template)
- [Configuring element templates in Desktop Modeler](/components/modeler/desktop-modeler/element-templates/configuring-templates.md)
