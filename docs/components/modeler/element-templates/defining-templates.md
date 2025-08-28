---
id: defining-templates
title: Defining templates
description: "Learn about JSON schema compatibility, supported BPMN types, defining template properties, and more."
---

An Element template is defined in template descriptor files as a JSON object.
The element template object typically contains the following properties, `[optional]` properties are marked with square brackets:

- [`$schema : String`](./template-metadata.md#validation-schema): URI pointing towards the [JSON schema](https://json-schema.org/) which defines the structure of the element template `.json` file. Element template schemas are maintained in the [element templates JSON schema](https://github.com/camunda/element-templates-json-schema) repository.
- [`id : String`](./template-metadata.md#identification-id-and-version): ID of the template.
- [`[version : Integer]`](./template-metadata.md#identification-id-and-version): Property to support [templates versioning and upgrading](./template-metadata.md#template-versioning). If you add a version to a template, it is considered unique based on its ID and version.
- [`name : String`](./template-metadata.md#discoverability-name-description-keywords-icon-documentationref-and-category): Name of the template. Shown in the element template selection modal and in the properties panel on the right side of the screen (after applying an element template).
- [`[description : String]`](./template-metadata.md#discoverability-name-description-keywords-icon-documentationref-and-category): Description of the template. Shown in the element template selection modal and in the properties panel (after applying an element template).
- [`[keywords : Array<String>]`](./template-metadata.md#discoverability-name-description-keywords-icon-documentationref-and-category): Optional list of keywords. Can be used to help users find this template. Keywords are used for search and filtering but are not displayed in the UI.
- [`[category : Object]`](./template-metadata.md#discoverability-name-description-keywords-icon-documentationref-and-category): Category for the template. The category is shown in the element template selection modal (if categories are supported by the tooling).
- [`[documentationRef : String]`](./template-metadata.md#discoverability-name-description-keywords-icon-documentationref-and-category): URL pointing to a template documentation. Shown in the properties panel (after applying an element template).
- [`[icon : Object]`](./template-metadata.md#discoverability-name-description-keywords-icon-documentationref-and-category): Sets the template's icon. The icon is shown in the element template selection modal and in the properties panel (after applying an element template).
- [`[engines : Object]`](./template-metadata.md#engine-compatibility-engines): Dictionary of environments [compatible with the template](./template-metadata.md#template-compatibility). Environment version is specified with semantic versions range.
- [`appliesTo : Array<String>`](./template-metadata.md#supported-bpmn-types-appliesto-and-elementtype): List of BPMN types the template can be applied to.
- [`[elementType : Object]`](./template-metadata.md#supported-bpmn-types-appliesto-and-elementtype): Sets teh type of the element. The element is replaced with the specified type when a user applies the template.
- [`[groups : Object]`](./template-metadata.md#grouping-properties-groups): Defines groups of properties. Groups are shown in the properties panel (after applying an element template).
- [`properties : Array<Object>`](./template-properties.md): List of properties of the template. These properties are applied to the BPMN element when the template is applied. Each property can be configured with a number of options, such as type, binding, constraints, and more.

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
      "label": "Some Property",
      "type": "String",
      "binding": {
        "type": "property",
        "name": "someProperty"
      }
    }
  ]
}
```

## Creating multiple templates in one file

You can define multiple templates in one JSON file by wrapping them in an array. Templates defined in such a way are only supported by Desktop Modeler.

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

## Creating and editing connector templates

Connector templates are a specific type of element template. Just like element templates, you can edit them it the text editor of your choice
or with visual preview and edit support like formatting, code completion, and error highlighting in [Web Modeler](/components/connectors/manage-connector-templates.md).

## Further reading

For detailed information about specific aspects of template development, see:

- **[Template Metadata](./template-metadata.md)** - Learn about template identification fields like name, ID, description, keywords, versioning, JSON schema compatibility, engine compatibility, and supported BPMN types
- **[Template Properties](./template-properties.md)** - The properties array is the heart of the element template. Here you can define what properties should be applied to the BPMN element and how these properties should be shown and validated in the properties panel.
- **[Example Template](./template-example.md)** - A complete example showing how to create a REST connector element template.
