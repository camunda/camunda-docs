---
id: management-api-overview
title: Cluster management API
sidebar_label: Cluster management API
description: "Learn how to use the cluster management API to manage the topology, exporters, backups, and upgrade readiness of a Camunda 8 Self-Managed cluster."
---

The cluster management API lets you manage a Self-Managed Orchestration Cluster at runtime, including its topology, exporters, backups, and upgrade readiness.

## About this API

The API is a set of custom endpoints available through [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints) on the management port (default `9600`). It's separate from the [Orchestration Cluster API](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

:::note
The management port is typically not publicly exposed. If the machine where you run requests can't reach the gateway, create a private connection such as `kubectl port-forward svc/camunda-zeebe-gateway 9600:9600`, then use `localhost` as the gateway host.
:::

## Reference

| API                                                                                            | Base path                                            |
| :--------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| [Cluster topology management](specifications/cluster/cluster-topology-management-api.info.mdx) | `/actuator/cluster`                                  |
| [Exporters](specifications/exporters/exporters-api.info.mdx)                                   | `/actuator/exporters`                                |
| [Backups](specifications/backups/backup-management-api.info.mdx)                               | `/actuator/backupRuntime`, `/actuator/backupHistory` |
| [Upgrade readiness](specifications/upgrade-readiness/upgrade-readiness-api.info.mdx)           | `/actuator/upgradeReadiness`                         |

For usage guidance and examples, see [management API operations](../../self-managed/components/orchestration-cluster/zeebe/operations/management-api.md).
