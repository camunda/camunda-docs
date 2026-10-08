---
id: clusters
title: "Clusters"
description: "A cluster is the infrastructure that runs Camunda 8. Learn how clusters relate to environments, workspaces, and Physical Tenants."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

A cluster is the infrastructure that runs Camunda 8. It includes the Orchestration Cluster that automates your processes, and the components that run alongside it, such as connectors and Optimize.

In Camunda Hub, a cluster is an administrative unit: the infrastructure that organization admins create, size, and maintain. Teams don't deploy to a cluster directly. They deploy to an [environment](./environments.md) hosted on it.

## Create and manage clusters

How you create and manage clusters depends on the edition of Camunda that you use.

<Tabs groupId="edition" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

In SaaS, organization admins create clusters in Camunda Hub. When you [create a cluster](/components/saas/clusters/create-cluster.md), you choose its type, size, region, and version. The type defines the availability and uptime of the cluster, and the size defines its capacity.

Organization admins and DevOps users [manage clusters](/components/saas/clusters/manage-cluster.md), for example to rename, resume, update, or resize a cluster.

Learn more about [SaaS clusters](/components/saas/clusters.md), including cluster types, sizes, and Free Trial clusters.

</TabItem>

<TabItem value='self-managed'>

In Self-Managed, you provision clusters outside Camunda Hub, and you don't create them in Camunda Hub. To show a cluster and its environments in Camunda Hub, add it to the Camunda Hub configuration.

Learn more about [clusters in Self-Managed](/components/hub/organization/manage-clusters/index.md) and [Physical Tenants in the Camunda Hub configuration](/self-managed/components/hub/configuration/environments.md#physical-tenants).

</TabItem>

</Tabs>

## Next steps

- Read about [environments](./environments.md), [workspaces](./workspaces.md), and [projects](./projects.md).
- Learn how [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md) isolate teams inside a cluster.
