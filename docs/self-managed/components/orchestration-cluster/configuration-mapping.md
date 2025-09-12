---
id: configuration-mapping
title: "8.8 configuration key changes"
description: "Configuration key changes and backwards compatibility information for new Camunda 8.8 keys and legacy keys."
hide_table_of_contents: true
---

import SearchableTable from '../../react-components/\_config-table.js';

Orchestration Cluster component configuration changes that apply when upgrading to Camunda 8.8.

## About Camunda 8.8 keys

The [unified configuration for Orchestration Cluster components](/reference/announcements-release-notes/880/whats-new-in-88.md) is introduced in 8.8.

- Cluster and component behavior is defined in a single, centralized configuration system.
- This means some configuration keys have changed or are replaced with new keys.
- For example, the new `camunda.system.cpu-thread-count` key replaces the `zeebe.broker.threads.cpuThreadCount` legacy key.

Backwards compatibility between legacy keys and new keys in 8.8 as follows:

| Type                                                                                                                                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <span className="badge badge--1-to-1">1-to-1</span>                                                                                                           | <p>Backwards compatibility is supported.</p><p><ul><li><p>If you have defined the new key, it is used.</p></li><li>If you have not defined the new key, the legacy key is used (if you have defined it).</li></ul></p>                                                                                                                                                                                                                            |
| <span className="badge badge--breaking-change-double-configuration-" style={{ width: '150px', fontSize: '75%'}}>Breaking change (double configuration)</span> | <p>Backwards compatibility is **not** supported.</p><p><ul><li><p>Applies if a legacy configuration is defined with values matching the new configuration default or custom values.</p></li><li><p>If the legacy configuration value and the new configuration value match, the legacy key is accepted, even if not supported.</p></li><li><p>If the values do not match, the application will not start and an error is shown.</p></li></ul></p> |

:::note
Any remaining unified configuration keys not listed here are planned for delivery in Camunda 8.9.
:::

## Camunda 8.8 keys and legacy key changes

The following table summarizes backwards compatibility between legacy keys and new keys introduced in 8.8.

:::caution recommended actions
Camunda recommends you replace the existing legacy key(s) with the new key.
:::

- Use the search box to find a specific key or set of keys matching your search term.
- Apply filter badges to filter the table by key change type.
- Sort the table alphabetically using the column headers.

<SearchableTable />
