---
id: cluster-load
title: Cluster capacity
description: "Cluster capacity gives you an approximate, high level overview of how well your cluster handles its current workload."
---

View and manage the cluster capacity of your clusters in Console.

## Overview

The cluster capacity metric lets you visualize, at a very high level, how well your cluster is coping with its current workload. While it can be used
as an additional indicator of your cluster's health (e.g. a maxed out capacity likely indicates poor responsiveness), its primary usage
is to help you understand if the cluster is appropriately sized for your workload.

:::info
To understand how cluster capacity is calculated, see [How cluster capacity is calculated](#how-cluster-capacity-is-calculated).
:::

You can think of it this way: the higher the capacity, the more likely things will start slowing down, timing out, requests will fail, etc.
The lower the capacity, the more you could increase the workload on this cluster, indicating your cluster is likely underused.

## View cluster capacity

You can view a percentage summary of cluster capacity on the Console **Dashboard** tab and **Clusters** tab.

[screenshot]

You can view more detailed information for an individual cluster on the Console **Overview** tab.

[screenshot]

## Manage cluster capacity

Cluster capacity will fluctuate based on incoming user requests, and internal processing load.

:::note
User requests are those sent directly by an external client, whereas internal load refers to all other processing that is **not** directly triggered
by a client. This can be timer events, a job being made available after back off, etc.
:::

As such, the capacity will fluctuate throughout the day - for example, it may be higher during business hours, but drop off over night when none of your
users are around. On the other, certain processes may cause a fan out effect: creating a process instance is only a single user request, but could do some
computation on a very large multi-instance collection, resulting in a spike of high load while this is happening. Or you could have thousands of timers all
triggering at the same time, etc.

A high capacity does not necessarily mean that something is wrong, though it can indicate that your cluster is overloaded. If the capacity is high, but
your operations are finishing within an acceptable frame, requests are successful, etc., then there is no action needed.

:::note
A high capacity will be relative, but generall anything above the 60% mark would be considered high.
:::

However, if you find yourself experiencing any of the following, then you may need to take action:
- REST clients are receiving a high number of `429` errors
- gRPC clients are receiving a high number of `RESOURCE_EXHAUSTED` errors
- More and more commands or queries are timing out in your clients
- The web apps are slowing down, or showing data that is severely out of date (e.g. 1 hour)

In this case, you need to look into reducing overall load, in order to bring down the capacity %.

### Reduce cluster capacity

If your cluster capacity is too high, you can help reduce cluster capacity by:

- Scaling down the load. This can mean stopping certain clients; start with your least critical load, and move on from there.
- Look at your running process instances for known issues that cause high processing:
  - Straight-through processing loops, where there is no wait states. For example, a sub process with an error boundary event which
    loops back to an activity leading into the sub-process. If you have an activity which consistently throws an error, this will result
    in a subtle infinite loop where the engine is stuck and cannot process anything else. You would have to cancel this instance, or notify
    support to force cancel it for you.

:::note
If your cluster capacity continues to remain high even after attempts to reduce it, you might need to increase your cluster size and scale. See [cluster size](/components/concepts/clusters.md#cluster-size) and [sizing your environment](/components/best-practices/architecture/sizing-your-environment.md).
:::

## How cluster capacity is calculated

Cluster capacity is based on the cluster's [flow control configuration](self-managed/operational-guides/configure-flow-control/).

Essentially, if flow control is configured, every partition is assigned a [write rate](self-managed/operational-guides/configure-flow-control/#exporting-and-write-rate)
and a [write rate limit](self-managed/operational-guides/configure-flow-control/#write-rate-limit).

So a partition's cluster capacity is defined as `(writeRate / writeRateLimit)`, which gives a number between 0 and 1; when multiplied by 100, this gives
you the partition capacity as a percentage.

:::note
The partition capacity is _only_ calculated and reported on the current partition leader.
:::

The cluster capacity is then the average of the capacity of all partitions in the cluster.
