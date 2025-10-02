---
id: best-practices
title: Best practices for custom-built element templates and connectors
description: Learn the best practices for creating and managing custom-built element templates and connectors in Web Modeler.
---

When creating custom-built element templates and connectors, consider the following best practices to ensure they are effective, user-friendly, and maintainable.

## Naming, description, and icon

### Sentence case

- Outbound, inbound, intermediate, and element types are capitalized only at the beginning of a sentence or title.
- Webhook, subscription, and polling are capitalized only at the beginning of a sentence or title.
- In the middle of a sentence, capitalize:
  - Brand names
  - "Connector/s" when referring to the component

For example:

- ❌ GitHub Webhook Intermediate Catch Event Connector
- ✅ GitHub webhook intermediate catch event Connector

### Choosing a name

Choose a clear, easily understandable name. Include the brand name if the template connects to a service or tool; otherwise, describe its main feature.

### Description

Keep descriptions brief and clear. Explain what the template does and why it’s helpful in a couple of lines. Avoid technical jargon or complex language.

## Icon

- **Prefer SVG format:** Use SVG files for icons, as they are scalable without losing quality.
- **Size:** If SVG isn’t possible and PNG/JPEG is required, ensure the icon is 512x512 pixels.
- **Check for official logo:** Use the official logo from the service website, or request a custom icon from the design team.
- **License compliance:** Ensure icons have the appropriate license (Public Domain CC0 or Creative Commons CC BY) for commercial use.

## Properties panel UI

The element template defines interaction methods, visible and hidden entries, and mandatory fields, which are reflected in the Modeler properties panel UI. Follow these guidelines for a consistent user experience.

### Property naming

- Use readable property names instead of technical identifiers.
- Use sentence case.
- Align operation or property IDs with Java method naming conventions (IDs are referenced in the template code, not displayed).

Example:

- ID aligned with Java method: `addQueueItem`
- Label:
  - ✅ Add queue item
  - ❌ addQueueItem

### Property description

- Ensure accuracy in property descriptions.
- Use tooltips for brief explanations.
- Link to relevant documentation for detailed explanations.

Example:

- ❌ "Your application's Client ID from the OAuth client."
- ✅ "UIPath OAuth Client ID: Retrieve from UIPath external apps configuration."

## Inputs placeholders

- Use placeholders to indicate expected format or example input.
- Avoid placeholders that duplicate the label.
- Ensure placeholders are understandable and helpful.

### Variable naming

Variables are not displayed in the properties panel but are referenced inside the template code.

**General rule:** Use lower camel case (start lowercase, capitalize subsequent words). Avoid starting variables with underscores ("\_").

Example:

- ❌ \_MyTestVariable
- ✅ myTestVariable

**Exception for method-specific properties:** Underscores may separate the method indication from the property name.

Example:

- ✅ chatCompletion_apiVersion
- ✅ completion_apiVersion

### Versioning

Always include a version number, starting from 1. Increment with each new version.

```json
{
  "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json",
  "name": "My Connector",
  "id": "org.my.connector",
  "version": 1
}
```

### JSON structure

The JSON structure should mirror the visual presentation to maintain alignment with the UI order. This ensures groups and properties are organized accordingly, even if some elements are hidden.  
If you want to use a FEEL expression that references other variables, the properties defining those variables must be declared before the property where the FEEL expression is used.

### Secret handling

- Follow the rules of the system you’re adding to.
- Do not save secret information in the JSON.
- Use the Connectors' [secret handling](/components/connectors/use-connectors/index.md#using-secrets).

### Field types

To ensure a good user experience, make templates intuitive and minimize errors.

#### Hidden vs. visible fields

If certain values are static and do not require user input, prefill them. Hidden fields offer no additional benefit by being visible.

**Hidden fields example:**

- HTTP method
- Static URL endpoint
- Static header

#### Required vs. optional

- **Required:** Properties essential for the template to function. Without these, the template cannot operate.
- **Optional:** Properties that are not mandatory but provide additional functionality.

There are two mechanisms to define property behavior depending on whether a field is required or optional:

- [**“Not empty” constraint**](/components/modeler/element-templates/template-properties.md#validating-user-input-constraints): Displays an error if the field is left empty.
- [**Optional bindings**](/components/modeler/element-templates/template-properties.md#preventing-persisting-empty-values-optional): Does not persist empty properties in the BPMN XML.

#### Mandatory FEEL vs. optional FEEL

FEEL expressions should only be required when necessary. For straightforward inputs, expressions can be optional.  
More details: [FEEL editor support](/components/modeler/element-templates/template-properties.md#adding-feel-editor-support-feel).

#### Free input vs. dropdown vs. constraints

- Use a dropdown when selection options are predefined.
- Use free input with constraints when there is a wide range of input possibilities.

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
