---
id: template-metadata
title: Template metadata
description: Learn how to define identifiers, discoverability, compatibility, and type information for your element templates.
---

Element template metadata defines how a template is identified, displayed, categorized, and validated in the Modeler. Metadata also helps ensure compatibility across environments and supports versioning.

## Identification: ID and version

### `id` (required)

A unique identifier for the template.

- Must remain stable across versions.
- Changing the `id` creates a new template lineage.
- Use a reverse-DNS format when possible (for example, `com.example.myTemplate`).

### `version` (optional)

Defines a template version to support upgrade paths.

- Must be an integer.
- Templates with the same `id` but different `version` values are considered different versions of the same template.
- Required if you want to allow updating applied templates.

```json
{
  "id": "com.example.httpRequest",
  "version": 2
}
```

## Discoverability: name, description, keywords, icon, documentationRef, category

### `name` (required)

Human-friendly label shown in the selection menu and properties panel.

- Use sentence case.
- Avoid technical identifiers in the name.

### `description` (optional)

Short explanation of what the template does and when to use it.

- Keep concise.
- Avoid jargon.

### keywords (optional)

An array of search terms to improve discoverability.

```json
"keywords": ["email", "notification", "smtp"]
```

Keywords are not shown in the UI but are included in search.

### `icon` (optional)

Defines the icon shown in the selection modal and properties panel.

```json
"icon": {
  "contents": "<svg>...</svg>"
}
```

For icon guidelines, see the best practices section.

### `documentationRef` (optional)

A URL pointing to external documentation.

Displayed in the properties panel.

```json
"documentationRef": "https://example.com/docs/send-email"
```

### `category` (optional)

Groups templates in the selection modal under a labeled heading.

```json
"category": {
  "id": "messaging",
  "label": "Messaging"
}
```

## Supported BPMN types: `appliesTo` and `elementType`

### `appliesTo` (required)

A list of BPMN element types the template can be applied to.

```json
"appliesTo": ["bpmn:ServiceTask", "bpmn:Task"]
```

### `elementType` (optional)

Defines which BPMN element type the element becomes when the template is applied.

Useful when you want a generic task to become a more specific type, such as a service task.

```json
"elementType": {
  "value": "bpmn:ServiceTask"
}
```

## Engine compatibility

### `engines` (optional)

Specifies which environments and versions are compatible with the template.

Use semantic version ranges.

```json
"engines": {
  "camunda": "^8.6"
}
```

If omitted, the template is assumed to be compatible with all supported versions.

## Grouping properties

### `groups` (optional)

Defines sections in the properties panel, helping organize complex templates.

```json
"groups": [
  {
    "id": "authentication",
    "label": "Authentication"
  }
]
```

Assign properties to groups by referencing their `group` ID inside the property definition.

## Putting metadata together

Example template metadata block:

```json
{
  "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json",
  "id": "com.example.sendEmail",
  "name": "Send email",
  "description": "Send an email using SMTP.",
  "version": 1,
  "keywords": ["email", "smtp"],
  "category": {
    "id": "messaging",
    "label": "Messaging"
  },
  "documentationRef": "https://example.com/docs/send-email",
  "icon": {
    "contents": "<svg>...</svg>"
  },
  "appliesTo": ["bpmn:ServiceTask"],
  "elementType": { "value": "bpmn:ServiceTask" },
  "engines": { "camunda": "^8.6" }
}
```

## Next steps

- Define template behavior and user-facing fields in [template properties](./template-properties.md).
- Explore a [complete working example](./template-example.md).
- Learn how to handle external references and required resources in [element templates with dependencies](./element-templates-with-dependencies.md).
