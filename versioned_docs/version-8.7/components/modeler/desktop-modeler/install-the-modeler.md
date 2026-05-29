---
id: install-the-modeler
title: Install Desktop Modeler
sidebar_label: Installation
description: "Learn how to install Camunda Desktop Modeler, a desktop application for modeling BPMN, DMN, and Forms and support building executable diagrams with Camunda."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This document guides you through Desktop Modeler installation, our local modeler. Desktop Modeler is a desktop application for modeling BPMN, DMN, and Forms, and supports you in building executable diagrams with Camunda.

## Installation

To install [Desktop Modeler](./index.md) for Windows, macOS, and Linux, visit the [Camunda downloads page](https://camunda.com/download/modeler/). Select your preferred version and take the following steps:

1. Unpack the archive (any platform) or open the `.dmg` file (macOS).
2. For macOS users, move the app to your applications folder (macOS).
3. Start the Camunda Modeler (Windows) or `camunda-modeler` (Linux) executable, or the Camunda Modeler application (macOS).

<Tabs groupId="language" defaultValue="linux" queryString values={
[
{ label: 'Linux', value: 'linux'},
] }>
</Tabs>

<TabItem value="linux">
Ensure the installation is owned by `root` and accessible to all users of the machine by following the steps below.

1. Unpack the zip archive using the `tar` command:

```shell
cd /usr/bin
sudo tar xvfz ~/Downloads/camunda-modeler-5.41.0-linux-x64.tar.gz
```

2. Ensure the access permissions of the `chrome-sandbox` file are correct and create a link to this version:

```shell
sudo chmod 4755 camunda-modeler-5.41.0-linux-x64/chrome-sandbox
sudo ln -s camunda-modeler-5.41.0-linux-x64/camunda-modeler camunda-modeler
```

</TabItem>

## Wire file associations

On Windows and Linux you can carry out additional steps to register Modeler as the default editor for BPMN, DMN, RPA, and Form files. On macOS, Modeler is automatically registered as the default editor.

### Windows

To make Modeler the default editor for `.bpmn`, `.dmn`, `.rpa`, and `.form` files, execute `support/register_fileassoc.bat` in your terminal.

### Linux

To register Modeler for `.bpmn`, `.dmn`, `.rpa`, and `.form` files, execute `support/xdg_register.sh` from your terminal.

## Next steps

- [Model your first diagram](/components/modeler/desktop-modeler/model-your-first-diagram.md)
- [Use connectors](/components/modeler/desktop-modeler/use-connectors.md)
