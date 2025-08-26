---
id: defining-templates
title: Defining templates
description: "Learn about JSON schema compatibility, supported BPMN types, defining template properties, and more."
---

Templates are defined in template descriptor files as a JSON array:

```json
[
  {
    "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json",
    "name": "Template 1",
    "id": "sometemplate",
    "description": "some description",
    "keywords": [
      "search alias",
      "create action"
    ],
    "version": 1,
    "engines": {
      "camunda": "^8.6"
    },
    "appliesTo": [
      "bpmn:Task"
    ],
    "elementType": {
      "value": "bpmn:ServiceTask"
    },
    "properties": [
      ...
    ]
  },
  {
    "name": "Template 2",
    ...
  }
]
```

As seen in the code snippet, a template consists of a number of important components:

- `$schema : String`: URI pointing towards the [JSON schema](https://json-schema.org/) which defines the structure of the element template `.json` file. Element template schemas are maintained in the [element templates JSON schema](https://github.com/camunda/element-templates-json-schema) repository. Following the [JSON schema](https://json-schema.org/) standard, you may use them for validation or to get assistance (e.g., auto-completion) when working with them in your favorite IDE.

:::note

The `$schema` attribute is **required** for Camunda 8 element templates.
:::

Example:

```json
"$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json"
```

- `name : String`: Name of the template. Shown in the element template selection modal and in the properties panel on the right side of the screen (after applying an element template).
- `id : String`: ID of the template.
- `description : String`: Optional description of the template. Shown in the element template selection modal and in the properties panel (after applying an element template).
- `keywords: Array<String>`: Optional list of keywords. Can be used to help users find this template. Keywords are used for search and filtering but are not displayed in the UI.
- `documentationRef : String`: Optional URL pointing to a template documentation. Shown in the properties panel (after applying an element template).
- `version : Integer`: Optional property to support [templates versioning and upgrading](./template-metadata.md#template-versioning). If you add a version to a template, it is considered unique based on its ID and version. Two templates can have the same ID if their version is different.
- `engines : Object`: Optional dictionary of environments [compatible with the template](./template-metadata.md#template-compatibility). Environment version is specified with semantic versions range.
- `appliesTo : Array<String>`: List of BPMN types the template can be applied to.
- `elementType : Object`: Optional type of the element. If you configure `elementType` on a template, the element is replaced with the specified type when a user applies the template.
- `properties : Array<Object>`: List of properties of the template.

## Creating and editing connector templates

Connector templates are a specific type of element template. You can edit them with visual preview and edit support like formatting, code completion, and error highlighting in [Web Modeler](/components/connectors/manage-connector-templates.md).

## Further reading

For detailed information about specific aspects of template development, see:

- **[Template Metadata](./template-metadata.md)** - Learn about template identification fields like name, ID, description, keywords, versioning, JSON schema compatibility, engine compatibility, and supported BPMN types
- **[Template Properties](./template-properties.md)** - Master template properties including types, bindings, constraints, and advanced features
