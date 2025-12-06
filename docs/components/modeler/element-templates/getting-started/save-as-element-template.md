---
id: save-as-element-template
title: Save an element as a reusable template
description: Learn how to save configured BPMN elements as reusable element templates in Web Modeler and Desktop Modeler.
---

Use the **Save as template** feature to convert a configured BPMN element into a reusable element template. This helps standardize modeling patterns and reduce repetitive configuration work.

Both Web Modeler and Desktop Modeler support saving templates from an element's properties panel.

## When you can save a template

You can save a template when:

- The BPMN element type supports element templates
- The element has no validation errors
- You have permission to create or upload templates
- You are in the correct editing mode (Web Modeler: implementation mode)

You can also save a template from an element that already has a template applied, allowing you to version, extend, or modify existing template behavior.

## Save a template in Web Modeler

To save a template from a BPMN element:

1. Select the element in your diagram.
2. In the properties panel, select **Save as**.
3. Enter a template name and description.
4. Save the template to your project or organization workspace.
5. (Optional) Immediately edit the template in the built-in template editor.

Saving a template automatically generates a template file containing all supported properties, mappings, headers, and configuration.

### Save an already applied template in Web Modeler

If an element already uses a template:

1. Select the element.
2. Open the template section in the properties panel.
3. Select **Save as** to generate a _new_ template based on the currently applied and modified values.
4. Provide a new name, version, or category.

This is useful when branching template variations or creating improved versions.

## Save a template in Desktop Modeler

Desktop Modeler allows you to export the current configuration of an element as a reusable JSON template file.

1. Select the element.
2. In the properties panel, select **Save as**.
3. Provide the template metadata (name, description, categories).
4. Save the resulting JSON template file to:
   - A local project template directory (`.camunda/element-templates`), or
   - A global template directory (`resources/element-templates`)

### Save an already applied template in Desktop Modeler

If a template is applied to the element:

1. Select **Save as**.
2. Desktop Modeler generates a new template based on the element’s current state, including any user-made changes.
3. Save the template under a new file name so it can be discovered as a separate template.

## What is included when saving a template

When you save a template from an element, the template generator captures all supported configuration:

- Input and output mappings
- Task headers
- Job worker configuration
- Decision or process references
- Form references
- Message or signal metadata
- Element type and implementation
- Default values and hidden properties

Unsupported or dynamic BPMN configuration remains visible in the properties panel after the template is applied.

For details on supported fields, see [template properties](../create/template-properties.md).

## Best practices when saving templates

When creating templates from model elements:

- Create focused, single-purpose templates
- Hide technical fields using the `Hidden` type
- Use constraints to validate user input
- Prefer version-tag bindings for external resources
- Use clear and descriptive template names
- Test the template by applying it to a new element

## Next steps

- Learn how to [use templates in Web Modeler](./using-templates-in-web-modeler.md)
- Learn how to [use templates in Desktop Modeler](./using-templates-in-desktop-modeler.md)
- Explore how to customize templates in [defining templates](../create/defining-templates.md)
