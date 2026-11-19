---
id: install-the-modeler
title: Install Desktop Modeler
sidebar_label: Install
description: "Learn how to install Camunda Desktop Modeler, a desktop application for modeling BPMN, DMN, and Forms and support building executable diagrams with Camunda."
---

Install [Desktop Modeler](./index.md) (also known as Camunda Modeler) on Windows, macOS, or Linux, and optionally register it as the default editor for BPMN, DMN, and Form files.

## Install Desktop Modeler

1. Download the archive for your platform from the [Camunda downloads page](https://camunda.com/download/modeler/). Select your preferred version.
1. Unpack the archive (any platform) or open the `.dmg` file (macOS).
1. On macOS, move the app to your applications folder.
1. Start Desktop Modeler: run the Camunda Modeler executable (Windows), the `camunda-modeler` executable (Linux), or the Camunda Modeler application (macOS).

## Install on Linux for all users

To make the installation owned by `root` and accessible to all users of the machine:

1. Unpack the archive using the `tar` command:

   ```shell
   cd /usr/bin
   sudo tar xvfz ~/Downloads/camunda-modeler-5.41.0-linux-x64.tar.gz
   ```

1. Set the access permissions of the `chrome-sandbox` file and create a link to this version:

   ```shell
   sudo chmod 4755 camunda-modeler-5.41.0-linux-x64/chrome-sandbox
   sudo ln -s camunda-modeler-5.41.0-linux-x64/camunda-modeler camunda-modeler
   ```

## Wire file associations

On Windows and Linux, register Desktop Modeler as the default editor for `.bpmn`, `.dmn`, `.rpa`, and `.form` files. On macOS, Desktop Modeler is registered automatically.

- **Windows:** Run `support/register_fileassoc.bat` in your terminal.
- **Linux:** Run `support/xdg_register.sh` in your terminal.

## Next steps

- [Model your first diagram](./model-your-first-diagram.md)
- [Use connectors](./use-connectors.md)
- [Troubleshoot Desktop Modeler](./troubleshooting.md)
