---
id: migration-tooling
title: Tooling to support Camunda 7 to Camunda 8 migration
sidebar_label: Migration tooling
description: "Understand the availabe migration tooling and its roadmap."
---

Camunda invests in tooling to ease migration from Camunda 7 to Camunda 8. Specifically that involves the following tools:

- **Migration Analyzer**: Helps you gain a first understanding of migration tasks. This tool is based on the [[existing diagram converter]](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/backend-diagram-converter). It will be available to install locally, or [[hosted for you as free SaaS offering]](https://diagram-converter.consulting-sandbox.camunda.cloud/).

- **Data Migrator**: The data migrator can copy runtime instances active in Camunda 7 to Camunda 8, but also migrate audit trail data (also known as history).

- **Code Converter**: Code conversion is not really a single tool, but supported by the [[existing diagram converter]](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/backend-diagram-converter), which is extensible, and [[OpenRewrite recipes for simple code conversion patterns]](./code-conversion/).

- **Camunda 7 Adapter**: The [[Camunda 7 Adapter]](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/camunda-7-adapter) can be used to adapt existing Camunda 7 code.

:::note
The migration tooling is currently under development. We plan releases for the above mentioned tools with Camunda 8.8 (October 2025).
:::note

## Status and Roadmap

Migration tooling is under development and generally released in an iterative approach. Please check this page for general information about roadmap plans:

+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------+
| | Status | Timeline |
+========================+=======================================================================================================================================================================================================================================+=====================================================================+
| **Migration Analyzer** | [[Existing diagram converter]](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/backend-diagram-converter) can be used today. UI and reporting will be added. Documentation will be extended. | Initial release planned for 8.8. Iterative improvements afterwards. |
| | | |
| | Will be documented, packaged, shipped and supported properly. | |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------+
| **Data Migrator** | Initial POCs (proof of concepts) completed and promising. Currently under development.\ | Initial release planned for 8.8. Iterative improvements afterwards. |
| | Will be documented, packaged, shipped and supported properly.\ | |
| | History data migration will most probably be limited to RDBMS. | |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------+
| **Code Converter** | Patterns and recipes will be collected collaboratively and documented / shared here. | Will be kicked off in Q2 of 2025. |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------+
| **Camunda 7 Adapter** | [[Existing Cmunda 7 Adapter]](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/camunda-7-adapter) can be used. Under discussion if this needs to be productized, including production support. | Currently waiting for customer feedback. |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------+

<!--
## Migration Analyzer

*Check how much to describe here - probably link to README?*

*Or should he docs for it live here?*

*Check how to name the Diagram Converter when used for conversion - do we have a separate name? Or just use the analyzer also in conversion?*

## Data Migrator

*Check how much to describe here - probably link to README?*

*Or should he docs for it live here?*
-->
