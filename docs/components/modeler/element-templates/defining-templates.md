---
id: defining-templates
title: Defining templates
description: "Learn how to define an element template"
---

An element template is defined in template descriptor files as a JSON object.
The element template object is divided into required and optional key-value pairs:

## Required keys

- [`$schema : String`](./template-metadata.md#validation-schema): URI pointing towards the [JSON schema](https://json-schema.org/) which defines the structure of the element template `.json` file. Element template schemas are maintained in the [element templates JSON schema](https://github.com/camunda/element-templates-json-schema) repository.
- [`id : String`](./template-metadata.md#identification-id-and-version): Identifier of the template.
- [`name : String`](./template-metadata.md#discoverability-name-description-keywords-icon-documentationref-and-category): Name of the template. Shown in the element template selection modal and in the properties panel on the right side of the screen (after applying an element template).
- [`appliesTo : Array<String>`](./template-metadata.md#supported-bpmn-types-appliesto-and-elementtype): List of BPMN element types the template can be applied to.
- [`properties : Array<Object>`](./template-properties.md): List of properties that the template applies to the BPMN element. Each property object defines the type of input and how its value is bound to a BPMN or Camunda extension property.

## Optional keys

- [`version : Integer`](./template-metadata.md#identification-id-and-version): Property to support templates versioning and upgrading. If you add a version to a template, it is considered unique based on its ID and version.
- [`description : String`](./template-metadata.md#discoverability-name-description-keywords-icon-documentationref-and-category): Description of the template. Shown in the element template selection modal and in the properties panel (after applying an element template).
- [`keywords : Array<String>`](./template-metadata.md#discoverability-name-description-keywords-icon-documentationref-and-category): List of keywords. Helps users find the template through search. Keywords are used for search and filtering but are not displayed in the UI.
- [`category : Object`](./template-metadata.md#discoverability-name-description-keywords-icon-documentationref-and-category): Category for the template. The category is shown in the element template selection modal.
- [`documentationRef : String`](./template-metadata.md#discoverability-name-description-keywords-icon-documentationref-and-category): URL pointing to the template's documentation. Shown in the properties panel (after applying an element template).
- [`icon : Object`](./template-metadata.md#discoverability-name-description-keywords-icon-documentationref-and-category): Sets the template's icon. The icon is shown in the element template selection modal and in the properties panel (after applying an element template).
- [`engines : Object`](./template-metadata.md#engine-compatibility-engines): Dictionary of environments compatible with the template. Environment version is specified with semantic versions range.
- [`elementType : Object`](./template-metadata.md#supported-bpmn-types-appliesto-and-elementtype): Sets the type of the element. The element is replaced with the specified type when a user applies the template.
- [`groups : Object`](./template-metadata.md#grouping-properties-groups): Defines groups of property input fields. Groups are shown in the properties panel (after applying an element template).

Some keys and values require other keys to be set. If your editor supports the [JSON schema](https://json-schema.org/), it will flag missing keys as errors.
The Web Modeler's editor will also show these errors in the template editor problems panel.

Below you find a simple example of an element template with the most commonly used keys:

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
      "label": "Input Variable",
      "type": "String",
      "value": "someProcessVariable",
      "binding": {
        "type": "zeebe:input",
        "name": "anInputVariable"
      }
    }
  ]
}
```

## Creating multiple templates in one file

You can define multiple templates in one JSON file by wrapping them in an array. Templates defined in such a way are only supported by Desktop Modeler and cannot be used in Web Modeler.

:::warning
This is a Desktop Modeler-specific feature. Web Modeler requires each template to be in a separate file.
:::

```json
[
  {
    ...
    "name": "Template 1",
    "id": "some-template-id",
    "description": "some description",
    ...
  },
  {
    ...
    "name": "Template 2",
    "id": "another-template-id",
    "description": "another description",
    ...
  }
]
```

## Creating and editing templates

You can create and edit element templates in the text editor of your choice.
Connector templates are a specific type of element template, so the same applies to them.
If your editor supports the [JSON schema](https://json-schema.org/), it will recognize the structure of the template and provide additional editing support, such as formatting, code completion, and error highlighting.

The [Web Modeler](/components/connectors/manage-connector-templates.md), offers a built-in template editor with validation and error highlighting, as well as a live preview of the properties panel with the applied template.

## Further reading

For detailed information about specific aspects of template development, see:

- **[Template Metadata](./template-metadata.md)** - Learn about template identification fields like name, ID, description, keywords, versioning, JSON schema compatibility, engine compatibility, and supported BPMN types.
- **[Template Properties](./template-properties.md)** - The properties array is the heart of the element template. Here you can define what properties should be applied to the BPMN element and how these properties should be shown and validated in the properties panel.
- **[Example Template](./template-example.md)** - A complete example showing how to create an element template.
