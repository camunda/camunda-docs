---
id: console
title: View Console
description: "Use Console to view the clusters, usage, alerts, and activity of your organization at a high level."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Use Console to view your organization at a high level. Console shows the state of the clusters that host your environments and the usage of your organization. It's available to organization owners, admins, and DevOps users.

To open Console, click **Console** in the left navigation.

<Tabs groupId="edition" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

In SaaS, Console shows a dashboard with the following information:

- Number of users, task users, clusters, and Admin API credentials
- Cluster health, with references to the [clusters](/components/hub/organization/manage-clusters/clusters.md)
- [Process instance usage](/components/hub/organization/manage-organization-settings/usage-history.md)
- [Decision instance usage](/components/hub/organization/manage-organization-settings/usage-history.md)
- [Usage alerts](/components/hub/organization/manage-organization-settings/usage-alerts.md)
- [Recent activity](/components/hub/organization/manage-organization-settings/view-organization-activity.md)

</TabItem>

<TabItem value='self-managed'>

In Self-Managed, Console shows dashboard and usage information for your clusters.

The dashboard information includes:

- Cluster health, including the number of healthy, unhealthy, and unknown clusters, and the [clusters](/components/hub/organization/manage-clusters/clusters.md) that are unhealthy
- Management components, each with its version, cluster, status, and a link to open it
- Usage of all clusters in the last 30 days, including task users, process instances, and decision instances
- Links to documentation and feedback

The usage information shows the usage of each cluster. To view all clusters, see [clusters in Self-Managed](/components/hub/organization/manage-clusters/clusters.md).

</TabItem>

</Tabs>

The cluster information in Console is about the infrastructure. Cluster links open the cluster pages in **Environments**. To work with the environments that run on the clusters, see [manage environments](./manage-environments/index.md).
