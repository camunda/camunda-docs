---
id: template-metadata
title: Template metadata
description: "Learn about template metadata fields like name, ID, description, keywords, versioning, and JSON schema compatibility."
---

The metadata of an element template contains important information about the template itself, such as its name, description, version, compatibility with different Camunda versions, and the schema that is used to validate the template itself.

## JSON schema

The application uses the `$schema` property to ensure compatibility for a given element template. You find [the latest supported versions here](https://www.npmjs.com/package/@camunda/zeebe-element-templates-json-schema).

The tooling ignores element templates defining a higher `$schema` version and logs a warning message.

For example, given the following `$schema` definition, the application takes `0.9.1` as the JSON schema version of the element template:

```json
"$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema@0.9.1/resources/schema.json"
```

The JSON schema versioning is backward-compatible, meaning that all versions including or below the current one are supported.

## Name, Description, Keywords

The `name` key defines the name of the template. It's displayed in the element template selection modal and in the properties panel on the right side of the screen (after applying an element template).
The `description` key is optional and provides additional information about the template. It's also shown in the element template selection modal and in the properties panel (after applying an element template).
The `keywords` key is an optional list of keywords that can help users find this template. Keywords are used for search and filtering but are not displayed in the UI.

```json
{
  ...,
  "name": "Template 1",
  "description": "some description",
  "keywords": [
    "search alias",
    "create action"
  ]
}
```

## Version

To support [template evolution](https://github.com/bpmn-io/element-templates/blob/main/docs/LIFE_CYCLE.md#overview), maintain a `version` property on your templates:

```json
{
  ...,
  "version": 1
}
```

Once a template with a new `version` is available to users, the editor tooling suggests an upgrade, [preserving technical bindings](https://github.com/bpmn-io/element-templates/blob/main/docs/LIFE_CYCLE.md#upgrade-behavior) on a best effort basis.

:::tip
Versioning is an important cornerstone of template evolution. Review the [upstream documentation](https://github.com/bpmn-io/element-templates/blob/main/docs/LIFE_CYCLE.md#overview) to understand foundations of our upgrade mechanism, and foundations on how the element template life cycle works.
:::

The template `id` and `version` together form a unique identifier for a template. Two templates can have the same `id` if their `version` is different.

## Engine compatibility

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

You can also use this feature to explicitly specify a template’s incompatibility with a platform. For instance, the following template is incompatible with all versions of Web Modeler:

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

## Supported BPMN types

Currently, element templates may be used on the following BPMN elements:

- `bpmn:Activity` (including tasks, service tasks, and others)
- `bpmn:SequenceFlow` (for maintaining `condition`)
- `bpmn:Process`
- `bpmn:Event`

The `appliesTo` array specifies the BPMN types the template can be applied to. It will only be shown for these types of elements in the modeler.
The `elementType` object is optional. If you configure `elementType` on a template, the element is replaced with the specified type when a user applies the template.
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
