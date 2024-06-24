---
id: release-policy
title: "Release policy"
---

Camunda 8 follows the [Camunda release policy](https://camunda.com/release-policy/) with some specific clarifications which can be found below.

:::note

Interested in deprecation and support announcements? Read more on the [Announcements](announcements.md) page.

:::

## Provisioning in SaaS

In our managed service, we differentiate between components that are part of a Camunda 8 cluster and components that are outside of the cluster.

A cluster usually consists of:

- Zeebe
- Operate
- Tasklist
- Optimize

For components **outside of the cluster**, we release new versions continuously and update customers to the latest version automatically whenever it is ready to be shipped.

These components include:

- Modeler (Web)
- Connectors
- Console

Admins can [enable alpha features](/components/console/manage-organization/enable-alpha-features.md) for components outside of the cluster in the organization settings screen.

For components inside a **cluster**, Camunda provides two channels for provisioning and follows the [Camunda release policy](https://camunda.com/release-policy/):

- **Stable**: General availability features for cluster components are available through the stable channel. This channel provides the latest feature and patch releases ready for most users at minimal risk. The releases follow semantic versioning and can be updated to the next minor or patch release without data loss.
- **Alpha**: Alpha features for cluster components are available through the alpha channel. This channel provides preview releases in preparation for the next stable release. They provide a short-term stability point to test new features and give feedback before they are released to the stable channel. Try these to ensure the upcoming release works with your infrastructure. These releases cannot be updated to a newer release, and therefore are not meant to be used in production.

On the stable channel, the last three supported minor versions are made available for provisioning.

### New versions

Whenever a new Camunda 8 version is released, we do our best to provide the new version on our managed service at the same time. We add a notice to Console, recommending an update to the latest version.

![Console with notice to update the cluster in Camunda 8 SaaS](img/update-console.png)

With the Camunda 8.5.0 release, the generation naming scheme in Camunda 8 SaaS will change and no longer include the patch version.

The new naming scheme used for the Camunda 8.5 generations will be `Camunda <Major>.<Minor>+gen<N>`, where `N` is incremented with every atomic change to the component version set.

This was done to decouple the generation name from the particular patch level of the components it contains, as some component versions like Connectors are decoupled from other components.

You will learn about the particular component patch version changes in the update dialogue to the latest generation available.

#### Updates or restart for critical issues

In our managed service, we reserve the right to force update or restart a cluster immediately and without notice in advance if there is a critical security or stability issue.

## Self-Managed

Whenever a new Camunda 8 version is released, Camunda 8 Self-Managed enterprise customers will be notified via email.

If you are not an enterprise customer, you can stay up to date via [release blogs](https://camunda.com/blog/category/release-notes/), the [announcements page](/reference/announcements.md), or releases on [GitHub](https://github.com/camunda) and [Docker Hub](https://hub.docker.com/u/camunda).

### Helm chart

Since the 8.4 release, [Camunda 8 Self-Managed Helm chart](https://artifacthub.io/packages/helm/camunda/camunda-platform) version is decoupled from the version of the application (e.g., the chart version is 9.0.0 and the application version is 8.4.x).

For more details about the applications version included in the Helm chart, review the [full version matrix](https://helm.camunda.io/camunda-platform/version-matrix/).

### New versions

If you are running Camunda 8 Self-Managed, follow our [update guide](/self-managed/operational-guides/update-guide/introduction.md).
