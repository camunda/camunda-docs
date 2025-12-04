---
id: generate-element-template
title: Generate an element template
description: Learn how to generate an element template using Web Modeler's template generator or by exporting templates from Desktop Modeler.
---

Generate element templates automatically to speed up template creation and reduce manual JSON editing.

Web Modeler includes a built-in template generator, and Desktop Modeler allows exporting the current element configuration as a template file.

## Generate a template in Web Modeler

Web Modeler provides a built-in generator that produces a draft template based on a selected BPMN element. This is helpful when creating templates for existing connectors, service tasks, user tasks, or custom configurations.

### How to generate a template

1. Open your BPMN diagram in Web Modeler.
2. Select a BPMN element (for example, a service task).
3. Open the properties panel.
4. Navigate to the **Template** section.
5. Select **Generate template**.

Web Modeler creates a new template file pre-filled with:

- The element type
- Task headers
- Input and output mappings
- Form references
- Decision references
- Script expression bindings
- Hidden technical fields
- Any user-configured properties supported by the element template schema

The generated template appears in the template editor, where you can customize metadata, groups, constraints, binding types, and visibility.

### When to use generation vs. saving

Web Modeler provides two related features:

- **Save as template**: Captures _exactly_ what is currently configured on the element.
- **Generate template**: Produces a _schema-structured draft_ template that you can extend and refine.

Use generation when you want a clean template scaffold with clear property definitions.  
Use “Save as template” when you want to capture a fully configured element as-is.

## Generate a template in Desktop Modeler

Desktop Modeler does not include a template generator, but you can create templates by exporting the configuration of an existing BPMN element.

### Export a template

1. Select a BPMN element in your diagram.
2. Open the properties panel.
3. Select **Save as**.
4. Provide a name and metadata for your template.
5. Save the generated JSON file to:
   - The local project directory (`.camunda/element-templates`), or
   - The global template directory (`resources/element-templates`)

This method creates a full template based on the element’s current configuration and is functionally similar to Web Modeler’s **Save as template** flow.

## What is included in generated templates

Both Web Modeler and Desktop Modeler create templates with:

- BPMN element type
- Default values for supported fields
- Input and output mappings
- Task definition properties
- Form and decision bindings
- Job worker headers and metadata
- Supported BPMN properties such as message names, signal names, or script expressions
- Hidden static fields or generated values

Generated templates always adhere to the element template JSON schema.

For details, see:

- [Template metadata](./template-metadata.md)
- [Template properties](./template-properties.md)

## When generation is not available

Generation may be unavailable if:

- The element contains validation errors
- The element type does not support templates
- You do not have permission to create or edit templates
- You are not in implementation mode (Web Modeler only)

If generation is unavailable, resolve any errors or verify the element type before trying again.

## Next steps

- Learn how to [save an element as a template](./save-as-element-template.md)
- Explore how to [define templates manually](./defining-templates.md)
- Review [best practices for creating templates](../best-practices/element-template-guidelines.md)
