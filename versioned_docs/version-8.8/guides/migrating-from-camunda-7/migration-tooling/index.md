---
id: index
title: Migration tools
sidebar_label: Migration tools
description: "Learn about the available migration tools."
---

Camunda is invested in supporting and easing your migration from Camunda 7 to Camunda 8 with migration tools.

All migration tools are available as **ready-to-use builds** from the [GitHub releases page](https://github.com/camunda/camunda-7-to-8-migration-tooling/releases). You can download different versions as needed for your migration.

## Migration tools

Camunda provides the following migration tools:

| Migration tool                                        | Description                                                                                                                                                                     | Download / GitHub                                                                                                                                                                                   |
| :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Diagram Converter](./diagram-converter.md)**       | Gain an initial understanding of migration tasks. Available for local installation (Java or Docker) or [hosted as a free SaaS offering](https://diagram-converter.camunda.io/). | [Download releases](https://github.com/camunda/camunda-7-to-8-migration-tooling/releases) \| [Source code](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/diagram-converter) |
| **[Data Migrator](./data-migrator/)**                 | Copies active Camunda 7 runtime instances to Camunda 8. History (audit) migration is available as experimental.                                                                 | [Download releases](https://github.com/camunda/camunda-7-to-8-migration-tooling/releases) \| [Source code](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/data-migrator)     |
| **[Code Conversion Utilities](./code-conversion.md)** | Mixture of code mapping tables, code conversion patterns, and automatable refactoring recipes.                                                                                  | [Source code](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/code-conversion)                                                                                                |

## Examples

| Example                                                                                                    | Description                                                       | GitHub link                                                                                                   |
| :--------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **[Simple end-to-end example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example)** | Shows all tools in action for a simple Spring Boot Java solution. | [Camunda 7 to 8 migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example) |
