---
id: utilizing-forms
title: Build forms with Modeler
description: "Let's learn about Camunda Forms, how to use them, how to model them with a diagram, and deploying."
---

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">Time estimate: 15 minutes</span>

## Overview

The Camunda Forms feature allows you to easily design and configure forms. Once configured, they can be connected to a user task or start event to implement a task form in your application.

After deploying a diagram with a linked form, Tasklist imports this form schema and uses it to render the form on every task assigned to it.

## Quickstart

### Create new form

To start building a form, log in to your [Camunda 8](https://camunda.io) account, and take the following steps:

1. In Camunda Hub, open a workspace.
2. In the workspace, create or open a project.
3. In the project, click **Create new > Form**.

:::tip
If using [Desktop Modeler](/components/modeler/about-modeler.md), under **Create a new file**, click **Form**.
:::

### Rename your form

Now you can start to build your form by dragging elements from the palette to the canvas, or by using the AI Form Generator at the bottom of the palette. For the purpose of this guide, we'll build a form from scratch.

Right after creating your form, rename it:

1. In the top breadcrumb navigation, next to **New form**, click the vertical ellipsis menu.
2. Click **Rename**.
3. Enter `email-form`.
4. Click **Rename**.

In this example, we'll build a form to help with a task in obtaining an email message.

### Build your form

Within Forms, can add text fields, numerical values, checkboxes, radio elements, selection menus, text components, and buttons.

1. From the **Components** palette on the left, drag and drop a **Text area** under **Form definition**.
2. Select the **Text area**.
3. In the properties panel on the right, open the **General** section.
4. Provide the following data:
   - **Field label:** "Email content"
   - **Field description:** "The content of the email message"

:::tip
Refer to the [camunda forms reference](/components/modeler/forms/camunda-forms-reference.md) to explore all form elements and configuration options in detail.
:::

### Save your form

To save your form in Camunda 8, you don't have to do anything. Camunda Hub autosaves every change you make.

### Link your form to a BPMN diagram {#connect-your-form-to-a-bpmn-diagram}

Implement a task form into a diagram. In tandem, link your form to a user task or start event:

1. In the same workspace that contains your form, open any project. This does not have to be the same project where you saved the form.
2. In the project, select the diagram where you'd like to apply your form.
3. Select the user task requiring the help of a form.
4. In the floating menu, select the **Link form** icon.
5. Navigate to the form you want to link and click **Link**.

When using Camunda Forms, any submit button present in the form schema is hidden so we can control when a user can complete a task.

## Deploy a form

To deploy your latest form changes:

1. Open the form.
2. At the top right of the form editor, click **Deploy**.
3. Select a stage and, optionally, a tenant ID.
4. Choose whether to deploy **All resources** or **Only this resource** (the form).
5. Click **Deploy**.

## Deploy your diagram and start an instance

To execute your process diagram, click **Deploy & run**.

To avoid incidents:

- When deploying a project, if the links between resources are configured with the 'deployment' binding, the BPMN diagrams and their forms must be deployed together.
- When deploying a BPMN file separately, and linking resources using the 'latest' binding, ensure the forms are deployed beforehand.

You can now monitor your instances in [Operate](/components/operate/operate-introduction.md).

:::info
You have full control over when a form is deployed.

When [deploying a project](/components/hub/workspace/manage-projects/deploy-project.md):

- If the form is saved in the project you're deploying, the form will be included in the deployment.
- If the form is saved in another project, you need to [deploy it separately](#deploy-a-form).

When [deploying a diagram](/components/hub/workspace/modeler/run-or-publish-your-process.md), not the form:

- If the form is saved in the same project as the diagram and you choose to deploy **All resources**, the form will be included in the deployment.
- If the form is saved in the same project as the diagram and you choose to deploy **Only this resource**, you need to [deploy the form separately](#deploy-a-form).
- If the form is saved in another project, you need to [deploy it separately](#deploy-a-form).

As linked forms are resolved to their latest version (unless you change the [binding type](/components/hub/workspace/modeler/modeling/advanced-modeling/form-linking.md#camunda-form-linked)), make sure the intended form version is available in the target cluster and the binding resolves to that version.

When deploying to a Camunda 8 cluster running a version earlier than 8.4, forms linked to user tasks or none start events will be automatically embedded in the user task to guarantee backwards compatibility.

Read more about the different ways to reference Camunda Forms in the [user task forms reference](/components/modeler/bpmn/user-tasks/user-tasks.md#user-task-forms).
:::

To [complete a user task](/guides/getting-started-orchestrate-human-tasks.md), navigate to [Tasklist](/components/tasklist/introduction-to-tasklist.md).

## Additional resources

- [Desktop and Camunda Hub](/components/modeler/about-modeler.md)
- [User task reference](/components/modeler/bpmn/user-tasks/user-tasks.md)

## Next steps

When building a form for a process, you can also use the [Filepicker form component](/components/modeler/forms/form-element-library/forms-element-library-filepicker.md) to allow users to upload files. Learn more in [building a form for document upload](/components/document-handling/upload-document-to-bpmn-process.md#build-a-form-for-document-upload).

You can also use the [document preview component](/components/modeler/forms/form-element-library/forms-element-library-document-preview.md) to display and allow document download with your form. Learn more in [building a form for document preview and download](/components/document-handling/display-and-download-document.md#build-a-form-for-document-preview-and-downloading).

Additionally, review the Camunda Academy course on [using the AI-assisted form builder](https://academy.camunda.com/c8-h2-ai-form-builder).
