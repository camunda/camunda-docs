---
id: common-pitfalls
title: Common pitfalls
description: "Let's take a closer look at common issues and resolutions."
---

Let's take a closer look at common issues and resolutions within Console.

## The button to create new clusters is disabled

- Your organization is on a trial plan and you have already created a cluster. In this case, you cannot create another cluster, because only one cluster is included in the trial plan.

- Your billing reservations do not allow any more clusters. You must increase the [reservations](../manage-plan/update-billing-reservations.md) to create more clusters. If you do not have the necessary rights, contact an admin or the owner of the organization.

## I cannot connect to Zeebe

- Check if your [API client](../manage-clusters/manage-api-clients.md) has the necessary rights. To interact with Zeebe, the **Scope** `Zeebe` must be set.
- Check if your credentials are configured correctly. There is a CLI tool that allows you to check the status: [`zbctl`](https://www.npmjs.com/package/zbctl). With the command `zbctl status`, you can read the topology. If this command works, the connection can be established.
- Check if your cluster is **Healthy**: A Zeebe cluster may be temporarily unavailable. To check if your cluster is healthy, navigate to the **Clusters** tab in the top navigation. Click on the cluster to view its details for a closer view of the status over all components (Zeebe, Operate, Tasklist, Optimize).
