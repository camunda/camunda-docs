---
id: common-pitfalls
title: Common pitfalls
description: "Let's take a closer look at common issues and resolutions."
---

If you have an issue, use the [feedback form](./feedback-and-support.md).

See a few common pitfalls below:

## The button to create new clusters is disabled

- Your organization is on a Trial Plan and you have already created a cluster. In this case, you cannot create another cluster, because only one cluster is included in the trial plan.

[//]:# (So I think from a branding perspective and for consistency purposes we need to determine if we capitalize "Trial Plan" as a product, or go by "trial phase" or "free trial plan," etc. In tandem, we need to determine if we capitalize "Plan" after "Enterprise" and "Professional." Currently, it looks like we do.)

- Your billing reservations do not allow any more clusters. You must increase the [reservations](../manage-organization/update-billing-reservations.md) if you want to create more clusters. If you do not have the necessary rights, contact an admin or the owner of the organization.

## I cannot connect to Zeebe

- Check if your [API client](../manage-clusters/manage-api-clients.md) has the necessary rights. To interact with Zeebe, the **Scope** `Zeebe` must be set.
- Check if your credentials are configured correctly. There is a CLI tool that allows you to check the status: [`zbctl`](https://www.npmjs.com/package/zbctl). With the command `zbctl status`, you can read the topology. If this command works, the connection can be established.
- Check if your cluster is **Healthy**: A Zeebe cluster may be temporarily unavailable. To check if your cluster is healthy, navigate to the cluster list. Click on the cluster to view its details for a closer view of the status over all products (Zeebe, Operate, Tasklist, Optimize).