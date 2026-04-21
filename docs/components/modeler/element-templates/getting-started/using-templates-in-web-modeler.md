---
id: using-templates-in-web-modeler
title: Using templates in Web Modeler
description: Learn how to apply, update, replace, and remove element templates in Web Modeler, including how to manage missing templates and saved templates.
---

Use element templates in Web Modeler to apply reusable configurations to BPMN elements. Templates help you standardize modeling behavior, enforce validation rules, and simplify complex mappings.

## Apply a template

When a selected BPMN element matches one or more available templates, the properties panel displays a template catalog button.

Click **Select** to browse templates that apply to the selected element. The template chooser allows you to:

- Search and filter templates
- View categories, descriptions, and icons
- Open the Camunda Marketplace when available

When you apply a template, Web Modeler adds the template identifier (and version, if present) to the BPMN XML. The properties panel then displays only the fields defined by the template.

## Remove a template

You can remove a template from an element using two actions:

- **Unlink**: Removes the template but keeps the values currently set on the element.
- **Remove**: Removes the template and resets all properties associated with it.

Use Unlink when you want to migrate or experiment without losing user-defined values.

## Update a template

If a newer version of a template is available, Web Modeler prompts you to update it.

Update behavior follows these rules:

- Values defined in the new template override the previous version unless explicitly changed by the user.
- Values removed in the new template are removed from the element.
- Sub-properties such as input and output mappings are updated when safely identifiable.

Modeler preserves user-provided input whenever possible as part of the template evolution lifecycle.

## Replace a deprecated template

If the applied template has been deprecated and replaced by a newer template:

1. Unlink the deprecated template to keep existing values.
2. Apply the new template from the catalog.

This process helps maintain backward compatibility while adopting improved templates.

## Handle missing templates

If a BPMN element references a template that is not available in Web Modeler:

- The properties panel disables editing.
- A notification appears indicating that the template is missing.

To restore editing:

- Unlink or remove the missing template, or
- Re-add the template by importing or publishing it at the project or organization level.

## Save an applied template

Web Modeler allows you to create a new element template from an already configured BPMN element.

If the element supports templating, a **Save as template** option appears in the properties panel header.

Saving an applied template allows you to:

- Capture current properties as a reusable template
- Assign a name and description
- Publish the new template to a project or organization

## Next steps

- Learn how to [use templates in Desktop Modeler](./using-templates-in-desktop-modeler.md)
- Create or edit templates using the [Element Template Generator](../create/generate-element-template.md)
- Explore template metadata, properties, and schema in [defining templates](../create/defining-templates.md)
