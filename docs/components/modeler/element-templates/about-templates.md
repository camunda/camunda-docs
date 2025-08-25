---
id: about-templates
title: Element templates in Modeler
description: "Element templates can be used in Camunda Web Modeler and Desktop Modeler."
---

:::note
Element templates are available in BPMN diagrams only.
:::

Element templates are a way to extend the [modeler](https://camunda.org/bpmn/tool/) with domain-specific diagram elements, such as service and user tasks.

## Creating and editing element templates

Element templates are defined in template descriptor files using JSON format. Connector templates are a specific type of element template.

You can edit element templates in any text editor or in Web Modeler's built-in template editor. Depending on the editor, the [JSON schema](defining-templates.md#json-schema-compatibility) may be picked up in order to offer additional editing support features such as formatting, code completion, and error highlighting.

To learn more about customizing your templates, see our [Defining templates](./defining-templates.md) documentation.

## Next steps

Read more about how to use element templates in Web and Desktop Modeler:

- [Using templates in Desktop Modeler](/components/modeler/desktop-modeler/element-templates/using-templates.md)
- [Element templates with dependencies](./element-template-with-dependencies.md)
