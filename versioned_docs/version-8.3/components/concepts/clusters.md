---
id: clusters
title: "Clusters"
description: "Learn more about the clusters available in your Camunda 8 plan."
---

A [cluster](../../guides/create-cluster.md) is a provided group of production-ready nodes that run Camunda 8.

- **Enterprise** plan customers can create as many production or development clusters as they want.
- **Starter** plan customers are limited based on the [fair usage limits of the plan](https://camunda.com/legal/fair-usage-limits-for-starter-plan/).

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

Free Trial clusters have the same functionality as a production cluster, but are size [small (S)](/components/best-practices/architecture/sizing-your-environment.md#camunda-8-saas) and only available during your trial period. You cannot convert a Free Trial cluster to a different kind of cluster.

Once you sign up for a Free Trial, you are able to create one production cluster for the duration of your trial.

When your Free Trial plan expires, you are automatically transferred to the Free plan. This plan allows you to model BPMN and DMN collaboratively, but does not support execution of your models. Any cluster created during your trial is deleted, and you cannot create new clusters.

### Auto-pause

Free Trial clusters are automatically paused after a period of inactivity. Auto-pause occurs regardless of cluster usage.

You can resume a paused cluster at any time, which typically takes five to ten minutes to complete.

- Clusters tagged as `dev` (or untagged) auto-pause eight hours after the cluster is created or resumed from a paused state.
- Clusters tagged as `test`, `stage`, or `prod` auto-pause if there is no cluster activity for 48 hours.
- Paused `dev` (or untagged) clusters are automatically deleted after 30 consecutive paused days. You can change the tag to avoid cluster deletion.
- No data is lost while a cluster is paused. All execution and configuration is saved, but cluster components such as Zeebe and Operate are temporarily disabled until you resume the cluster.
- Cluster disk space is cleared when a trial cluster is paused.
  - You will need to redeploy processes to the cluster once it is resumed from a paused state.
  - Cluster configuration settings (for example, API Clients, Connector secrets, and IP allowlists) are saved so you can easily resume a cluster.

:::tip
To prevent auto-pause, [Upgrade your Free Trial plan](https://camunda.com/pricing/) to a Starter or Enterprise plan.
:::

## Development clusters

Development clusters are recommended for development, testing, proof of concepts, and demos.

Starter plan users have one **development cluster**, with free execution for development included in their plan. Deployment and execution of models (process instances, decision instances, and task users) is provided at no cost.

Additional clusters can be purchased through your [billing reservations](/components/console/manage-plan/update-billing-reservations.md).

Additionally, the following applies to **development clusters**:

- **Cluster is not high-available & less hardware**: Reduced hardware resources and availability compared to production cluster (for example, one Zeebe node only).
- **Shorter history of processes and decisions**: Data retention in Operate, Optimize, and Tasklist is reduced to one day. For example, pending or historical process instances are deleted after one day.
