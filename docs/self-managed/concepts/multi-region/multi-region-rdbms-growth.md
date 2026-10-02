---
id: multi-region-rdbms-growth
title: "Grow a Multi-Region RDBMS cluster"
sidebar_label: "Grow"
description: "Add a region to a running Multi-Region RDBMS cluster through the cluster management API, and plan the partition count."
---

import PageDescription from '@site/src/components/PageDescription';
import AddZoneImg from './img/multi-region-rdbms-add-zone.svg';

<PageDescription />

This page describes how a [Multi-Region RDBMS](./multi-region-rdbms.md) cluster grows from two regions to three or more.

You can add a zone to a running cluster without changing the brokers that already run. Each broker ID combines a zone name and an index, such as `london_0`. A new zone brings new IDs and leaves the existing ones as they are.

<AddZoneImg role="img" title="Three stages of the same cluster. First, two zones, london and paris, hold two replicas each, for a replication factor of four. The zurich slot exists but is not in the zone list. Losing either zone leaves two of four replicas, so processing stops. Second, the operator deploys the zurich brokers, adds the zone with POST /actuator/cluster/zones/zurich, one replica and priority 800, and waits for COMPLETED. Third, three zones in a 2-2-1 layout at replication factor five, where losing a database zone leaves three of five replicas and processing continues. The engine renumbers no broker and restarts no running region." />

## Declare only the zones you deploy

Every zone in the zone list must have its brokers running when the cluster bootstraps. Do not declare a zone to reserve it for later growth. Add it through the management API after its brokers run.

:::warning
A cluster that declares a zone without running brokers can fail to bootstrap.
:::

A zone in the zone list receives partition replicas even if its brokers do not run. A declared zone without brokers leaves every partition one zone short. For example, if you declare a `2-2-1` layout but deploy only the first two zones, each partition runs four replicas of five. Losing either database zone then stops processing.

## Add a zone to the running cluster

1. Start the brokers of the new zone.
1. Add the zone with the [Add or re-add a zone](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#add-or-re-add-a-zone) request.
1. Wait for the change to report `COMPLETED`.

The engine places the zone's replicas and raises the replication factor in one change. No broker is renumbered, and the regions already running are not restarted.

| Zones running | Layout  | Replication factor | After losing one zone                          |
| :------------ | :------ | :----------------- | :--------------------------------------------- |
| Two           | `2-2`   | 4                  | 2 of 4 replicas: processing stops              |
| Three         | `2-2-1` | 5                  | 3 of 5 replicas at worst: processing continues |

## Plan the partition count

Adding a zone does not change the partition count. To raise it, use [partition scaling](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#2c-scaling-only-partitions), before or after you add the zone but not during the same change. The reference implementation sizes the partition count on the provisioned region slots, so it already fits the largest topology it can grow into.
