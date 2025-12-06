---
id: template-properties
title: Template properties
description: Define the fields, bindings, and validation logic that control how an element template appears and behaves in Modeler.
---

Template properties determine what users see in the properties panel and how values flow into the underlying BPMN model.

Each property defines:

- The **input type** (string, boolean, dropdown, feel, hidden, etc.)
- The **UI behavior** (labels, descriptions, constraints)
- The **binding** to BPMN or Zeebe extension elements
- Optional **conditions** that determine when the property is shown

Properties are defined in the template’s `properties` array.

## Property fields

Each property object may contain the following fields:

### `label` (string, required)

The human-readable label shown in the properties panel.

```json
"label": "Priority"
```

### `id` (string, required)

A unique identifier for the property inside the template. Used for referencing values in conditions and FEEL expressions.

```json
"id": "priority"
```

### `type` (string, required)

Determines the input control shown in the UI.

Common values include:

| Type       | Description                                   |
| ---------- | --------------------------------------------- |
| `String`   | Free-text input                               |
| `Boolean`  | Checkbox toggle                               |
| `Dropdown` | List of pre-defined choices                   |
| `Feel`     | FEEL expression editor                        |
| `Hidden`   | Not shown to users; value is applied silently |
| `Text`     | Multi-line input                              |
| `Number`   | Numeric input                                 |

Example:

```json
"type": "Dropdown"
```

### `value` (any, optional)

A default value applied when the template is selected.

```json
"value": "High"
```

### `description` (string, optional)

Short helper text displayed below the field.

```json
"description": "Select the message priority"
```

### `constraints` (object, optional)

Validation rules applied to the user’s input.

Supported constraints include:

- `notEmpty`: Field cannot be left blank.
- `pattern`: Regex validation.
- `min / max`: Numeric bounds.

Example:

```json
"constraints": {
  "notEmpty": true
}
```

### `choices` (array, optional)

Used only with `Dropdown` types.

```json
"choices": [
  { "name": "Low", "value": "Low" },
  { "name": "High", "value": "High" }
]
```

### `binding` (object, required)

Defines how the property writes to the BPMN element.

Common bindings include:

| Binding type               | Purpose                                      |
| -------------------------- | -------------------------------------------- |
| `zeebe:input`              | Writes a value into an input mapping         |
| `zeebe:output`             | Writes to an output mapping                  |
| `zeebe:taskHeader`         | Adds a task header                           |
| `zeebe:property`           | Sets a Zeebe extension property              |
| `bpmn:conditionExpression` | Defines a gateway or sequence flow condition |
| `camunda:formRef`          | Binds a form to a user task                  |

Example:

```json
"binding": {
  "type": "zeebe:input",
  "name": "priority"
}
```

### `group` (string, optional)

Assigns the property to a visual section in the UI.

Groups are defined in the template’s `groups` array.

```json
"group": "input"
```

### `condition` (object, optional)

Controls conditional visibility.

Example: Show this field only when `operationType` has one of several values.

```json
"condition": {
  "property": "operationType",
  "oneOf": ["addQueueItem", "updateQueueItem"]
}
```

### `feel` (string, optional)

Defines whether a field must use FEEL or whether FEEL is optional.

Options:

- `"required"`
- `"optional"`
- `"disabled"`

Example:

```json
"feel": "optional"
```

## Defining property groups

Groups define sections in the properties panel.

```json
"groups": [
  { "id": "config", "label": "Configuration" },
  { "id": "advanced", "label": "Advanced settings" }
]
```

Properties reference groups by ID:

```json
"group": "config"
```

## Hidden properties

Hidden fields allow you to set static values without exposing them to end users.

```json
{
  "id": "method",
  "type": "Hidden",
  "value": "POST",
  "binding": { "type": "zeebe:taskHeader", "key": "method" }
}
```

These are useful for:

- Fixed HTTP methods
- Constant headers
- Static version numbers
- Internal configuration

## Optional vs. required properties

You can combine constraints and optional bindings to control behavior:

### Required field example

```json
"constraints": {
  "notEmpty": true
}
```

### Optional binding example

Does not persist empty values into BPMN XML:

```json
"binding": {
  "type": "zeebe:input",
  "name": "optionalValue",
  "optional": true
}
```

## FEEL usage guidelines

Use FEEL only when necessary. Common patterns:

### Simple text input (no FEEL)

```json
"type": "String",
"feel": "disabled"
```

### Optional FEEL

```json
"type": "Feel",
"feel": "optional"
```

### Mandatory FEEL

```json
"type": "Feel",
"feel": "required"
```

## Conditions and dynamic visibility

Use conditions to tailor the UI based on user choices.

Example: Show `priority` only when `operationType = addQueueItem`.

```json
"condition": {
  "property": "operationType",
  "equals": "addQueueItem"
}
```

## Example property block

```json
{
  "label": "Priority",
  "id": "priority",
  "type": "Dropdown",
  "description": "Select how urgent this task is",
  "choices": [
    { "name": "Low", "value": "Low" },
    { "name": "Normal", "value": "Normal" },
    { "name": "High", "value": "High" }
  ],
  "binding": {
    "type": "zeebe:input",
    "name": "priority"
  },
  "constraints": {
    "notEmpty": true
  },
  "group": "config",
  "feel": "optional"
}
```

## Next steps

- Explore [full examples](./template-example.md).
- Learn how to structure and manage related resources in [element templates with dependencies](./element-templates-with-dependencies.md).
- Return to the [main overview](../about-templates.md).
