---
id: configuration-mapping
title: "8.8 configuration mapping"
description: "Configuration mapping information for Camunda 8.7 properties to Camunda 8.8"
---

import SearchableTable from '../../react-components/\_config-table.js';

Configuration property mapping for Orchestration Cluster components.

## About Camunda 8.8 unified configuration

Camunda 8.8 introduces a [unified configuration for Orchestration Cluster components](/components/whats-new-in-88.md) allowing you to define all essential cluster and component behavior in a single, centralized configuration system.

- Some Camunda 8.7 (and earlier) configuration properties have changed or are replaced with new configuration properties.
- For example, `zeebe.broker.threads.cpuThreadCount` is replaced by `camunda.system.cpu-thread-count`.

:::note
Some unified configuration properties are planned for Camunda 8.9, and will not be delivered in Camunda 8.8.
:::

## Explanation of terms

Make sure you have read and understood the following terms before using the following configuration changes table:

| Type                                                                                                           | Description                                                                                                                                                                                                                                                                                         |
| :------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span className="badge badge--1-to-1">1-to-1</span>                                                            | <p>A 1:1 mapping exists for the property.</p><p><ul><li>If you have defined the new property, this is used.</li><li>If you have not defined the new property, but do have the legacy property defined, this is used, but you are warned that the legacy property is being deprecated.</li></ul></p> |
| <span className="badge badge--unsupported">Unsupported</span>                                                  | <p>Explain</p>                                                                                                                                                                                                                                                                                      |
| <span className="badge badge--double-configuration" style={{whiteSpace: 'nowrap'}}>Double-configuration</span> | <p>Explain</p>                                                                                                                                                                                                                                                                                      |

## 8.8 configuration property mappings

The following table summarizes the configuration mappings between Camunda 8.8 and 8.7 and earlier.

<SearchableTable />
