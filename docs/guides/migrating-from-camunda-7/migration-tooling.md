---
id: migration-tooling
title: Tooling to support Camunda 7 to Camunda 8 migration
sidebar_label: Migration tooling
description: "Understand the availabe migration tooling and its roadmap."
---

Camunda invests in tooling to ease migration from Camunda 7 to Camunda 8.

:::note
The migration tooling is currently under development. We plan an initial release of the tools mentioned in this section with Camunda 8.8 (October 2025).
:::

Specifically that involves the following tools:

- **Migration Analyzer**: Helps you gain a first understanding of migration tasks. This tool is based on the [existing diagram converter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/backend-diagram-converter). It will be available to install locally, or [hosted for you as free SaaS offering](https://diagram-converter.consulting-sandbox.camunda.cloud/).

- **Data Migrator**: The data migrator can copy runtime instances active in Camunda 7 to Camunda 8, but also migrate audit trail data (also known as history).

- **Code Converter**: Code conversion is not really a single tool, but supported by the [existing diagram converter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/backend-diagram-converter), which is extensible, and [OpenRewrite recipes for simple code conversion patterns](../code-conversion/).

- **Camunda 7 Adapter**: The [[Camunda 7 Adapter]](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/camunda-7-adapter) can be used to adapt existing Camunda 7 delegation code.

## Status and Roadmap

Migration tooling is under development and generally released in an iterative approach. Please check this page for general information about roadmap plans:

- **Migration Analyzer**: The [existing diagram converter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/backend-diagram-converter) can be used today. UI and reporting will be added. Documentation will be extended. The initial release is **planned for 8.8**. Iterative improvements will follow afterwards.
- **Data Migrator**: Initial POCs (proof of concepts) completed and promising, the data migrator is currently under development. The initial release is **planned for 8.8**. Iterative improvements will follow afterwards. History data migration will most probably be limited to RDBMS.
- **Code Converter**: Patterns and recipes will be collected collaboratively and documented and shared here. This will be **kicked off in Q2 of 2025**.
- **Camunda 7 Adapter**: The [existing Cmunda 7 Adapter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/camunda-7-adapter) can be used. Under discussion if this needs to be productized, including production support. Currently waiting for customer feedback.
- **Diagram Converter**: The [existing diagram converter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/backend-diagram-converter) can already be used today. This will be further improved, for example also to be capable of DMN conversions.

## Migration Analyzer

<!--

Check how much to describe here - probably link to README?*
Or should he docs for it live here?*

*Check how to name the Diagram Converter when used for conversion - do we have a separate name? Or just use the analyzer also in conversion?*
-->

_*TODO*_

## Data Migrator

![data-migration](../img/data-migration.png)

<!--
Check how much to describe here - probably link to README?*
Or should he docs for it live here?*
-->

### Runtime Instances

Limitations:

- No Multiple Instance

### Audit Log Data

Limitations:

- Only RDBMS environment (means also self-managed)
