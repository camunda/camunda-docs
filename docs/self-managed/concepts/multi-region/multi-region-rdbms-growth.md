---
id: multi-region-rdbms-growth
title: "Grow a Multi-Region RDBMS cluster"
sidebar_label: "Grow"
description: "Add a region to a running Multi-Region RDBMS cluster through the cluster management API, and size the partition count for the largest topology."
---

import PageDescription from '@site/src/components/PageDescription';
import AddZoneImg from './img/multi-region-rdbms-add-zone.svg';

<PageDescription />

This page describes how a [Multi-Region RDBMS](./multi-region-rdbms.md) cluster grows from two regions to three or more.

You can add a zone to a running cluster without renumbering any broker, because zone awareness names zones instead of numbering brokers.

<AddZoneImg role="img" title="Three stages of the same cluster. First, two zones, london and paris, hold two replicas each, for a replication factor of four. The zurich slot exists but is not in the zone list. Losing either zone leaves two of four replicas, so processing stops. Second, the operator deploys the zurich brokers, adds the zone with POST /actuator/cluster/zones/zurich, one replica and priority 800, and waits for COMPLETED. Third, three zones in a 2-2-1 layout at replication factor five, where losing a database zone leaves three of five replicas and processing continues. The engine renumbers no broker and restarts no running region." />

## Declare only the zones you deploy

Every zone in the zone list must have its brokers running when the cluster bootstraps. Do not declare a zone to reserve it for later growth. Add it through the management API after its brokers run.

A zone in the zone list receives partition replicas even if its brokers do not run. A declared zone without brokers leaves every partition one zone short. For example, if you declare a `2-2-1` layout but deploy only the first two zones, each partition runs four replicas of five. Losing either database zone then stops processing.

## Add a zone to the running cluster

1. Start the brokers of the new zone.
1. Add the zone with the [cluster management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md).
1. Wait for the change to report `COMPLETED`.

The engine places the zone's replicas and raises the replication factor in one change. No broker is renumbered, and the regions already running are not restarted.

| Zones running | Layout  | Replication factor | After losing one zone                          |
| :------------ | :------ | :----------------- | :--------------------------------------------- |
| Two           | `2-2`   | 4                  | 2 of 4 replicas: processing stops              |
| Three         | `2-2-1` | 5                  | 3 of 5 replicas at worst: processing continues |

## Size the partition count up front

The partition count is fixed at bootstrap, so size it for the largest topology you expect. The reference implementation sizes it on the provisioned region slots, not on the zones running at bootstrap.
