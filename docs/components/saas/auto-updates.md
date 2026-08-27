---
id: auto-updates
title: "Auto-updates"
description: "Some updates are applied to SaaS clusters automatically."
---

Camunda 8 SaaS customers can enable auto-updates. When enabled, the cluster is updated once a new patch release is available.

Auto-updates can be enabled during [cluster creation](/components/hub/organization/manage-clusters/create-cluster.md) or in the **Settings** tab. Depending on your [role](/components/hub/organization/manage-members/manage-users.md), this may appear grayed out in the **Settings** tab.

For Camunda 8 SaaS, auto-updates are only for patch releases (x.y.**z**, where **z** is a patch release).

Auto-updates are only applied when a cluster is running. If a cluster is sleeping during the update cadence, the auto-update is not applied automatically. However, the update is still available for a manual update in Camunda Hub.

Minor updates (x.**y**.z, where **y** is a minor release) are not eligible for auto-updates and require manual steps to initiate. Depending on your [role](/components/hub/organization/manage-members/manage-users.md), you may see that an update is available, but no **Update cluster** button. Contact your organization owner or admin to update your cluster.

## Update availability

Camunda Hub manages update path availability separately from the release itself. As a result, a newly released version is not always available as an update target immediately.

Camunda also withholds or disables specific update paths when a known issue affects a version, so that clusters do not reach an affected version. An update you expect to see may be unavailable for this reason.

If a version you expect is not offered as an update target, [contact Camunda support](/reference/contact.md) rather than assuming the path is permanently unavailable.
