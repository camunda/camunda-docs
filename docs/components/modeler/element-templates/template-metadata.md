---
id: template-metadata
title: Template metadata
description: "Learn about template metadata fields like name, ID, description, keywords, versioning, and JSON schema compatibility."
---

The metadata of an element template contains important information about the template itself, such as its name, description, version, compatibility with different Camunda versions, and the schema that is used to validate the template.

## Validation: `$schema`

`$schema` is a required key-value pair and must be set.

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
The Web Modeler only supports element templates pointing to the latest schema version: `https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json`
:::

## Identification: `id` and `version`

- `id : String` is a required key and must be set.
- `version : Integer` is optional but Camunda strongly recommends to be set it.

The `id` key defines the identifier of the template. Templates with the same `id` and no `version` set are regarded as equal independent of their other key-value pairs.
Thus, if you plan to make any changes to your template and want to support [template evolution](https://github.com/bpmn-io/element-templates/blob/main/docs/LIFE_CYCLE.md#overview), maintain a `version` property on your templates.
Templates with the same `id` and different versions offer an upgrade path.
If `id` and `version` as identical the tooling treats the templates as identical, regardless of other key-value pairs.

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

## Discoverability: `name`, `description`, `keywords`, `icon`, `documentationRef`, and `category`

- `name` is a required key and must be set.
- `description`, `keywords`, `icon`, `documentationRef`, and `category` are optional key-value pairs.

These keys define the user-facing metadata of the template. They help the template users to discover and understand the purpose of the template.
They are shown when selecting a template and when the template has been applied to an element.

- `name : String` key defines the name of the template.
- `description : String` key is optional and provides additional information about the template.
- `keywords : Array<String>` key is an optional list of keywords that can help users find this template. Keywords are used for search and filtering but are not displayed in the UI.
- `icon : Object` key is an optional icon configuration for the template. The icon contents must be a valid [data](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) or HTTP(s) URL. We recommend using square icons as they get rendered 18x18 pixels on the canvas and 32x32 pixels in the properties panel.
- `documentationRef : String` key is an optional URL pointing to a template documentation. It is shown in the properties panel (after applying an element template).
- `category : Object` key is an optional category configuration for the template. You can define a category to group templates in the element template selection list. If not defined, the template will be displayed in the **Templates** section.
  - `id : String` required key that defines the unique identifier of the category.
  - `name : String` required key defines the name of the category that the template is shown in.

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

- `engines : Object` is an optional key-value pair.
  - `camunda : SemanticVersion` is an optional key to define compatibility with Camunda versions.
  - `camundaDesktopModeler : SemanticVersion` is an optional key to define compatibility with Desktop Modeler versions.
  - `camundaWebModeler : SemanticVersion` is an optional key to define compatibility with Web Modeler versions.

Define [template compatibility](https://github.com/bpmn-io/element-templates/blob/main/docs/LIFE_CYCLE.md#compatibility) with execution platforms (Camunda Orchestration Cluster versions) and related components (such as Web Modeler) using the `engines` key.

This key has a dictionary object as it's value, where the execution platform names are the keys, and the [semantic version](https://semver.org/) ranges are the values.

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

- `appliesTo` is a required key and must be set.
- `elementType` is an optional key. (Can be required under some circumstances, see below.)

Currently, element templates may be used on the following BPMN elements:

- `bpmn:Activity` (including user tasks, service tasks, call activities , ad-hoc subprocesses, and others)
- `bpmn:SequenceFlow` (for maintaining `condition`)
- `bpmn:Process`
- `bpmn:Event`

- `appliesTo : Array<String>`: specifies the BPMN types the template can be applied to. The template will only be selectable for these types of elements in the modeler.
- The `elementType : Object`: If you configure `elementType` on a template, the element is replaced with the specified type when a user applies the template.
  - `value : String`: Is a required key. The BPMN type to set the element to when the template is applied.
  - `eventDefinition: String`: You must set this key's value to `"bpmn:MessageEventDefinition"` if you are templating any message event. Otherwise, this key should be ignored.

Some properties require a specific BPMN type, and thus value for `elementType`, to work correctly.
For example, if the template sets `zeebe:calledDecision` on an element and `appliesTo` is set to `bpmn:Task`, the `elementType` must be set to `bpmn:BusinessRuleTask`.
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

- `groups` is an optional key.

You can define `groups` to organize custom fields into. The fields will be shown in their assigned group in the properties panel (after applying an element template).
You can also define whether a group is expanded or collapsed by default.

Groups can have the following attributes:

- `id : String`: Unique identifier of the group
- `label : String`: Label of the group
- `tooltip : String`: Tooltip for the group (optional)
- `openByDefault : Boolean`: Whether the group will be expanded in the properties panel (optional, default: `false`)

A property can be assigned to a group by setting the [`group` key](./template-properties.md#grouping-fields-group) to the groups `id` value.

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
