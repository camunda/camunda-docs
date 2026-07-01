---
id: properties
title: "Property reference"
description: "Learn about the configuration properties available in your Orchestration Cluster."
toc_min_heading_level: 2
toc_max_heading_level: 2
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

As a Spring Boot application, the Orchestration Cluster supports standard
[Spring configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) methods.

The following configurations apply to all components within the Orchestration Cluster.

import Api from './partials/\_api.md'

<Api />

import Mcp from './partials/\_mcp.md'

<Mcp />

import Cluster from './partials/\_cluster.md'

<Cluster />

import Data from './partials/\_data.md'

<Data />

import PrimaryStorage from './partials/\_primary-storage.md'

<PrimaryStorage />

import SecondaryStorage from './partials/\_secondary-storage.md'

<SecondaryStorage />

import Exporters from './partials/\_exporters.md'

<Exporters />

import Expression from './partials/\_expression.md'

<Expression />

import Licensing from './partials/\_licensing.md'

<Licensing />

import Monitoring from './partials/\_monitoring.md'

<Monitoring />

import ProcessInstanceCreation from './partials/\_process-instance-creation.md'

<ProcessInstanceCreation />

import Security from './partials/\_security.md'

<Security />

import System from './partials/\_system.md'

<System />

## Physical tenant support metadata

Use this table to identify properties with explicit Physical Tenant semantics.

| Property path                                                                      | Tenant overridable | Mandatory at tenant level | Notes                                                                                    |
| ---------------------------------------------------------------------------------- | ------------------ | ------------------------- | ---------------------------------------------------------------------------------------- |
| `camunda.physical-tenants.<tenant-key>.cluster.partitions-count`                   | Yes                | No                        | Required only when a tenant overrides default cluster sizing.                            |
| `camunda.physical-tenants.<tenant-key>.security.authentication.providers.assigned` | Yes                | Yes                       | Each configured tenant entry must assign one or more cluster-defined identity providers. |
| `camunda.physical-tenants.<tenant-key>.data.secondary-storage.rdbms.url`           | Yes                | No                        | Optional per-tenant override for RDBMS secondary storage.                                |
| `camunda.security.authentication.method`                                           | No                 | No                        | Cluster-scoped property.                                                                 |
| `camunda.security.cluster-admin`                                                   | No                 | No                        | Cluster-scoped property.                                                                 |
| `camunda.security.csrf`                                                            | No                 | No                        | Cluster-scoped property.                                                                 |
| `camunda.security.multi-tenancy`                                                   | No                 | No                        | Cluster-scoped property.                                                                 |
| `camunda.security.http-headers`                                                    | No                 | No                        | Cluster-scoped property.                                                                 |
| `camunda.security.authentication.authentication-refresh-interval`                  | No                 | No                        | Cluster-scoped property.                                                                 |

This metadata supplements the existing property definitions and is specific to Physical Tenants behavior.
