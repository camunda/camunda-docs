---
id: element-templates-with-dependencies
title: Element templates with dependencies
description: "Learn what you need to consider when handling template dependencies."
---

When creating element templates, you may want to link to a resource like a [form](/components/modeler/forms/camunda-forms-reference.md), or pre-populate a [secret](/components/connectors/use-connectors/index.md#using-secrets) expression. Your template might require a specific [job worker](/components/concepts/job-workers.md) to execute an action. These are all examples of dependencies.

![Element template dependencies](./img/element-template-dependencies.png)

Element templates can depend on:

- [Camunda forms](/components/modeler/forms/camunda-forms-reference.md): used in user tasks.
- [RPA scripts](/components/rpa/overview.md): used in service tasks.
- [BPMN process](/components/modeler/bpmn/bpmn.md): used in a call activity. This may introduce nested dependencies (e.g., a called process may depend on other processes and/or resources).
- [DMN decisions](/components/modeler/dmn/dmn.md): used in business rule tasks.
- [Job workers](/components/concepts/job-workers.md): provide behavior for service tasks such as message send events, send tasks, service tasks, business rule tasks, or custom connector runtime.
- Secrets: used in connector elements to access sensitive values (see [secrets in self-managed](/self-managed/components/connectors/connectors-configuration.md#secrets) and [secrets in SaaS](/components/console/manage-clusters/manage-secrets.md)).

To make a template available for use, complete two key steps:

1. **Provision dependencies at runtime**: Make dependencies available in the clusters that need them.
   - For job workers, ensure the runtime is started and connected to the cluster (see [hosting custom connectors](/components/connectors/custom-built-connectors/host-custom-connector.md)).
   - Secrets must be configured beforehand.
   - Other dependency types (e.g., Camunda forms, RPA scripts, DMN decisions) need to be deployed to the cluster.

2. **Make the template available at design time**: Ensure Web Modeler or Desktop Modeler can access the template for use in your projects.

## Next steps

- [Defining element templates](./defining-templates.md)
- [Publishing an element template in Web Modeler](/components/modeler/web-modeler/element-templates/manage-element-templates.md#publish-an-element-template)
- [Using element templates in Web Modeler](/components/modeler/web-modeler/element-templates/using-templates.md)
- [Configuring element templates in Desktop Modeler](/components/modeler/desktop-modeler/element-templates/configuring-templates.md)
- [Using element templates in Desktop Modeler](/components/modeler/desktop-modeler/element-templates/using-templates.md)
