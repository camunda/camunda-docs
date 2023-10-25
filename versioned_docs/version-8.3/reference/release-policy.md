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

For components inside a **cluster**, Camunda provides two channels for provisioning and follows the [Camunda release policy](https://camunda.com/release-policy/):

- **Stable**: Provides the latest feature and patch releases ready for most users at minimal risk. The releases follow semantic versioning and can be updated to the next minor or patch release without data loss.
- **Alpha**: Provides preview releases in preparation for the next stable release. They provide a short-term stability point to test new features and give feedback before they are released to the stable channel. Try these to ensure the upcoming release works with your infrastructure. These releases cannot be updated to a newer release, and therefore are not meant to be used in production.

On the stable channel, the last three supported minor versions are made available for provisioning.

### New versions

Whenever a new Camunda 8 version is released, we do our best to provide the new version on our managed service at the same time. We add a notice to Console, recommending an update to the latest version.

![Console with notice to update the cluster in Camunda 8 SaaS](img/update-console.png)

#### Updates or restart for critical issues

In our managed service we reserve the right to force update or restart a cluster immediately and without notice in advance if there is a critical security or stability issue.

## Self-Managed

Whenever a new Camunda 8 version is released, Camunda 8 Self-Managed enterprise customers will be notified via email.

If you are not an enterprise customer, you can stay up to date via [release blogs](https://camunda.com/blog/category/release-notes/), the [announcements page](/reference/announcements.md), or releases on [GitHub](https://github.com/camunda) and [Docker Hub](https://hub.docker.com/u/camunda).

### New versions

If you are running Camunda 8 Self-Managed, follow our [update guide](/self-managed/operational-guides/update-guide/introduction.md).
