---
id: template-metadata
title: Template metadata
description: "Learn about template metadata fields like name, ID, description, keywords, versioning, and JSON schema compatibility."
---

The metadata of an element template contains important information about the template itself, such as its name, description, version, compatibility with different Camunda versions, and the schema that is used to validate the template itself.

## Validation: `$schema`

The application uses the `$schema` property to ensure compatibility for a given element template. You find [the latest supported versions here](https://www.npmjs.com/package/@camunda/zeebe-element-templates-json-schema).

The tooling ignores element templates defining a higher `$schema` version and logs a warning message.

For example, given the following `$schema` definition, the application takes `0.9.1` as the JSON schema version of the element template:

```json
{
  "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema@0.9.1/resources/schema.json",
  ...
}
```

The JSON schema versioning is backward-compatible, meaning that all versions including or below the current one are supported.

:::info
The Web Modeler only supports element templates pointing to the latest schema version: `"https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json"`
:::

## Identification: `id` and `version`

The `id` key defines the identifier of the template. Templates with the same `id` and different versions offer an upgrade path.
Templates with the same `id` and `version` are considered identical, regardless of other differences.
To support [template evolution](https://github.com/bpmn-io/element-templates/blob/main/docs/LIFE_CYCLE.md#overview), maintain a `version` property on your templates:

```json
{
  "id": "sometemplate",
  "version": 1,
  ...
}
```

Once a template with a new `version` is available to users, the editor tooling suggests an upgrade, [preserving technical bindings](https://github.com/bpmn-io/element-templates/blob/main/docs/LIFE_CYCLE.md#upgrade-behavior) on a best effort basis.

:::tip
Versioning is an important cornerstone of template evolution. Review the [upstream documentation](https://github.com/bpmn-io/element-templates/blob/main/docs/LIFE_CYCLE.md#overview) to understand foundations of our upgrade mechanism, and foundations on how the element template life cycle works.
:::

The template `id` and `version` together form a unique identifier for a template. Two templates can have the same `id` if their `version` is different.
If `id` and `version` are the same for two templates, the tooling considers them to be the same template.

## Discoverability: `name`, `description`, `keywords`, `icon`, `documentationRef`, and `category`

These keys define the user-facing metadata of the template. They help the template users to discover and understand the purpose of the template.
They are shown when selecting a template and when the template has been applied to an element.

- `name : String` key defines the name of the template.
- `description : String` key is optional and provides additional information about the template.
- `keywords : Array<String>` key is an optional list of keywords that can help users find this template. Keywords are used for search and filtering but are not displayed in the UI.
- `icon : Object` key is an optional icon configuration for the template. The icon contents must be a valid [data](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) or HTTP(s) URL. We recommend using square icons as they get rendered 18x18 pixels on the canvas and 32x32 pixels in the properties panel.
- `documentationRef : String` key is an optional URL pointing to a template documentation. It is shown in the properties panel (after applying an element template).
- `category : Object` key is an optional category configuration for the template. You can define a category to group templates in the element template selection list. If not defined, the template will be displayed in the **Templates** section.
  - `id : String` key defines the unique identifier of the category.
  - `name : String` key defines the name of the category that the template is shown in.

```json
{
  ...,
  "name": "Template 1",
  "description": "some description",
  "keywords": [
    "search alias",
    "create action"
  ],
  "icon": {
    "contents": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='none'%3E%3Ccircle cx='11' cy='11' r='9' fill='black'/%3E%3Ctext x='6.9' y='14.9' fill='white' style='font-family: Arial; font-size: 10px;'%3EM%3C/text%3E%3C/svg%3E"
  },
  "documentationRef": "https://example.com/docs/template-1",
  "category": {
    "id": "custom-templates",
    "name": "Custom Templates"
  },
  ...
}
```

## Engine compatibility: `engines`

Define [template compatibility](https://github.com/bpmn-io/element-templates/blob/main/docs/LIFE_CYCLE.md#compatibility) with execution platforms (Camunda Orchestration Cluster versions) and related components (such as Web Modeler) using the `engines` property.

This property is a dictionary object, where the execution platform names are the keys, and the [semantic version](https://semver.org/) ranges are the values.

For example, the following `engines` definition specifies that the template is compatible with Camunda 8.6 or higher.

```json
{
  ...,
  "engines": {
    "camunda": ">8.5"
  }
}
```

Compatibility is only validated if the platform version is provided by both the template and the modeler. In the example below, the template is compatible with specified versions of both Desktop and Web Modeler, but it requires Camunda version 8.6 or higher for both:

```json
{
  ...,
  "engines": {
    "camunda": ">8.5",
    "camundaDesktopModeler": ">=5.30",
    "camundaWebModeler": "^8.5.5"
  }
}
```

You can also use this feature to explicitly specify a template's incompatibility with a platform. For instance, the following template is incompatible with all versions of Web Modeler:

```json
{
  ...,
  "engines": {
    "camundaWebModeler": "0"
  }
}
```

If no `engines` are specified, a template is considered compatible with any execution platform version.

:::tip
Review the [upstream documentation](https://github.com/bpmn-io/element-templates/blob/main/docs/LIFE_CYCLE.md#overview) to learn more about template evolution and the life cycle.
:::

## Supported BPMN types: `appliesTo` and `elementType`

Currently, element templates may be used on the following BPMN elements:

- `bpmn:Activity` (including tasks, service tasks, and others)
- `bpmn:SequenceFlow` (for maintaining `condition`)
- `bpmn:Process`
- `bpmn:Event`

- `appliesTo : Array<String>`: specifies the BPMN types the template can be applied to. It will only be shown for these types of elements in the modeler.
- The `elementType : Object` (optional): If you configure `elementType` on a template, the element is replaced with the specified type when a user applies the template.
  - `value : String`: The BPMN type to set the element to when the template is applied.
  - `eventDefinition: String` (optional): You must set this key to `"bpmn:MessageEventDefinition"` if you are templating any message event. Otherwise, this key can be ignored.

Some properties require a specific BPMN type to work correctly. In that case they will require a certain `elementType` to be set by the template.
Such constraints are checked based on the element template schema and by the modeler when it loads the templates.

```json
{
  ...,
  "appliesTo": [
    "bpmn:Task"
  ],
  "elementType": {
    "value": "bpmn:ServiceTask"
  }
}
```

## Grouping properties: `groups`

You can define `groups` to organize custom fields into. The fields will be shown in their assigned group in the properties panel (after applying an element template).
You can also define whether a group is expanded or collapsed by default.

```json
{
   ...,
  "groups": [
    {
      "id": "definition",
      "label": "Task definition",
      "openByDefault": true
    },
    {
      "id": "request",
      "label": "Request payload"
    },
    {
      "id": "result",
      "label": "Result mapping"
    },
    {
      "id": "authentication",
      "label": "Authentication",
      "tooltip": "Optional authentication settings"
    }
  ],
  "properties": [
    ...
  ]
}
```

Groups can have the following attributes:

- `id : String`: Unique identifier of the group
- `label : String`: Label of the group
- `tooltip : String`: Tooltip for the group (optional)
- `openByDefault : Boolean`: Whether the group will be expanded in the properties panel (optional, default: `false`)

A property can be assigned to a group by specifying the `group` key to the groups `id` value on the property.
