---
id: common-pitfalls
title: Common Pitfalls
description: "Let's take a closer look at common issues and resolutions."
---

If you have a problem, you can always use the [feedback form](./feedback-and-support.md).

## The button to create new clusters is disabled

- Your organization is on a Trial Plan and you have already created a cluster. In this case you cannot create another cluster, because only one cluster is included in the trial plan.
- Your billing reservations do not allow any more clusters. In this case you have to increase the [reservations](../manage-organization/update-billing-reservations.md) if you want to create more clusters. If you do not have the necessary rights, contact an admin or the owner of the organization.

## I cannot connect to Zeebe

- Check if your [API Client](../manage-clusters/manage-api-clients.md) has the necessary rights. To interact with Zeebe the **Scope** `Zeebe` must be set.
- Check if your credentials are configured correctly. There is a CLI tool that allows you to easily check the status: [`zbctl`](https://www.npmjs.com/package/zbctl). With the command `zbctl status` you can read the topology. If this command works, the connection can be established.
- Check if your cluster is _Healthy_: it can happen that a Zeebe cluster is temporarily unavailable. Check the status of your cluster via the cluster overview.
