---
id: element-templates
title: Element templates
description: A process application is a type of folder that contains a set of related files you can work on and deploy as a single bundle.
---

import serviceTaskNoTemplate from './assets/element-templates/service-task-no-template.png'
import serviceTaskWithTemplate from './assets/element-templates/service-task-with-template.png'
import propretiesNoTemplate from './assets/element-templates/properties-no-template.png'
import propretiesWithTemplate from './assets/element-templates/properties-with-template.png'

An **element template** is a way to extend the [Modeler](../modeler/about-modeler.md) with domain-specific diagram elements, such as service and user tasks. They allow to customize how a BPMN element is shown and how it can be configured by process developers.

The following example demonstrates how a generic service task can be transformed into a customized user interface that guides users through its configuration process.
| Without an element template | With an element template |
| :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| <img src={serviceTaskNoTemplate} alt="Service tasks without an element template" /> | <img src={serviceTaskWithTemplate} alt="Service tasks with an element template" /> |
| <img src={propretiesNoTemplate} alt="Properties without an element template" /> | <img src={propretiesWithTemplate} alt="Properties with an element template" /> |

:::tip
[Connector templates](../connectors/custom-built-connectors/connector-templates.md) are a specific kind of element template.
:::

## Next steps

Read more about how to use element templates in Web and Desktop Modeler:

- [Element templates in Modeler](/components/modeler/web-modeler/element-templates/)
