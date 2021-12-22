---
id: utilizing-forms
title: Building forms with Modeler
description: "Let's learn about Camunda Forms, how to use them, how to model them with a diagram, and deploying."
---

:::note
The initial release of Camunda Forms includes a debut minimal feature set, which will be expanded with upcoming versions.

If using with Camunda Platform, note that the Camunda Forms feature was added with the 4.7.0 release of the Camunda Modeler. Therefore, they can be used within BPMN diagrams running on Camunda Platform version 7.15.0 or later.
:::

# Overview

The Camunda Forms feature allows you to easily design and configure forms. Once configured, they can be connected to a user task or start event to implement a task form in your application.

While you can incorporate Camunda Forms solely within Camunda Cloud, you can also utilize Camunda Forms in Camunda Platform. After deploying a diagram with an embedded form, Tasklist imports this form schema and uses it to render the form on every task assigned to it.

# Quickstart

## Create new form

To start building a form, log in to your [Camunda Cloud](./getting-started/create-camunda-cloud-account.md) account or open [Camunda Modeler](./components/modeler/about.md) and take the following steps:

1. Click on the **Forms** tab at the top of the page or open the **File** menu in Modeler.
2. Click the blue **Create New Form** button.

## Build your form

Now you can start to build your Camunda form. First, let's name our form by clicking the three vertical dots next to the text reading **New Form** in the top left corner of the page. Select **Rename** to give your form a new name. In this example, we'll build a form to help with a task in obtaining an email message.

![form email example](./img/form-email-example.png)

Add your desired elements from the palette on the left side by dragging and dropping them onto the canvas.

![form palette](./img/form-palette.png)

Within Forms, we have the option to add text fields, numerical values, checkboxes, radio elements, selection menus, text components, and buttons.

:::note
Within Camunda Platform, you can also utilize [embedded forms](https://docs.camunda.org/manual/latest/reference/forms/embedded-forms/).
:::

In the properties panel on the right side of the page, view and edit attributes that apply to the selected form element. For example, apply a minimum or maximum length to a text field, or require a minimum or maximum value within a number element. In this case, we have labeled the field, described the field, and required an input for our email message.

![email properties](./img/form-properties-email.png)

Refer to the [Camunda Forms reference material](https://docs.camunda.org/manual/latest/reference/forms/camunda-forms/) to explore all form elements and configuration options in detail.

## Save your form

To save your form in Camunda Cloud, click the blue **Save** button in the top right corner of the page.

To save your form in Camunda Platform, click **File > Save File As...** in the top-level menu. Select a location on your file system to store the form as `.form` file. You can load that file again by clicking **File > Open File...**.

## Connect your form to a BPMN diagram

Next, let's implement a task form into a diagram. In tandem, we can connect your form to a user task or start event.

:::note
For Camunda Platform, refer to the [User Task Forms guide](https://docs.camunda.org/manual/latest/user-guide/task-forms/#camunda-forms) to learn how to implement a task form in your application.
:::

Click on the **Forms** tab in Camunda Cloud to view a list of all the forms you've created.

Take the following steps:

1. Click the **Diagrams** tab at the top of the screen.
2. Select the diagram where you'd like to apply your form.
3. Select the user task requiring the help of a form.
4. On the right side of the page, select the **Form** tab.
5. Click **SELECT FORM** to incorporate the JSON configuration of the form you've built on Camunda Cloud.

Within Camunda Platform, you can click on the bottom left corner that says **JSON** to switch to the JSON view. Use caution when naming the fields of your form. Fields have their values pre-filled from variables with the same name.

Copy the JSON schema, and go back to the BPMN diagram you modeled earlier. Select the **user task** and click on the **Forms** tab. After switching tabs, you should see the field where you can paste the form JSON schema. Paste the schema and save the file.

With Camunda Platform, deploy your diagram to Zeebe and create an instance using the following command:

```sh
zbctl deploy /path/to/my/diagram.bpmn
zbctl create instance diagram-id
```

Then, open Tasklist to claim the task, fill in the form, and complete the task.

# Additional resources

- [Camunda and Cloud Modeler](./components/modeler/about.md)
- [Model your first process](./getting-started/model-your-first-process.md)
- [User task reference](./components/modeler/bpmn/user-tasks/user-tasks.md)