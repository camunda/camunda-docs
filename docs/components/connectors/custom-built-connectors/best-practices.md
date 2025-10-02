---
id: best-practices
title: Best practices for custom-built element templates and connectors
description: Learn the best practices for creating and managing custom-built element templates and connectors in Web Modeler.
---

## Best practices for creating element templates and connectors

When creating custom-built element templates and connectors, consider the following best practices to ensure they are effective, user-friendly, and maintainable.

### Naming, description, and icon

#### Sentence case

- Outbound, inbound, intermediate, and element types will be capitalized only at the beginning of a sentence/title.
- webhook, subscription, and polling will be capitalized only at the beginning of a sentence/title.
- In the middle of a sentence, we need to capitalize the following:
  - Brand names
  - “Connector/s” when referring to the component.

For example:

- ❌ GitHub Webhook Intermediate Catch Event Connector
- ✅ GitHub webhook intermediate catch event Connector.

#### Choosing a name

When naming a new template, choose a clear and easily understandable name. If the template connects to a service or tool, include the brand name. Otherwise, describe its main feature.

#### Description

Keep descriptions brief and clear. Explain what the template does and why it’s helpful in a couple of lines. Avoid using technical terms or complicated language.

### Icon

- Prefer SVG Format: Use SVG files for icons, as they are scalable without losing quality.
- Size: Where SVG isn’t possible, and a PNG / JPEG is required, ensure the icon is 512x512 pixels.
- Check for Official Logo: Look for an official logo on the connected service's website. If there isn't one, ask the design team to create a custom icon.
- License Compliance: Use icons with appropriate licenses, such as Public Domain (CC0) or Creative Commons (CC BY), ensuring they are free for commercial use or have the necessary permissions.

### Properties panel UI

The element template defines interaction methods, visible and hidden entries, and mandatory fields, which are reflected in the Modeler properties panel UI.
Follow these guidelines to create a consistent and seamless user experience for your template.

#### Property naming

- When labeling a property, choose a readable property name instead of a technical one.
- Use Sentence case.
- When naming operations or property IDs, align with the Java method naming convention. IDs are not displayed in the properties panel but are referenced inside the template’s code.

For example:

- ID aligned with Java method: addQueueItem
- Label:
  - ✅ Add queue item
  - ❌ addQueueItem

#### Property description

- Ensure accuracy in property descriptions.
- Utilize tooltips for brief explanations to avoid cluttering the properties panel.
- For detailed explanations, include links to the relevant documentation.

For example:

- ❌ "Your application's Client ID from the OAuth client."
- ✅ "UIPath OAuth Client ID: Retrieve from UIPath external apps configuration."

### Inputs placeholders

- Use placeholders to indicate the expected format or example input.
- Avoid placeholder text that duplicates the label.
- Ensure placeholders are understandable and provide helpful hints.

#### Variable naming

Variables are not displayed in the properties panel but are referenced inside the elements template’s code.

**General Rule**: Begin with a lowercase letter and capitalize subsequent words (lower camel case). Ensure variables do not start with an underscore ("\_").

For example:

- ❌ \_MyTestVariable
- ✅ myTestVariable

**Exception for Method-Specific Properties**: When variables indicate method-specific properties, underscores are acceptable to separate the method indication from the actual property name. This enhances clarity, especially when the same properties are pre-populated for different methods.

For example:

- ✅ chatCompletion_apiVersion
- ✅ completion_apiVersion

#### Versioning

Always include a version number property, starting from 1. Increment this number with each subsequent version.

```json
{
  "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json",
  "name": "My Connector",
  "id": "my.connector",
  "version": 1
}
```

#### JSON structure

The JSON structure should mirror the visual presentation to maintain alignment with UI order. This ensures groups and properties are organized accordingly, even if some elements are hidden. This facilitates easier third-party maintenance.

Note that if you want to use a FEEL expression that references other variables, the properties that define these variables in the JSON structure must be declared before the property where you intend to use the FEEL expression.

#### Secret Handling

- Follow the rules of the system you're adding to.
- Don't save secret info in the JSON.
- Use the Connectors' [secret handling](/components/connectors/use-connectors/index.md#using-secrets) instead.

#### Field Types

To ensure a good user experience, make sure the template is intuitive and designed to minimize errors.

##### Hidden vs. visible fields

A general rule of thumb is that if certain values are static and do not require user input, the template creator should prefill them. Since these values offer no additional benefit to the user by being visible, they can be hidden.

Hidden fields - Example:

- HTTP Method
- Static URL Endpoint
- Static header

##### Required vs. optional

- Required: All properties essential for the Element template to function. Without these properties, the template cannot operate.
- Optional: All properties that are not mandatory but provide additional functionality.

There are two mechanisms to define the connector property behavior depending on whether the field is required or optional:

- [“Not empty” constraint](/components/modeler/element-templates/template-properties.md#validating-user-input-constraints): if activated, will display an error message if the user doesn’t fill in the field.
- [Optional bindings](/components/modeler/element-templates/template-properties.md#preventing-persisting-empty-values-optional): an optional binding will not be persisted in the BPMN XML if the corresponding property contains an empty string.

##### Mandatory FEEL vs. Optional FEEL

FEEL is designed to write expressions for decision tables and literal expressions in a way that is easily understood by business professionals and developers. It should only be required when an expression is necessary. For straightforward inputs, FEEL expressions should be set as optional. More details in the [documentation](/components/modeler/element-templates/template-properties.md#adding-feel-editor-support-feel).

##### Free Input vs. dropdown vs. constraints

Use a dropdown when the selection options are predefined for the property. If there is a wide range of input possibilities that cannot be accommodated by a dropdown, apply appropriate constraints to a free input field type, such as String.

```json
{
  "label": "Priority",
  "id": "priority",
  "group": "input",
  "description": "The priority to apply to the queue item.",
  "value": "Low",
  "type": "Dropdown",
  "choices": [
    {
      "name": "Low",
      "value": "Low"
    },
    {
      "name": "Normal",
      "value": "Normal"
    },
    {
      "name": "High",
      "value": "High"
    }
  ],
  "binding": {
    "type": "zeebe:input",
    "name": "priority0"
  },
  "condition": {
    "property": "operationType",
    "oneOf": ["addQueueItem"]
  }
}
```
