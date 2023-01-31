---
id: clusters
title: "Clusters"
description: "Learn more about the clusters available in your Camunda Platform 8 plan."
---

A cluster is a provided group of nodes that run Camunda Platform 8.

By default, Camunda Platform 8 clusters are production ready.

Professional and Enterprise plan customers can spin up as many production or development clusters as they like.

The following table shows each plan and available type or size of cluster:

|              | Development | Production - S | Production - M | Production - L |
| ------------ | ----------- | -------------- | -------------- | -------------- |
| Free         | \-          | \-             | \-             | \-             |
| Free Trial   | \-          | X              | \-             | \-             |
| Professional | X           | X              | \-             | \-             |
| Enterprise   | X           | X              | X              | X              |

## Production clusters

Production clusters come in three sizes: Small (S), Medium (M), Large (L). To learn more about the size of cluster right for your use case, see our Best Practices for more information on Sizing your [runtime environment](/components/best-practices/architecture/sizing-your-environment.md#sizing-your-runtime-environment).

When you deploy and execute your BPMN or DMN models on a production cluster, this might impact your monthly (Professional) or annual (Enterprise) total fee, i.e. the more you execute your models, the higher your total fee might be.

### Free Trial cluster

A Free Trial cluster is a special kind of production cluster. Free Trial clusters are size small and only available during your trial period.

Once you sign up for a Free Trial, you are able to spin up one production cluster for the time of your trial.

When your trial has expired, you automatically move to the Free Plan, which allows you to model BPMN and DMN collaboratively, but does not support execution of your models. Any cluster you have spun up during your free trial will be deleted, and you cannot spin up any new clusters.

## Development clusters

Development clusters are recommended for development, testing, proof of concepts, and demos.

Professional Plan users have the option to create **development clusters** offering free execution for development meaning deployment and execution of models (Process Instances, Decision Instances and Task Users) are free, no additional costs.

In addition, the following applies to **development clusters**

- **Cluster is not High-Available & Less Hardware:** Reduced hardware resources and availability compared to production cluster (f.ex. one zeebe node only). No 99.5% SLA, but still sufficient for most development use-cases.
- **Shorter history of processes and decisions:** Data retention in Operate, Optimize and Tasklist is reduced to 1 day. For example, pending or historical process instances are deleted after 1 day.
- **We auto-pause your cluster:** We will pause your cluster if it's not used for 2 hours. You can easily wake it up by clicking a button in Console. Implications of Auto-Pause: This means not all functionality will work all the time, f.ex. BPMN Timers, BPMN Message Catch Events, would not work while clusters are paused.
