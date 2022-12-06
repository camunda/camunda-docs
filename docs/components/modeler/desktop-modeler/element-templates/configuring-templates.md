---
id: configuring-templates
title: Configuring templates
---

Element templates are defined as [JSON files](../defining-templates). There are two ways to integrate them into Camunda Modeler:

1. **Local filesystem (Camunda Platform 7, and Camunda Platform 8):** You can fetch the JSON templates from [here](https://docs.camunda.io/docs/next/self-managed/connectors-deployment/install-and-start/#connector-templates). Store element templates as `.json` file in the `resources/element-templates` folder, relative to the modelers executable _or_ relative to the modeler's data directory ([see below](#example-setup)). Alternatively, they can be stored in a `.camunda/element-templates` directory that resides, relative to the currently opened diagram, anywhere in the diagram's path hierarchy.
2. **Retrieve from Cawemo (Camunda Platform 7 only):** use the [Camunda Cloud Connect Plugin for Camunda Platform 7](https://docs.camunda.org/cawemo/latest/technical-guide/integrations/modeler/) to integrate Camunda Modeler with [Cawemo](https://cawemo.com/). Camunda Modeler can then retrieve templates from catalog projects setup in Cawemo. Note that the [Cloud Connect plugin](https://docs.camunda.org/cawemo/latest/technical-guide/integrations/modeler/) will keep Cawemo and your local Camunda Modeler installation in sync (e.g., deleting a template in Cawemo will delete it locally as well). Locally the synced templates will be stored in the `config.json` file in your [`{USER_DATA_DIRECTORY}`](../../search-paths#user-data-directory). You should not manually change the `config.json` unless you know what you're doing.

New templates will be recognized when reconnecting to Cawemo or on Camunda Modeler reload/restart.

#### Example Setup

Add a `.json` file to the `resources/element-templates` sub-folder of your local [`{APP_DATA_DIRECTORY}`](../../search-paths#app-data-directory) or [`{USER_DATA_DIRECTORY}`](../../search-paths#user-data-directory) directory. You may have to create the `resources` and `element-templates` folders yourself.

For local template discovery, create a `.camunda/element-templates` folder relative in the directory
or any parent directory of the diagrams you are editing.

#### Development Workflow

When creating custom element templates, the modeler will give you detailed validation error messages.

Templates will be loaded on application load and reload. To reload the application with updated templates, open the developer tools `F12` and press `CtrlOrCmd+R`. This will clear all unsaved diagrams **!**
