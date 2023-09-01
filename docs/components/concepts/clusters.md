---
id: clusters
title: "Clusters"
description: "Learn more about the clusters available in your Camunda Platform 8 plan."
---

A cluster is a provided group of nodes that run Camunda Platform 8. By default, Camunda Platform 8 clusters are production-ready.

Starter and Enterprise plan customers can create production or development within the limits of their subscription.

Production clusters come in three sizes: small (S), medium (M), and large (L). To learn more about the size of cluster best suited for your use case, refer to our [Best Practices](/components/best-practices/best-practices-overview.md) for more information on [sizing your runtime environment](/components/best-practices/architecture/sizing-your-environment.md#sizing-your-runtime-environment).

The following table shows each plan and available type or size of cluster:

|            | Development | Production - S | Production - M | Production - L |
| ---------- | ----------- | -------------- | -------------- | -------------- |
| Free Trial | \-          | X              | \-             | \-             |
| Free       | \-          | \-             | \-             | \-             |
| Starter    | X           | X              | \-             | \-             |
| Enterprise | X           | X              | X              | X              |

When you deploy and execute your [BPMN](/components/modeler/bpmn/bpmn.md) or [DMN](/components/modeler/dmn/dmn.md) models on a production cluster, this might impact your monthly (Starter) or annual (Enterprise) total fee, meaning the more you execute your models, the higher your total fee may be.

## Free Trial cluster

Free Trial clusters have the same functionality as a production cluster, but are size small and only available during your trial period. You cannot convert a Free Trial cluster to a different kind of cluster.

Once you sign up for a Free Trial, you are able to create one production cluster for the time of your trial.

When your Free Trial plan expires, you are automatically transferred to the Free Plan. This plan allows you to model BPMN and DMN collaboratively, but does not support execution of your models. Any cluster created during your free trial is deleted, and you cannot create new clusters.

## Development clusters

Development clusters are recommended for development, testing, proof of concepts, and demos.

Starter Plan users have one **development cluster**, with free execution for development, included in their plan.
Deployment and execution of models (process instances, decision instances, and task users) is provided at no cost.
Additional clusters can be purchased through your [billing reservations](/components/console/manage-plan/update-billing-reservations.md).

Additionally, the following applies to **development clusters**:

- **Cluster is not high-available & less hardware**: Reduced hardware resources and availability compared to production cluster (for example, one Zeebe node only).
- **Shorter history of processes and decisions**: Data retention in Operate, Optimize, and Tasklist is reduced to one day. For example, pending or historical process instances are deleted after one day.

:::caution

**Cluster auto-pause** is not yet available. Development clusters will be paused if they go unused for two hours. When a cluster is paused, not all functionality will work, including BPMN timers and BPMN message catch events.

:::
