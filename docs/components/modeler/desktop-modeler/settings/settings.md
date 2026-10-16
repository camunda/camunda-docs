---
id: settings
title: Settings
description: "Use the Settings window to configure the application and its plugins in one place."
---

import SettingsImg from './img/settings.png';

Configure and manage your Desktop Modeler application and plugin preferences and defaults via the **Settings** window.

## Manage Desktop Modeler settings

Open the **Settings** window either from the application menu or by using the `Cmd/Ctrl + ,` keyboard shortcut.

<img src={SettingsImg} alt="Desktop Modeler Settings window showing global settings, default Camunda versions, and the Element template sources section." class="img-noborder img-600"/>

- Changes are saved automatically. If a restart is required to apply your changes, a warning is displayed.
- Open additional documentation links for a setting by clicking the blue icon next to the setting name.

## Settings overview

The following Desktop Modeler settings are available:

| Setting                  | Description                                                                                                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enable new context pad   | Enables the alternative context pad interface.                                                                                                                                                                      |
| Disable plugins          | Disables all installed plugins when running Desktop Modeler.                                                                                                                                                        |
| Camunda 8 connections    | Add and manage connections to Camunda 8 clusters. See [connect to Camunda 8](../connect-to-camunda-8.md) for connection setup instructions.                                                                         |
| Element template sources | (Camunda 8 only) Manage the built-in Camunda connector template source and add custom remote sources. See [configure templates](../element-templates/configuring-templates.md#remote-template-sources) for details. |
| Default versions         | Sets the default [execution platform versions](/reference/glossary.md#execution-platform-version) for new Camunda 7 and Camunda 8 diagrams.                                                                         |

:::note
Plugins may also provide their own settings in the **Settings** window.
:::

## Settings JSON file

Your settings are saved in a `settings.json` file in the [user data directory](../search-paths/search-paths.md#user-data-directory).

:::note
Only the settings you have changed are stored in this file.
:::
