---
id: configuration-mapping
title: "Camunda 8.8 property changes"
sidebar_label: 8.8 property changes
description: "Configuration property changes and backwards compatibility information for new Camunda 8.8 properties and legacy properties."
hide_table_of_contents: true
---

import SearchableTable from '../../react-components/\_config-table.js';

Changes to component configuration properties introduced in Camunda 8.8.

## About unified configuration property changes

In Camunda 8.8, the [unified configuration for Orchestration Cluster components](/reference/announcements-release-notes/880/whats-new-in-88.md) is introduced.

- Cluster and component behavior is defined in a single, centralized configuration system.
- This means some configuration properties have changed or are replaced with new properties.
- For example, the new `camunda.system.cpu-thread-count` property replaces `zeebe.broker.threads.cpuThreadCount`.

:::note
Only a partial set of unified configuration properties are introduced in Camunda 8.8, with remaining properties planned for delivery with Camunda 8.9.
:::

### Backwards compatibility

Backwards compatibility between existing legacy properties and new 8.8 properties is as follows:

| Type                                                                                                                                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span className="badge badge--1-to-1">1-to-1</span>                                                                                                           | <p>Backwards compatibility is supported.</p><p><ul><li><p>If you have defined the new property, it is used.</p></li><li>If you have not defined the new property, the legacy property is used (if you have defined it).</li></ul></p>                                                                                                                                                                                                                  |
| <span className="badge badge--breaking-change-double-configuration-" style={{ width: '150px', fontSize: '75%'}}>Breaking change (double configuration)</span> | <p>Backwards compatibility is **not** supported.</p><p><ul><li><p>Applies if a legacy configuration is defined with values matching the new configuration default or custom values.</p></li><li><p>If the legacy configuration value and the new configuration value match, the legacy property is accepted, even if not supported.</p></li><li><p>If the values do not match, the application will not start and an error is shown.</p></li></ul></p> |

### Recommended actions

**As part of upgrading to 8.8, Camunda recommends you replace any legacy properties shown in this table with the equivalent new property.**

You can define configuration properties as environment variables using [Spring Boot conventions](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables). To define an environment variable, convert the configuration property to uppercase, remove any dashes, and replace any delimiters (.) with \_. For example:

| Property                                   | Environment variable                    |
| :----------------------------------------- | :-------------------------------------- |
| `camunda.api.grpc.address`                 | `CAMUNDA_API_GRPC_ADDRESS`              |
| `camunda.api.grpc.min-keep-alive-interval` | `CAMUNDA_API_GRPC_MINKEEPALIVEINTERVAL` |

## Camunda 8.8 property changes

The following table shows new properties introduced in 8.8 and any related legacy properties.

- Use the search box to find a specific property or set of properties matching your search term.
- Apply filter badges to filter the table by property change type.
- Sort the table alphabetically using the column headers.

<SearchableTable />
