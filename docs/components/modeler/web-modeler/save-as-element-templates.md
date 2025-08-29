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
With the **Save as template** feature, you can convert any supported task into an element template.

## Supported task types

The **Save as template** feature is available for the following BPMN activity types:

- Service task
- User task
- Send task
- Receive task
- Business rule task
- Script task
- Manual task
- Call activity

You cannot create a template for the [undefined task type](../../bpmn/undefined-tasks).

## Create an element template from a task

You can save any supported task as an element template directly from the properties panel in Web Modeler.  
Configure your task with the desired properties, save it as a template, and optionally customize it further in the template editor.

### Prerequisites

Before saving a task as a template:

- Ensure the task is properly configured with the desired properties.
- Resolve any validation errors on the task. The **Save as template** button is disabled if errors are present.

### Step 1: Configure your task

First, configure your task with all the necessary properties you want to include in your template.  
The configuration depends on your task type and use case.

In this example, we'll configure a business rule task for fraud detection:

1. Select a task in your BPMN diagram.
2. Configure the task with the properties you need. For example, set up a business rule task by defining:
   - **Implementation**: Choose the implementation type (for example, DMN decision).
   - **Called decision**: Reference the decision to be invoked.
   - **Binding type**: Select the [resource binding type](/components/best-practices/modeling/choosing-the-resource-binding-type.md). We recommend using `versionTag` to ensure that the template always references a compatible resource version.
   - **Result variable**: Define where to store the decision result.
   - Add any required input/output mappings for your business logic.

   <img src={BusinessRuleTaskImg1} alt="Web Modeler interface showing a configured business rule task named 'Determine fraud rating confidence' with properties panel displaying DMN decision configuration, decision ID, and binding settings" style={{marginTop: '0', width: '600px'}} />

### Step 2: Save the task as a template

1. With your configured task selected, look for the **Save as** button (template icon) in the top-right corner of the properties panel.

   <img src={SaveAsTemplateButtonImg2} alt="Properties panel showing the 'Save as' button with template icon in the Template section, with a blue 'Select' button visible" style={{marginTop: '0', width: '600px'}} />

2. Click the **Save as** button to open the template configuration dialog.
3. In the **Save element properties as a new template** dialog, provide:
   - **Name**: Enter a descriptive name (for example, "Determine fraud rating confidence template").
   - **Description**: Provide a detailed explanation of what the template does (for example, "Checks if the transaction is a refund and if there is a high fraud rating").
4. Click **Save** to create your template.
5. You'll see an "Element template saved" notification with an option to **Edit template**.

   <img src={TemplateSavedImg3} alt="Modal dialog titled 'Save element properties as a new template' with name field showing 'Determine fraud rating confidence template' and description field containing template details" style={{marginTop: '0', width: '600px'}} />

### Step 3: Customize your template

If you want to further customize or publish your template:

1. Click **Edit template** from the notification to open the template editor.
2. The template editor allows you to:
   - Modify template properties and [bindings](/components/modeler/element-templates/defining-templates.md#bindings).
   - Set up validation and [constraints](/components/modeler/element-templates/defining-templates.md#constraints) for user input.
   - Configure template groups and categories.

   <img src={EditTemplateImg4} alt="Green notification banner displaying 'Element template saved' with an 'Edit template' button, shown over the Web Modeler interface" style={{marginTop: '0', width: '600px'}} />

   By default, all properties are set to `"type": "String"`, making them visible and editable in the properties panel.  
   To make your template easier to use, hide unnecessary properties with `"type": "Hidden"`, or use a dropdown (`"type": "Dropdown"`) with limited options.

   <img src={FinalizedTemplateImg5} alt="Template editor interface showing JSON configuration on the left and visual preview on the right, with 'Fraud Check Results' section containing configurable template properties for isRefund and isHighFraudRatingConfidence" style={{marginTop: '0', width: '600px'}} />

### Step 4: Publish your template

1. When you're ready to make the template available to your team, click **Publish** to add it to your project or organization's shared resources.
2. If your template references dependencies (for example, another process or a DMN decision), a warning will remind you to ensure these dependencies are deployed in the runtime environment.  
   Dependencies are not included in the template and must be managed separately.

   <img src={PublishTemplateImg6} alt="Publish template dialog with version fields, description text area, and a warning about decision dependency for the determine-fraud-rating decision" style={{marginTop: '0', width: '800px'}} />

### Step 5: Use your new template

Once you've created and published a template, you can use it in a diagram:

1. Add a new task to your diagram or select an existing one.
2. Apply the template by:
   - Clicking **Change element** on the task, or
   - Clicking **Select** in the Template section of the properties panel.
3. In the template selection dialog, find your template (for example, "Determine fraud rating confidence template") under the assigned category. By default, templates are listed under "Templates".
4. Select the template to apply it to your task. The task will automatically be configured with all template settings, including decision references, bindings, and variable mappings.

   <img src={ApplyTemplateImg7} alt="Template selection sidebar showing available connectors and templates, with 'Determine fraud rating confidence template' listed under the Templates section" style={{marginTop: '0', width: '800px'}} />

## Understand template property bindings

When you save a task as a template, Web Modeler automatically converts the task's properties into template bindings:

- Input/output mappings
- Task headers
- Zeebe properties
- Element-specific properties (for example, `calledDecision`, `calledElement`)
- Message references (for message-related tasks)

Only properties supported by element templates are included. Unsupported properties remain visible in the properties panel after you apply the template.

For a list of supported properties, see the [element templates reference](/components/modeler/element-templates/defining-templates.md#defining-template-properties).

## When template creation is unavailable

The **Save as template** button is disabled in the following scenarios:

- You are not in Web Modeler's implementation mode.
- The task has validation issues.
- The element type is not supported (blank tasks, events, subprocesses, etc.).
- You don't have permissions to create templates.

Fixing validation issues will enable the button if the task type is supported.

## Best practices

When creating templates from tasks:

- **Create focused templates**: Each template should serve a clear purpose.
- **Hide details**: Expose only the necessary properties.
- **Validate input**: Use [constraints](/components/modeler/element-templates/defining-templates.md#constraints) to enforce valid input and provide meaningful errors.
- **Manage dependencies**: Ensure referenced decisions or variables exist in the runtime environment. Use `versionTag` bindings for dependencies to avoid version conflicts.
- **Use meaningful parameter names**: Give configurable fields descriptive names.
- **Test your templates**: Apply them to a task to confirm they work as expected.

## Related topics

- [Element templates reference](/components/modeler/element-templates/about-templates.md)
- [Custom connectors](/components/connectors/custom-built-connectors/create-connector-from-rest.md)
- [Task types](/components/modeler/bpmn/tasks.md)
