---
id: search-paths
title: Search paths
description: "Features like element templates and plugins allow you to add your own resources to Desktop Modeler."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Features like element templates and plugins allow you to add your own resources to Desktop Modeler. For these resources to be found, they have to be in one of two directories depending on how local or global you want them to be.

## App data directory

The `resources` directory relative to the directory containing the Camunda Modeler executable file. In our documentation we refer to it as `{APP_DATA_DIRECTORY}`.

Resources in the app data directory will be found by any local Camunda Modeler instance.

### Examples

<Tabs>
  <TabItem value="windows" label="Windows">

```
└── camunda-modeler-5.10.0-win-x64
    ├── Camunda Modeler.exe
    └── resources
        ├── element-templates
        |   └── my-element-templates.json
        └── plugins
            └── my-plugin
                └── index.js
```

  </TabItem>
  <TabItem value="mac" label="macOS">

:::note

On macOS, the Camunda Modeler is a self-contained `.app` bundle, which makes it difficult to add files to its installation directory. Therefore, we recommend using the [user data directory](#user-data-directory) instead.

:::

</TabItem>
  <TabItem value="linux" label="Linux">

```
└── camunda-modeler-5.10.0-linux-x64
    ├── camunda-modeler
    └── resources
        ├── element-templates
        |   └── my-element-templates.json
        └── plugins
            └── my-plugin
                └── index.js
```

  </TabItem>
</Tabs>

## User data directory

The `camunda-modeler/resources` directory relative to the per-user application data directory, which by default points to:

- `%APPDATA%` on [Windows](https://www.pcworld.com/article/2690709/whats-in-the-hidden-windows-appdata-folder-and-how-to-find-it-if-you-need-it.html)
- `$XDG_CONFIG_HOME` or `~/.config` on [Linux](https://wiki.archlinux.org/index.php/XDG_user_directories)
- `~/Library/Application Support` on macOS

In our documentation we refer to it as `{USER_DATA_DIRECTORY}`.

Resources in the user data directory will be found by all Camunda Modeler instances.

### Examples

<Tabs>
  <TabItem value="windows" label="Windows">

```
└── %APPDATA%
    └── Roaming
        └── camunda-modeler
            └── resources
                ├── element-templates
                |   └── my-element-templates.json
                └── plugins
                    └── my-plugin
                        └── index.js
```

  </TabItem>
  <TabItem value="mac" label="macOS">

```
└── ~/Library/Application Support
        └── camunda-modeler
            └── resources
                ├── element-templates
                |   └── my-element-templates.json
                └── plugins
                    └── my-plugin
                        └── index.js
```

  </TabItem>
  <TabItem value="linux" label="Linux">

```
└── ~/.config
    └── camunda-modeler
        └── resources
            ├── element-templates
            |   └── my-element-templates.json
            └── plugins
                └── my-plugin
                    └── index.js
```

  </TabItem>
</Tabs>

It is possible to change the user data directory using the `--user-data-dir` option via when starting Camunda Modeler from the command line. Refer to the [flags documentation](../flags) on how to configure the application with a flags file.
