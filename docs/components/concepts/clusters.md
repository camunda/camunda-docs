---
id: clusters
title: "Clusters"
description: "Learn more about the clusters available in your Camunda Platform 8 plan."
---

TODO: Definition of cluster

## Production clusters

By default, Camunda Platform 8 clusters are production ready.

## Development clusters

Professional Plan users have the option to create **development clusters** offering free execution for development meaning deployment and execution of models (Process Instances, Decision Instances and Task Users) are free, no additional costs.

In addition, the following applies to **development clusters**

- Cluster is not High-Available & Less Hardware: Reduced hardware resources and availability compared to production cluster (f.ex. one zeebe node only). No 99.5% SLA, but still sufficient for most development use-cases.
- Shorter history of processes and decisions: Data retention in Operate, Optimize and Tasklist is reduced to 1 day. For example, pending or historical process instances are deleted after 1 day.
- We auto-pause your cluster: We will pause your cluster if it's not used for 2 hours. You can easily wake it up by clicking a button in Console. Implications of Auto-Pause: This means not all functionality will work all the time, f.ex. BPMN Timers, BPMN Message Catch Events, would not work while clusters are paused.
