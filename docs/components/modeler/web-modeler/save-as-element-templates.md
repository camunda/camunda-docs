---
id: save-as-element-templates
title: Save tasks as element templates
description: Learn how to save any task as a reusable element template in Camunda Web Modeler.
---

import BusinessRuleTaskImg1 from './img/save-as-template/1-business-rule-task.png';
import SaveAsTemplateButtonImg2 from './img/save-as-template/2-save-as-template-button.png';
import TemplateSavedImg3 from './img/save-as-template/3-template-saved.png';
import EditTemplateImg4 from './img/save-as-template/4-edit-template.png';
import FinalizedTemplateImg5 from './img/save-as-template/5-finalized-template.png';
import PublishTemplateImg6 from './img/save-as-template/6-publish-template.png';
import ApplyTemplateImg7 from './img/save-as-template/7-apply-template.png';

# Save tasks as element templates

Element templates allow you to create reusable, configurable building blocks that can be shared across your organization.
With the "Save as template" feature, you can convert any supported task into an element template.

## Supported task types

The "Save as template" feature is available for the following task types:

- Service task
- User task
- Send task
- Receive task
- Business rule task
- Script task
- Manual task
- Call activity

Note that you cannot create a template for the [undefined task type](../../bpmn/undefined-tasks).

## Creating an element template from a task

You can save any supported task as an element template directly from the properties panel in Web Modeler.
Configure your task with the desired properties, save it as a template, and optionally customize it further in the template editor.

### Prerequisites

Before saving a task as a template:

- Ensure the task is properly configured with the desired properties
- Resolve any validation errors on the task (the "Save as template" button is disabled if there are active errors)

### Step 1: Configure your task

First, configure your task with all the necessary properties that you want to include in your template.
The specific configuration will depend on your task type and use case.

In this example, we'll configure a Business Rule Task for fraud detection:

1. Select a task in your BPMN diagram.
2. Configure the task with the properties you need. For our example, we will set up a Business Rule Task by setting:
   - Implementation: Choose the implementation type (for example, DMN decision)
   - Called decision: Reference the decision to be invoked
   - Binding type: Select the version binding strategy
   - Result variable: Define where to store the decision result
   - Add any required input/output mappings for your business logic

   <img src={BusinessRuleTaskImg1} alt="Web Modeler interface showing a configured Business Rule Task named 'Determine fraud rating confidence' with properties panel displaying DMN decision configuration, decision ID, and binding settings" style={{marginTop: '0', width: '600px'}} />

### Step 2: Save the task as a template

1. With your configured task selected, look for the **Save as** button (with template icon) in the properties panel.

   <img src={SaveAsTemplateButtonImg2} alt="Properties panel showing the 'Save as' button with template icon in the Template section, with a blue 'Select' button visible" style={{marginTop: '0', width: '600px'}} />

2. Click the **Save as** button to open the template configuration dialog.

3. In the **Save element properties as a new template** dialog, provide:
   - **Name**: Enter a descriptive name for your template (for example, "Determine fraud rating confidence template")
   - **Description**: Provide a detailed explanation of what the template does (for example, "Checks if the transaction is a refund and if there is a high fraud rating")

4. Click **Save** to create your template.

5. You'll see an "Element template saved" notification with an option to **Edit template**.
   <img src={TemplateSavedImg3} alt="Modal dialog titled 'Save element properties as a new template' with name field showing 'Determine fraud rating confidence template' and description field containing template details" style={{marginTop: '0', width: '600px'}} />

### Step 3: Customize and publish your template

If you want to further customize or publish your template:

1. Click **Edit template** from the notification to open the template editor.

