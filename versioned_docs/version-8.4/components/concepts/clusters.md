---
id: clusters
title: "Clusters"
description: "Learn more about the clusters available in your Camunda 8 plan."
---

A [cluster](../../guides/create-cluster.md) is a provided group of production-ready nodes that run Camunda 8.

**Enterprise** plan customers can create as many production or development clusters as they want based on their Enterprise agreement.

Production clusters come in three sizes: small (S), medium (M), and large (L). To learn more about the size of cluster best suited for your use case, refer to our [Best Practices](/components/best-practices/best-practices-overview.md) for more information on [sizing your runtime environment](/components/best-practices/architecture/sizing-your-environment.md#sizing-your-runtime-environment).

The following table shows each plan and available type or size of cluster:

|            | Development | Production - S | Production - M | Production - L |
| ---------- | ----------- | -------------- | -------------- | -------------- |
| Free Trial | \-          | X              | \-             | \-             |
| Free       | \-          | \-             | \-             | \-             |
| Enterprise | X           | X              | X              | X              |

When you deploy and execute your [BPMN](/components/modeler/bpmn/bpmn.md) or [DMN](/components/modeler/dmn/dmn.md) models on a production cluster, this might impact your annual (Enterprise) total fee, meaning the more you execute your models, the higher your total fee may be.

## Free Trial cluster

Free Trial clusters have the same functionality as a production cluster, but are size small and only available during your trial period. You cannot convert a Free Trial cluster to a different kind of cluster.

Once you sign up for a Free Trial, you are able to create one production cluster for the duration of your trial.

When your Free Trial plan expires, you are automatically transferred to the Free plan. This plan allows you to model BPMN and DMN collaboratively, but does not support execution of your models. Any cluster created during your trial is deleted, and you cannot create new clusters.

### Auto-pause

Free Trial clusters are automatically paused after a period of inactivity. Auto-pause occurs regardless of cluster usage.

You can resume a paused cluster at any time, which typically takes five to ten minutes to complete. See [resume your cluster](/components/console/manage-clusters/resume-cluster.md).

- Clusters tagged as `dev` (or untagged) auto-pause eight hours after the cluster is created or resumed from a paused state.
- Clusters tagged as `test`, `stage`, or `prod` auto-pause if there is no cluster activity for 48 hours.
- Cluster disk space is cleared when a trial cluster is paused.
  - You will need to redeploy processes to the cluster once it is resumed from a paused state.
  - Cluster configuration settings (for example, API Clients, Connector secrets, and IP allowlists) are saved so you can easily resume a cluster.

:::tip
To prevent auto-pause, [Upgrade your Free Trial plan](https://camunda.com/pricing/) to an Enterprise plan.
:::

## Development clusters

Development clusters in the Enterprise plan are recommended for development, testing, proof of concepts, and demos.

### Development clusters in the Enterprise plan

Enterprise plan users can purchase development clusters as part of their Enterprise subscription agreement. Deployment and execution of models (process instances, decision instances, and task users) are included at no extra cost for this type of cluster. Additionally, this type of cluster in the Enterprise plan follows the [standard data retention policy](/components/concepts/data-retention.md) and does not auto-pause when not in use.

Please [contact us](/reference/contact.md) if you are an existing customer and would like to purchase a development cluster.
