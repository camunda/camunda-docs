---
id: auto-updates
title: "Auto-updates"
description: "Some updates are applied to SaaS clusters automatically."
---

Camunda 8 SaaS customers can enable auto-updates. When enabled, the cluster is updated once a new patch release is available.

Auto-updates can be enabled during [cluster creation](/components/console/manage-clusters/create-cluster.md) or in the **Settings** tab. Depending on your [role](/components/console/manage-organization/manage-users.md), this may appear grayed out in the **Settings** tab.

For Camunda 8 SaaS, auto-updates are only for patch releases (x.y.**z**, where **z** is a patch release).

Minor updates (x.**y**.z, where **y** is a minor release) are not eligible for auto-updates and require manual steps to initiate. Depending on your [role](/components/console/manage-organization/manage-users.md), you may see that an update is available, but no **Update cluster** button. Contact your organization owner or admin to update your cluster.
