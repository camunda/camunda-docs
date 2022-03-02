---
id: utilizing-forms
title: Building forms with Modeler
description: "Let's learn about Camunda Forms, how to use them, how to model them with a diagram, and deploying."
---

:::note
The initial release of Camunda Forms includes a debut minimal feature set, which will be expanded with upcoming versions.

If using with Camunda Platform, note that the Camunda Forms feature was added with the 4.7.0 release of the Desktop Modeler. Therefore, they can be used within BPMN diagrams running on Camunda Platform version 7.15.0 or later.
:::

## Overview

The Camunda Forms feature allows you to easily design and configure forms. Once configured, they can be connected to a user task or start event to implement a task form in your application.

While you can incorporate Camunda Forms solely within Camunda Cloud, you can also utilize Camunda Forms in Camunda Platform. After deploying a diagram with an embedded form, Tasklist imports this form schema and uses it to render the form on every task assigned to it.

## Quickstart

### Create new form

To start building a form, log in to your [Camunda Cloud](./getting-started/create-camunda-cloud-account.md) account or open [Desktop Modeler](./components/modeler/about.md) and take the following steps:

1. Click on the **Modeler** tab at the top of the page or alternatively open the **File** menu in Desktop Modeler.
2. Open any project from your Web Modeler home view.
3. Click the blue **New** button and choose **Form**.

### Build your form

Now you can start to build your Camunda form. Right after creating your form, you can name it by replacing the **New Form** text with the name of your choice. In this example, we'll build a form to help with a task in obtaining an email message.

![form email example](./img/form-email-example.png)

Add your desired elements from the palette on the left side by dragging and dropping them onto the canvas.

![form palette](./img/form-palette.png)

Within Forms, we have the option to add text fields, numerical values, checkboxes, radio elements, selection menus, text components, and buttons.

:::note
Within Camunda Platform, you can also utilize [embedded forms](https://docs.camunda.org/manual/latest/reference/forms/embedded-forms/).
:::

In the properties panel on the right side of the page, view and edit attributes that apply to the selected form element. For example, apply a minimum or maximum length to a text field, or require a minimum or maximum value within a number element. In this case, we have labeled the field, described the field, and required an input for our email message.

![email properties](./img/form-properties-email.png)

Refer to the [Camunda Forms reference material](../components/modeler/forms/camunda-forms-reference.md) to explore all form elements and configuration options in detail.

### Save your form

To save your form in Camunda Cloud, you don't have to do anything. Web Modeler will autosave every change you make.

To save your form in Camunda Platform, click **File > Save File As...** in the top-level menu. Select a location on your file system to store the form as `.form` file. You can load that file again by clicking **File > Open File...**.

### Connect your form to a BPMN diagram

Next, let's implement a task form into a diagram. In tandem, we can connect your form to a user task or start event.

:::note
For Camunda Platform, refer to the [User Task Forms guide](https://docs.camunda.org/manual/latest/user-guide/task-forms/#camunda-forms) to learn how to implement a task form in your application.
:::

Click on the **Modeler** tab at the top of the page and open any project from your Web Modeler home view.

Take the following steps:

1. Select the diagram where you'd like to apply your form.
2. Select the user task requiring the help of a form.
3. On the right side of the selected user task, select the blue overlay with three white horizontal lines to open the navigation menu.
4. Navigate to the form you want to connect and click the blue **Import** button.
5. When a user task has a connected form, the blue overlay will always stay visible on the right side of the task.

:::note Submit button missing when you use Camunda Forms?
When using Camunda Forms, any submit button present in the form schema is hidden so we can control when a user can complete a task.
:::

Within Camunda Platform, you can click on the bottom left corner that says **JSON** to switch to the JSON view. Use caution when naming the fields of your form. Fields have their values pre-filled from variables with the same name.

Copy the JSON schema, and go back to the BPMN diagram you modeled earlier. Select the **user task** and click on the **Forms** tab. After switching tabs, you should see the field where you can paste the form JSON schema. Paste the schema and save the file.

With Camunda Platform, deploy your diagram to Zeebe and create an instance using the following command:

```sh
zbctl deploy /path/to/my/diagram.bpmn
zbctl create instance diagram-id
```

Then, open Tasklist to claim the task, fill in the form, and complete the task.

## Additional resources

- [Desktop and Web Modeler](./components/modeler/about.md)
- [Model your first process](./getting-started/model-your-first-process.md)
- [User task reference](./components/modeler/bpmn/user-tasks/user-tasks.md)