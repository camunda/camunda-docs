---
id: configuring-templates
title: Configuring templates
description: "Configure local, global, and remote element template sources for Desktop Modeler."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import AddTemplateSourceImg from './img/add-template-source.png';

[Element templates](/components/modeler/element-templates/about-templates.md) extend the modeling elements available in Desktop Modeler. You can load templates from files on your computer or configure a remote source that Desktop Modeler can retrieve over HTTP or HTTPS.

## Global templates

For templates to be available for all diagrams store them in the `resources/element-templates` directory containing the Camunda Modeler executable. Alternatively, for element templates to be available across Camunda Modeler installations, you can store them in the `resources/element-templates` directory in the modeler's [user data directory](../search-paths/search-paths.md#user-data-directory).

### Examples

<Tabs>
  <TabItem value="windows" label="Windows">

```
└── camunda-modeler-5.10.0-win-x64
    ├── Camunda Modeler.exe
    └── resources
        └── element-templates
            └── my-element-templates.json
```

  </TabItem>
  <TabItem value="mac" label="macOS">

:::note

On macOS, the Camunda Modeler is a self-contained `.app` bundle, which makes it difficult to add files to its installation directory. Therefore, we recommend storing [global templates](#global-templates) in the [user data directory](../search-paths/search-paths.md#user-data-directory).

:::

```
└── ~/Library/Application Support
        └── camunda-modeler
            └── resources
                └── element-templates
                    └── my-element-templates.json
```

  </TabItem>
  <TabItem value="linux" label="Linux">

```
└── camunda-modeler-5.10.0-linux-x64
    ├── camunda-modeler
    └── resources
        └── element-templates
            └── my-element-templates.json
```

  </TabItem>
</Tabs>

## Local templates

For element templates to only be available for specific diagrams, you can store them in a `.camunda/element-templates` directory in the diagrams parent directory or any of their parent directories.

### Example

```
├── diagram.bpmn
└── .camunda
    └── element-templates
        └── my-element-templates.json
```

## Remote template sources

Configure remote template sources in the **Settings** window to make templates available to Desktop Modeler without distributing template files with each installation or project. Remote template sources are loaded only for Camunda 8 diagrams.

1. Open **Settings > Element template sources**.
2. Select **Add source**.
3. Enter a **Name** and an **Index URL**, then select **Add**.
4. Select **Done** and restart Desktop Modeler when prompted.

<img src={AddTemplateSourceImg} alt="Add element template source dialog over Settings, with the Element template sources section and Camunda connectors source visible." class="img-noborder img-600"/>

The built-in **Camunda connectors** source provides templates from the Camunda Marketplace. Use the toggle on a source row to enable or disable it. Use the row's **Edit** or **Remove** options to change or remove a custom source. You cannot reorder sources.

For details about filesystem locations for templates and other Desktop Modeler resources, see [Search paths](../search-paths/search-paths.md).

To host a remote source, see [Host an element template source](./hosting-template-sources.md) for the index format, version filtering, and hosting requirements.