2. The template editor allows you to:
   - Modify template properties and [bindings](/components/modeler/desktop-modeler/element-templates/defining-templates.md#bindings).
   - Set up validation and [constraints](/components/modeler/desktop-modeler/element-templates/defining-templates.md#constraints) for user input.
   - Configure template groups and categories.

   <img src={EditTemplateImg4} alt="Green notification banner displaying 'Element template saved' with an 'Edit template' button, shown over the Web Modeler interface" style={{marginTop: '0', width: '600px'}} />

   By default, all properties are set to `"type": "String"`, making them visible and editable in the properties panel.
   To make your template easier to use, you will probably want to hide these properties by using `"type": "Hidden"`
   or use a dropdown (`"type": "Dropdown"`) with limited options.

   <img src={FinalizedTemplateImg5} alt="Template editor interface showing JSON configuration on the left and visual preview on the right, with 'Fraud Check Results' section containing configurable template properties for isRefund and isHighFraudRatingConfidence" style={{marginTop: '0', width: '600px'}} />

3. When you're ready to make the template available to your team, click **Publish** to add it to your project or organization's shared resources:

   If your template references any dependencies, for example, another process or a DMN decision, you will see a warning message
   prompting you to ensure that these dependencies are available in the runtime context where the template will be used.
   The dependencies themselves are not included in the template and must be managed and deployed separately.

   <img src={PublishTemplateImg6} alt="Publish template dialog with version fields, description text area, and a warning about decision dependency for the determine-fraud-rating decision" style={{marginTop: '0', width: '800px'}} />

### Step 4: Using your saved templates

Once you've created and published a template, you can use it in a diagram:

1. Add a new task to your diagram or select an existing task.
2. You can apply a template by clicking on a task and selecting the **Change element** menu icon. Alternatively, in the properties panel, click the **Select** button in the Template section.
3. In the template selection dialog, you'll find your template (for example, "Determine fraud rating confidence template") listed
   under the category that you assigned. By default, new templates are in the category "Templates".
4. Select the template to apply it to your task. The task will be automatically configured with all the settings from your template, including decision references, bindings, and variable mappings.
   <img src={ApplyTemplateImg7} alt="Template selection sidebar showing available connectors and templates, with 'Determine fraud rating confidence template' listed under the Templates section" style={{marginTop: '0', width: '800px'}} />

## Understanding template property bindings

When you save a task as a template, Web Modeler automatically converts the task's properties into appropriate template bindings:

- Input/output mappings
- Task headers
- Zeebe properties
- Element-specific properties (for example, calledDecision, calledElement)
- Message references (for message-related tasks)

All properties are configured with the appropriate binding types to ensure the template works correctly when applied to a task.
Only properties supported by element templates are included in the template.

Unsupported properties are ignored and remain visible in the properties panel after you apply the template.
For a list of supported properties, refer to the [Element templates reference](/components/modeler/desktop-modeler/element-templates/defining-templates.md#defining-template-properties).

## When template creation is unavailable

The "Save as template" button is disabled in the following scenarios:

- You are not in Web Modeler's implementation mode
- The task has active validation issues
- The element type is not supported (Blank Task, Events, Subprocesses, etc.)
- You don't have the necessary permissions to create templates

Resolving validation issues will enable the "Save as template" button if the task type is supported.

## Best practices

When creating templates from tasks, follow these best practices:

- **Create focused templates**: Each template should serve a specific purpose.
- **Hide details**: Only expose the necessary properties in the template to avoid overwhelming users.
- **Validate template input**: Use [constraints](/components/modeler/desktop-modeler/element-templates/defining-templates.md#constraints) to ensure users provide valid input to the template and receive meaningful error messages.
- **Manage dependencies**: Ensure that any referenced decisions or variables are available in the context where the template will be used.
- **Use meaningful parameter names**: When your template has configurable fields, give them clear, descriptive names.
- **Test your templates**: After creating a template, apply it to a task to ensure it works as expected.

## Related topics

- [Element templates reference](/components/modeler/desktop-modeler/element-templates/about-templates.md)
- [Custom connectors](/components/connectors/custom-built-connectors/create-connector-from-rest.md)
- [Task types](/components/modeler/bpmn/tasks.md)
