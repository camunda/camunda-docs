---
id: configuration-mapping
title: "8.8 configuration mapping"
description: "Configuration mapping information for Camunda 8.7 properties to Camunda 8.8"
---

import SearchableTable from '../../react-components/\_config-table.js';

Orchestration Cluster component configuration changes that apply when upgrading to Camunda 8.8.

## About Camunda 8.8 unified configuration

Camunda 8.8 introduces a [unified configuration for Orchestration Cluster components](/components/whats-new-in-88.md) allowing you to define cluster and component behavior in a single, centralized configuration system.

This means some configuration properties have changed or are replaced with new properties.

For example, the new `camunda.system.cpu-thread-count` property replaces `zeebe.broker.threads.cpuThreadCount`.

As a result, you will need to...

:::note
The remaining unified configuration properties are planned for Camunda 8.9, and will not be delivered in Camunda 8.8.
:::

### Mapping types

Make sure you have read and understood the following terms before using the following configuration changes table:

| Mapping type                                                                                                   | Description                                                                                                                                                                                                                                                                          |
| :------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span className="badge badge--1-to-1">1-to-1</span>                                                            | <p>A 1:1 mapping exists for the property.</p><p><ul><li>If you have defined it, the 8.8 property is used.</li><li>If you have not defined the 8.8 property, the legacy property is used if you have defined it. You are warned that the legacy property is deprecated.</li></ul></p> |
| <span className="badge badge--unsupported">Unsupported</span>                                                  | <p>Explain</p>                                                                                                                                                                                                                                                                       |
| <span className="badge badge--double-configuration" style={{whiteSpace: 'nowrap'}}>Double-configuration</span> | <p>Explain</p>                                                                                                                                                                                                                                                                       |

## 8.8 configuration property mappings

The following table summarizes the configuration mappings between Camunda 8.8 and 8.7 and earlier.

<SearchableTable />
