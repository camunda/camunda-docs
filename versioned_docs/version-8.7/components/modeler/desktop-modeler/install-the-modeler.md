---
id: install-the-modeler
title: Install Desktop Modeler
sidebar_label: Installation
description: "Learn how to install Camunda Desktop Modeler, a desktop application for modeling BPMN, DMN, and Forms and support building executable diagrams with Camunda."
---

This document guides you through Desktop Modeler installation, our local modeler. Desktop Modeler is a desktop application for modeling BPMN, DMN, and Forms and supports you in building executable diagrams with Camunda. Alternatively, you may utilize [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md), our cloud-based Modeler.

## Installation

To install [Desktop Modeler](./index.md) for Windows, macOS, and Linux, visit the [Camunda downloads page](https://camunda.com/download/modeler/). Select your preferred version and take the following steps:

1. Unpack the archive (any platform) or open the `.dmg` file (macOS).
2. For macOS users, move the app to your applications folder (macOS).
3. Start the Camunda Modeler (Windows) or `camunda-modeler` (Linux) executable, or the Camunda Modeler application (macOS).

## Wire File Associations

On Windows and Linux you can carry out additional steps to register Modeler as the default editor for BPMN, DMN, RPA, and Form files. With macOS, Modeler is automatically registered as the default editor.

### Windows

To make Modeler the default editor for `.bpmn`, `.dmn`, `.rpa`, and `.form` files, execute `support/register_fileassoc.bat` in your terminal.

### Linux

To create a [desktop file](https://specifications.freedesktop.org/desktop-entry-spec/latest/) and make Modeler the default editor for `.bpmn`, `.dmn`, `.rpa`, and `.form` files, execute `support/xdg_register.sh` in your terminal.

## Next steps

- [Model your first diagram](/components/modeler/desktop-modeler/model-your-first-diagram.md)
- [Use connectors](/components/modeler/desktop-modeler/use-connectors.md)
