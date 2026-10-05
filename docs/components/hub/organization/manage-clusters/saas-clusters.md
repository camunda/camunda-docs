---
id: saas-clusters
title: Clusters in SaaS
description: "Create and manage the SaaS clusters that host your deployment environments, and find the pages for each cluster task."
---

In SaaS, you create and manage clusters in Camunda Hub. A cluster is the infrastructure that runs Camunda 8, and each cluster hosts one [environment](/components/concepts/environments.md) that your teams deploy to. Learn how clusters relate to environments in [clusters](/components/concepts/clusters.md).

## Permissions

Only organization owners, admins, and DevOps users see the **Clusters** page. Other users work with the environments assigned to their [workspace](/components/concepts/workspaces.md), and they don't see clusters.

## View clusters

To view your clusters, click **Environments** in the left navigation, and then click **Clusters** next to the page title. The page lists your clusters with their status, such as **Creating**, **Healthy**, or **Paused**. Select a cluster to open its details.

## Create a cluster

Every cluster you create gets one environment automatically. You choose the [cluster type and size](/components/saas/clusters.md), the region, the version, and a tag, such as `prod`, that appears on the environment of the cluster. Then an organization admin [assigns the environment to a workspace](../manage-environments/assign-environments.md) so teams can deploy to it.

See [create a cluster](/components/saas/clusters/create-cluster.md).

## Manage a cluster

Open a cluster to manage it. The cluster details have the following tabs and pages:

| Task                                                   | Where to find it                                                            |
| :----------------------------------------------------- | :-------------------------------------------------------------------------- |
| Rename, resume, update, resize, or delete a cluster    | [Manage your cluster](/components/saas/clusters/manage-cluster.md)          |
| Create and manage API clients                          | [Manage API clients](/components/saas/clusters/manage-api-clients.md)       |
| Create secrets for your connectors                     | [Manage connector secrets](/components/saas/clusters/manage-secrets.md)     |
| Get notified when process instances stop with an error | [Create an alert](/components/saas/clusters/manage-alerts.md)               |
| Restrict access to the cluster                         | [Manage IP allowlists](/components/saas/clusters/manage-ip-allowlists.md)   |
| Back up the cluster                                    | [Create cluster backups](/components/saas/clusters/cluster-backups.md)      |
| Enable authorizations and other cluster settings       | [Manage cluster settings](/components/saas/clusters/settings.md)            |
| Record user and client operations                      | [Configure the audit log](/components/saas/clusters/configure-audit-log.md) |
| Check how well the cluster copes with its workload     | [Monitor cluster load](/components/saas/clusters/cluster-capacity.md)       |
| Fix common problems                                    | [Troubleshoot clusters](/components/saas/clusters/troubleshoot-clusters.md) |

To monitor and manage the connectors that run on a cluster, see [manage your connectors](./manage-connectors.md).

## Jobs

The details of a cluster summarize its jobs for the last 24 hours: the number of jobs that were created, completed, and not completed. Select **View all job types** to see the jobs by type. For more information, see the [job dashboard](../analyze-operations/job-dashboard.md).

## Next steps

- Learn about [cluster types, sizes, and Free Trial clusters](/components/saas/clusters.md).
- Learn how to [manage environments](../manage-environments/index.md).
- Running Camunda in Self-Managed? See [clusters in Self-Managed](./self-managed-clusters.md).
