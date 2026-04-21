---
id: defining-templates
title: Define element templates
description: Learn how to define element templates using the JSON schema, configure metadata, and structure editable properties for BPMN elements.
---

Define element templates using a JSON descriptor file that describes how the template behaves, how its fields appear in the properties panel, and how values map to BPMN XML.

## Template structure

An element template is a JSON object containing required and optional keys. Each key determines how the template is discovered, displayed, validated, or mapped to BPMN or Camunda extension elements.

Element templates are validated against the element template JSON schema. Web Modeler displays errors directly in the template editor, and Desktop Modeler reports validation issues on load.

## Required keys

The following keys must be included:

- **`$schema`**: URL pointing to the JSON schema.
- **`id`**: Unique identifier for the template.
- **`name`**: User-facing name displayed in Modeler.
- **`appliesTo`**: Array of BPMN element types the template can be applied to.
- **`properties`**: Array of property definitions exposed (or hidden) in the properties panel.

### Example

```json
{
  "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json",
  "id": "my.connector.example",
  "name": "My example template",
  "appliesTo": ["bpmn:ServiceTask"],
  "properties": []
}
```

## Optional keys

Optional keys enhance usability, versioning, compatibility, or discoverability.

These keys allow you to describe the template more clearly, support upgrades, group fields, or define compatibility rules.

Common optional keys include:

- **`version`**: Supports template versioning and upgrade paths.
- **`description`**: User-facing description shown in Modeler.
- **`keywords`**: Improves template searchability.
- **`category`**: Groups the template inside the selection dialog.
- **`documentationRef`**: URL to external documentation.
- **`icon`**: Icon displayed in the selection dialog and properties panel.
- **`engines`**: Compatibility with Camunda versions.
- **`elementType`**: Replaces the BPMN element type on apply.
- **`groups`**: Organizes property inputs into structured UI groups.
- **`deprecated`**: Marks the template as deprecated.

See [template metadata](./template-metadata.md) for detailed descriptions.

## Properties

The `properties` array defines the fields shown in the properties panel after applying a template. Each property controls:

- how the field appears in the UI
- whether the user can edit it
- how the value is validated
- how the value is written to BPMN XML

Each property object can define:

**Core fields**

- `label`: User-facing field label
- `type`: Input type (`String`, `Dropdown`, `Boolean`, etc.)
- `value`: Default value
- `binding`: Required mapping that writes the value to BPMN XML

**Optional fields**

- `placeholder`: Helpful UI hint
- `editable`: Whether the user can modify the value
- `group`: UI grouping
- `constraints`: Validation rules
- `condition`: Determines when the field is shown
- `feel`: Whether FEEL expressions are supported
- `optional`: Prevents empty values from being persisted
- `generatedValue`: Automatically generated value

Detailed definitions appear in [template properties](./template-properties.md).

## Supported input types

Templates support several property input types:

- **String**
- **Text**
- **Number**
- **Boolean**
- **Dropdown**
- **Hidden**

Each type changes how the field behaves in the properties panel. For example:

- `Hidden` fields store technical values that should not be user-editable.
- `Dropdown` fields restrict users to predefined choices.
- `Boolean` fields appear as toggles or checkboxes.

## Supported bindings

Bindings determine how property values are written to BPMN or Camunda extension elements.

Supported binding types include:

- `zeebe:input`
- `zeebe:output`
- `zeebe:taskHeader`
- `zeebe:taskDefinition`
- `zeebe:property`
- `property` (BPMN attributes)
- `bpmn:Message#property`
- `bpmn:Message#zeebe:subscription#property`
- `bpmn:Signal#property`
- `zeebe:calledElement`
- `zeebe:userTask`
- `zeebe:formDefinition`
- `zeebe:assignmentDefinition`
- `zeebe:taskSchedule`
- `zeebe:priorityDefinition`
- `zeebe:calledDecision`
- `zeebe:script`
- `zeebe:adHoc`

Each binding type has specific rules. See examples in [template properties](./template-properties.md).

## Schema validation

The `$schema` key determines which version of the element template schema is used. Modelers validate templates automatically:

- **Web Modeler** supports only the latest schema version.
- **Desktop Modeler** supports older schema versions but may show warnings.

Most modern text editors (including VS Code) automatically validate against the schema and provide autocomplete, highlighting, and error detection.

:::info
If a template fails schema validation, Web Modeler will not load it.
:::

## Element type and appliesTo

The `appliesTo` key defines which BPMN element types a user may apply the template to. Common examples include:

- `bpmn:Task`
- `bpmn:ServiceTask`
- `bpmn:UserTask`
- `bpmn:StartEvent`
- `bpmn:MessageEvent`

If you want applying the template to automatically convert the BPMN element to a different type, you can define:

```json
"elementType": {
  "value": "bpmn:BusinessRuleTask"
}
```

This is useful when a user selects a generic task and the template needs it to become a more specific task type.

## Defining multiple templates in a single file

You may define multiple templates in one JSON file by placing them inside an array:

```json
[
  { "id": "template.a", "name": "Template A", ... },
  { "id": "template.b", "name": "Template B", ... }
]
```

:::warning
This is supported only in **Desktop Modeler**.  
Web Modeler requires **one template per file**.
:::

## Editing templates

You can edit templates in:

- **Any text editor**, such as VS Code, IntelliJ, or WebStorm
- **Web Modeler’s built-in template editor**, which offers:
  - JSON validation
  - Live UI preview
  - Error highlighting
  - Schema-aware autocomplete
  - Real-time binding checks
  - Validation for unsupported or unknown fields

The Web Modeler editor continuously validates templates to ensure they load correctly and can be applied without errors.

## Example template

A simple example showing common keys:

```json
{
  "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json",
  "name": "Template 1",
  "id": "sometemplate",
  "description": "some description",
  "keywords": ["search alias", "create action"],
  "version": 1,
  "engines": {
    "camunda": "^8.6"
  },
  "appliesTo": ["bpmn:Task"],
  "elementType": {
    "value": "bpmn:ServiceTask"
  },
  "properties": [
    {
      "label": "Input variable",
      "type": "String",
      "value": "myVariable",
      "binding": {
        "type": "zeebe:input",
        "name": "anInputVariable"
      }
    }
  ]
}
```

## Next steps

- Explore advanced metadata options in [template metadata](./template-metadata.md).
- Review available property types and bindings in [template properties](./template-properties.md).
- Learn how to manage related resources in [element templates with dependencies](./element-templates-with-dependencies.md).
