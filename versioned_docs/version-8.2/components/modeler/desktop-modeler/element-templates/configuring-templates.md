---
id: configuring-templates
title: Configuring templates
---

Templates will be loaded by the modeler at application startup. Reloading it using `CtrlOrCmd+R` will also reload all templates. Templates will be treated as global or local depending on their location in your file system.

### Global templates

For templates to be available for all diagrams store them in the `resources/element-templates` directory containing the Camunda Modeler executable. Alternatively, for element templates to be available across Camunda Modeler installations, you can store them in the `resources/element-templates` directory in the modeler's [data directory](../../search-paths#user-data-directory).

#### Example (Windows)

```
└── camunda-modeler-5.10.0-win-x64
    ├── Camunda Modeler.exe
    └── resources
        └── element-templates
            └── my-element-templates.json
```

:::note
Camunda 7 templates can be syncronized with [Cawemo](https://cawemo.com/) using the [Camunda Cloud Connect Plugin for Camunda Platform 7](https://docs.camunda.org/cawemo/latest/technical-guide/integrations/modeler/). These templates will be treated as global.
:::

### Local templates

For element templates to only be available for specific diagrams, you can store them in a `.camunda/element-templates` directory in the diagrams parent directory or any of their parent directories.

#### Example

```
├── diagram.bpmn
└── .camunda
    └── element-templates
        └── my-element-templates.json
```

Learn more about search paths [here](../../search-paths).
