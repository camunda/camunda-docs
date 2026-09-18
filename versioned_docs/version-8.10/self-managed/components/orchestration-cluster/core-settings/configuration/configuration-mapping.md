---
id: configuration-mapping
title: "Property changes in Camunda 8.9"
sidebar_label: Property changes in 8.9
description: "Configuration property changes and backwards compatibility information for new Camunda 8.9 properties and legacy properties."
hide_table_of_contents: true
---

import SearchableTable from '../../../../react-components/\_config-table.js';

Changes to component configuration properties introduced in Camunda 8.9.

## About unified configuration property changes

In Camunda 8.9, all remaining [unified configuration property changes](/versioned_docs/version-8.8/reference/announcements-release-notes/880/whats-new-in-88.md) are complete.

:::info
To learn more about the property changes introduced in Camunda 8.8, see [property changes in Camunda 8.8](/versioned_docs/version-8.8/self-managed/components/orchestration-cluster/core-settings/configuration/configuration-mapping.md).
:::

### New properties and backwards compatibility

Backwards compatibility between new Camunda 8.9 unified properties and existing legacy properties is as follows:

| Type                                                                                                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :--------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span className="badge badge--breaking-change" style={{ width: '110px', fontSize: '75%'}}>Breaking change</span> | <p>New unified property with an existing equivalent legacy property or set of properties.</p><p>Backwards compatibility is **not** supported.</p><p><ul><li><p>You should move legacy properties marked with breaking change to the new unified set before upgrading to Camunda 8.9.</p></li><li><p>You can keep legacy properties in your configuration file as long as they match the new unified configuration equivalent property. However, this is not recommended as it can lead to misconfiguration. If the values do not match, the application will not start, and an error will be logged.</p></li></ul></p> |
| <span className="badge badge--direct-mapping">Direct mapping</span>                                              | <p>New unified property with a direct mapping to an existing equivalent legacy property or set of properties.</p><p>Backwards compatibility is supported as follows:</p><p><ul><li><p>If you have defined the new property, it is used.</p></li><li><p>If you have not defined the new property, the legacy property is used.</p></li></ul></p>                                                                                                                                                                                                                                                                        |
| <span className="badge badge--new">New</span>                                                                    | <p>New unified property without an existing equivalent legacy property.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

### Recommended actions

**As part of upgrading to Camunda 8.9, replace any legacy properties shown in the [Camunda 8.9 property changes table](#camunda-89-property-changes) below with the equivalent new unified configuration property.**

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

Remove the legacy properties and add the corresponding new property:

```
camunda.data.secondary-storage.opensearch.url=http://prod-db.com:54321
```

## Camunda 8.9 property changes

The following table shows new unified properties introduced in 8.9 and their equivalent legacy properties.

- Use the search box to find a specific property or set of properties matching your search term.
- Apply filter badges to filter the table by property change type.
- Sort the table alphabetically using the column headers.

:::info
Learn more about new properties (including default values) in the [property reference](./properties.md).
:::

<SearchableTable />
