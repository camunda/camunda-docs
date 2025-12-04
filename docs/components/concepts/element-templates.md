---
id: element-templates
title: Element templates
description: An element template extends the Modeler with reusable, domain-specific configuration for BPMN elements.
---

import propertiesNoTemplate from './assets/element-templates/properties-no-template.png'
import propertiesWithTemplate from './assets/element-templates/properties-with-template.png'

An **element template** defines a reusable, domain-specific configuration for BPMN elements in the [Modeler](../modeler/about-modeler.md).

Templates shape both **how an element is configured** and **how its properties appear in the UI**, helping modelers apply consistent technical settings without needing to understand engine-level details.

Element templates are commonly used to:

- Ensure consistent configuration of service and user tasks
- Predefine input/output mappings, headers, authentication, or runtime types
- Provide structured, validated UI fields in the properties panel
- Encapsulate best practices into reusable building blocks

The example below illustrates how a generic service task becomes easier and safer to configure once a template is applied:

| Without an element template                                                                        | With an element template                                                                          |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| ![Service task without an element template](assets/element-templates/service-task-no-template.svg) | ![Service task with an element template](assets/element-templates/service-task-with-template.svg) |
| <img src={propertiesNoTemplate} alt="Properties panel without an element template" />              | <img src={propertiesWithTemplate} alt="Properties panel with an element template" />              |

:::tip
A **connector template** is a specialized element template used for configuring connectors. All connector templates are element templates, but not all element templates represent a connector.
:::

## Next steps

Learn more about working with element templates:

- [Overview: Element templates in Modeler](/components/modeler/element-templates/about-templates.md)
- [Using element templates in Desktop Modeler](/components/modeler/element-templates/getting-started/using-templates-in-desktop-modeler.md)
