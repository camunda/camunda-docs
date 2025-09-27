---
id: configuration-mapping
title: "Camunda 8.8 property changes"
sidebar_label: 8.8 property changes
description: "Configuration property changes and backwards compatibility information for new Camunda 8.8 properties and legacy properties."
hide_table_of_contents: true
---

import SearchableTable from '../../../../react-components/\_config-table.js';

Changes to component configuration properties introduced in Camunda 8.8.

## About unified configuration property changes

In Camunda 8.8, the [unified configuration for Orchestration Cluster components](/reference/announcements-release-notes/880/whats-new-in-88.md) is introduced.

- Cluster and component behavior is defined in a single, centralized configuration system.
- This means some configuration properties have changed or are replaced with new properties.
- For example, the new `camunda.system.cpu-thread-count` property replaces `zeebe.broker.threads.cpuThreadCount`.

:::caution Camunda 8.9 unified configuration breaking changes

Only the first partial set of unified configuration properties is introduced in Camunda 8.8.

- All remaining unified property changes will be completed by Camunda 8.9.
- This remaining work will result in future breaking changes. For example, the secondary database properties will be unified into a secondary-storage properties section.

:::

### New properties and backwards compatibility

Backwards compatibility between new 8.8 properties and existing legacy properties is as follows:

| Type                                                                                                                                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span className="badge badge--new">New</span>                                                                                                                 | <p>New Camunda 8.8 property without an existing equivalent legacy property.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| <span className="badge badge--1-to-1">1-to-1</span>                                                                                                           | <p>New Camunda 8.8 property with an existing equivalent legacy property or set of properties.</p><p>Backwards compatibility is supported as follows:</p><p><ul><li><p>If you have defined the new property, it is used.</p></li><li><p>If you have not defined the new property, the legacy property is used (if you have defined it).</p></li></ul></p>                                                                                                                                                                                                  |
| <span className="badge badge--breaking-change-double-configuration-" style={{ width: '150px', fontSize: '75%'}}>Breaking change (double configuration)</span> | <p>New Camunda 8.8 property with an existing equivalent legacy property or set of properties.</p><p>Backwards compatibility is **not** supported.</p><p><ul><li><p>Applies if a legacy configuration is defined with values that match the new configuration default or custom values.</p></li><li><p>If the legacy configuration value and the new configuration value match, the legacy property is accepted, even if not supported.</p></li><li><p>If the values do not match, the application will not start and an error is shown.</p></li></ul></p> |

### Recommended actions

**As part of upgrading to 8.8, Camunda recommends you replace any legacy properties shown in this table with the equivalent new property.**

You can define configuration properties as environment variables using [Spring Boot conventions](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables). To define an environment variable, convert the configuration property to uppercase, remove any dashes, and replace any delimiters (.) with \_. For example:

| Property                                   | Environment variable                    |
| :----------------------------------------- | :-------------------------------------- |
| `camunda.api.grpc.address`                 | `CAMUNDA_API_GRPC_ADDRESS`              |
| `camunda.api.grpc.min-keep-alive-interval` | `CAMUNDA_API_GRPC_MINKEEPALIVEINTERVAL` |

### Example

In this example, an application uses the following legacy configuration:

```
camunda.database.url=http://prod-db.com:54321
camunda.operate.opensearch.url=http://prod-db.com:54321
camunda.tasklist.opensearch.url=http://prod-db.com:54321
```

#### Option 1: Strict migration

The recommended strict migration approach is to remove the legacy properties and add the corresponding new property:

```
camunda.data.secondary-storage.opensearch.url=http://prod-db.com:54321
```

#### Option 2: Double configuration

However, for a double configuration, you can just add the new property without removing the legacy properties:

```
camunda.data.secondary-storage.opensearch.url=http://prod-db.com:54321
camunda.database.url=http://prod-db.com:54321
camunda.operate.opensearch.url=http://prod-db.com:54321
camunda.tasklist.opensearch.url=http://prod-db.com:54321
```

As long as the values match, this is a valid configuration. The application will start with a warning in the log.

:::tip
When migrating a breaking key to the unified configuration, as long as it supports the double configuration option, you can use either of these migration approaches.
:::

## Camunda 8.8 property changes

The following table shows new properties introduced in 8.8 and any related legacy properties.

- Use the search box to find a specific property or set of properties matching your search term.
- Apply filter badges to filter the table by property change type.
- Sort the table alphabetically using the column headers.

<SearchableTable />
