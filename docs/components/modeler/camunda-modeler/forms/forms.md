---
id: building-forms
title: Building Forms with Camunda Modeler
---

:::note
The Camunda Forms feature was added with the 4.7.0 release of the Camunda Modeler. They can be used within BPMN diagrams running on Camunda Platform version 7.15.0 or later.

Please note that the initial release of Camunda Forms only includes a first minimal feature set, which will be expanded with upcoming versions.
:::

# Overview

The Camunda Forms feature allows you to easily design and configure forms. Once configured, they can be connected to a user task or start event to implement a task form in your application.

# Quickstart

## Create new Form

To start building a form, in the **File** menu click **Create new Form (Camunda Platform or Cloud)**.

![create new Camunda form file](./img/create-form.png)

## Build your From

Now you can start to build your Camunda Form. Add the desired elements from the palette on the left hand side by dragging and dropping them onto the canvas.

![build form](./img/build-form.png)

In the properties panel on the right hand side, you can view and edit attributes that apply to the currently selected form element. 

Refer to the Camunda Forms Reference to explore all configuration options for form elements.

[//]:# (Should we link to the reference above or migrate this file over?)

![Camunda Form Properties Panel](./img/form-properties-panel.png)

## Save your Form

To save your state of work, click the **File > Save File As...** button in the top-level menu. Then select a location on your file system to store the form as `.form` file. You can load that file again by clicking **File > Open File...**.

## Connect your Form to a BPMN diagram

You can connect your Camunda Form to a User Task or Start Event, so to implement a task form in your application. Refer to the User Task Forms guide to learn how.

[//]:# (Should we link to the reference above or migrate this file over?)