---
id: using-templates-in-modeler
title: Using templates in Camunda Hub
description: "Learn how to apply, remove, update, and replace templates."
---

## Applying templates

If you have already published an [element template](/components/modeler/element-templates/about-templates.md) to your workspace:

1. Open a BPMN diagram.
2. Make sure you're in [**Implementation** mode](../collaboration/implement-your-process.md#switch-to-implementation-mode).
3. Select an element in the diagram that matches the element template's type. For example, if you've published a **Task** template, select a **Task** element in your diagram.
4. On the right side of the modeling interface, under **Details > Properties > Template**, click **Select**. This opens the **Choose element template** modal.
5. Select the element template
6. **(Optional)** Instead of selecting a template published to your workspace, you can click the blue shop icon in the top right of the modal to open the [Camunda Marketplace](/components/hub/workspace/modeler/modeling/camunda-marketplace.md).

Applying a template stores it via the `modelerTemplate` property and the optional `modelerTemplateVersion` property
on the selected element:

```xml
<bpmn:serviceTask id="MailTask"
                  zeebe:modelerTemplate="com.mycompany.MailTask"
                  zeebe:modelerTemplateVersion="1"/>
```

It also sets up custom fields on the diagram element and makes these available for inspection and editing.
Properties which were not configured in the element template using custom fields will not be available for editing.

### Applying a template that defines operations

Templates that define [operations](/components/modeler/element-templates/template-metadata.md#predefined-configurations-steps-and-presets) — for example, a connector template for a service with several operations — show their operations in the popup menu instead of applying the template directly. Select an operation to apply the template with that operation preselected, then complete the remaining fields in the properties panel.

Operations are also matched by search, so you can search for the action you want to perform, such as `upload object`, without knowing which template provides it. Search matches an operation's name, description, and keywords together with those of its parent operations and its template.

## Removing templates

To remove an applied template from an element, either the _Unlink_ or _Remove_ function can be used:

1. Open a BPMN diagram.
2. Make sure you're in [**Implementation** mode](../collaboration/implement-your-process.md#switch-to-implementation-mode).
3. Select an element in the diagram that is linked to an element template.
4. On the right side of the modeling interface, under **Details > Properties > Template**, click **Applied**.
5. Select either:
   - **Unlink**: Remove the element template from the `modelerTemplate` property but keep the properties which were set.
   - **Remove**: Remove the element template from the `modelerTemplate` property and reset all properties of the respective element.

## Updating templates

If a template is applied and a new version of the template is found, you can _update_ the template:

1. Open a BPMN diagram.
2. Make sure you're in [**Implementation** mode](../collaboration/implement-your-process.md#switch-to-implementation-mode).
3. Select an element in the diagram that is linked to an element template.
4. On the right side of the modeling interface, under **Details > Properties > Template**, click **Update available**.

Templates are updated according to the following rules:

- If the property is set in the new template, it will override the existing value — unless the value was originally set by the old template and has been manually changed since.
- If the property is not defined in the new template, it will unset.
- Sub-properties of complex properties (for example, `zeebe:input`, `zeebe:output`) are handled
  according to these rules if they can be identified.

### Replacing templates

If a template is deprecated with a new element template and you want to keep the same input values as in the
deprecated template, you can:

1. [**Unlink**](#removing-templates): Remove the current template that is deprecated from the `modelerTemplate` property, but keep the properties which were set.
2. Click **Select** and apply the new element template.

## Missing templates

If a template was applied to an element but cannot be found, editing of the element is disabled. To re-enable editing, either [_unlink_ or _remove_ the template](#removing-templates), or make it available by publishing a template with the same ID or creating a new one.

## Creating templates from existing elements

To save a diagram element as a template:

1. Open a BPMN diagram.
2. Make sure you're in [**Implementation** mode](../collaboration/implement-your-process.md#switch-to-implementation-mode).
3. Select an element in the diagram that supports being used as a template.
4. On the right side of the modeling interface, in the top right of the **Details** pane, click **Save as**.
5. Provide a **Name** and **Description**.

:::tip
If **Save as** is disabled, hover over it to read instructions on how to make the element support being used as a template.
:::

The template can be further customized by [editing it](/components/connectors/manage-connector-templates.md).

To use the template, you first need to [publish it to the project or organization](/components/hub/workspace/modeler/element-templates/manage-element-templates.md#publish-an-element-template).

Learn more about [saving elements as templates](./save-as-element-templates.md).
