---
id: camunda-forms-reference
title: Camunda Forms reference
description: Forms created with Camunda Modeler are embeddable in Tasklist.
---

:::note Support for Camunda Forms
The Camunda Forms feature was added with the 7.15.0 release of Camunda Platform 7 and the 4.7.0 release of Camunda Modeler.
:::

Camunda Forms allow you to easily design and configure forms, and then embed them in Camunda Tasklist.

- Camunda Forms are created in Camunda Modeler.
- Camunda Forms can be embedded in Camunda Tasklist. You can find out how in the [user task forms guide](../../../guides/utilizing-forms.md).
- Camunda Forms are powered by the open source [bpmn-io form-js library](https://github.com/bpmn-io/form-js). Visit the [open source repository](https://github.com/bpmn-io/form-js) to find out how to render a form using plain JavaScript in a custom application (note that this also requires you to fetch the form from the respective BPMN 2.0 element and provide data as needed to the form.)

## Components

Use Camunda Modeler to configure your Camunda Form. The following form elements are currently supported.

### Text field

A text field allowing the user to read and edit textual data.

![Form Text Field Symbol](./img/form-textField.svg)

A text field can be configured using the following configuration properties:

- **Field Label**: Label displayed on top of the text field.
- **Field Description**: Description provided below the text field.
- **Key**: Identifier used to map data to the text field.
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: Text field must contain a value.
  - **Minimum Length**: Text field must have at least x characters.
  - **Maximum Length**: Text field must not have more than x characters.
  - **Regular Expression Pattern**: Text field value must match the provided regular expression pattern.

### Number

A number field allowing the user to read and edit numeric data.

![Form Number Symbol](./img/form-number.svg)

A number can be configured using the following configuration properties:

- **Field Label**: Label displayed on top of the number field.
- **Field Description**: Description provided below the number field.
- **Key**: Identifier used to map data to the number field.
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: Number field must contain a value.
  - **Minimum Length**: Number field must have at least x characters.
  - **Maximum Length**: Number field must not have more than x characters.

### Checkbox

A checkbox allowing the user to read and edit boolean data.

![Form Checkbox Symbol](./img/form-checkbox.svg)

A checkbox can be configured using the following configuration properties:

- **Field Label**: Label displayed on top of the checkbox.
- **Field Description**: Description provided below the checkbox.
- **Key**: Identifier used to map data to the checkbox.

### Radio

A radio button allowing the user to select one of multiple radio button entries.

![Form Radio Symbol](./img/form-radio.svg)

A radio button can be configured using the following configuration properties:

- **Field Label**: Label displayed on top of the checkbox.
- **Field Description**: Description provided below the checkbox.
- **Key**: Identifier used to map data to the checkbox.
- **Values**: A list of values, each representing one radio button which the user can click. Click the **Plus** icon to add a new value and the **Trash** icon to remove a value.
  - **Label**: Label of the radio button.
  - **Value**: Value that the radio button maps to.
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: One radio option must be selected.

### Select

A select allowing the user to select one of multiple entries from a dropdown menu.

![Form Select Symbol](./img/form-select.svg)

A select can be configured using the following configuration properties:

- **Field Label**: Label displayed on top of the select.
- **Field Description**: Description provided below the select.
- **Key**: Identifier used to map data to the select.
- **Values**: A list of values, each representing one select option which the user can select. Click the **Plus** icon to add a new value and the **Trash** icon to remove a value.
  - **Label**: Label of the select entry.
  - **Value**: Value that the select entry maps to.
- **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise, a validation error will be displayed.
  - **Required**: One select entry must be selected.

### Text

A text component allowing to display static information to the user.

![Form Text Symbol](./img/form-text.svg)

A text component can be configured using the following configuration properties:

- **Text**: Either **Markdown** or **basic HTML** which will be rendered in the form. Note that dangerous HTML elements will not be rendered so to prevent the risk of cross-site scripting using Camunda Forms.

**Example for Markdown**:

```
# This is a heading

This shows an image:
![alternative image text](https://someurl.com/image.png)

## This is a sub-heading

Text can be shown for example using
**bold**, or *italic* font.

* This is an unordered list...
* ...with two list items

1. This is an ordered list...
2. ...with two list items
```

**Example for HTML**:

```
<h1>This is a heading</h1>

This shows an image:
<img src="https://someurl.com/image.png"
alt="alternative image text">

<h2>This is a sub-heading</h2>

Text can be shown for example
using <b>bold</b>, or <i>italic</i> font.

<ul>
  <li>This is an unordered list...</li>
  <li>...with two list items</li>
</ul>

<ol>
  <li>This is an ordered list...</li>
  <li>...with two list items</li>
</ol>
```

### Button

A button allowing the user to submit or reset the form.

![Form Button Symbol](./img/form-button.svg)

A button can be configured using the following configuration properties:

- **Field Label**: Label to be displayed on top of the button.
- **Action**: The button can either trigger a **Submit** or a **Reset** action.
  - **Submit**: Submit the form (given there are no validation errors).
  - **Reset**: Reset the form, all user inputs will be lost.

## Mapping components to process variables

Each Camunda Forms component which allows data manipulation has a **Key** attribute. This attribute is used as an identifier to map data of the respective field (1) during initial loading of the form, and (2) during submission of the form.

When a form is referenced by a user task or start event and viewed in [Camunda Tasklist](../../tasklist/introduction-to-tasklist.md), the key will be used to refer to a process variable. This means that the value of the process variable will be used to populate the respective component initially and that the value of the component will be saved in the process variable during submission of the form.
