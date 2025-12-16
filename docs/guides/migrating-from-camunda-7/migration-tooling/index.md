---
id: index
title: Migration tooling
sidebar_label: Migration tooling
description: "Understand the available migration tooling and its roadmap."
---

Camunda currently invests in tooling to help support and ease your migration from Camunda 7 to Camunda 8.

## Migration tools

Camunda provides the following migration tools:

| Migration tool                                                       | Description                                                                                                                                                                  | GitHub link                                                                                                                                                          |
| :------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Migration Analyzer & Diagram Converter](./diagram-converter.md)** | Gain a first understanding of migration tasks. Available for local installation (Java or Docker) or [hosted as a free SaaS offering](https://diagram-converter.camunda.io/). | [Camunda 7 to 8 migration tooling – Migration Analyzer & Diagram Converter](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/diagram-converter) |
| **[Data Migrator](./data-migrator/)**                                | Copies active Camunda 7 runtime instances to Camunda 8. History (audit) migration is available as experimental.                                                              | [Camunda 7 to 8 migration tooling](https://github.com/camunda/camunda-7-to-8-migration-tooling)                                                                      |
| **[Code Conversion Utilities](./code-conversion.md)**                | Mixture of code _mapping tables_, code conversion _patterns_, and automatable _refactoring recipes_.                                                                         | [Camunda 7 to 8 migration tooling – code conversion](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/code-conversion)                          |

## Examples

| Example                                                                                                    | Description                                                        | GitHub link                                                                                                   |
| :--------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **[Simple end-to-end example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example)** | Showing all tools in action for a simple Spring Boot Java solution | [Camunda 7 to 8 migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example) |
