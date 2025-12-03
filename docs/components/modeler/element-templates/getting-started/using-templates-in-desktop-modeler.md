---
id: using-templates-in-desktop-modeler
title: Using templates in Desktop Modeler
description: Learn how to apply, remove, update, and replace element templates in Desktop Modeler.
---

Use element templates in Desktop Modeler to apply reusable configuration to BPMN elements. Templates help standardize modeling behavior and simplify complex input, output, and header mappings.

## Apply a template

When the selected BPMN element matches one or more available templates, the template catalog button appears in the properties panel.

Click **Select** to open the template menu. From here, you can:

- Browse available templates
- Search by name or keyword
- Review descriptions and categories

When a template is applied, Desktop Modeler stores the template identifier (and version, if present) on the BPMN element and updates the properties panel to display the fields defined by the template.

## Remove a template

Desktop Modeler supports two removal options:

- **Remove**: Removes the template and resets all properties associated with it.
- **Unlink**: Removes the template but retains the current property values on the element.

Use Unlink if you want to keep existing values but detach the template.

## Update a template

If the applied template has a newer version available, Desktop Modeler provides an option to update it.

Update behavior follows standard element template lifecycle rules:

- Properties defined in the new version overwrite the old version unless the user has modified them.
- Properties removed from the new version are also removed from the element.
- Complex properties (such as input and output mappings) are migrated where identifiable.

## Replace a deprecated template

If a template has been deprecated and a new template should be used instead:

1. Unlink the deprecated template to retain current values.
2. Apply the new template from the template catalog.

This helps maintain continuity while adopting the updated template.

## Handle missing templates

If a BPMN element references a template that Desktop Modeler cannot find, the properties panel disables editing.

To restore editing:

- Unlink or remove the template, or
- Add the missing template file to a valid search path.

Learn more about search paths in [configuring templates for Desktop Modeler](../desktop/configuring-templates-for-desktop-modeler.md).

## Save an applied template

If a BPMN element supports templating, Desktop Modeler displays a **Save as** option next to the element header.

Using this function, you can:

- Save the current element configuration as a reusable template
- Assign a name and description
- Store the template as a JSON file that can be reused locally or shared across projects

Learn more in [save as element template](./save-as-element-template.md).

## Next steps

- Learn how to [use templates in Web Modeler](./using-templates-in-web-modeler.md)
- Understand the structure of template files in [defining templates](../create/defining-templates.md)
