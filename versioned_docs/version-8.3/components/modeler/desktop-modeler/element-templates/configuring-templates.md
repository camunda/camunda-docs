---
id: configuring-templates
title: Configuring templates
description: "Learn about global and local templates, which are loaded by the modeler at application startup."
---

Templates are loaded by Desktop Modeler at application startup. Reloading it using `CtrlOrCmd+R` reloads also all templates. Templates are treated as global or local depending on their location in your file system.

## Global templates

For templates to be available for all diagrams store them in the `resources/element-templates` directory containing the Camunda Modeler executable. Alternatively, for element templates to be available across Camunda Modeler installations, you can store them in the `resources/element-templates` directory in the modeler's [data directory](../../search-paths#user-data-directory).

### Example (Windows)

```
└── camunda-modeler-5.10.0-win-x64
    ├── Camunda Modeler.exe
    └── resources
        └── element-templates
            └── my-element-templates.json
```

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
