---
id: install-the-modeler
title: Install Desktop Modeler
sidebar_label: Installation
description: "Learn how to install Camunda Desktop Modeler, a desktop application for modeling BPMN, DMN, and Forms and support building executable diagrams with Camunda."
---

Download [Desktop Modeler](./index.md) for Windows, macOS, and Linux from the [Camunda downloads page](https://camunda.com/download/modeler/).

## Wire File Associations

On Windows and Linux you can carry out additional steps to register the Modeler as the default editor for BPMN, DMN, and Form files. On macOS the Modeler is automatically registered as the default editor for those.

### Windows

To make the Modeler the default editor for `.bpmn`, `.dmn`, and `.form` files, execute `support/register_fileassoc.bat`.

### Linux

To create a [desktop file](https://specifications.freedesktop.org/desktop-entry-spec/latest/) and make the Modeler the default editor for `.bpmn`, `.dmn`, and `.form`, files execute `support/xdg_register.sh`.
