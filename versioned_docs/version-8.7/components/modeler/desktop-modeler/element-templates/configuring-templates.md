---
id: configuring-templates
title: Configuring templates
description: "Learn about global and local templates, which are loaded by the modeler at application startup."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Templates are loaded by Desktop Modeler at application startup. Reloading it using `Cmd+R` or `Ctrl+R` reloads all templates. Templates are treated as global or local depending on their location in your file system.

## Global templates

For templates to be available for all diagrams store them in the `resources/element-templates` directory containing the Camunda Modeler executable. Alternatively, for element templates to be available across Camunda Modeler installations, you can store them in the `resources/element-templates` directory in the modeler's [data directory](../../search-paths#user-data-directory).

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

On macOS, the Camunda Modeler is a self-contained `.app` bundle, which makes it difficult to add files to its installation directory. Therefore, we recommend storing [global templates](#global-templates) in the [user data directory](../../search-paths#user-data-directory).

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

Learn more about search paths [here](../../search-paths).
