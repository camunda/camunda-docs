---
id: element-template-guidelines
title: Best practices for custom-built element templates
description: Learn the best practices for creating and managing custom-built element templates in Web Modeler and Desktop Modeler.
---

When creating custom-built element templates, use the following guidelines to ensure they are clear, maintainable, and provide a consistent modeling experience across Web Modeler and Desktop Modeler.

:::note
Connector templates are a specific type of element template.
:::

## Naming, description, and icon

### Use sentence case

- ❌ GitHub Webhook Intermediate Catch Event connector
- ✅ GitHub webhook intermediate catch event connector

### Choosing a name

Use a clear, easily understandable name.  
Include the brand name if the template connects to a service; otherwise, describe its main feature.

Names and descriptions appear in the template catalog and the properties panel.

### Description

Keep descriptions short, clear, and user-friendly.  
Describe what the template does and why it is useful.

## Icon

- Prefer **SVG** format; PNG or JPEG is acceptable if necessary.
- Maximum size: **8 KB**.
- Recommended resolution for PNG/JPEG: **512×512 px**.
- Icons render at **18×18 px** on the canvas and **32×32 px** in the properties panel.
- Use an official logo where possible.
- Ensure licensing permits commercial use (Public Domain, CC0, or CC BY).

## Properties panel UI

Element templates define which fields appear and how they behave in the properties panel. Follow these guidelines to ensure clarity and consistency.

### Property naming

- Use readable, user-friendly labels.
- Use sentence case.
- Reserve technical identifiers for IDs within the JSON, not labels.

Example:

- ID: `addQueueItem`
- Label:
  - ✅ Add queue item
  - ❌ addQueueItem

### Property description

- Ensure accuracy.
- Provide short explanations.
- Use tooltips where appropriate.
- Link to external documentation when needed.

Example:

- ❌ “Your application's Client ID from the OAuth client.”
- ✅ “UIPath OAuth Client ID. Retrieve this value from your UIPath external apps configuration.”

### Placeholders

Use placeholders to show expected formats or examples.  
Avoid repeating the label.

### Variable naming

Variables are internal to the template JSON and should follow:

- **lower camelCase**
- No leading underscores (`_myVar` ❌)

Method-specific exceptions may use underscores:

- `chatCompletion_apiVersion`
- `completion_apiVersion`

## Versioning

If you plan to evolve a template, include a version number starting at `1`.

```json
{
  "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json",
  "name": "My Connector",
  "id": "org.my.connector",
  "version": 1
}
```

### Provide meaningful upgrade paths

Updates should:

- Preserve user-modified values where possible
- Apply new defaults only to untouched fields
- Remove obsolete fields automatically

This ensures template evolution remains safe and predictable.

## JSON structure

- Structure the JSON in the same order fields appear in the UI.
- Keep hidden properties grouped logically.
- If a FEEL expression depends on variables, define the variables before the expression.

## Secret handling

- Never store secret values directly inside the template JSON.
- Use the platform’s secret-handling mechanisms.
- Bind fields to secrets according to connector rules.

## Field types

Use field types that match the input expectations and avoid unnecessary complexity for users.

### Hidden vs. visible fields

Make static or technical values hidden.

Examples of fields that should typically be hidden:

- HTTP method
- Static endpoint paths
- Static headers
- Runtime worker type
- Fixed version tags

### Required vs. optional fields

Use:

- **Not empty constraint** → for required fields
- **Optional bindings** → to avoid persisting empty values in BPMN XML

### Mandatory FEEL vs. optional FEEL

- Require FEEL only when necessary.
- Optional FEEL can be used for flexible inputs.

More information: [FEEL editor support](/components/modeler/element-templates/template-properties.md#adding-feel-editor-support-feel).

### Free input vs. dropdown vs. constraints

- Use dropdowns for predefined choices.
- Use free input with validation for flexible user-defined values.

**Example:**

```json
{
  "label": "Priority",
  "id": "priority",
  "group": "input",
  "description": "The priority to apply to the queue item.",
  "value": "Low",
  "type": "Dropdown",
  "choices": [
    { "name": "Low", "value": "Low" },
    { "name": "Normal", "value": "Normal" },
    { "name": "High", "value": "High" }
  ],
  "binding": { "type": "zeebe:input", "name": "priority0" },
  "condition": { "property": "operationType", "oneOf": ["addQueueItem"] }
}
```

## Accessibility and usability guidelines

- Group related fields into clear sections (for example, **Request**, **Authentication**, **Advanced**).
- Use consistent naming across all templates.
- Avoid exposing technical runtime fields unless necessary.
- Provide tooltips for fields that require explanation.

## Local development recommendations

- Use a JSON-schema-aware editor (VS Code recommended).
- Validate against the element template schema.
- Test templates in both Web Modeler and Desktop Modeler when applicable.
- Use version control for template management.

## QA guidelines

Before publishing a template, verify:

- Bindings generate correct BPMN or Zeebe extension elements.
- Required fields show proper validation.
- Optional properties do not persist empty values.
- FEEL behavior (required vs optional) is accurate.
- Hidden fields produce correct XML output.
- Versioning and upgrade paths function as expected.
- Dependencies (forms, DMN, subprocesses, secrets, job workers) exist and are accessible.
- The icon loads correctly.
- The properties panel is usable and logically organized.

## Summary

These guidelines help ensure that element templates:

- Provide a consistent user experience
- Reduce modeling errors
- Are easy to maintain and evolve
- Work reliably across Web Modeler and Desktop Modeler

Following these conventions supports high-quality, reusable building blocks across the Camunda ecosystem.
